import axios from 'axios';

const API_URL = 'http://localhost:8080/api/employees';

export const listEmployees = () => axios.get(`${API_URL}/get/all`);

export const createEmployee = (employee) => axios.post(`${API_URL}/create`, employee);

export const getEmployeeById = (id) => axios.get(`${API_URL}/get/${id}`);

export const updateEmployee = (id, employee) => axios.put(`${API_URL}/update/${id}`, employee);

export const deleteEmployee = (id) => axios.delete(`${API_URL}/delete/${id}`);