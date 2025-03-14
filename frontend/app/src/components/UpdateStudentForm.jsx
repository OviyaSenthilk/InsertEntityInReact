import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateStudentForm() {
  const { id } = useParams(); // Get student ID from URL
  const navigate = useNavigate();
  const [student, setStudent] = useState({ name: '', photo: '', grade: '' });

  useEffect(() => {
    fetch(`http://localhost:3001/students/${id}`)
      .then((res) => res.json())
      .then((data) => setStudent(data))
      .catch((error) => console.error('Error fetching student:', error));
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    })
      .then((res) => res.json())
      .then(() => {
        alert('Student updated successfully!');
        navigate('/'); // Redirect to home page
      })
      .catch((error) => console.error('Error updating student:', error));
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={student.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="photo" value={student.photo} onChange={handleChange} placeholder="Photo URL" required />
        <input type="text" name="grade" value={student.grade} onChange={handleChange} placeholder="Grade" required />
        <button type="submit">Update Student</button>
      </form>
    </div>
  );
}

export default UpdateStudentForm;
