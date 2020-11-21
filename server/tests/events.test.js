import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';
import { createTestUser, generateToken } from './factory/user-factory';
import createTestZone from './factory/zone-factory';
import createTestBranch from './factory/branch-factory';

chai.use(chaiHttp);
const { expect } = chai;

let userToken, testUser, userid, testZone, testBranch;

describe('EVENTS TESTS', () => {
  before(async () => {
    testUser = await createTestUser({});
    userToken = await generateToken({ id: testUser.id });
    userid = testUser.id;
    testZone = await createTestZone({ userid });
    const zoneid = testZone.id;
    testBranch = await createTestBranch({ userid, zoneid });
  });
  it('should return success on CREATE AN EVENT', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/events')
        .set({ Authorization: userToken })
        .send({
          branchid: testBranch.id.toString(),
          name: 'Power For Living',
          date: Date.now(),
          notes: 'A good event'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.eql('Event created successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should handle VALIDATION error', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/events')
        .set({ Authorization: userToken })
        .send({
          branchid: testBranch.id.toString(),
          name: 'P',
          date: Date.now(),
          notes: 'A good event'
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
        .post('/api/v1/events')
        .set({ Authorization: userToken })
        .send({
          branchid: testBranch.id.toString(),
          name: 'Power For Living',
          date: Date.now(),
          notes: 'A good event'
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

  it('should return success on GET ALL EVENTS', (done) => {
    try {
      chai.request(index)
        .get('/api/v1/events')
        .set({ Authorization: userToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.eql('Events retrieved successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return success on UPDATE AN EVENT', (done) => {
    try {
      chai.request(index)
        .put(`/api/v1/events/${1}`)
        .set({ Authorization: userToken })
        .send({
          branchid: testBranch.id.toString(),
          name: 'Power',
          date: Date.now(),
          notes: 'A good event'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.eql('Event updated successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should handle VALIDATION error', (done) => {
    try {
      chai.request(index)
        .put(`/api/v1/events/${1}`)
        .set({ Authorization: userToken })
        .send({
          branchid: testBranch.id.toString(),
          name: 'P',
          date: Date.now(),
          notes: 'A good event'
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

  it('should return success on DELETE AN EVENT', (done) => {
    try {
      chai.request(index)
        .delete(`/api/v1/events/${1}`)
        .set({ Authorization: userToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.eql('Event deleted successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});
