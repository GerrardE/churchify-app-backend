import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('TEST TO CHECK BASE ROUTE ', () => {
  it('should return success on hitting base route', (done) => {
    try {
      chai.request(index)
        .get('/api/v1/')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.text).to.eql('Welcome to the TremDev API');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});
