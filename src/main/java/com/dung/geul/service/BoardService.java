//package com.dung.geul.service;
//
//import com.dung.geul.dto.*;
//import com.dung.geul.entity.Board;
//import com.dung.geul.entity.Board_file;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//
//public interface BoardService {
//
//    Long register(notice_boardDTO noticeBoardDTO);
//
////    PageResultDTO<notice_boardDTO, Object[]> getList(PageRequestDTO requestDTO); //목록 처리
//
//    notice_boardDTO get(Long num);
//
//    default notice_boardDTO entitiesToDTO(Board board, List<Board_file> Board_file, Double avg, Long reviewCnt){
//        notice_boardDTO movieDTO = notice_boardDTO.builder()
//                .num(board.getNum())
//                .title(board.getBoard_title())
//                .content(board.getContent())
////                .regDate(movie.getRegDate())
////                .modDate(movie.getModDate())
//                .build();
//
//        List<BoardFileDTO> BoardFileDTOList = BoardFileDTO.stream().map(BoardFileDTO -> {
//            return BoardFileDTO.builder().file_name(BoardFileDTO.getfile_name())
//                    .file_path(BoardFileDTO.getFile_path())
//                    .uuid(BoardFileDTO.getUuid())
//                    .build();
//        }).collect(Collectors.toList());
//
//        movieDTO.setBoardFileDTOList(boardFileDTOList);
//
//
//
//        return movieDTO;
//
//    }
//
//    default Map<String, Object> dtoToEntity(BoardDTO boardDTO){
//
//        Map<String, Object> entityMap = new HashMap<>();
//
//        Board board = Board.builder()
//                .num(BoardDTO.getNum())
//                .title(BoardDTO.getTitle())
//                .build();
//
//        entityMap.put("board", board);
//
//        List<BoardFileDTO> boardFileDTOList = boardDTO.getBoardFileDTOList();
//
//        if(boardFileDTOList != null && boardFileDTOList.size() > 0 ) { // boardFileDTO 처리
//
//            List<Board_file> movieImageList = boardFileDTOList.stream().map(movieImageDTO ->{
//
//                Board_file board_file = Board_file.builder()
//                        .file_path(BoardFileDTO.getFile_path())
//                        .file_name(movieImageDTO.getFile_name())
//                        .uuid(movieImageDTO.getUuid())
//                        .board(board)
//                        .build();
//                return board_file;
//            }).collect(Collectors.toList());
//
//            entityMap.put("board_file", Board_fileList);
//        }
//
//        return entityMap;
//    }
//
//}