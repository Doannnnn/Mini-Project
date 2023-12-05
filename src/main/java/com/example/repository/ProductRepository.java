package com.example.repository;

import com.example.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p " +
            "WHERE (:selectedCategory IS NULL OR :selectedCategory = 'all' OR LOWER(p.category.name) = LOWER(:selectedCategory)) " +
            "AND (:selectedPrice IS NULL OR :selectedPrice = 0.0 OR :selectedPrice = p.newPrice) " +
            "AND (:selectedColor IS NULL OR :selectedColor = 'all' OR LOWER(p.color.name) = LOWER(:selectedColor)) " +
            "AND (:selectedRecommended IS NULL OR :selectedRecommended = 'all products' OR LOWER(p.company.name) = LOWER(:selectedRecommended)) " +
            "AND (:searchValue IS NULL OR LOWER(p.title) LIKE LOWER(CONCAT('%', :searchValue, '%')))")
    Page<Product> findByFilters(
            @Param("selectedCategory") String selectedCategory,
            @Param("selectedPrice") BigDecimal selectedPrice,
            @Param("selectedColor") String selectedColor,
            @Param("selectedRecommended") String selectedRecommended,
            @Param("searchValue") String searchValue,
            Pageable pageable
    );

}
