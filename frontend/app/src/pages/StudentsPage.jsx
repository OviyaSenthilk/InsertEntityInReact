import React, { useEffect, useState } from 'react';
import StudentCard from '../components/StudentCard';
import AddStudentForm from '../components/AddStudentForm';


function StudentsPage() {
  const [students, setStudents] = useState([]);


  // Fetch existing students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);


  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:3001/students');
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };


  // Callback to refresh list after a student is added
  const handleStudentAdded = (newStudent) => {
    // Option 1: Fetch updated list from server again
    // fetchStudents();


    // Option 2: Manually update local state
    setStudents((prev) => [...prev, newStudent]);
  };


  return (
    <div>
      <h2>Students List</h2>


      {/* List of Students */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {students.map((student) => (
          <StudentCard
            key={student.id}
            name={student.name}
            photo={student.photo}
            grade={student.grade}
          />
        ))}
      </div>


      {/* Form to Add a New Student */}
      <AddStudentForm onStudentAdded={handleStudentAdded} />
    </div>
  );
}


export default StudentsPage;


