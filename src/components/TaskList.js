import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";  
import axios from "axios";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTask, setEditedTask] = useState({ title: "", description: "" });

    useEffect(() => {
        axios.get("http://localhost:8080/api/tasks/")
            .then(response => setTasks(response.data))
            .catch(error => console.error("There was an error fetching the tasks! ", error));
    }, []);

    const handleToggleStatus = async (task) => {
        const statusMapping = {
            TODO: "IN_PROGRESS",
            IN_PROGRESS: "DONE",
            DONE: "TODO"
        };

        const updatedStatus = statusMapping[task.status] || "TODO";

        try {
            const response = await axios.put(`http://localhost:8080/api/tasks/${task.id}`, {
                ...task,
                status: updatedStatus
            });

            setTasks(tasks.map(t => (t.id === task.id ? response.data : t)));
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };
    
    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`http://localhost:8080/api/tasks/${taskId}`);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleCancelEdit = () => {
        setEditingTaskId(null);
        setEditedTask({ title: "", description: "" });
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/tasks/${editingTaskId}`, editedTask);
            setTasks(tasks.map(task => (task.id === editingTaskId ? response.data : task)));
            setEditingTaskId(null);
            setEditedTask({ title: "", description: "" });
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleEdit = (task) => {
        setEditingTaskId(task.id);
        setEditedTask({ title: task.title, description: task.description });
    };
    
    const handleEditChange = (updatedValues) => {
        setEditedTask(updatedValues);
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-bold text-center mb-6">Task List</h2>
            <p> Number of tasks: {tasks.length}</p>
            {tasks.length === 0 ? (
                <p className="text-center text-gray-500"> No tasks available </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tasks.map(task => (
                        <TaskCard
                        key={task.id}
                        task={task}
                        isEditing={editingTaskId === task.id}
                        editedTask={editedTask}
                        onEdit={() => handleEdit(task)}
                        onEditChange={handleEditChange}
                        onSave={handleSave}
                        onCancelEdit={handleCancelEdit}
                        onDelete={handleDelete}
                        onToggle={handleToggleStatus}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
