package com.laundrymart.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "orders")  // Optional: good practice to name it "orders"
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    private String details;  // e.g., "2 shirts, 1 pant"

    private String status;  // PENDING, ASSIGNED, IN_PROGRESS, COMPLETED

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private User employee;  // Assigned worker (nullable = can be unassigned)

    @ManyToOne
    @JoinColumn(name = "rider_id")
    private User rider;     // Assigned rider (nullable = can be unassigned)

    private LocalDateTime createdAt;
}