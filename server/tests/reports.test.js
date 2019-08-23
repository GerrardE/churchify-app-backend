import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';
import { createTestUser, generateToken } from './factory/user-factory';
import createTestZone from './factory/zone-factory';
import createTestBranch from './factory/branch-factory';
import createTestGtwelve from './factory/gtwelve-factory';
import createTestEvent from './factory/event-factory';
import createTestPreacher from './factory/preacher-factory';

chai.use(chaiHttp);
const { expect } = chai;

let userToken, testUser, userId, testZone, testBranch, testPreacher, testEvent, testGtwelve;

describe('REPORT TESTS', () => {
  before(async () => {
    testUser = await createTestUser({});
    userToken = await generateToken({ id: testUser.id });
    userId = testUser.id;
    testZone = await createTestZone({ userId });
    const zoneId = testZone.id;
    testBranch = await createTestBranch({ userId, zoneId });
    const branchId = testBranch.id;
    testEvent = await createTestEvent({ userId, branchId });
    testPreacher = await createTestPreacher({ userId, branchId });
    testGtwelve = await createTestGtwelve({ userId, branchId });
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

  it('should return success on SUBMIT AN ATTENDANCE', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/reports/attendance')
        .set({ Authorization: userToken })
        .send({
          children: '12',
          women: '12',
          men: '11',
          eventId: testEvent.id.toString(),
          preacherId: testPreacher.id.toString(),
          notes: 'A very good note',
          branchId: testBranch.id.toString()
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.eql('Attendance submitted successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should return VALIDATION ERROR on SUBMIT AN ATTENDANCE', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/reports/attendance')
        .set({ Authorization: userToken })
        .send({
          children: '12',
          women: '12',
          men: '11',
          eventId: testEvent.id.toString(),
          preacherId: testPreacher.id.toString(),
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

  it('should return success on SUBMIT AN MIT REPORT', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/reports/mit')
        .set({ Authorization: userToken })
        .send({
          trainees: '23',
          converts: '1',
          notes: 'Good mit report',
          branchId: testBranch.id.toString()
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.eql('MIT report submitted successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should return VALIDATION ERROR on SUBMIT AN MIT REPORT', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/reports/mit')
        .set({ Authorization: userToken })
        .send({
          trainees: '23',
          converts: '1',
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

  it('should return success on SUBMIT AN ACTIVITY REPORT', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/reports/activity')
        .set({ Authorization: userToken })
        .send({
          council: '2',
          special: '4',
          project: '2',
          notes: 'God report',
          branchId: testBranch.id.toString()
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.eql('Activity report submitted successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should return VALIDATION ERROR on SUBMIT AN ACTIVITY REPORT', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/reports/activity')
        .set({ Authorization: userToken })
        .send({
          council: '2',
          special: '4',
          project: '2',
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

  it('should return success on SUBMIT A GROUP REPORT', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/reports/group')
        .set({ Authorization: userToken })
        .send({
          cmf: '13',
          cwf: '1',
          cyf: '12',
          rcf: '7',
          branchId: testBranch.id.toString(),
          notes: 'Nice group report'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.eql('Group report submitted successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should return VALIDATION ERROR on SUBMIT A GROUP REPORT', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/reports/group')
        .set({ Authorization: userToken })
        .send({
          cmf: '13',
          cwf: '1',
          cyf: '12',
          rcf: '7',
          branchId: testBranch.id.toString(),
          notes: ''
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

  it('should return success on SUBMIT A GTWELVE REPORT', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/reports/greport')
        .set({ Authorization: userToken })
        .send({
          newcells: '1',
          totalcells: '11',
          attendance: '2',
          gtwelveId: testGtwelve.id.toString(),
          notes: 'Good job on the report'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.eql('Gtwelve report submitted successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should return VALIDATION ERROR on SUBMIT A GTWELVE REPORT', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/reports/greport')
        .set({ Authorization: userToken })
        .send({
          newcells: '1',
          totalcells: '11',
          attendance: '2',
          gtwelveId: testGtwelve.id.toString(),
          notes: ''
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
