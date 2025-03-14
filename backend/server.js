// const express = require('express');
// const cors = require('cors');
// const app = express();
// app.use(cors());
// app.use(express.json());


// let students = [
//   { id: 1, name: 'Alice', photo: 'https://example.com/alice.jpg', grade: 'A' },
//   // ...existing data
// ];


// // GET: Retrieve all students
// // GET: Retrieve a single student by ID
// app.get('/students/:id', (req, res) => {
//   const studentId = parseInt(req.params.id);
//   const student = students.find((s) => s.id === studentId);
//   if (student) {
//     res.json(student);
//   } else {
//     res.status(404).json({ message: 'Student not found' });
//   }
// });



// // POST: Add a new student
// app.post('/students', (req, res) => {
//   const newStudent = { id: Date.now(), ...req.body };
//   students.push(newStudent);
//   res.status(201).json(newStudent);
// });

// app.put('/students/:id', (req, res) => {
//   const studentId = parseInt(req.params.id); // Get ID from URL
//   const updatedData = req.body; // Get updated data from request body

//   let studentFound = false; // Flag to check if student exists

//   students = students.map((student) => {
//     if (student.id === studentId) {
//       studentFound = true;
//       return { ...student, ...updatedData }; // Merge existing and updated data
//     }
//     return student;
//   });

//   if (studentFound) {
//     res.json({ message: 'Student updated successfully!' });
//   } else {
//     res.status(404).json({ message: 'Student not found' });
//   }
// });

// // DELETE: Remove a student by ID
// app.delete('/students/:id', (req, res) => {
//   const studentId = parseInt(req.params.id);
//   students = students.filter((student) => student.id !== studentId);
//   res.json({ message: 'Student deleted successfully!' });
// });


// app.listen(3001, () => {
//   console.log('Server running on port 3001');
// });

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let students = [
  { id: 1, name: 'Alice', photo: 'https://example.com/alice.jpg', grade: 'A' },
];

// Debugging middleware
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// GET all students
app.get('/students', (req, res) => {
  res.json(students);
});

// GET a single student by ID
app.get('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find((s) => s.id === studentId);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// POST: Add a new student
app.post('/students', (req, res) => {
  const newStudent = { id: Date.now(), ...req.body };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT: Update a student by ID
app.put('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const updatedData = req.body;

  let student = students.find((s) => s.id === studentId);
  
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  // Update existing student
  student.name = updatedData.name || student.name;
  student.photo = updatedData.photo || student.photo;
  student.grade = updatedData.grade || student.grade;

  res.json({ message: 'Student updated successfully!', student });
});

// DELETE: Remove a student by ID
app.delete('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentExists = students.some((student) => student.id === studentId);

  if (!studentExists) {
    return res.status(404).json({ message: 'Student not found' });
  }

  students = students.filter((student) => student.id !== studentId);
  res.json({ message: 'Student deleted successfully!' });
});

// Start server
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
