package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/")
public class ProductController {

    @GetMapping("/product")
    public ModelAndView showProduct() {

        return new ModelAndView("/index");
    }

    @GetMapping("/cart")
    public ModelAndView showCart() {

        return new ModelAndView("/cart");
    }

    @GetMapping("/dashboard/order-list")
    public ModelAndView showOrderList() {

        return new ModelAndView("/dashboard/order-list");
    }

    @GetMapping("/dashboard/product-list")
    public ModelAndView showProductList() {

        return new ModelAndView("/dashboard/product-list");
    }
}
