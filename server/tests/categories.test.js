import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';
import { createTestUser, generateToken } from './factory/user-factory';

chai.use(chaiHttp);
const { expect } = chai;

let userToken, testUser;

describe('CATEGORIES TESTS', () => {
  before(async () => {
    testUser = await createTestUser({});
    userToken = await generateToken({ id: testUser.id });
  });
  it('should return success on CREATE A CATEGORY', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/categories')
        .set({ Authorization: userToken })
        .send({
          name: 'Akoka',
          description: 'Best of akoka'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.eql('Category created successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should handle VALIDATION error', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/categories')
        .set({ Authorization: userToken })
        .send({
          name: 'A',
          description: 'Best of akoka'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          expect(res.body.errors.name).to.eql('name must be between 2 and 20 characters');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should handle UNIQUE VALIDATION error', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/categories')
        .set({ Authorization: userToken })
        .send({
          name: 'Akoka',
          description: 'Best of akoka'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          expect(res.body.errors.name).to.eql('name has already been taken');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return success on GET ALL CATEGORIES', (done) => {
    try {
      chai.request(index)
        .get('/api/v1/categories')
        .set({ Authorization: userToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.eql('Categories retrieved successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return success on UPDATE A CATEGORY', (done) => {
    try {
      chai.request(index)
        .put(`/api/v1/categories/${1}`)
        .set({ Authorization: userToken })
        .send({
          name: 'Ejigbo',
          description: 'Best of ejigbo'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.eql('Category updated successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should handle VALIDATION error', (done) => {
    try {
      chai.request(index)
        .put(`/api/v1/categories/${1}`)
        .set({ Authorization: userToken })
        .send({
          name: 'A',
          description: 'Best of akoka'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          expect(res.body.errors.name).to.eql('name must be between 2 and 20 characters');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return success on DELETE A CATEGORY', (done) => {
    try {
      chai.request(index)
        .delete(`/api/v1/categories/${1}`)
        .set({ Authorization: userToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.eql('Category deleted successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});
