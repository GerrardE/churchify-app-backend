import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';
import { createTestUser, generateToken } from './factory/user-factory';
import createTestZone from './factory/zone-factory';
import createTestBranch from './factory/branch-factory';

chai.use(chaiHttp);
const { expect } = chai;

let userToken, testUser, userId, testZone, testBranch;

describe('PREACHERS TESTS', () => {
  before(async () => {
    testUser = await createTestUser({});
    userToken = await generateToken({ id: testUser.id });
    userId = testUser.id;
    testZone = await createTestZone({ userId });
    const zoneId = testZone.id;
    testBranch = await createTestBranch({ userId, zoneId });
  });
  it('should return success on CREATE A PREACHER', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/preachers')
        .set({ Authorization: userToken })
        .send({
          firstname: 'Ugo',
          lastname: 'Eze',
          country: 'Nigeria',
          state: 'Lagos',
          address: 'Lagos',
          city: 'Lagos',
          branchId: testBranch.id.toString(),
          description: 'A good coach'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.eql('Preacher created successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should handle VALIDATION error', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/preachers')
        .set({ Authorization: userToken })
        .send({
          firstname: 'U',
          lastname: 'Eze',
          country: 'Nigeria',
          state: 'Lagos',
          address: 'Lagos',
          city: 'Lagos',
          branchId: testBranch.id.toString(),
          description: 'A good coach'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          expect(res.body.errors.firstname).to.eql('firstname must be between 2 and 20 characters');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return success on GET ALL PREACHERS', (done) => {
    try {
      chai.request(index)
        .get('/api/v1/preachers')
        .set({ Authorization: userToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.eql('Preachers retrieved successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return success on UPDATE A PREACHER', (done) => {
    try {
      chai.request(index)
        .put(`/api/v1/preachers/${1}`)
        .set({ Authorization: userToken })
        .send({
          firstname: 'Ugochucku',
          lastname: 'Eze',
          country: 'Nigeria',
          state: 'Lagos',
          address: 'Lagos',
          city: 'Lagos',
          branchId: testBranch.id.toString(),
          description: 'A good coach'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.eql('Preacher updated successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should handle VALIDATION error', (done) => {
    try {
      chai.request(index)
        .put(`/api/v1/preachers/${1}`)
        .set({ Authorization: userToken })
        .send({
          firstname: 'U',
          lastname: 'Eze',
          country: 'Nigeria',
          state: 'Lagos',
          address: 'Lagos',
          city: 'Lagos',
          branchId: testBranch.id.toString(),
          description: 'A good coach'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          expect(res.body.errors.firstname).to.eql('firstname must be between 2 and 20 characters');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return success on DELETE A PREACHER', (done) => {
    try {
      chai.request(index)
        .delete(`/api/v1/preachers/${1}`)
        .set({ Authorization: userToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.eql('Preacher deleted successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});
