import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';
import { createTestUser, generateToken } from './factory/user-factory';
import createTestCategory from './factory/category-factory';

chai.use(chaiHttp);
const { expect } = chai;

let userToken, testUser, testCategory;

describe('DOWNLOADS TESTS', () => {
  before(async () => {
    testUser = await createTestUser({});
    userToken = await generateToken({ id: testUser.id });
    const userid = testUser.id;
    testCategory = await createTestCategory({ userid });
  });
  it('should return success on CREATE A DOWNLOAD', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/downloads')
        .set({ Authorization: userToken })
        .send({
          name: 'Jaja',
          url: 'www.james.de',
          date: Date.now(),
          categoryid: testCategory.id.toString(),
          notes: 'Ebook TCF'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.eql('Download created successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should handle VALIDATION error', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/downloads')
        .set({ Authorization: userToken })
        .send({
          name: 'J',
          url: 'www.james.de',
          date: Date.now(),
          categoryid: '2',
          notes: 'Ebook TCF'
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
        .post('/api/v1/downloads')
        .set({ Authorization: userToken })
        .send({
          name: 'Jaja',
          url: 'www.james.de',
          date: Date.now(),
          categoryid: testCategory.id.toString(),
          notes: 'Ebook TCF'
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

  it('should return success on GET ALL DOWNLOADS', (done) => {
    try {
      chai.request(index)
        .get('/api/v1/downloads')
        .set({ Authorization: userToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.eql('Downloads retrieved successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return success on UPDATE A DOWNLOAD', (done) => {
    try {
      chai.request(index)
        .put(`/api/v1/downloads/${1}`)
        .set({ Authorization: userToken })
        .send({
          name: 'Jaja',
          url: 'www.james.de',
          date: Date.now(),
          categoryid: testCategory.id.toString(),
          notes: 'Ebook TCF'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.eql('Download updated successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should handle VALIDATION error', (done) => {
    try {
      chai.request(index)
        .put(`/api/v1/downloads/${1}`)
        .set({ Authorization: userToken })
        .send({
          name: 'J',
          url: 'www.james.de',
          date: Date.now(),
          categoryid: testCategory.id.toString(),
          notes: 'Ebook TCF'
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

  it('should return success on DELETE A DOWNLOAD', (done) => {
    try {
      chai.request(index)
        .delete(`/api/v1/downloads/${1}`)
        .set({ Authorization: userToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.eql('Download deleted successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});
