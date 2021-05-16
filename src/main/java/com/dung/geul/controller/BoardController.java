package com.dung.geul.controller;

import com.dung.geul.dto.BoardDto;
import com.dung.geul.dto.FileDto;
import com.dung.geul.service.BoardService;
import com.dung.geul.service.FileService;
import com.dung.geul.util.MD5Generator;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

// controller는 사용자의 HTTP 요청이 진입하는 지점, 사용자에게 서버에서 처리된 테이터를 View와 함께 응답하게 해준다.

@Controller
public class BoardController {
    private BoardService boardService;
    private FileService fileService;

    public BoardController(BoardService boardService, FileService fileService) {
        this.boardService = boardService;
        this.fileService = fileService;
    }

//    // BoardService의 getBoardList()를 통해 가져온 데이터를 Model을 통해 View에 전달해준다.
////    @GetMapping("/")
////    public String list(Model model) {
////        List<BoardDto> boardDtoList = boardService.getBoardList();
////        model.addAttribute("postList", boardDtoList);   // boardDtoList를 board/list.html에 PostList로 전달해준다.
////        return "board/list.html";
////    }
//
    @GetMapping("/post")    // 게시글 작성
    public String post() {
        return "redirect:/center-information//notice_board_register";
    }

    @PostMapping("/post")   // 파일 업로드
    public String write(@RequestParam("file") MultipartFile files, BoardDto boardDto) {
        try {
            String origFilename = files.getOriginalFilename();
            String filename = new MD5Generator(origFilename).toString();

            // 실행되는 위치의 'files' 폴더에 파일이 저장됩니다.
            String savePath = System.getProperty("user.dir") + "\\files";

            // 파일이 저장되는 폴더가 없으면 폴더를 생성합니다.
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

            Long fileId = fileService.saveFile(fileDto);
            boardDto.setFileId(fileId);
            boardService.savePost(boardDto);

            System.out.println("======================================");
            System.out.println("파일 업로드 성공!");
            System.out.println("======================================");

        } catch(Exception e) {
            System.out.println("======================================");
            System.out.println("오류 발생");
            System.out.println("======================================");

            e.printStackTrace();
        }
        
        return "redirect:/center-information/notice_board";
    }
//
//    // /post/{id}로 Get 요청을 한다. 만약 1번 글을 클릭 시 /post/1으로 접속된다.
//    @GetMapping("/post/{id}")   // 상세 페이지
//    public String detail(@PathVariable("id") Long id, Model model) {    // 요청 받았을 시 해당 id의 데이터가 View로 전달되도록 한다.
//        BoardDto boardDto = boardService.getPost(id);
//        model.addAttribute("post", boardDto);
//        return "board/detail.html";
//    }
//
//    @GetMapping("/post/edit/{id}")  // 수정
//    public String edit(@PathVariable("id") Long id, Model model) {
//        BoardDto boardDto = boardService.getPost(id);
//        model.addAttribute("post", boardDto);
//        return "board/edit.html";
//    }
//
//    // detail.html에서 수정 버튼을 눌러 요청 받았을 시 Put형식으로 /post/edit/{id}로 서버에 요청
//    // 서버에 Put요청이 오면 DB에 변경된 데이터를 저장
//    @PutMapping("/post/edit/{id}")
//    public String update(BoardDto boardDto) {
//        boardService.savePost(boardDto);
//        return "redirect:/";
//    }
//
//    @DeleteMapping("/post/{id}")    // 삭제
//    public String delete(@PathVariable("id") Long id) {
//        boardService.deletePost(id);
//        return "redirect:/";
//    }
//
//
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
