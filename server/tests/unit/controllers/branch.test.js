import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import branches from '@controllers/branches';

chai.use(chaiHttp);

describe('BRANCH CONTROLLER TESTS', () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('should handle error on CREATE BRANCH', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await branches.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on UPDATE BRANCH', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await branches.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on DELETE BRANCH', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await branches.delete({}, res);
    sinon.assert.calledOnce(mock);
  });
});
