const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server.js');
const Department = require('../../models/department.model');
//const { post } = require('../../routes/departments.routes.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('POST /api/departments', () => {

    it('/ should insert new document to db and return success', async () => {
        const res = await request(server).post('/departments').send({ name: 'Department #1' });
        const newDepartment = await Department.findOne({ name: 'Department #1' });
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(newDepartment).to.not.be.null;
        expect(res.body.message).to.be.equal('OK');
    });

    after(async () => {
        await Department.deleteMany();
    });
});