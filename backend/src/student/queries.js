const getStudentsQuery = 'SELECT * FROM students ORDER BY id DESC '
const getStudentByIdQuery = 'SELECT * FROM students WHERE id = $1'
const checkEmailQuery = 'SELECT * FROM students WHERE email = $1'
const addStudentQuery = 'INSERT INTO students (name,age, email,phone,department,semester) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'
const updateStudentQuery = 'UPDATE students SET name = $1, age = $2, email = $3, phone = $4, department = $5, semester = $6 WHERE id = $7 RETURNING *'
const deleteStudentQuery = 'DELETE FROM students WHERE id = $1 RETURNING *'

module.exports = {
    getStudentsQuery,
    getStudentByIdQuery,
    checkEmailQuery,
    addStudentQuery,
    updateStudentQuery,
    deleteStudentQuery
}