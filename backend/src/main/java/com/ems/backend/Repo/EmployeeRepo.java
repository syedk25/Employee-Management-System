package com.ems.backend.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ems.backend.entity.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {
 
}
