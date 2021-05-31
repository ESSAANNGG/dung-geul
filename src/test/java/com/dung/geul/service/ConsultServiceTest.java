package com.dung.geul.service;

import com.dung.geul.dto.ConsultDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.Consult;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ConsultServiceTest {
    @Autowired
    private ConsultService consultService;

    @Test
    public void testRegister(){
        for(int i =0; i<10; i++) {
            ConsultDTO consultDTO = ConsultDTO.builder()
                    .Consult_field("진로" + i)
                    .Consult_detail_field("상담1234" + i)
                    .build();
            Long cno = consultService.register(consultDTO);
        }
    }

    @Test
    public void testList() {
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder().page(1).size(10).build();

        PageResultDTO<ConsultDTO,Consult> resultDTO = consultService.getList(pageRequestDTO);
        for (ConsultDTO consultDTO : resultDTO.getDtoList()) {
            System.out.println(consultDTO);
        }
    }

    @Test
    public void testGet(){
        Long cno = 3L;
        ConsultDTO consultDTO = consultService.read(cno);
        System.out.println(consultDTO);
    }

    @Test
    public void testdelete(){
        Long cno = 1L;

        consultService.remove(cno);
    }
}
