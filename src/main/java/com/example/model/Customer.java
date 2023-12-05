package com.example.model;

import com.example.model.dto.reponse.CustomerResDTO;
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
@Table(name = "customers")
@Accessors(chain = true)
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String address;

    @Column(unique = true)
    private String phone;

    public CustomerResDTO toCustomerResDTO(){
        return new CustomerResDTO()
                .setId(id)
                .setFullName(fullName)
                .setEmail(email)
                .setAddress(address)
                .setPhone(phone);
    }
}
