import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import gtwelves from '@controllers/gtwelves';

chai.use(chaiHttp);

describe('GTWELVE CONTROLLER TESTS', () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('should handle error on CREATE GTWELVE', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await gtwelves.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on UPDATE GTWELVE', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await gtwelves.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on DELETE GTWELVE', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await gtwelves.delete({}, res);
    sinon.assert.calledOnce(mock);
  });
});
