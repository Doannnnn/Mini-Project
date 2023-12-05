package com.example.service.company;

import com.example.model.Company;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CompanyService implements ICompanyService{
    @Override
    public List<Company> findAll() {
        return null;
    }

    @Override
    public Optional<Company> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public void save(Company company) {

    }

    @Override
    public void deleteById(Long id) {

    }
}
