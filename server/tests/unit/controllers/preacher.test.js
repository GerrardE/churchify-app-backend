import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import preachers from '@controllers/preachers';

chai.use(chaiHttp);

describe('PREACHER CONTROLLER TESTS', () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('should handle error on CREATE PREACHER', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await preachers.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on UPDATE PREACHER', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await preachers.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on DELETE PREACHER', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await preachers.delete({}, res);
    sinon.assert.calledOnce(mock);
  });
});
