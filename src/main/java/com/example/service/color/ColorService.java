package com.example.service.color;

import com.example.model.Color;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ColorService implements IColorService{
    @Override
    public List<Color> findAll() {
        return null;
    }

    @Override
    public Optional<Color> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public void save(Color color) {

    }

    @Override
    public void deleteById(Long id) {

    }
}
