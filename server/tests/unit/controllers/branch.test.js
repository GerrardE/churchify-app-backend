import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import branches from '@controllers/branches';
import { branchFinder, branchPermission } from '@middlewares/branchFinder';

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

  it('should handle error on FIND BRANCH', async () => {
    const next = sinon.spy();
    const mock = sinon.spy();
    const req = {
      params: {
        id: 5
      }
    };

    const res = {
      status: () => ({
        json: mock
      })
    };

    await branchFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on BRANCH PERMISSION', async () => {
    const next = sinon.spy();
    const mock = sinon.spy();
    const req = {
      params: {
        id: 1
      },
      decoded: {
        id: 1
      }
    };

    const res = {
      status: () => ({
        json: mock
      })
    };

    await branchPermission(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
