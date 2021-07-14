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
//
//public interface BoardService {
//
//    Long register(notice_boardDTO noticeBoardDTO);
//
////    PageResultDTO<notice_boardDTO, Object[]> getList(PageRequestDTO requestDTO); //목록 처리
//
//    notice_boardDTO getBoard(Long num);
//
//    default notice_boardDTO entitiesToDTO(Board board, List<Board_file> Board_file, Double avg, Long reviewCnt){
//        notice_boardDTO boardDTO = notice_boardDTO.builder()
//                .num(board.getNum())
//                .title(board.getBoard_title())
//                .content(board.getContent())
//                .regDate(board.getRegDate())
//                .build();
//
//        List<BoardFileDTO> BoardList = Board_file.stream().map(movieImage -> {
//            return BoardFileDTO.builder().file_name(movieImage.getFile_name())
//                    .file_path(movieImage.getFile_path())
//                    .uuid(movieImage.getUuid())
//                    .build();
//        }).collect(Collectors.toList());
//
//        boardDTO.BoardDTOList(movieImageDTOList);
//
//
//        return boardDTO;
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
//            List<Board_file> boardImageList = boardFileDTOList.stream().map(boardImageDTO ->{
//
//                Board_file board_file = Board_file.builder()
//                        .file_path(board_file.getFile_path())
//                        .file_name(board_file.getFile_name())
//                        .uuid(boardImageDTO.getUuid())
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