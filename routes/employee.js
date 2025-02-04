const express = require('express');
const employee = express.Router();
const db = require('../config/database');

employee.post('/', async(req, res, next) => {
    const { employee_name, employee_lastname, employee_phone, employee_mail, employee_address } = req.body;
    if ( employee_name && employee_lastname && employee_phone && employee_mail && employee_address ){
        let query = "INSERT INTO employees (employee_name, employee_lastname, employee_phone, employee_mail, employee_address)"
        query += `VALUES ('${employee_name}', '${employee_lastname}', '${employee_phone}', '${employee_mail}', '${employee_address}');`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1){
            return res.status(201).json({code: 201,  message: "Usuario insertado correctamente"})
        } return res.status(404).json({code:500, message: "Ocurrio un error"})

    }return res.status(500).json({code:500, message:"Campos incompletos"})
});


employee.delete('/:id([0-9]{1,3})',async (req, res, next) => {
    const query = `DELETE FROM employees WHERE employee_id=${req.params.id}`;
    const rows = await db.query(query);
    if (rows.affectedRows == 1) {
        res.status(200).json({code: 200, message: "Empleado borrado correctamente"});
    }
            res.status(404).json({code:404, message: "Empleado no encontrado"})
})

employee.put('/:id([0-9]{1,3})', async (req, res, next) => {
    try {
        const { employee_name, employee_lastname, employee_phone, employee_mail, employee_address } = req.body;
        if (employee_name && employee_lastname && employee_phone && employee_mail && employee_address){
        let query  = `UPDATE employees SET employee_name='${employee_name}', employee_lastname= '${employee_lastname}',`;
        query += `employee_phone='${employee_phone}', employee_mail='${employee_mail}' , employee_address= '${employee_address}' WHERE employee_id=${(req.params.id)};`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return  res.status(200).json({code: 200,  message: "Empleado actualizado correctamente"}) 
        }
        return res.status(404).json({code:500, message: "Empleado no encontrado"})
    }
    } catch (error) {
        console.log(error)
        return res.status(400).json({code:400, message:"Campos incompletos"})
    }
    return res.status(400).json({code:400, message:"Ocurrio un error"})
});

employee.patch('/:id([0-9]{1,3})', async (req, res, next) => {
    if (req.body.employee_name) {
        let query  = `UPDATE employees SET employee_name='${req.body.employee_name}' WHERE  employee_id=${req.params.id};`;
        const rows = await db.query(query);
        if (rows.affectedRows == 1) {
            return res.status(200).json({code: 200,  message: "Empleado actualizado correctamente"})    
        } return res.status(404).json({code:500, message: "Ocurrio un error"})
    } return res.status(500).json({code: 500, message:"Campos incompletos"})
})

employee.get('/search', async (req, res, next) => {
    const search = req.query.q;
    if (!search) {
        return res.status(400).json({code:400, message: "Falta información de busqueda"})
    } try {
        const query = "SELECT * FROM  employees WHERE employee_name LIKE ? ";
        const values = [`%${search}%`];
        const results = await db.query(query, values);
        return res.status(200).json({code: 200, message: results});
    } catch (error){
        console.log(error);
        return res.status(200).json({code: 500, message: "Ocurrio un error"})
    }
})

employee.get('/', async(req, res, next) => {
    const emp = await db.query("SELECT * FROM employees;");
    return res.status(200).json({code: 200, message: emp})
});
employee.get('/:id([0-9]{1,3})', async (req,res, next) => {
    const id = req.params.id -1;
    if (id >= 1 && id <= 722) {
        const emp = await db.query("SELECT * FROM employees WHERE employee_id"+id+";")
        res.status(200).json({code: 200, message: emp});
    }
        res.status(404).send({code: 404, message: "Pokemon no encontrado"});
});

module.exports = employee;