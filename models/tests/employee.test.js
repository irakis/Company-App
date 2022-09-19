const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');


describe('Employee', () => {
    it('it should throw error if there is no arg', () => {
        const emp = new Employee({});
        emp.validate(err => {
            expect(err.errors).to.exist;
        });
    });

    it('it should throw error if an argument is not a string', () => {
        const emp = new Employee({}, [], 1, function () { });
        emp.validate(err => {
            expect(err.errors).to.exist;
        });
    });

    it('it should throw error if one argument is lacking', () => {
        const emp = new Employee({ firstName: 'abc', lastName: 'nkkiki' });
        emp.validate(err => {
            expect(err.errors).to.exist;
        });
    });

    it('it should not throw error if the arguments are correst', () => {
        const emp = new Employee({ firstName: 'abcs', lastName: 'nkksiki', department: 'ITdepart' });
        emp.validate(err => {
            expect(err).to.not.exist;
        });
    });

    after(() => {
        mongoose.models = {};
    })
})