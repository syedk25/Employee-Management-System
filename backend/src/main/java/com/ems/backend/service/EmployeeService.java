package com.ems.backend.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ems.backend.dto.EmployeeDto;
 

@Service 
public interface EmployeeService {
 EmployeeDto createEmployee(EmployeeDto employeeDto);
 EmployeeDto getEmployeeById(long id);
 List<EmployeeDto> getAllEmployeeDtos();
 EmployeeDto updateEmployee(long id, EmployeeDto employeeDto);
 ResponseEntity<String> deleteEmployee(long id);
}
