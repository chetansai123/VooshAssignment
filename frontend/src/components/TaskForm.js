import React, { useState, useEffect } from 'react';
import '../styles/TaskForm.css';

const TaskForm = ({ onSave, initialData, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('To Do');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
            setStatus(initialData.status);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...initialData, title, description, status });
        setTitle('');
        setDescription('');
    };

    return (
        <div className='task-form-container'>
            <form className="task-form" onSubmit={handleSubmit}>
                <h2 style={{ textAlign: "center" }}>
                    <span>{initialData ? 'Edit Task' : 'Add Task'}</span>
                </h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
                <div className="task-form-buttons">
                    <button type="submit">Save Task</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
