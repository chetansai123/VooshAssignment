import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TaskBoardPage from './pages/TaskBoardPage';
import PrivateRoute from './PrivateRoute';
import TopBar from './components/TopBar';
import { Navigate } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TaskBoardPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
