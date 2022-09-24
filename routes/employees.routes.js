const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.model');

router.get('/employees', async (req, res) => {
  try {
    const selectedEmployee = res.json(await Employee.find())
    if (!selectedEmployee) res.status(404).json({ message: 'Not found' })
    else res.json(await data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/random', async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const selectedEmployee = await Employee.findOne().skip(rand);
    if (!selectedEmployee) res.status(404).json('Not found')
    else res.json(await selectedEmployee);
  } catch (err) {
    res.status(500).json({ message: err })
  }
});

router.get('/employees/:id', async (req, res) => {
  try {
    const selectedEmployee = await Employee.findById(req.params.id)
    if (!selectedEmployee) res.status(404).json('Not found')
    else res.json(await selectedEmployee);
  } catch (err) {
    res.status(500).json({ message: err })
  }
});

router.post('/employees', async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const newEmployee = new Employee({ firstName: firstName, lastName: lastName, department: department })
    await newEmployee.save();
    res.json(await newEmployee);
  } catch (err) { res.status(500).json({ message: err }) }
});

router.put('/employees/:id', async (req, res) => {
  const { firstName, lastName } = req.body;
  try {
    const selectedEmployee = await Employee.findById(req.params.id);
    if (selectedEmployee) {
      selectedEmployee.firstName = firstName;
      selectedEmployee.lastName = lastName;
      await selectedEmployee.save();
      res.json(await selectedEmployee);
    } else { res.status(404).json({ message: 'Not found' }) }
  } catch (err) { res.status(500).json({ message: err }) }
});

router.delete('/employees/:id', async (req, res) => {
  try {
    const selectedEmployee = Employee.find(req.params.id);
    if (selectedEmployee) {
      await Employee.deleteOne({ _id: req.params.id });
      const leftEmployee = Employee.find();
      res.json(await leftEmployee)
    } else res.status(400).res.json({ message: 'Not found' })
  } catch (err) { res.status(500).json({ message: err }) }
});

module.exports = router;
