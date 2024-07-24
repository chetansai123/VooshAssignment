import React from 'react';
import TaskCard from './TaskCard';
import { useDrop } from 'react-dnd';

const TaskList = ({ tasks, onEdit, onDelete, onViewDetails, onDrop }) => {
    const [, drop] = useDrop({
        accept: 'TASK',
        drop: (item) => onDrop(item.id),
    });

    return (
        <div className="task-list" ref={drop}>
            {tasks.map((task) => (
                <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onViewDetails={onViewDetails}
                />
            ))}
        </div>
    );
};

export default TaskList;
