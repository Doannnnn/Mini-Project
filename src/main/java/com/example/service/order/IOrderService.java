package com.example.service.order;

import com.example.model.Order;
import com.example.model.dto.reponse.OrderResDTO;
import com.example.model.dto.request.OrderReqDTO;
import com.example.service.IGeneralService;

import java.util.List;

public interface IOrderService extends IGeneralService<Order, Long> {

    Order create(OrderReqDTO orderReqDTO);

    List<OrderResDTO> findAllOrderByCustomer(String fullName);
}
