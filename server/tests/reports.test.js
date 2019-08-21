import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';
import { createTestUser, generateToken } from './factory/user-factory';
import createTestZone from './factory/zone-factory';
import createTestBranch from './factory/branch-factory';

chai.use(chaiHttp);
const { expect } = chai;

let userToken, testUser, userId, testZone, testBranch;

describe('REPORTS TESTS', () => {
  before(async () => {
    testUser = await createTestUser({});
    userToken = await generateToken({ id: testUser.id });
    userId = testUser.id;
    testZone = await createTestZone({ userId });
    const zoneId = testZone.id;
    testBranch = await createTestBranch({ userId, zoneId });
  });
  it('should return success on SUBMIT A MEMBERSHIP REPORT', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/reports/membership')
        .set({ Authorization: userToken })
        .send({
          adults: '10',
          children: '2',
          tithers: '12',
          newMembers: '11',
          notes: 'good report',
          branchId: testBranch.id.toString()
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.eql('Membership report submitted successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should return VALIDATION ERROR on SUBMIT A MEMBERSHIP REPORT', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/reports/membership')
        .set({ Authorization: userToken })
        .send({
          adults: '10',
          children: '2',
          tithers: '12',
          newMembers: '11',
          notes: '',
          branchId: testBranch.id.toString()
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          expect(res.body.errors.notes).to.eql('notes field is required');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});
