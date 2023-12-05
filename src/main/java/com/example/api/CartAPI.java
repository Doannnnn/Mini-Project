package com.example.api;

import com.example.model.dto.reponse.CartResDTO;
import com.example.service.cart.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cart")
public class CartAPI {

    @Autowired
    private ICartService cartService;

    @GetMapping("/{fullName}")
    public ResponseEntity<?> findCartByCustomer(@PathVariable String fullName) {
        CartResDTO cartResDTO = cartService.findCartByCustomer(fullName);

        return new ResponseEntity<>(cartResDTO, HttpStatus.OK);
    }
}
