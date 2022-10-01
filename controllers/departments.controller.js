const Department = require('../models/department.model');

exports.getAll = async (req, res) => {
    try {
        const selectedDepartment = res.json(await Department.find())
        if (!selectedDepartment) { res.status(404).json({ message: "Not found" })
        } else res.json(data);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Department.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const selectedDepartment = await Department.findOne().skip(rand);
        if (!selectedDepartment) res.status(404).json({ message: "Not found" })
        else res.json(selectedDepartment)
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

exports.getSingle = async (req, res) => {
    try {
        const selectedDepartment = await Department.findById(req.params.id)
        if (!selectedDepartment) res.status(404).json({ message: 'Not found' });
        else res.json(selectedDepartment)
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.postSingle = async (req, res) => {
    try {
        const { name } = req.body;
        const newDepartment = new Department({ name: name })
        await newDepartment.save();
        res.json(await newDepartment);
    } catch (err) { res.status(500).json({ message: err }) }
};

exports.editSingle = async (req, res) => {
    const { name } = req.body;
    try {
        const selectedDepartment = await Department.findById(req.params.id);
        if (selectedDepartment) {
            await Department.updateOne({ _id: req.params.id }, { $set: { name: name } })
            res.json({message: 'OK'});
        } else res.status(404).json({ message: 'Not found' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.deleteSingle = async (req, res) => {
    try {
        const selectedDepartment = await Department.findById(req.params.id);
        if (selectedDepartment) {
            await Department.deleteOne({ _id: req.params.id });
            const leftDep = await Department.find()
            res.json(leftDep);
        } else res.status(404).json({ message: 'Not found' })
    } catch (err) { res.status(500).json({ message: err }); }
};
