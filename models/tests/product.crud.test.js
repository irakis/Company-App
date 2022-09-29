const { after } = require('mocha');
const Product = require('../product.model');
const mongoose = require('mongoose');
const expect = require('chai').expect;

describe('Product', () => {

    before(async () => {
        try {
            await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch (err) {
            console.error(err);
        }
    });

    describe('Reading data', () => {

        before(async () => {
            const testProductOne = new Product({ name: 'Name #1', client: 'client #1' });
            testProductOne.save();
            const testProductTwo = new Product({ name: 'Name #2', client: 'client #2' });
            testProductTwo.save();
            const testProductThree = new Product({ name: 'Name #3', client: 'client #3' });
            testProductThree.save();
        });

        it('should return all elements with "find" method', async () => {
            const testProduct = await Product.find();
            const expectedProductLength = 3;
            expect(testProduct.length).to.be.equal(expectedProductLength);
        });

        it('should return proper element by name with "findOne" method', async () => {
            const selectedProduct = await Product.findOne({ name: 'Name #3' });
            const testProductThree = 'Name #3';
            expect(selectedProduct.name).to.be.equal(testProductThree);
        });

        after(async () => {
            await Product.deleteMany()
        });
    });

    describe('Creating data', () => {

        it('should crete new object with "insertOne" method', async () => {
            const testProductFour = new Product({ name: 'Name #4', client: 'client #4' });
            await testProductFour.save();
            expect(testProductFour.isNew).to.be.false;
        })
    });

    describe('Updating data', () => {

        beforeEach(async () => {
            const testProductOne = new Product({ name: 'Name #1', client: 'client #1' });
            testProductOne.save();
            const testProductTwo = new Product({ name: 'Name #2', client: 'client #2' });
            testProductTwo.save();
            const testProductThree = new Product({ name: 'Name #3', client: 'client #3' });
            testProductThree.save();
        });

        it('should update proper element by name with "updateOne" method', async () => {
            await Product.updateOne({ name: 'Name #1' }, { $set: { name: 'Name ##1' } });
            const selectedProduct = await Product.findOne({ name: 'Name ##1' })
            expect(selectedProduct.name).to.be.equal('Name ##1');
        });

        it('should upadate peroper elemnt with "save" method', async () => {
            const selectedProduct = await Product.findOne({ name: 'Name #2' });
            selectedProduct.name = 'Name ##2';
            await selectedProduct.save();
            expect(selectedProduct.name).to.be.equal('Name ##2')
        });

        it('should update all items with "updateMany" method', async () => {
            const selectedProduct = await Product.find();
            const editedProduct = await Product.updateMany({ $set: { name: 'Doe' } });
            const amounOfEditedProduct = (await Product.find({ name: 'Doe' })).length
            expect(Product.length).to.be.equal(amounOfEditedProduct)
        });

        afterEach(async () => {
            await Product.deleteMany()
        });
    });

    describe('Deleting data', () => {

        beforeEach(async () => {
            const testProductOne = new Product({ name: 'Name #1', client: 'client #1' });
            testProductOne.save();
            const testProductTwo = new Product({ name: 'Name #2', client: 'client #2' });
            testProductTwo.save();
            const testProductThree = new Product({ name: 'Name #3', client: 'client #3' });
            testProductThree.save();
        });

        it('should delete one proper element with "deleteOne" method', async () => {
            const deletedProduct = await Product.deleteOne({ name: 'Name #1' });
            const findDeletedProduct = await Product.findOne({ name: 'Name #1' })
            expect(findDeletedProduct).to.be.null;
        });

        it('should delete one element with "remove" method', async () => {
            const selectedProduct = await Product.findOne({ name: 'Name #3' });
            await selectedProduct.remove();
            const removedProduct = await Product.findOne({ name: 'Name #3' });
            expect(removedProduct).to.be.null;
        });

        it('should delete many items with "deleteMany" method', async () => {
            await Product.deleteMany()
            const amountOfProducts = (await Product.find()).length;
            expect(amountOfProducts).to.be.equal(0);
        });

        afterEach(async () => {
            try {
                await Product.deleteMany()
            } catch (e) {
                console.log(e);
            }
        });
    });

    after(async () => {
        mongoose.models = {};
    });
});