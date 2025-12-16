package com.laundrymart.backend.service;

import com.laundrymart.backend.entity.Order;
import com.laundrymart.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public Order createOrder(Order order) {
        order.setCreatedAt(java.time.LocalDateTime.now());
        order.setStatus("PENDING");
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByCustomer(Long customerId) {
        return orderRepository.findByCustomerId(customerId);
    }

    // Add assignEmployee, assignRider, updateStatus methods
}
