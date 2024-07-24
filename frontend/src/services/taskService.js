import axios from 'axios';

const API_URL = 'http://localhost:3200/task';



export const getTasks = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const addTask = async (taskData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/add`, taskData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const updateTask = async (taskData) => {
    const token = localStorage.getItem('token');
    console.log(taskData);
    const response = await axios.put(`${API_URL}/update`, taskData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const deleteTask = async (taskId) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/delete`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { id: taskId },
    });
    return response.data;
};
