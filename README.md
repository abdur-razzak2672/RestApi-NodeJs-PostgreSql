# RestApi-NodeJs-PostgreSql
<!DOCTYPE html>
<html>
<head>
    <title>Student Management System</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div>
         <div class="container">
        <h3 >Welcome to Student Management System</h3>
        <div id="totalStudents"></div>
        <div id="message"></div>
       <div  id="resTime"></div> 
       <!-- clear cache button -->
         <button class="clearCache" style="margin-bottom: 30px;">Clear Cache</button>
     </div>

    <script>
        // Fetch the total number of students from your API
        axios.get('http://localhost:3001/api/v1/students')
            .then(response => {
                console.log('Total Students:', response?.data);
                
                const totalStudents = response.data.results.length;
                document.getElementById('totalStudents').innerHTML = `Total Students: ${totalStudents}`;
                const resTime = response?.data?.responseTime; // Corrected line
                document.getElementById('resTime').innerHTML = `Response Time: ${resTime}`;

                const  mess= response?.data?.message;

                const message = document.getElementById('message');
                message.innerHTML = `DB: ${mess}`;

                // Create a table to display student data
                const table = document.createElement('table');
                table.innerHTML = `
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
                        ${response.data.results.map(student => `
                            <tr>
                                <td>${student.id}</td>
                                <td>${student.name}</td>
                                <td>${student.age}</td>
                                <td>${student.email}</td>
                                <td>${student.phone}</td>
                                <td>${student.department}</td>
                                <td>${student.semester}</td>
                                <td>
                                    <button class='edit-btn'data-id="${student.id}">Edit</button>
                                    <button class="delete-btn" data-id="${student.id}">Delete</button> <!-- Add data-id attribute -->
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                `;
                document.body.appendChild(table);

  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', () => {
        const studentId = button.getAttribute('data-id');
        window.location.href = `/src/views/editList.html?id=${studentId}`;
    });
});
       
document.querySelectorAll('.clearCache').forEach(button => {
    button.addEventListener('click', () => {
        axios.get('http://localhost:3001/clear-cache')
            .then(response => {
                console.log('Cache cleared:', response.data);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error clearing cache:', error);
            });

      });
});
// Add event listener to delete buttons
document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', () => {
        const studentId = button.getAttribute('data-id');
        axios.delete(`http://localhost:3001/api/v1/students/${studentId}`)
            .then(() => {
                // Refresh the page or update the UI to remove the deleted student
                window.location.reload();
                
             })
            .catch(error => {
                console.error('Error deleting student:', error);
            });
    });
});
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    </script>
    </div>
</body>
</html>

