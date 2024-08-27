import React, { useState } from 'react';

function HabitItem({ habit, updateHabit, deleteHabit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(habit.title);
  const [description, setDescription] = useState(habit.description);
  const [category, setCategory] = useState(habit.category);

  const handleUpdate = () => {
    updateHabit(habit._id, { title, description, category, isCompleted: habit.isCompleted });
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    updateHabit(habit._id, { ...habit, isCompleted: !habit.isCompleted });
  };

  return (
    <div className="bg-white p-4 mb-4 rounded shadow">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          >
            <option value="Religous">Religous</option>
            <option value="sports">sports</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
          <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center mb-2">
            <h3 className="text-xl mr-2">{habit.title}</h3>
            {habit.isCompleted ? (
              <span className="text-green-500">✓</span>
            ) : (
              <span className="text-red-500">✗</span>
            )}
          </div>
          <p className="text-gray-600">{habit.description}</p>
          <p className="text-blue-600">Category: {habit.category}</p>
          <div className="mt-2 mb-4 bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${habit.isCompleted ? 'bg-green-600' : 'bg-gray-300'}`} 
              style={{width: habit.isCompleted ? '100%' : '0%'}}
            ></div>
          </div>
          <div className="mt-4">
            <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">
              Edit
            </button>
            <button onClick={() => deleteHabit(habit._id)} className="bg-red-500 text-white px-4 py-2 rounded mr-2">
              Delete
            </button>
            <button onClick={handleToggleComplete} className="bg-green-500 text-white px-4 py-2 rounded">
              {habit.isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HabitItem;