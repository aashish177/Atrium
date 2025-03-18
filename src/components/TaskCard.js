import React from "react";

const TaskCard = ({ 
    task, 
    isEditing, 
    editedTask, 
    onEdit, 
    onEditChange, 
    onSave, 
    onCancelEdit, 
    onDelete, 
    onToggle 
}) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 transition-transform transform hover:scale-105">
            {isEditing ? (
                <div>
                    {/* Editable Input for Title */}
                    <input
                        type="text"
                        value={editedTask.title}
                        onChange={(e) => onEditChange({ ...editedTask, title: e.target.value })}
                        className="w-full p-2 border rounded"
                    />

                    {/* Editable Textarea for Description */}
                    <textarea
                        value={editedTask.description} 
                        onChange={(e) => onEditChange({ ...editedTask, description: e.target.value })}
                        className="w-full p-2 border rounded mt-2"
                    />

                    {/* Save & Cancel Buttons */}
                    <div className="mt-2 flex space-x-2">
                        <button 
                            onClick={onSave}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                            ✅ Save
                        </button>
                        <button 
                            onClick={onCancelEdit}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                            ❌ Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p className="text-gray-600">{task.description}</p>

                    {/* Task Status Toggle */}
                    <label className="flex items-center space-x-2 mt-3 cursor-pointer">
                        <input 
                            type="checkbox"
                            checked={task.status === "DONE"}
                            onChange={() => onToggle(task)}
                            className="w-5 h-5 text-green-500 focus:ring-green-400 rounded"
                        />
                        <span className={`text-sm font-medium ${task.status === "DONE" ? "text-green-600" : "text-gray-600"}`}>
                            {task.status}
                        </span>
                    </label>
                    
                    {/* Edit & Delete Buttons */}
                    <div className="mt-3 flex justify-between">
                        <button 
                            onClick={onEdit}
                            className="text-blue-500 hover:text-blue-700 text-sm">
                            ✏️ Edit
                        </button>
                        <button 
                            onClick={() => onDelete(task.id)}
                            className="text-red-500 hover:text-red-700 text-sm">
                            🗑 Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskCard;
