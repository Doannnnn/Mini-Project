package com.example.model;

import com.example.model.dto.reponse.ColorResDTO;
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
@Table(name = "colors")
@Accessors(chain = true)
public class Color {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    public ColorResDTO toColorResDTO(){
        return new ColorResDTO()
                .setId(id)
                .setName(name);
    }
}
