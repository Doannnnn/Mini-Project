package com.example.service.product;

import com.example.model.Product;
import com.example.model.dto.reponse.ProductResDTO;
import com.example.service.IGeneralService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;

public interface IProductService extends IGeneralService<Product, Long> {

    List<ProductResDTO> findAllProductResDTO();

    Page<ProductResDTO> findByFilters(String selectedCategory, BigDecimal selectedPrice, String selectedColor, String selectedRecommended, String searchValue, Pageable pageable);
}
