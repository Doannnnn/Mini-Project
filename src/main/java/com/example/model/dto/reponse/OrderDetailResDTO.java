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
public class OrderDetailResDTO {

    private Long id;

    private Long quantityProduct;

    private BigDecimal subtotal;

    private OrderResDTO order;

    private ProductResDTO product;
}
