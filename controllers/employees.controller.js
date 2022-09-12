const Employee = require('../models/employee.model');

exports.getAll = async (req, res) => {
    try {
        const emp = res.json(await Employee.find().populate('department'))
        if (!emp) res.status(404).json({ message: 'Not found' })
        else res.json(data);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Employee.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const emp = await Employee.findOne().skip(rand).populate('department');
        if (!emp) res.status(404).json('Not found')
        else res.json(emp);
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

exports.getSingle = async (req, res) => {
    try {
        const emp = await Employee.findById(req.params.id).populate('department')
        if (!emp) res.status(404).json('Not found')
        else res.json(emp);
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
        const emp = Employee.find(req.params.id);
        if (emp) {
            await Employee.deleteOne({ _id: req.params.id });
            res.json(await Employee.find());
        } else res.status(400).res.json({ message: 'Not found' })
    } catch (err) { res.status(500).json({ message: err }) }
};

exports.editSingle = async (req, res) => {
    const { firstName, lastName } = req.body;
    try {
        const emp = await Employee.findById(req.params.id).populate('department');
        if (emp) {
            emp.firstName = firstName; //<======Alerenative to updateOne
            emp.lastName = lastName;
            await emp.save();
            res.json(emp);
        } else { res.status(404).json({ message: 'Not found' }) }
    } catch (err) { res.status(500).json({ message: err }) }
};