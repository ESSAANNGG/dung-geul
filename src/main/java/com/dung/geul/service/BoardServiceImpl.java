package com.dung.geul.service;


import com.dung.geul.dto.BoardDTO;
import com.dung.geul.entity.Board;
import com.dung.geul.entity.Board_file;
import com.dung.geul.repository.BoardFileRepository;
import com.dung.geul.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;


@Service
@Log4j2
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository; //final

    private final BoardFileRepository boardFileRepository; //final

    @Transactional
    @Override
    public Long register(BoardDTO boardDTO) {

        Map<String, Object> entityMap = dtoToEntity(boardDTO);
        Board board = (Board) entityMap.get("board");
        List<Board_file> BoardFileList = (List<Board_file>) entityMap.get("fileList");

        BoardRepository.save(board);

        BoardFileList.forEach(movieImage -> {
            BoardFileRepository.save(movieImage);
        });

        return board.getNum();
    }

//    @Override
//    public PageResultDTO<BoardDTO, Object[]> getList(PageRequestDTO requestDTO) {
//
//        Pageable pageable = requestDTO.getPageable(Sort.by("num").descending());
//
//        Page<Object[]> result = movieRepository.getListPage(pageable);
//
//        log.info("==============================================");
//        result.getContent().forEach(arr -> {
//            log.info(Arrays.toString(arr));
//        });
//
//
//        Function<Object[], MovieDTO> fn = (arr -> entitiesToDTO(
//                (Movie)arr[0] ,
//                (List<MovieImage>)(Arrays.asList((MovieImage)arr[1])),
//                (Double) arr[2],
//                (Long)arr[3])
//        );
//
//        return new PageResultDTO<>(result, fn);
//    }

//    @Override
//    public MovieDTO getMovie(Long mno) {
//
//        List<Object[]> result = movieRepository.getMovieWithAll(mno);
//
//        Movie movie = (Movie) result.get(0)[0];
//
//        List<MovieImage> movieImageList = new ArrayList<>();
//
//        result.forEach(arr -> {
//            MovieImage  movieImage = (MovieImage)arr[1];
//            movieImageList.add(movieImage);
//        });
//
//        Double avg = (Double) result.get(0)[2];
//        Long reviewCnt = (Long) result.get(0)[3];
//
//        return entitiesToDTO(movie, movieImageList, avg, reviewCnt);
//    }

}
