import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HabitItem from './HabitItem';
import HabitForm from './HabitForm';

const categories = ['religious', 'Sports', 'Education', 'Other'];

function HabitList() {
  const [habits, setHabits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/habits', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setHabits(response.data);
      console.log('Fetched habits:', response.data);
    } catch (error) {
      console.error('Error fetching habits:', error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const addHabit = async (habit) => {
    try {
      const response = await axios.post('http://localhost:5000/api/habits', habit, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setHabits([...habits, response.data]);
      console.log('Added habit:', response.data);
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  const updateHabit = async (id, updatedHabit) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/habits/${id}`, updatedHabit, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setHabits(habits.map(habit => habit._id === id ? response.data : habit));
      console.log('Updated habit:', response.data);
    } catch (error) {
      console.error('Error updating habit:', error);
    }
  };

  const deleteHabit = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/habits/${id}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setHabits(habits.filter(habit => habit._id !== id));
      console.log('Deleted habit with id:', id);
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const filteredHabits = habits.filter(habit => {
    const titleMatch = habit.title.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory === '' || 
                          habit.category.toLowerCase() === selectedCategory.toLowerCase();
    
    console.log(`Habit: ${habit.title}, Category: ${habit.category}, Selected: ${selectedCategory}, Match: ${categoryMatch}`);
    
    return titleMatch && categoryMatch;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">Habit Tracker</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
      <HabitForm addHabit={addHabit} categories={categories} />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search habits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => {
            const newCategory = e.target.value;
            console.log('Selected category:', newCategory);
            setSelectedCategory(newCategory);
          }}
          className="w-full p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="mt-8">
        {filteredHabits.map(habit => (
          <HabitItem key={habit._id} habit={habit} updateHabit={updateHabit} deleteHabit={deleteHabit} />
        ))}
      </div>
    </div>
  );
}

export default HabitList;