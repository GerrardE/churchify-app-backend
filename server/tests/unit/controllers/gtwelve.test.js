import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import gtwelves from '@controllers/gtwelves';
import { gtwelveFinder, gtwelvePermission } from '@middlewares/gtwelveFinder';

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

  it('should handle error on FIND GTWELVE', async () => {
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

    await gtwelveFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on GTWELVE PERMISSION', async () => {
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

    await gtwelvePermission(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
