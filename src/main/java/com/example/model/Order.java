package com.example.model;

import com.example.model.dto.reponse.OrderResDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "orders")
@Accessors(chain = true)
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal total;

    private String shipping;

    @Enumerated(EnumType.STRING)
    private EStatus status;

    @ManyToOne
    private Customer customer;

    private Date orderDate;

    @OneToMany(mappedBy = "order")
    private List<OrderDetail> orderDetails = new ArrayList<>();

    public OrderResDTO toOrderResDTO(){
        return new OrderResDTO()
                .setId(id)
                .setTotal(total)
                .setShipping(shipping)
                .setStatus(status)
                .setCustomer(customer.toCustomerResDTO())
                .setOrderDate(orderDate)
                .setOrderDetails(orderDetails.stream().map(OrderDetail::toOrderDetailResDTO).collect(Collectors.toList()));
    }
}
