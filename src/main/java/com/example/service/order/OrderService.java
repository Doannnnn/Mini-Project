package com.example.service.order;

import com.example.model.*;
import com.example.model.dto.reponse.OrderResDTO;
import com.example.model.dto.request.OrderReqDTO;
import com.example.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrderService implements IOrderService{

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartDetailRepository cartDetailRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Override
    public List<Order> findAll() {
        return null;
    }

    @Override
    public Optional<Order> findById(Long id) {
        return orderRepository.findById(id);
    }

    @Override
    public void save(Order order) {

    }

    @Override
    public void deleteById(Long id) {

    }

    @Override
    public Order create(OrderReqDTO orderReqDTO) {
        Customer customer = customerRepository.findByFullName(orderReqDTO.getFullName());
        Cart cart = cartRepository.findCartByCustomer_Id(customer.getId());
        List<CartDetail> cartDetails = cartDetailRepository.findByCart_Id(cart.getId());
        BigDecimal total = new BigDecimal(orderReqDTO.getTotal());
        String shipping = orderReqDTO.getShipping();

        Order order = new Order();
        order.setTotal(total);
        order.setShipping(shipping);
        order.setStatus(EStatus.valueOf("Pending"));
        order.setCustomer(customer);
        order.setOrderDate(Date.valueOf(LocalDate.now()));
        orderRepository.save(order);

        for (CartDetail cartDetail : cartDetails) {
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setQuantityProduct(cartDetail.getQuantity());
            orderDetail.setSubtotal(cartDetail.getTotalAmount());
            orderDetail.setOrder(order);
            orderDetail.setProduct(cartDetail.getProduct());

            orderDetailRepository.save(orderDetail);

            order.getOrderDetails().add(orderDetail);
        }

        cartDetailRepository.deleteAllByCart_Id(cart.getId());

        return order;
    }

    @Override
    public List<OrderResDTO> findAllOrderByCustomer(String fullName) {
        Customer customer = customerRepository.findByFullName(fullName);

        if (customer != null) {
            List<Order> orders = orderRepository.findAllByCustomer_Id(customer.getId());

            return orders.stream().map(e ->
                    new OrderResDTO(e.getId(), e.getTotal(), e.getShipping(), e.getStatus(), e.getCustomer().toCustomerResDTO(), e.getOrderDate(), e.getOrderDetails().stream().map(OrderDetail::toOrderDetailResDTO).collect(Collectors.toList()))
            ).collect(Collectors.toList());
        } else {
            return null;
        }
    }
}
