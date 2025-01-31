package com.example.employeemanagement.service;

import com.example.employeemanagement.model.Employee;
import com.example.employeemanagement.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Get all employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Search employees by name or id
    public List<Employee> searchEmployees(String name, Long id) {
        if (name != null && id != null) {
            return employeeRepository.findByNameAndId(name, id);
        } else if (name != null) {
            return employeeRepository.findByName(name);
        } else if (id != null) {
            return employeeRepository.findById(id).map(List::of).orElseGet(List::of);
        }
        return employeeRepository.findAll();
    }

    // Create a new employee
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Update an existing employee
    public Employee updateEmployee(Long id, Employee employee) {
        employee.setId(id);
        return employeeRepository.save(employee);
    }

    // Delete an employee by id
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    public Employee getEmployeeById(Long id) {
        Optional<Employee> employee = employeeRepository.findById(id); // Assuming you're using Spring Data JPA
        return employee.orElse(null); // Return null if employee is not found
    }

}
