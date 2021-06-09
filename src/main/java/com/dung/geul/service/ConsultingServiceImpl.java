package com.dung.geul.service;

import com.dung.geul.dto.ConsultingDTO;
import com.dung.geul.entity.Consulting;
import com.dung.geul.entity.Member;
import com.dung.geul.repository.ConsultingRepository;
import com.dung.geul.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class ConsultingServiceImpl implements ConsultingService {
    private final ConsultingRepository consultingRepository;

    private final MemberRepository memberRepository;

    @Transactional
    public void coapply(ConsultingDTO consultingDTO) {
        try {
            Member member = memberRepository.findById(consultingDTO.getUser_id()).get();

            log.info("지원자 : " +member);

            Optional<Consulting> conapply = consultingRepository.findByUser_id(member);

            log.info("-----------신청실행---------------");
            log.info(consultingDTO);
            Consulting consulting = dtoToEntity(consultingDTO);
            consultingRepository.save(consulting);

        } catch (Exception e){
            log.info("error12213123123" + e);
            return;
        }
    }
}
