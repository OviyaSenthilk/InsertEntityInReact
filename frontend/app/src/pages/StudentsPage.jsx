import React, { useEffect, useState } from 'react';
import StudentCard from "../components/StudentCard"
import AddStudentForm from "../components/AddStudentForm"
import { useNavigate } from 'react-router-dom';

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:3001/students');
      if (!response.ok) throw new Error('Failed to fetch students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleStudentAdded = (newStudent) => {
    setStudents((prev) => [...prev, newStudent]);
  };

  const handleDeleteStudent = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    
    if (confirmDelete) {
      try {
        await fetch(`http://localhost:3001/students/${id}`, { method: 'DELETE' });
        setStudents((prev) => prev.filter((student) => student.id !== id));
        alert('Student deleted successfully!');
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  return (
    <div>
      <h2>Students List</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {students.map((student) => (
          <div key={student.id} style={{ border: '1px solid gray', padding: '10px' }}>
            <StudentCard name={student.name} photo={student.photo} grade={student.grade} />
            <button onClick={() => navigate(`/update/${student.id}`)}>Edit</button>
            <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
          </div>
        ))}
      </div>
      <h2>Add Student</h2>
      <AddStudentForm onStudentAdded={handleStudentAdded} />
    </div>
  );
}

export default StudentsPage;
