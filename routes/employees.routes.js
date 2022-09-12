const express = require('express');
const router = express.Router();
const EmployeesController = require('../controllers/employees.controller');

router.get('/employees', EmployeesController.getAll);

router.get('/employees/random', EmployeesController.getRandom);

router.get('/employees/:id', EmployeesController.getSingle);

router.post('/employees', EmployeesController.postSingle);

router.put('/employees/:id', EmployeesController.editSingle);

router.delete('/employees/:id', EmployeesController.deleteSingle);

module.exports = router;
