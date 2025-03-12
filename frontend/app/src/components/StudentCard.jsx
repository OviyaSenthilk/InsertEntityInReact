import React from 'react';


function StudentCard({ name, photo, grade }) {
  return (
    <div className="student-card">
      <img src={photo} alt={`${name}'s photo`} />
      <h3>{name}</h3>
      <p>Grade: {grade}</p>
    </div>
  );
}


export default StudentCard;
