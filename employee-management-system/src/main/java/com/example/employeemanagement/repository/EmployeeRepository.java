package com.example.employeemanagement.repository;

import com.example.employeemanagement.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    
    // Custom query to find employees by name
    List<Employee> findByName(String name);

    // Custom query to find employees by ID
    Optional<Employee> findById(Long id);

    // Custom query to find employees by both name and ID
    List<Employee> findByNameAndId(String name, Long id);
}
