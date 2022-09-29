const expect = require('chai').expect;
const { after } = require('mocha');
const mongoose = require('mongoose');
const Department = require('../department.model');

describe('Department', () => {

    before(async () => {
        try {
            await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch (err) {
            console.error(err);
        }
    });

    describe('Reading data', () => {

        before(async () => {
            const testDepOne = new Department({ name: 'Department #1' });
            await testDepOne.save();

            const testDepTwo = new Department({ name: 'Department #2' });
            await testDepTwo.save();
        });

        it('should return all the data with "find" method', async () => {
            const departments = await Department.find();
            const expectedLength = 2;
            expect(departments.length).to.be.equal(expectedLength)
        });

        it('should return a proper document by "name" with "findOne" method', async () => {
            const departments = await Department.findOne({ name: 'Department #1' });
            const expectedName = 'Department #1';
            expect(departments.name).to.be.equal(expectedName)
        });

        after(async () => {
            await Department.deleteMany();
        })
    });

    describe('Creating data', async () => {

        it('should insert new document with "insertOne" method', async () => {
            const newTestDepartment = new Department({ name: 'Department #1' })
            await newTestDepartment.save();
            expect(newTestDepartment.isNew).to.be.false;
        });

        after(async () => {
            await Department.deleteMany();
        });
    });

    describe('Updating data', async () => {

        beforeEach(async () => {
            const testDepOne = new Department({ name: 'Department #1' });
            await testDepOne.save();

            const testDepTwo = new Department({ name: 'Department #2' });
            await testDepTwo.save();

            const testDepThree = new Department({ name: 'Department #3' });
            await testDepThree.save();
        });

        it('should update properly one document with "updateOne" method', async () => {
            await Department.updateOne({ name: 'Department #1' }, { $set: { name: '=Department #1=' } });
            const updatedDepartment = await Department.findOne({ name: '=Department #1=' });
            expect(updatedDepartment).to.not.be.null;
        }),

        it('should update properly one document with "save" method', async () => {
            const testDepartment = await Department.findOne({ name: 'Department #1' })
            testDepartment.name = '=Department #1=';
            await testDepartment.save();

            const updatedDepartment = await Department.findOne({ name: '=Department #1=' })
            expect(updatedDepartment).to.not.be.null;
        }),

        it('should update properly many documents with "updateMany" method', async () => {
            await Department.deleteMany();
            const selectedDepartments = await Department.find();
            expect(selectedDepartments.length).to.be.equal(0)
        }),

        afterEach(async () => {
            await Department.deleteMany();
        });
    });

    describe('Deleting data', async () => {

        beforeEach(async () => {
            const testDepOne = new Department({ name: 'Department #1' });
            await testDepOne.save();

            const testDepTwo = new Department({ name: 'Department #2' });
            await testDepTwo.save();

            const testDepThree = new Department({ name: 'Department #3' });
            await testDepThree.save();
        });

        it('should remove one elment with "removeOne" method', async () => {
            await Department.deleteOne({ name: 'Department #1' });
            const selectedDepartment = await Department.findOne({ name: 'Department #1' });
            expect(selectedDepartment).to.be.null;
        });

        it('should remove one element with "remove" method', async () => {
            const testDepartment = await Department.findOne({ name: 'Department #1' });
            testDepartment.remove();
            const removedDepartment = await Department.findOne({ name: 'Department #1' });
            expect(removedDepartment).to.be.null;
        })

        afterEach(async () => {
            await Department.deleteMany();
        });
    });

    after(() => {
        mongoose.models = {};
    });
});