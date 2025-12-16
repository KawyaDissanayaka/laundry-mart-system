package com.laundrymart.backend.controller;

import com.laundrymart.backend.entity.User;
import com.laundrymart.backend.entity.Order;
import com.laundrymart.backend.service.UserService;
import com.laundrymart.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    @Autowired
    private UserService userService;
    @Autowired
    private OrderService orderService;

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/employees")
    public User addEmployee(@RequestBody User employee) {
        employee.setRole("EMPLOYEE");
        return userService.saveUser(employee);
    }

    // Similar for riders, orders management, assign tasks
}
