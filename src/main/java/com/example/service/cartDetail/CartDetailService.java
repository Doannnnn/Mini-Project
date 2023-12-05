package com.example.service.cartDetail;

import com.example.model.Cart;
import com.example.model.CartDetail;
import com.example.model.Customer;
import com.example.model.Product;
import com.example.model.dto.reponse.CartDetailResDTO;
import com.example.model.dto.request.CartDetailReqDTO;
import com.example.repository.CartDetailRepository;
import com.example.repository.CartRepository;
import com.example.repository.CustomerRepository;
import com.example.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class CartDetailService implements ICartDetailService{

    @Autowired
    private CartDetailRepository cartDetailRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public List<CartDetail> findAll() {
        return null;
    }

    @Override
    public Optional<CartDetail> findById(Long id) {
        return cartDetailRepository.findById(id);
    }

    @Override
    public void save(CartDetail cartDetail) {

    }

    @Override
    public void deleteById(Long id) {
        cartDetailRepository.deleteById(id);
    }

    @Override
    public List<CartDetailResDTO> findAllCartDetailByFullName(String fullName) {
        Customer customer = customerRepository.findByFullName(fullName);
        Cart cart = cartRepository.findCartByCustomer_Id(customer.getId());

        List<CartDetail> cartDetails = cartDetailRepository.findByCart_Id(cart.getId());

        return cartDetails.stream().map(e ->
                new CartDetailResDTO(e.getId(), e.getQuantity(), e.getTotalAmount(), e.getProduct().toProductResDTO())).collect(Collectors.toList());
    }

    @Override
    public CartDetail create(CartDetailReqDTO cartDetailReqDTO) {
        Customer customer = customerRepository.findByFullName(cartDetailReqDTO.getFullName());
        Cart cart = cartRepository.findCartByCustomer_Id(customer.getId());
        Product product = productRepository.findById(Long.valueOf(cartDetailReqDTO.getProductId())).get();

        CartDetail existingCartDetail = cartDetailRepository.findByCart_IdAndProduct_Id(cart.getId(), product.getId());

        if (existingCartDetail != null) {
            Long newQuantity = existingCartDetail.getQuantity() + Long.valueOf(cartDetailReqDTO.getQuantity());
            BigDecimal newTotalAmount = product.getNewPrice().multiply(BigDecimal.valueOf(newQuantity));

            existingCartDetail.setQuantity(newQuantity);
            existingCartDetail.setTotalAmount(newTotalAmount);

            cartDetailRepository.save(existingCartDetail);
            return existingCartDetail;
        } else {
            BigDecimal price = product.getNewPrice();
            Long quantity = Long.valueOf(cartDetailReqDTO.getQuantity());
            BigDecimal totalAmount = price.multiply(BigDecimal.valueOf(quantity));

            CartDetail cartDetail = new CartDetail();
            cartDetail.setQuantity(quantity);
            cartDetail.setTotalAmount(totalAmount);
            cartDetail.setProduct(product);
            cartDetail.setCart(cart);

            cartDetailRepository.save(cartDetail);
            return cartDetail;
        }
    }

    @Override
    public CartDetail changeQuantity(Long id, Long newQuantity) {
        CartDetail cartDetail = cartDetailRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("CartDetail not found"));
        Product product = productRepository.findById(cartDetail.getProduct().getId()).orElseThrow(() -> new EntityNotFoundException("Product not found"));

        BigDecimal price = product.getNewPrice();
        BigDecimal newQuantityBigDecimal = new BigDecimal(newQuantity);
        BigDecimal newTotalAmount = price.multiply(newQuantityBigDecimal);
        cartDetail.setQuantity(newQuantity);
        cartDetail.setTotalAmount(newTotalAmount);
        cartDetail = cartDetailRepository.save(cartDetail);

        return cartDetail;
    }
}
