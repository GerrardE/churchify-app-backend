import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import events from '@controllers/events';

chai.use(chaiHttp);

describe('EVENT CONTROLLER TESTS', () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('should handle error on CREATE EVENT', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await events.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on UPDATE EVENT', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await events.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on DELETE EVENT', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await events.delete({}, res);
    sinon.assert.calledOnce(mock);
  });
});
