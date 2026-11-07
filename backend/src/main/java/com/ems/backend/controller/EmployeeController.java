package com.ems.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ems.backend.dto.EmployeeDto;
import com.ems.backend.service.EmployeeService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/employees")
@CrossOrigin("*")
public class EmployeeController {

    private EmployeeService employeeService;

    @GetMapping("/")
    public String verify() {
        return "working";
    }

    @PostMapping("/create")
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto) {
        EmployeeDto createdEmployee = employeeService.createEmployee(employeeDto);
        // return ResponseEntity.status(201).body(createdEmployee);
        // return new ResponseEntity<>(createdEmployee, HttpStatus.CREATED);
        return ResponseEntity.ok(createdEmployee);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable long id) {
        EmployeeDto employeeDto = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employeeDto);
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        List<EmployeeDto> employeeDtos = employeeService.getAllEmployeeDtos();
        return ResponseEntity.ok(employeeDtos);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable long id,
            @RequestBody EmployeeDto newEmployeeDto) {
        EmployeeDto updatedEmployee = employeeService.updateEmployee(id, newEmployeeDto);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable long id) {
        ResponseEntity<String> response = employeeService.deleteEmployee(id);
        return response;
    }

}
