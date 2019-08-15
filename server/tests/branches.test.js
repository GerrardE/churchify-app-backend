import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';
import { createTestUser, generateToken } from './factory/user-factory';
import createTestZone from './factory/zone-factory';

chai.use(chaiHttp);
const { expect } = chai;

let userToken, testUser, userId, testZone;

describe('BRANCH TESTS', () => {
  before(async () => {
    testUser = await createTestUser({});
    userToken = await generateToken({ id: testUser.id });
    userId = testUser.id;
    testZone = await createTestZone({ userId });
  });
  it('should return success on CREATE A BRANCH', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/branches')
        .set({ Authorization: userToken })
        .send({
          name: 'Akoka',
          country: 'Nigeria',
          state: 'Lagos',
          address: 'Afolabi brown street',
          city: 'Somolu',
          zoneId: testZone.id.toString(),
          description: 'Trem Akoka'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.eql('Branch created successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should handle VALIDATION error', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/branches')
        .set({ Authorization: userToken })
        .send({
          name: 'Ojodu',
          country: 'Nigeria',
          state: 'Lagos',
          address: 'A',
          city: 'Somolu',
          zoneId: testZone.id.toString(),
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
        .post('/api/v1/branches')
        .set({ Authorization: userToken })
        .send({
          name: 'Akoka',
          country: 'Nigeria',
          state: 'Lagos',
          address: 'Afolabi brown street',
          city: 'Somolu',
          zoneId: testZone.id.toString(),
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
