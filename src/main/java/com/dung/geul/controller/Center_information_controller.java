package com.dung.geul.controller;


import com.dung.geul.dto.BoardDto;
import com.dung.geul.dto.FileDto;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.notice_boardDTO;
import com.dung.geul.repository.BoardRepository;
import com.dung.geul.security.dto.AuthMemberDTO;
import com.dung.geul.service.BoardService;
import com.dung.geul.service.FileService;
import com.dung.geul.service.notice_boardService;
import com.dung.geul.util.MD5Generator;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Controller
@RequestMapping("/center-information")
@RequiredArgsConstructor    // 페이지 목록 처리
@Log4j2
public class Center_information_controller {

    @GetMapping("/center_introduction")   // 센터 소개
    public String center_introduction(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model) {
        model.addAttribute("loginUser", authMemberDTO);
        return "center-information/center_introduction"; }

    @GetMapping("/main_business")   // 주요 업무
    public String main_business(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model) {
        model.addAttribute("loginUser", authMemberDTO);
        return "center-information/main_business"; }

    @GetMapping("/notice_board_form")   // 공지 사항 작성 페이지
    public String notice_board_form(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model) {
        model.addAttribute("loginUser", authMemberDTO);
        return "center-information/notice_board_form"; }

    private final notice_boardService service;

    @Autowired
    private BoardRepository repository;

    @GetMapping("/notice_board")    // 공지사항 게시판 페이지
    public String notice_board(PageRequestDTO pageRequestDTO, Model model) {

        log.info("list............." + pageRequestDTO);

        // PageResultDTO
        model.addAttribute("result", service.getList(pageRequestDTO));
        return "center-information/notice_board";
    }

// -------------------------------------------------------------------------------

    @GetMapping("/notice_board_register")   // 게시글 작성
    public void register() {
        log.info("REGISTER GET...");
    }

    @GetMapping({"/notice_board_read", "/notice_board_modify"}) // 매핑을 배열로 두개 처리
    public void read(long num, @ModelAttribute("requestDTO") PageRequestDTO requestDTO, Model model){

        log.info("num: " + num);

        notice_boardDTO dto = service.read(num);

        model.addAttribute("dto", dto);

    }

    @PostMapping("/remove") // 게시글 삭제
    public String remove(long num, RedirectAttributes redirectAttributes){

        log.info("num: " + num);

        service.remove(num);

        redirectAttributes.addFlashAttribute("msg", num);

        return "redirect:/center-information/notice_board";

    }

    @PostMapping("/notice_board_modify")    // 게시글 수정
    public String modify(notice_boardDTO dto,
                         @ModelAttribute("requestDTO") PageRequestDTO requestDTO,
                         RedirectAttributes redirectAttributes){

        log.info("post modify.........................................");
        log.info("dto: " + dto);

        service.modify(dto);

        redirectAttributes.addAttribute("page",requestDTO.getPage());
        redirectAttributes.addAttribute("num",dto.getNum());


        return "redirect:/center-information/notice_board_read";
    }

// 파일 업로드 -----------------------------------------------------------------------------
    private BoardService boardService;
    private FileService fileService;

//    public Center_information_controller(notice_boardService notice_boardService, FileService fileService) {
//        this.notice_boardService = notice_boardService;
//        this.fileService = fileService;
//    }

    @PostMapping("/notice_board_register")  // 게시글 작성, 파일 업로드
    public String registerPost(notice_boardDTO dto, RedirectAttributes redirectAttributes,
                               @RequestParam("file") MultipartFile files, BoardDto boardDto){

        log.info("dto..." + dto);

        //새로 추가된 엔티티의 번호
        Long num = service.register(dto);

        redirectAttributes.addFlashAttribute("msg", num);

        // 파일 업로드
        try {
            String origFilename = files.getOriginalFilename();
            String filename = new MD5Generator(origFilename).toString();
            /* 실행되는 위치의 'files' 폴더에 파일이 저장됩니다. */
            String savePath = System.getProperty("user.dir") + "\\files";
            /* 파일이 저장되는 폴더가 없으면 폴더를 생성합니다. */
            if (!new File(savePath).exists()) {
                try{
                    new File(savePath).mkdir();
                }
                catch(Exception e){
                    e.getStackTrace();
                }
            }
            String filePath = savePath + "\\" + filename;
            files.transferTo(new File(filePath));

            FileDto fileDto = new FileDto();
            fileDto.setOrigFilename(origFilename);
            fileDto.setFilename(filename);
            fileDto.setFilePath(filePath);

// fileId 주는 부분 오류 수정할 것
            Long fileId = fileService.saveFile(fileDto);
            boardDto.setFileId(fileId);
            boardService.savePost(boardDto);

        } catch(Exception e) {
            e.printStackTrace();
        }

        return "redirect:/center-information/notice_board";
    }

// 파일 다운로드
//    @GetMapping("/download/{fileId}")   // 다운로드
//    public ResponseEntity<Resource> fileDownload(@PathVariable("fileId") Long fileId) throws IOException {
//        FileDto fileDto = fileService.getFile(fileId);
//        Path path = Paths.get(fileDto.getFilePath());
//        Resource resource = new InputStreamResource(Files.newInputStream(path));
//        return ResponseEntity.ok()
//                .contentType(MediaType.parseMediaType("application/octet-stream"))
//                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDto.getOrigFilename() + "\"")
//                .body(resource);
//    }


}
