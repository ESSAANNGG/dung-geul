package com.dung.geul.service;

import com.dung.geul.dto.ConsultingDTO;
import com.dung.geul.entity.Consult;
import com.dung.geul.entity.Consulting;
import com.dung.geul.repository.ConsultingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Service
@Log4j2
@RequiredArgsConstructor
public class ConsultingServiceImpl implements ConsultingService {
    private final ConsultingRepository consultingRepository;

    @Override
    public Long register(ConsultingDTO consultingDTO) {
        Consulting consulting = dtoToEntity(consultingDTO);
        consultingRepository.save(consulting);
        return consulting.getConsult_num();
    }

    @Override
    public void remove(Long consult_num) {
        consultingRepository.deleteById(consult_num);
    }
}
