import axios from 'axios';

const API_URL = 'http://localhost:8080/api/employees';

export const listEmployees = () => axios.get(`${API_URL}/get/all`);

export const createEmployee = (employee) => axios.post(`${API_URL}/create`, employee);