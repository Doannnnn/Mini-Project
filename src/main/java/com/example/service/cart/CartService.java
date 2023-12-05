package com.example.service.cart;

import com.example.model.Cart;
import com.example.model.Customer;
import com.example.model.dto.reponse.CartResDTO;
import com.example.repository.CartRepository;
import com.example.repository.CustomerRepository;
import com.example.service.customer.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartService implements ICartService{

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public List<Cart> findAll() {
        return null;
    }

    @Override
    public Optional<Cart> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public void save(Cart cart) {

    }

    @Override
    public void deleteById(Long id) {

    }

    @Override
    public CartResDTO findCartByCustomer(String fullName) {
        Customer customer = customerRepository.findByFullName(fullName);
        Cart cart = cartRepository.findCartByCustomer_Id(customer.getId());

        return cart.toCartResDTO();
    }
}
