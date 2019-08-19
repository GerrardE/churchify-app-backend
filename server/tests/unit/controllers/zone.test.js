import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import zones from '@controllers/zones';

chai.use(chaiHttp);

describe('ZONE CONTROLLER TESTS', () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('should handle error on CREATE ZONE', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await zones.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on UPDATE ZONE', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await zones.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on DELETE ZONE', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await zones.delete({}, res);
    sinon.assert.calledOnce(mock);
  });
});
