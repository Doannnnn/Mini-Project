package com.example.api;

import com.example.model.dto.reponse.ProductResDTO;
import com.example.service.product.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductAPI {

    @Autowired
    private IProductService productService;

    @GetMapping
    public ResponseEntity<?> findAllProductResDTO(){
        List<ProductResDTO> productResDTOS = productService.findAllProductResDTO();

        return new ResponseEntity<>(productResDTOS, HttpStatus.OK);
    }

    @GetMapping("/filtered")
    public ResponseEntity<Page<ProductResDTO>> findFilteredProducts(
            @RequestParam(name = "category", required = false) String selectedCategory,
            @RequestParam(name = "price", required = false) String selectedPrice,
            @RequestParam(name = "color", required = false) String selectedColor,
            @RequestParam(name = "recommended", required = false) String selectedRecommended,
            @RequestParam(name = "search", required = false) String searchValue,
            Pageable pageable) {

        Page<ProductResDTO> resultPage = productService.findByFilters(
                selectedCategory, new BigDecimal(selectedPrice), selectedColor,
                selectedRecommended, searchValue, pageable);

        return new ResponseEntity<>(resultPage, HttpStatus.OK);
    }
}
