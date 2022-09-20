const expect =require('chai').expect;
const mongoose = require('mongoose');
const Department = require('../department.model');

describe('Department', () => {
    it('it should throw error if there is no ar',() => {

    });

    after(() => {
        mongoose.models = {}
    })
})