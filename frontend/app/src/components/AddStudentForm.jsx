import React, { useState } from 'react';


function AddStudentForm({ onStudentAdded }) {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [grade, setGrade] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();


    // Basic validation check (optional)
    if (!name || !photo || !grade) {
      alert('Please fill all fields!');
      return;
    }


    // Prepare data to send
    const newStudent = { name, photo, grade };


    try {
      // POST request to add a new student
      const response = await fetch('http://localhost:3001/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });


      if (!response.ok) {
        throw new Error('Failed to add student');
      }


      // Optionally retrieve the newly created student object
      const createdStudent = await response.json();


      // Invoke callback to inform parent component
      onStudentAdded(createdStudent);


      // Reset form fields
      setName('');
      setPhoto('');
      setGrade('');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
      <div>
        <label>Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          required
        />
      </div>
      <div>
        <label>Photo:</label>
        <input
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          type="text"
          required
        />
      </div>
      <div>
        <label>Grade:</label>
        <input
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          type="text"
          required
        />
      </div>
      <button type="submit">Add Student</button>
    </form>
  );
}


export default AddStudentForm;

