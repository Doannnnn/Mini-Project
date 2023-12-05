package com.example.model;

import com.example.model.dto.reponse.ImageResDTO;
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
@Table(name = "images")
@Accessors(chain = true)
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;

    public ImageResDTO toImageResDTO(){
        return new ImageResDTO()
                .setId(id)
                .setUrl(url);
    }
}
