import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentsPage from './pages/StudentsPage';
import UpdateStudentPage from './pages/UpdateStuentPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentsPage />} />
        <Route path="/update/:id" element={<UpdateStudentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
