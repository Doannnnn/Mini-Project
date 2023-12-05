package com.example.api;

import com.example.model.CartDetail;
import com.example.model.dto.reponse.CartDetailResDTO;
import com.example.model.dto.request.CartDetailReqDTO;
import com.example.service.cartDetail.ICartDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart-detail")
public class CartDetailAPI {

    @Autowired
    private ICartDetailService cartDetailService;

    @GetMapping("/{fullName}")
    public ResponseEntity<?> findAllCartDetailByCustomer(@PathVariable String fullName) {
        List<CartDetailResDTO> cartDetailResDTOS = cartDetailService.findAllCartDetailByFullName(fullName);

        return new ResponseEntity<>(cartDetailResDTOS, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CartDetailReqDTO cartDetailReqDTO) {

        CartDetail cartDetail = cartDetailService.create(cartDetailReqDTO);

        CartDetailResDTO cartDetailResDTO = cartDetail.toCardDetailResDTO();

        return new ResponseEntity<>(cartDetailResDTO, HttpStatus.CREATED);
    }

    @PutMapping("/{cartDetailId}")
    public ResponseEntity<?> changeQuantity(@PathVariable Long cartDetailId, @RequestBody String newQuantity) {
        return new ResponseEntity<>(cartDetailService.changeQuantity(cartDetailId, Long.valueOf(newQuantity)).toCardDetailResDTO(), HttpStatus.OK);
    }

    @DeleteMapping("/{cartDetailId}")
    public ResponseEntity<?> deleted(@PathVariable Long cartDetailId) {
        Optional<CartDetail> existingCartDetail = cartDetailService.findById(cartDetailId);

        if (existingCartDetail.isPresent()) {
            cartDetailService.deleteById(cartDetailId);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>("CartDetail not found", HttpStatus.NOT_FOUND);
        }
    }
}
