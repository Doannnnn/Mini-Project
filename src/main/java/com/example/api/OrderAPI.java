package com.example.api;

import com.example.model.Order;
import com.example.model.dto.reponse.OrderResDTO;
import com.example.model.dto.request.OrderReqDTO;
import com.example.service.order.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderAPI {

    @Autowired
    private IOrderService orderService;

    @GetMapping("/{fullName}")
    public ResponseEntity<?> findAllBillByCustomer(@PathVariable String fullName) {
        List<OrderResDTO> orderResDTO = orderService.findAllOrderByCustomer(fullName);

        return new ResponseEntity<>(orderResDTO, HttpStatus.OK);
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<?> findById(@PathVariable Long orderId) {
        Order order = orderService.findById(orderId).get();
        OrderResDTO orderResDTO = order.toOrderResDTO();
        return new ResponseEntity<>(orderResDTO, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody OrderReqDTO orderReqDTO) {

        Order order = orderService.create(orderReqDTO);

        OrderResDTO orderResDTO = order.toOrderResDTO();

        return new ResponseEntity<>(orderResDTO, HttpStatus.CREATED);
    }
}
