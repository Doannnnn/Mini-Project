package com.example.service.product;

import com.example.model.Product;
import com.example.model.dto.reponse.ProductResDTO;
import com.example.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductService implements IProductService{

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> findAll() {
        return null;
    }

    @Override
    public List<ProductResDTO> findAllProductResDTO() {
        return productRepository.findAll().stream().map(e ->
                new ProductResDTO(e.getId(), e.getTitle(), e.getOldPrice(), e.getNewPrice(),
                        e.getCompany().toCompanyResDTO(), e.getColor().toColorResDTO(), e.getCategory().toCategoryResDTO(),
                        e.getImage().toImageResDTO())).collect(Collectors.toList());
    }

    @Override
    public Page<ProductResDTO> findByFilters(String selectedCategory, BigDecimal selectedPrice, String selectedColor, String selectedRecommended, String searchValue, Pageable pageable) {
        Page<Product> resultPage = productRepository.findByFilters(
                selectedCategory, selectedPrice, selectedColor,
                selectedRecommended, searchValue, pageable);

        return resultPage.map(e -> new ProductResDTO(
                e.getId(), e.getTitle(), e.getOldPrice(), e.getNewPrice(),
                e.getCompany().toCompanyResDTO(), e.getColor().toColorResDTO(),
                e.getCategory().toCategoryResDTO(), e.getImage().toImageResDTO()
        ));
    }

    @Override
    public Optional<Product> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public void save(Product product) {

    }

    @Override
    public void deleteById(Long id) {

    }
}
