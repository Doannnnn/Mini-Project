package com.example.service.cart;

import com.example.model.Cart;
import com.example.model.dto.reponse.CartResDTO;
import com.example.service.IGeneralService;

public interface ICartService extends IGeneralService<Cart, Long> {

    CartResDTO findCartByCustomer(String fullName);
}
