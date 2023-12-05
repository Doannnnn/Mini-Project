package com.example.model;

import com.example.model.dto.reponse.OrderDetailResDTO;
import jakarta.persistence.*;
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
@Entity
@Table(name = "orderdetails")
@Accessors(chain = true)
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long quantityProduct;

    private BigDecimal subtotal;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public OrderDetailResDTO toOrderDetailResDTO(){
        return new OrderDetailResDTO()
                .setId(id)
                .setQuantityProduct(quantityProduct)
                .setSubtotal(subtotal)
                .setProduct(product.toProductResDTO());
    }
}
