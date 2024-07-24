// components/TaskCard.js

import React from 'react';
import { useDrag } from 'react-dnd';
import '../styles/TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete, onViewDetails }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { id: task._id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div ref={drag} className="task-card" style={{ opacity: isDragging ? 0.5 : 1 }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className='buttons'>
                <button style={{ backgroundColor: "red" }} onClick={() => onDelete(task._id)}>Delete</button>
                <button style={{ backgroundColor: "skyblue" }} onClick={() => onEdit(task)}>Edit</button>
                <button style={{ backgroundColor: "blue" }} onClick={() => onViewDetails(task)}>View Details</button>


            </div>
        </div>
    );
};

export default TaskCard;
