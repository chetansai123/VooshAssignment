import axios from 'axios';

const API_URL = 'http://localhost:3200/user';

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response?.data?.message || 'Login Failed!');
    }
};

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Registration Failed!');
    }
};
