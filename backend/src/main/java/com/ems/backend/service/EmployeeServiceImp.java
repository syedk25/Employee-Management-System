package com.ems.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ems.backend.Repo.EmployeeRepo;
import com.ems.backend.dto.EmployeeDto;
import com.ems.backend.entity.Employee;
import com.ems.backend.exception.ResourceNotFoundException;
import com.ems.backend.mapper.EmployeeMapper;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmployeeServiceImp implements EmployeeService {

        private EmployeeRepo employeeRepo;

        @Override
        public EmployeeDto createEmployee(EmployeeDto employeeDto) {

                Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
                Employee createEmployee = employeeRepo.save(employee);
                return EmployeeMapper.mapToEmployeeDto(createEmployee);

        }

        @Override
        public EmployeeDto getEmployeeById(long id) {
                Employee employee = employeeRepo.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
                return EmployeeMapper.mapToEmployeeDto(employee);
        }

        @Override
        public List<EmployeeDto> getAllEmployeeDtos() {
                List<Employee> employees = employeeRepo.findAll();
                return employees.stream()
                                .map((employee) -> EmployeeMapper.mapToEmployeeDto(employee))
                                .collect(Collectors.toList());
        }

        @Override
        public EmployeeDto updateEmployee(long id, EmployeeDto employeeDto) {
                Employee employee = employeeRepo.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

                if (employeeDto.getFirstName() != null) {
                        employee.setFirstName(employeeDto.getFirstName());
                }
                if (employeeDto.getLastName() != null) {
                        employee.setLastName(employeeDto.getLastName());
                }
                if (employeeDto.getEmail() != null) {
                        employee.setEmail(employeeDto.getEmail());
                }

                Employee updatedEmployee = employeeRepo.save(employee);
                return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
        }

        @Override
        public ResponseEntity<String> deleteEmployee(long id) {
                Employee employee = employeeRepo.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
                employeeRepo.delete(employee);
                return ResponseEntity.ok("Employee deleted successfully");
        }

}