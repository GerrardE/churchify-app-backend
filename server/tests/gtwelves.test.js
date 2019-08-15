import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';
import { createTestUser, generateToken } from './factory/user-factory';
import createTestZone from './factory/zone-factory';
import createTestBranch from './factory/branch-factory';

chai.use(chaiHttp);
const { expect } = chai;

let userToken, testUser, userId, testZone, testBranch;

describe('GTWELVE TESTS', () => {
  before(async () => {
    testUser = await createTestUser({});
    userToken = await generateToken({ id: testUser.id });
    userId = testUser.id;
    testZone = await createTestZone({ userId });
    const zoneId = testZone.id;
    testBranch = await createTestBranch({ userId, zoneId });
  });
  it('should return success on CREATE A GTWELVE', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/gtwelves')
        .set({ Authorization: userToken })
        .send({
          name: 'Akoka',
          country: 'Nigeria',
          state: 'Lagos',
          address: 'Afolabi brown street',
          city: 'Somolu',
          branchId: testBranch.id.toString(),
          description: 'Trem Akoka'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.eql('Gtwelve created successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should handle VALIDATION error', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/gtwelves')
        .set({ Authorization: userToken })
        .send({
          name: 'Ojodu',
          country: 'Nigeria',
          state: 'Lagos',
          address: 'A',
          city: 'Somolu',
          branchId: testBranch.id.toString(),
          description: 'Trem Ojodu'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          expect(res.body.errors.address).to.eql('address must be between 5 and 200 characters');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should handle UNIQUE VALIDATION error', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/gtwelves')
        .set({ Authorization: userToken })
        .send({
          name: 'Akoka',
          country: 'Nigeria',
          state: 'Lagos',
          address: 'Afolabi brown street',
          city: 'Somolu',
          branchId: testBranch.id.toString(),
          description: 'Trem Akoka'
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
});
