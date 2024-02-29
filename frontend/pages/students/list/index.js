import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

 function index() {
  const [students, setStudents] = useState([]);

  console.log(students);

  const getStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };
  
  useEffect(() => {
    getStudents();
  }, []); 
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/v1/students/${id}`)
      .then(() => {
        getStudents();})
      .catch(error => {
        console.error('Error deleting student:', error);
      });
  };

  return (
    <div>
    <h3>Welcome to Student Management System</h3>
    <div>Total Students: {students.totalData}</div>
    <div>Response Time : {students.responseTime}</div>
    <div>DB: {students.message}</div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Department</th>
          <th>Semester</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students?.results?.map(student => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.age}</td>
            <td>{student.email}</td>
            <td>{student.phone}</td>
            <td>{student.department}</td>
            <td>{student.semester}</td>
            <td>
              <button onClick={() => window.location.href = `/editList?id=${student.id}`}>Edit</button>
              <button onClick={() => handleDelete(student.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default index