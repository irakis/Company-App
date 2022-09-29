const { after } = require('mocha');
const Employee = require('../employee.model');
const mongoose = require('mongoose');
const expect = require('chai').expect;

describe('Employee', () => {

    before(async () => {
        try {
            await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch (err) {
            console.error(err);
        }
    });

    describe('Reading data', () => {

        before(async () => {
            const testEmployeeOne = new Employee({ firstName: 'Name #1', lastName: 'LastName #1', department: 'Department #1' });
            testEmployeeOne.save();
            const testEmployeeTwo = new Employee({ firstName: 'Name #2', lastName: 'LastName #2', department: 'Department #2' });
            testEmployeeTwo.save();
            const testEmployeeThree = new Employee({ firstName: 'Name #3', lastName: 'LastName #3', department: 'Department #3' });
            testEmployeeThree.save();
        });

        it('should return all elements with "find" method', async () => {
            const testEmployees = await Employee.find();
            const expectedEmployeeLength = 3;
            expect(testEmployees.length).to.be.equal(expectedEmployeeLength);
        });

        it('should return proper element by name with "findOne" method', async () => {
            const selectedEmployee = await Employee.findOne({ firstName: 'Name #3' });
            const testEmployeeThree = 'Name #3';
            expect(selectedEmployee.firstName).to.be.equal(testEmployeeThree);
        });

        after(async () => {
            await Employee.deleteMany()
        });
    });

    describe('Creating data', () => {

        it('should crete new object with "insertOne" method', async () => {
            const testEmployeeFour = new Employee({ firstName: 'Name #4', lastName: 'LastName #4', department: 'Department #4' });
            await testEmployeeFour.save();
            expect(testEmployeeFour.isNew).to.be.false;
        })
    });

    describe('Updating data', () => {

        beforeEach(async () => {
            const testEmployeeOne = new Employee({ firstName: 'Name #1', lastName: 'LastName #1', department: 'Department #1' });
            testEmployeeOne.save();
            const testEmployeeTwo = new Employee({ firstName: 'Name #2', lastName: 'LastName #2', department: 'Department #2' });
            testEmployeeTwo.save();
            const testEmployeeThree = new Employee({ firstName: 'Name #3', lastName: 'LastName #3', department: 'Department #3' });
            testEmployeeThree.save();
        });

        it('should update proper element by name with "updateOne" method', async () => {
            await Employee.updateOne({ firstName: 'Name #1' }, { $set: { firstName: 'Name ##1' } });
            const selectedEmployee = await Employee.findOne({ firstName: 'Name ##1' })
            expect(selectedEmployee.firstName).to.be.equal('Name ##1');
        });

        it('should upadte peroper elemnt with "save" method', async () => {
            const selectedEmployee = await Employee.findOne({ firstName: 'Name #2' });
            selectedEmployee.firstName = 'Name ##2';
            selectedEmployee.save();
            expect(selectedEmployee.firstName).to.be.equal('Name ##2')
        });

        it('should update all items with "updateMany" method', async () => {
            const selectedEmployee = await Employee.find();
            const editedEmployee = await Employee.updateMany({ $set: { lastName: 'Doe' } });
            const amounOfEditedEmployee = (await Employee.find({ lastName: 'Doe' })).length
            expect(Employee.length).to.be.equal(amounOfEditedEmployee)
        });

        afterEach(async () => {
            await Employee.deleteMany()
        });
    });

    describe('Deleting data', () => {

        beforeEach(async () => {
            const testEmployeeOne = new Employee({ firstName: 'Name #1', lastName: 'LastName #1', department: 'Department #1' });
            testEmployeeOne.save();
            const testEmployeeTwo = new Employee({ firstName: 'Name #2', lastName: 'LastName #2', department: 'Department #2' });
            testEmployeeTwo.save();
            const testEmployeeThree = new Employee({ firstName: 'Name #3', lastName: 'LastName #3', department: 'Department #3' });
            testEmployeeThree.save();
        });

        it('should delete one proper element with "deleteOne" method', async () => {
            const deletedEmployee = await Employee.deleteOne({ firstName: 'Name #1' });
            const findDeletedEmployee = await Employee.findOne({ firstName: 'Name #1' })
            expect(findDeletedEmployee).to.be.null;
        });

        it('should delete one element with "remove" method', async () => {
            const selectedEmployee = await Employee.findOne({ firstName: 'Name #3' });
            await selectedEmployee.remove();
            const findDeletedEmployee = await Employee.findOne({ firstName: 'Name #3' });
            expect(findDeletedEmployee).to.be.null;
        });

        it('should delete many items with "deleteMany" method', async () => {
            await Employee.deleteMany();
            expect((await Employee.find()).length).to.be.equal(0);
        });

        afterEach(async () => {
            await Employee.deleteMany()
        });
    });

    after(async () => {
        mongoose.models = {};
    });
});