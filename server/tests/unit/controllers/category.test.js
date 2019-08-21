import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import categories from '@controllers/categories';
import { categoryFinder, categoryPermission } from '@middlewares/categoryFinder';

chai.use(chaiHttp);

describe('CATEGORY CONTROLLER TESTS', () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('should handle error on CREATE CATEGORY', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await categories.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on UPDATE CATEGORY', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await categories.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on DELETE CATEGORY', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await categories.delete({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on FIND CATEGORY', async () => {
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

    await categoryFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on CATEGORY PERMISSION', async () => {
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

    await categoryPermission(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
