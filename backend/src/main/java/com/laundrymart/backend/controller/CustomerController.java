package com.laundrymart.backend.controller;

import com.laundrymart.backend.entity.Order;
import com.laundrymart.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
@PreAuthorize("hasRole('CUSTOMER')")
public class CustomerController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/orders")
    public Order createOrder(@RequestBody Order order) {
        // Set customer from auth context
        return orderService.createOrder(order);
    }

    @GetMapping("/orders/{customerId}")
    public List<Order> getOrders(@PathVariable Long customerId) {
        return orderService.getOrdersByCustomer(customerId);
    }

    // Add track order, edit profile
}
