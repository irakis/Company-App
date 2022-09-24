const express = require('express');
const router = express.Router();
const Department = require('../models/department.model');

router.get('/departments', async (req, res) => {
  try {
    const selectedDepartment = res.json(await Department.find())
    if (!selectedDepartment) res.status(404).json({ message: "Not found" })
    else res.json(await data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/departments/random', async (req, res) => {
  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const selectedDepartment = await Department.findOne().skip(rand);
    if (!selectedDepartment) res.status(404).json({ message: "Not found" })
    else res.json(await selectedDepartment)
  } catch (err) {
    res.status(500).json({ message: err })
  }
});

router.get('/departments/:id', async (req, res) => {
  try {
    const selectedDepartment = await Department.findById(req.params.id)
    if (!selectedDepartment) res.status(404).json({ message: 'Not found' });
    else res.json(await selectedDepartment)
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/departments', async (req, res) => {
  try {
    const { name } = req.body;
    const newDepartment = new Department({ name: name })
    await newDepartment.save();
    res.json(await newDepartment);
  } catch (err) { res.status(500).json({ message: err }) }
});

router.put('/departments/:id', async (req, res) => {
  const { name } = req.body;
  try {
    const selectedDepartment = await Department.findById(req.params.id);
    if (selectedDepartment) {
      selectedDepartment.name = name;
      selectedDepartment.save();
      res.json(await selectedDepartment);
    } else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/departments/:id', async (req, res) => {
  try {
    const selectedDepartment = await Department.findById(req.params.id);
    if (selectedDepartment) {
      await Department.deleteOne({ _id: req.params.id });
      const leftDepartments = await Department.find()
      res.json(await leftDepartments);
    } else res.status(404).json({ message: 'Not found' })
  } catch (err) { res.status(500).json({ message: err }); }
});

module.exports = router;