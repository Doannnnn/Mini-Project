package com.example.model.dto.reponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class ProductResDTO {

    private Long id;

    private String title;

    private BigDecimal oldPrice;

    private BigDecimal newPrice;

    private CompanyResDTO company;

    private ColorResDTO color;

    private CategoryResDTO category;

    private ImageResDTO image;
}
