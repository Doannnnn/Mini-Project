package com.example.model;

import com.example.model.dto.reponse.ProductResDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.math.BigDecimal;
import java.util.stream.Collectors;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "products")
@Accessors(chain = true)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private BigDecimal oldPrice;

    private BigDecimal newPrice;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    @ManyToOne
    @JoinColumn(name = "color_id")
    private Color color;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "image_id")
    private Image image;

    public ProductResDTO toProductResDTO(){
        return new ProductResDTO()
                .setId(id)
                .setTitle(title)
                .setOldPrice(oldPrice)
                .setNewPrice(newPrice)
                .setCompany(company.toCompanyResDTO())
                .setColor(color.toColorResDTO())
                .setCategory(category.toCategoryResDTO())
                .setImage(image.toImageResDTO());
    }
}
