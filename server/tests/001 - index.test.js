import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';
import createTestCountry from './factory/country-factory';
import createTestState from './factory/state-factory';
import createTestCity from './factory/city-factory';
import createTestZone from './factory/zone-factory';
import createTestBranch from './factory/branch-factory';

chai.use(chaiHttp);
const { expect } = chai;

describe('TEST TO CHECK BASE ROUTE ', () => {
  before(async () => {
    await createTestCountry({});
    await createTestState({});
    await createTestCity({});
    await createTestZone({});
    await createTestBranch({});
  });

  it('should return success on hitting base route', (done) => {
    try {
      chai.request(index)
        .get('/api/v1/')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.text).to.eql('Welcome to the Churchify-App API');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});
