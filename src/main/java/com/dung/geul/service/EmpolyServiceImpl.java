package com.dung.geul.service;

import com.dung.geul.entity.Empoly;
import com.dung.geul.repository.EmpolyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpolyServiceImpl implements EmpolyService {

    @Autowired
    private EmpolyRepository empolyRepository;


    @Override
    public List<Empoly> EmpolyList(Empoly empoly) {
        return (List<Empoly>) empolyRepository.findAll();
    }
}
