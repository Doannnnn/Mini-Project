package com.example.service.OrderDetail;

import com.example.model.OrderDetail;
import com.example.repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderDetailService implements IOrderDetailService{

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Override
    public List<OrderDetail> findAll() {
        return null;
    }

    @Override
    public Optional<OrderDetail> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public void save(OrderDetail orderDetail) {

    }

    @Override
    public void deleteById(Long id) {

    }
}
