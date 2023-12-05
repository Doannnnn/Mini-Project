package com.example.model;

import com.example.model.dto.reponse.CartResDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "carts")
@Accessors(chain = true)
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "customer_id", unique = true)
    private Customer customer;

    public CartResDTO toCartResDTO(){
        return new CartResDTO()
                .setId(id)
                .setCustomer(customer.toCustomerResDTO());
    }

}
