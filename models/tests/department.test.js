const mongoose = require('mongoose');
const Department = require('../department.model');
const expect = require('chai').expect;

describe('Department', () => {
    it('should throw an error if no "name" arg', () => {
        const testDepartment = new Department({}); // create new Department, but don't set `name` attr value
        testDepartment.validate(err => {
            expect(err.errors.name).to.exist;
        });
    });
    it('should throw an error if "name" is not a string', () => {
        const cases = [{}, []];
        for (let name of cases) {
            const testDepartment= new Department({ name });
            testDepartment.validate(err => {
                expect(err.errors.name).to.exist;
            })
        }
    });

    it('should throw an error if "name" hass less than 5 or longer than 20 characters', () => {
        const cases = ['q', 'qw', 'qwer', 'qwsaqwsderfdewsaqwsde'];
        for (let name of cases) {
            const testDepartment= new Department({ name });
            testDepartment.validate(err => {
                expect(err.errors.name).to.exist;
            })
        }
    });

    it('should not throw an error if "name" is correct', () => {
        const cases = ['qwert', 'qwertyu', 'xswedcvfrt', 'qwzxcvbnm sdfghjklqw'];
        for (let name of cases) {
            const testDepartment= new Department({ name });
            testDepartment.validate(err => {
                expect(err).to.not.exist;
            })
        }
    })
})