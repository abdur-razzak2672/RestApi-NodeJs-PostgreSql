const pool = require('../db');
const queries = require('./queries');
const getStudents = (res, req) => {
    pool.query(queries.getStudentsQuery, (error, results) => {
        if (error) {
             res.status(500).json({ status: 'error', message: 'Server Error', error:error,statusCode: 500 });
        }

        const noData = results.rows.length === 0;
        if (noData) {
            res.status(200).json({ status: 'Success', message: 'No Data Found', statusCode: 200 });
        }else{
            res.status(200).json( { status: 'success', message: `Successfully`, statusCode: 200, results: results.rows});

        }
     })
}

const getStudentById = (res, req) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentByIdQuery, [id], (error, results) => {
        if (error) {
            res.status(500).json({ status: 'error', message: 'Server Error', error:error,statusCode: 500 });
        }
        const noData = results.rows.length === 0;
        if (noData) {
            res.status(200).json({ status: 'Success', message: 'No Data Found', statusCode: 200 });
        }else{
            res.status(200).json( { status: 'success', message: `Successfully`, statusCode: 200, results: results.rows});
        }
     })
}

const addsStudent = (res, req) => {
    const { name,age, email,phone,department,semester } = req.body;

    pool.query(queries.checkEmailQuery, [email], (error, results) => {
        if (error) {
             res.status(500).json({ status: 'error', message: 'Server Error', error:error,statusCode: 500 })                                ;
        }
        if (results.rows.length > 0) {
            res.status(400).send( { status: 'error', message: 'Email already exists', statusCode: 400 });
        } else {
            pool.query(queries.addStudentQuery, [name,age, email,phone,department,semester], (error, results) => {
                if (error) {
                    res.status(500).json({ status: 'error', message: 'Server Error', error:error,statusCode: 500 });
                }
                res.status(201).json({ status: 'success', message: `Successfully Added Student`, results: results.rows   , statusCode: 201 });
            })
        }
    })
}


const updateStudent = (res, req) => {
    const id = parseInt(req.params.id);
    const { name,age, email,phone,department,semester } = req.body;
    pool.query(queries.updateStudentQuery, [name,age, email,phone,department,semester,id], (error, results) => {
        if (error) {
            res.status(500).json({ status: 'error', message: 'Server Error', error:error,statusCode: 500 });
        }
        res.status(200).json({ status: 'success', message: `Successfully Updated Student`, results: results.rows   , statusCode: 200 });
    })
}


const deleteStudent = (res, req) => {
    const id = parseInt(req.params.id);


    pool.query(queries.deleteStudentQuery, [id], (error, results) => {
        if (error) {
            res.status(500).json({ status: 'error', message: 'Server Error', error:error,statusCode: 500 });
        }
        const noData =  results.rows.length === 0;
        if (noData) {
            res.status(200).json({ status: 'Success', message: 'No Data Exist this id', statusCode: 200 });
        }else{
            res.status(200).json({ status: 'success', message: `Successfully Deleted Student`, results: results.rows   , statusCode: 200 });

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