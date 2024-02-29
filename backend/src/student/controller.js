const pool = require('../../db.js');
const queries = require('./queries.js');
const client = require('../../redis-connection.js');
const getStudents = async (res, req) => {
    const requestTime = new Date();
    const cachedData = await client.get('students');
    const noCache = JSON.parse(cachedData)?.length === 0;

    if (cachedData && !noCache) {
        const responseTime = new Date() - requestTime;
        res.status(200).json({
            status: 'success',
            message: `Successfully fetched data from Redis cache`,
            statusCode: 200,
            rediscache: true,
            totalData: JSON.parse(cachedData).length,
            responseTime: responseTime + 'ms',
            results: JSON.parse(cachedData)
        });
    } else {
        pool.query(queries.getStudentsQuery, async (error, results) => {
            if (error) {
                res.status(500).json({ status: 'error', message: 'Server Error', error: error, statusCode: 500 });
            }
            const noData = results?.rows?.length === 0;
            if (noData) {
                res.status(200).json({ status: 'Success', message: 'No Data Found', statusCode: 200 });
            } else {
                await client.set('students', JSON.stringify(results.rows));
                const responseTime = new Date() - requestTime;
                res.status(200).json({
                    status: 'success',
                    message: `Successfully fetched data from the database`,
                    statusCode: 200,
                    rediscache: false,
                    totalData: results.rows.length,
                    responseTime: responseTime + 'ms',
                    results: results.rows
                });
            }
        });
    }
};


const getStudentById = async (res, req) => {
    const requestTime = new Date();
    const id = parseInt(req.params.id);

    const cachedData = await client.get('students');

    const studentLists = JSON.parse(cachedData);
    const noCache = studentLists?.length === 0;
    if (studentLists && !noCache) {
        const student = studentLists.find(student => student.id === id);

        if (student && student !== null && student !== undefined) {
            const responseTime = new Date() - requestTime;
            res.status(200).json({
                status: 'success',
                message: `Successfully fetched data from Redis cache`,
                statusCode: 200,
                rediscache: true,
                totalData: 1,
                responseTime: responseTime + 'ms',
                results: student
            });
        } else {
            pool.query(queries.getStudentByIdQuery, [id], async (error, results) => {
                if (error) {
                    res.status(500).json({ status: 'error', message: 'Server Error', error: error, statusCode: 500 });
                }
                const noData = results?.rows?.length === 0;
                if (noData) {
                    res.status(200).json({ status: 'Success', message: 'No Data Found', statusCode: 200 });
                } else {
                     const responseTime = new Date() - requestTime;
                    res.status(200).json({
                        status: 'success',
                        message: `Successfully fetched data from the database`,
                        statusCode: 200,
                        rediscache: false,
                        totalData: 1,
                        responseTime: responseTime + 'ms',
                        results: results.rows[0]
                    });
                }
            });
        }
    } else {
        pool.query(queries.getStudentByIdQuery, [id], async (error, results) => {
            if (error) {
                res.status(500).json({ status: 'error', message: 'Server Error', error: error, statusCode: 500 });
            }
            const noData = results?.rows?.length === 0;
            if (noData) {
                res.status(200).json({ status: 'Success', message: 'No Data Found', statusCode: 200 });
            } else {
                 const responseTime = new Date() - requestTime;
                res.status(200).json({
                    status: 'success',
                    message: `Successfully fetched data from the database`,
                    statusCode: 200,
                    rediscache: false,
                    totalData: 1,
                    responseTime: responseTime + 'ms',
                    results: results.rows[0]
                });
            }
        });
    }
};


const addsStudent = (res, req) => {
    const { name, age, email, phone, department, semester } = req.body;

    pool.query(queries.checkEmailQuery, [email], (error, results) => {
        if (error) {
            res.status(500).json({ status: 'error', message: 'Server Error', error: error, statusCode: 500 });
        }
        if (results.rows.length > 0) {
            res.status(400).send({ status: 'error', message: 'Email already exists', statusCode: 400 });
        } else {
            pool.query(queries.addStudentQuery, [name, age, email, phone, department, semester], (error, results) => {
                if (error) {
                    res.status(500).json({ status: 'error', message: 'Server Error', error: error, statusCode: 500 });
                }



                res.status(201).json({ status: 'success', message: `Successfully Added Student`, results: results.rows, statusCode: 201 });
            })
        }
    })
}


const updateStudent = (res, req) => {
    const id = parseInt(req.params.id);
    const { name, age, email, phone, department, semester } = req.body;
    pool.query(queries.updateStudentQuery, [name, age, email, phone, department, semester, id], async (error, results) => {
        if (error) {
            res.status(500).json({ status: 'error', message: 'Server Error', error: error, statusCode: 500 });
        }

        const cachedData = await client.get('students');
        const noCache = JSON.parse(cachedData)?.length === 0;
        if (cachedData && !noCache) {
            const students = JSON.parse(cachedData);
            const updatedStudents = students.map(student => {
                if (student.id === id) {
                    return {
                        id,
                        name,
                        age,
                        email,
                        phone,
                        department,
                        semester
                    }
                }
                return student;
            });
            await client.set('students', JSON.stringify(updatedStudents));
        }
         
        res.status(200).json({ status: 'success', message: `Successfully Updated Student`, results: results.rows, statusCode: 200 });
    })
}


const deleteStudent = async (res, req) => {
    const id = parseInt(req.params.id);

    pool.query(queries.deleteStudentQuery, [id], async (error, results) => {
        if (error) {
            res.status(500).json({ status: 'error', message: 'Server Error', error: error, statusCode: 500 });
        }
        const noData = results?.rows?.length === 0;
        if (noData) {
            res.status(200).json({ status: 'Success', message: 'No Data Exist this id', statusCode: 200 });
        } else {
            const cachedData = await client.get('students');
            const students = JSON.parse(cachedData);
            const updatedStudents = students.filter(student => student.id !== id);
            await client.set('students', JSON.stringify(updatedStudents));
            res.status(200).json({ status: 'success', message: `Successfully Deleted Student`, results: results.rows, statusCode: 200 });

        }


    })
}

module.exports = {
    getStudents,
    getStudentById,
    addsStudent,
    updateStudent,
    deleteStudent
};



// type ORM
// Sequalizers
// Middleware || private route and public route