const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());


let students = [
  { id: 1, name: 'Alice', photo: 'https://example.com/alice.jpg', grade: 'A' },
  // ...existing data
];


// GET: Retrieve all students
app.get('/students', (req, res) => {
  res.json(students);
});


// POST: Add a new student
app.post('/students', (req, res) => {
  const newStudent = { id: Date.now(), ...req.body };
  students.push(newStudent);
  res.status(201).json(newStudent);
});


app.listen(3001, () => {
  console.log('Server running on port 3001');
});
