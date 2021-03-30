package com.dung.geul.service;

import com.dung.geul.dto.CvPageDTO;
import com.dung.geul.entity.CV;
import com.dung.geul.entity.Member;
import com.dung.geul.repository.CvRepository;
import com.dung.geul.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
public class CvService {

    @Autowired
    private CvRepository cvRepository;

    @Autowired
    private MemberRepository memberRepository;

    // 이력서 등록
    public void register(CvPageDTO cvPageDTO){

        CV cv = dtoToEntity(cvPageDTO);

        cvRepository.save(cv);

    }

    public void modify(CvPageDTO cvPageDTO){

        CV cv = cvRepository.getOne(cvPageDTO.getCv_id());

        if(cv != null){
            // 수정할 사항들

            cvRepository.save(cv);
        }

    }

    public void delete(Long cv_id){

        System.out.println("cv_id : " + cv_id);

        cvRepository.deleteById(cv_id);

    }

    public CV dtoToEntity(CvPageDTO dto){

        // 이력서 주인 찾기
        Optional<Member> member = memberRepository.findById(dto.getUser_id());

        CV cv = CV.builder()
                .user_id(member.get())
                .user_name(dto.getUser_name())
                .birth(dto.getBirth())
                .user_hp(dto.getUser_hp())
                .user_email(dto.getUser_email())
                .build();

        //cv.setAge(cv.getAge());

        return cv;
    }
}
