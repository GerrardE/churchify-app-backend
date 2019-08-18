import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import downloads from '@controllers/downloads';

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
});
