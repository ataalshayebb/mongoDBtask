import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import HabitList from './components/HabitList';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/habits" element={<PrivateRoute><HabitList /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/habits" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

export default App;