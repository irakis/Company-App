const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');


describe('Employee', () => {
    it('it should throw error if there is no arg', () => {
        const testEmployee= new Employee({});
        testEmployee.validate(err => {
            expect(err.errors).to.exist;
        });
    });

    it('it should throw error if an argument is not a string', () => {
        const testEmployee= new Employee({}, [], 1, function () { });
        testEmployee.validate(err => {
            expect(err.errors).to.exist;
        });
    });

    it('it should throw error if one argument is lacking', () => {
        const testEmployee= new Employee({ firstName: 'abc', lastName: 'nkkiki' });
        testEmployee.validate(err => {
            expect(err.errors).to.exist;
        });
    });

    it('it should not throw error if the arguments are correst', () => {
        const testEmployee= new Employee({ firstName: 'abcs', lastName: 'nkksiki', department: 'ITdepart' });
        testEmployee.validate(err => {
            expect(err).to.not.exist;
        });
    });
})