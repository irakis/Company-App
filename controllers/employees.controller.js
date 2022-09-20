const Employee = require('../models/employee.model');

exports.getAll = async (req, res) => {
    try {
        const selectedEmployee = res.json(await Employee.find().populate('department'))
        if (!selectedEmployee) res.status(404).json({ message: 'Not found' })
        else res.json(data);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Employee.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const selectedEmployee = await Employee.findOne().skip(rand).populate('department');
        if (!selectedEmployee) res.status(404).json('Not found')
        else res.json(selectedEmployee);
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

exports.getSingle = async (req, res) => {
    try {
        const selectedEmployee = await Employee.findById(req.params.id).populate('department')
        if (!selectedEmployee) res.status(404).json('Not found')
        else res.json(selectedEmployee);
    } catch (err) {
        res.status(500).json({ message: err })
    }
}

exports.postSingle = async (req, res) => {
    try {
        const { firstName, lastName, department } = req.body;
        const newEmployee = new Employee({ firstName: firstName, lastName: lastName, department: department })
        await newEmployee.save();
        res.json(await newEmployee);
    } catch (err) { res.status(500).json({ message: err }) }
};

exports.deleteSingle = async (req, res) => {
    try {
        const selectedEmployee = Employee.find(req.params.id);
        if (selectedEmployee) {
            await Employee.deleteOne({ _id: req.params.id });
            res.json(await Employee.find());
        } else res.status(400).res.json({ message: 'Not found' })
    } catch (err) { res.status(500).json({ message: err }) }
};

exports.editSingle = async (req, res) => {
    const { firstName, lastName } = req.body;
    try {
        const selectedEmployee = await Employee.findById(req.params.id).populate('department');
        if (selectedEmployee) {
            selectedEmployee.firstName = firstName; //<======Alerenative to updateOne
            selectedEmployee.lastName = lastName;
            await selectedEmployee.save();
            res.json(selectedEmployee);
        } else { res.status(404).json({ message: 'Not found' }) }
    } catch (err) { res.status(500).json({ message: err }) }
};