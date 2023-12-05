package com.example.service.cartDetail;

import com.example.model.CartDetail;
import com.example.model.dto.reponse.CartDetailResDTO;
import com.example.model.dto.request.CartDetailReqDTO;
import com.example.service.IGeneralService;

import java.util.List;

public interface ICartDetailService extends IGeneralService<CartDetail, Long> {

    List<CartDetailResDTO> findAllCartDetailByFullName(String fullName);

    CartDetail create(CartDetailReqDTO cartDetailReqDTO);

    CartDetail changeQuantity(Long id, Long newQuantity);
}
