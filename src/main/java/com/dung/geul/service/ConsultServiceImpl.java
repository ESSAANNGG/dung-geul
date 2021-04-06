package com.dung.geul.service;

import com.dung.geul.dto.ConsultDTO;
import com.dung.geul.entity.Consult;
import com.dung.geul.repository.ConsultRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Log4j2
public class ConsultServiceImpl implements ConsultService{
    private final ConsultRepository consultRepository;

    @Override
    public Long register(ConsultDTO consultDTO) {
        log.info(consultDTO);
        Consult consult = dtoToEntity(consultDTO);
        consultRepository.save(consult);
        return consultDTO.getCno();
    }
}
