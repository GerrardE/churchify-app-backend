import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('TESTS TO SIGNUP ', () => {
  it('should return success on sign up', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Test',
          lastname: 'User',
          phone: '08086814343',
          email: 'test@gmail.com',
          branchid: '1',
          country: '161',
          password: 'testpass'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.user).to.be.an('object');
          expect(res.body.user.token).to.be.a('string');
          expect(res.body).to.have.property('user');
          expect(res.body.message).to.eql('Registration successful');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should handle validation error', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Test',
          lastname: 'User',
          phone: '08086814343',
          email: 'test@gmail',
          branchid: '1',
          country: '161',
          password: 'testpass'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          expect(res.body.errors.email).to.eql('Email is invalid');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should handle unique validation error', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Test',
          lastname: 'User',
          phone: '08086814343',
          email: 'test@gmail.com',
          branchid: '1',
          country: '161',
          password: 'testpass'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          expect(res.body.errors.email).to.eql('email has already been taken');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});

describe('TESTS TO LOGIN ', () => {
  it('should return success on LOGIN', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/auth/signin')
        .send({
          email: 'test@gmail.com',
          password: 'testpass'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.user).to.be.an('object');
          expect(res.body.user.token).to.be.a('string');
          expect(res.body).to.have.property('user');
          expect(res.body.message).to.eql('Login successful');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should return invalid PASSWORD LOGIN', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/auth/signin')
        .send({
          email: 'test@gmail.com',
          password: 'testpas'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body.errors).to.eql('Invalid email or password');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should return invalid EMAIL LOGIN', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/auth/signin')
        .send({
          email: 'tests@gmail.com',
          password: 'testpass'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body.errors).to.eql('Invalid email or password');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should handle VALIDATION ERROR', (done) => {
    try {
      chai.request(index)
        .post('/api/v1/auth/signin')
        .send({
          email: 'test@gmailcom',
          password: 'testpass'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body.errors.email).to.eql('Email is invalid');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});
