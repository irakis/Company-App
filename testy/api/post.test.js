const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server.js');
const Department = require('../../models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('POST /api/departments', () => {

    it('/ should insert new document to db and return success', async () => {
        const res = await request(server).post('/api/departments').send({ name: 'Department #4' });
        const newDepartment = await Department.findOne({ name: 'Department #4' });
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(newDepartment).to.not.be.null;
    });

    after(async () => {
        await Department.deleteMany();
    });
});