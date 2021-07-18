package com.dung.geul.controller;

import com.dung.geul.dto.UploadResultDTO;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@Log4j2
public class UploadController {

    @Value("${com.dung.upload.path}")
    private String uploadPath;

    @PostMapping("/uploadAjax") // 업로드 ajax 처리
    public Object uploadFile(MultipartFile[] uploadFiles){

        List<UploadResultDTO> resultDTOList = new ArrayList<>();

        for (MultipartFile uploadFile: uploadFiles) {

//            // 업로드한 파일이 이미지 파일인지 검사한다. => 업로드 공격 방어
//            if(uploadFile.getContentType().startsWith("image") == false) {
//                log.warn("this file is not image type");
//                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
//            }

            //실제 파일 이름 IE나 Edge는 전체 경로가 들어오므로
            String originalName = uploadFile.getOriginalFilename();
            String fileName = originalName.substring(originalName.lastIndexOf("\\") + 1);

            log.info("fileName: " + fileName);
            //날짜 폴더 생성
            String folderPath = makeFolder();

            //UUID
            String uuid = UUID.randomUUID().toString();

            //저장할 파일 이름 중간에 "_"를 이용해서 구분
            String saveName = uploadPath + File.separator + folderPath + File.separator + uuid +"_" + fileName;
            Path savePath = Paths.get(saveName);

            // 섬네일 이미지 생성과 화면 처리 - 채용공고
            try {
                //원본 파일 저장
                uploadFile.transferTo(savePath);

                log.info("===========================================================================================");
                log.info("파일 경로: " + savePath);
                log.info("===========================================================================================");

                return savePath;

            } catch (IOException e) {
                e.printStackTrace();
            }

        }//end for
        return new ResponseEntity<>(resultDTOList, HttpStatus.OK);
    }

    // 폴더 생성 (날짜로)
    private String makeFolder() {

        String str = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));

        String folderPath =  str.replace("//", File.separator);

        // make folder
        File uploadPathFolder = new File(uploadPath, folderPath);

        if (uploadPathFolder.exists() == false) {   // 업로드 할 파일의 폴더가 없을 시 새로 생성한다.
            uploadPathFolder.mkdirs();
        }
        return folderPath;
    }

    @GetMapping("/display")
    public ResponseEntity<byte[]> getFile(String fileName) {

        ResponseEntity<byte[]> result = null;

        try {
            String srcFileName =  URLDecoder.decode(fileName,"UTF-8");

            log.info("fileName: " + srcFileName);

            File file = new File(uploadPath +File.separator+ srcFileName);

            log.info("file: " + file);

            HttpHeaders header = new HttpHeaders();

            //MIME타입 처리
            header.add("Content-Type", Files.probeContentType(file.toPath()));
            //파일 데이터 처리
            result = new ResponseEntity<>(FileCopyUtils.copyToByteArray(file), header, HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return result;
    }

    // 파라미터로 fileName 전송 - 경로와 파일이름을 결합한 문자열
    @PostMapping("/removeFile") // 업로드 파일 삭제
    public ResponseEntity<Boolean> removeFile(String fileName){

        String srcFileName = null;
        try {
            srcFileName = URLDecoder.decode(fileName,"UTF-8");
            File file = new File(uploadPath +File.separator+ srcFileName);
            boolean result = file.delete();

            File thumbnail = new File(file.getParent(), "s_" + file.getName());

            result = thumbnail.delete();

            return new ResponseEntity<>(result, HttpStatus.OK);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    // JSON데이터에 업로드 결과가 전송되면 화면에서는 <img>태그를 구성하고 해당 이미지를 보여주도록 처리한다.
    // 이미지 데이터를 전송하는 기능을 구현
//    @GetMapping("/display") // 업로드 이미지 처리
//    public ResponseEntity<byte[]> getFile(String fileName, String size) {
//
//        ResponseEntity<byte[]> result = null;
//
//        try {
//            String srcFileName =  URLDecoder.decode(fileName,"UTF-8");
//
//            log.info("fileName: " + srcFileName);
//
//            File file = new File(uploadPath +File.separator+ srcFileName);
//
//            if(size != null && size.equals("1")){
//                file  = new File(file.getParent(), file.getName().substring(2));
//            }
//
//            log.info("file: " + file);
//
//            HttpHeaders header = new HttpHeaders();
//
//            //MIME타입 처리
//            header.add("Content-Type", Files.probeContentType(file.toPath()));
//            //파일 데이터 처리
//            result = new ResponseEntity<>(FileCopyUtils.copyToByteArray(file), header, HttpStatus.OK);
//        } catch (Exception e) {
//            log.error(e.getMessage());
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//        return result;
//    }

// File download --------------------------------------------------------------------------------------------------
// https://www.callicoder.com/spring-boot-file-upload-download-rest-api-example/

//    @GetMapping("/download/{board_file}")   // Download
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