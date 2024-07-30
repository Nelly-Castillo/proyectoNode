const express = require('express');
const employee = express.Router();
const db = require('../config/database');

employee.post('/', async(req, res, next) => {
    const { employee_name, employee_lastname, employee_phone, employee_mail, employee_address } = req.body;
    if ( employee_name && employee_lastname && employee_phone && employee_mail && employee_address ){
        let query = "INSERT INTO employees (employee_name, employee_lastname, employee_phone, employee_mail, employee_address)"
        query += `VALUES ('${employee_name}', '${employee_lastname}', '${employee_phone}', '${employee_mail}', '${employee_address}');`;

        const rows = await db.query(query);
        console.log(rows);

        (rows.affectedRows == 1) ? 
            res.status(201).json({code: 201,  message: "Usuario insertado correctamente"}) : 
            res.status(404).json({code:500, message: "Ocurrio un error"})

    }return res.status(500).json({code:500, message:"Campos incompletos"})
});

employee.delete('/:id([0-9]{1,3})',async (req, res, next) => {
    const query = `DELETE FROM employees WHERE employee_id=${req.params.id}`;
    const rows = await db.query(query);
    (rows.affectedRows == 1) ? 
            res.status(200).json({code: 200, message: "Empleado borrado correctamente"}) : 
            res.status(404).json({code:404, message: "Empleado no encontrado"})
})

employee.put('/:id([0-9]{1,3})', async (req, res, next) => {
    const { employee_name, employee_lastname, employee_phone, employee_mail, employee_address } = req.body;
    if (employee_name && employee_lastname && employee_phone && employee_mail && employee_address){
        let query  = `UPDATE employees SET employee_name='${employee_name}', employee_lastname= '${employee_lastname}',`;
        query += `employee_phone='${employee_phone}', employee_mail='${employee_mail}' , employee_address= '${employee_address}' WHERE employee_id=${(req.params.id)};`;

        const rows = await db.query(query);
        console.log(rows);

        (rows.affectedRows == 1) ? 
            res.status(200).json({code: 200,  message: "Empleado actualizado correctamente"}) : 
            res.status(404).json({code:500, message: "Ocurrio un error"})
    }
    return res.status(500).json({code:500, message:"Campos incompletos"})
});

employee.patch('/:id([0-9]{1,3})', async (req, res, next) => {
    if (req.body.employee_name) {
        let query  = `UPDATE employees SET employee_name='${req.body.employee_name}' WHERE  employee_id=${req.params.id};`;
        const rows = await db.query(query);
        (rows.affectedRows == 1) ? 
            res.status(200).json({code: 200,  message: "Empleado actualizado correctamente"}) : 
            res.status(404).json({code:500, message: "Ocurrio un error"})
    } return res.status(500).json({code: 500, message:"Campos incompletos"})
})

employee.get('/', async(req, res, next) => {
    const emp = await db.query("SELECT * FROM employees;");
    return res.status(200).json({code: 200, message: emp})
});

module.exports = employee;