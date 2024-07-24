import React, { useState, useEffect } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from '../services/taskService';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Modal from '../components/Modal';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '../styles/TaskBoardPage.css';

const TaskBoardPage = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [visitingTask, setVisitingTask] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('Recent');
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            const fetchedTasks = await getTasks();
            setTasks(fetchedTasks);
        };
        fetchTasks();
    }, []);

    const handleAddTask = async (taskData) => {
        const newTask = await addTask(taskData);
        setTasks([...tasks, newTask]);
        setIsAddingTask(false);
    };

    const handleEditTask = async (taskData) => {
        const updatedTask = await updateTask(taskData);
        setTasks(tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
        setSelectedTask(null);
    };

    const handleDeleteTask = async (taskId) => {
        await deleteTask(taskId);
        setTasks(tasks.filter(task => task._id !== taskId));
    };

    const handleDrop = async (taskId, newStatus) => {
        const task = tasks.find(task => task._id === taskId);
        if (task) {
            const updatedTask = await updateTask({ ...task, status: newStatus });
            setTasks(tasks.map(t => (t._id === taskId ? updatedTask : t)));
        }
    };

    const handleViewDetails = (task) => {
        setVisitingTask(task);
        setIsModalOpen(true);
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortTasks = (tasksToSort) => {
        return tasksToSort.sort((a, b) => {
            if (sortBy === 'Recent') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else {
                return new Date(a.createdAt) - new Date(b.createdAt);
            }
        });
    };

    const sortedToDoTasks = sortTasks(filteredTasks.filter(task => task.status === 'To Do'));
    const sortedInProgressTasks = sortTasks(filteredTasks.filter(task => task.status === 'In Progress'));
    const sortedDoneTasks = sortTasks(filteredTasks.filter(task => task.status === 'Done'));

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="task-board">
                <div className="task-controls">
                    <button className="add-task-btn" onClick={() => setIsAddingTask(true)}>Add Task</button>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="Recent">Recent</option>
                        <option value="Oldest">Oldest</option>
                    </select>
                </div>
                {isAddingTask && (
                    <TaskForm onSave={handleAddTask} onCancel={() => setIsAddingTask(false)} />
                )}
                {selectedTask && !isModalOpen && (
                    <TaskForm onSave={handleEditTask} initialData={selectedTask} onCancel={() => setSelectedTask(null)} />
                )}
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="modal-overlay">
                    <h1>
                        <span onClick={() => setIsModalOpen(false)}
                            style={{ cursor: "pointer" }}
                        >X</span></h1>
                    <h2>Task Details</h2>
                    <h2>Title: {visitingTask?.title}</h2>
                    <p>Description: {visitingTask?.description}</p>
                    <p>Status: {visitingTask?.status}</p>
                </Modal>
                <div className="task-columns">
                    <div className="column">
                        <div className="column-header">To Do</div>
                        <TaskList
                            tasks={sortedToDoTasks}
                            onEdit={setSelectedTask}
                            onDelete={handleDeleteTask}
                            onViewDetails={handleViewDetails}
                            onDrop={(taskId) => handleDrop(taskId, 'To Do')}
                        />
                    </div>
                    <div className="column">
                        <div className="column-header">In Progress</div>
                        <TaskList
                            tasks={sortedInProgressTasks}
                            onEdit={setSelectedTask}
                            onDelete={handleDeleteTask}
                            onViewDetails={handleViewDetails}
                            onDrop={(taskId) => handleDrop(taskId, 'In Progress')}
                        />
                    </div>
                    <div className="column">
                        <div className="column-header">Done</div>
                        <TaskList
                            tasks={sortedDoneTasks}
                            onEdit={setSelectedTask}
                            onDelete={handleDeleteTask}
                            onViewDetails={handleViewDetails}
                            onDrop={(taskId) => handleDrop(taskId, 'Done')}
                        />
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default TaskBoardPage;
