import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import downloads from '@controllers/downloads';
import { downloadFinder, downloadPermission } from '@middlewares/downloadFinder';

chai.use(chaiHttp);

describe('DOWNLOAD CONTROLLER TESTS', () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('should handle error on CREATE DOWNLOAD', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await downloads.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on UPDATE DOWNLOAD', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await downloads.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on DELETE DOWNLOAD', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await downloads.delete({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on FIND DOWNLOAD', async () => {
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

    await downloadFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on DOWNLOAD PERMISSION', async () => {
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

    await downloadPermission(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
