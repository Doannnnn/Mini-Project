package com.example.model;

import com.example.model.dto.reponse.CompanyResDTO;
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
@Table(name = "companys")
@Accessors(chain = true)
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    public CompanyResDTO toCompanyResDTO(){
        return new CompanyResDTO()
                .setId(id)
                .setName(name);
    }
}
