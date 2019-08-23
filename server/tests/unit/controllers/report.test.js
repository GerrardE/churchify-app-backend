import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import reports from '@controllers/reports';

chai.use(chaiHttp);

describe('REPORT CONTROLLER TESTS', () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('should handle error on SUBMIT MEMBERSHIP REPORT', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await reports.membership({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on SUBMIT ATTENDANCE', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await reports.attendance({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on SUBMIT MIT REPORT', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await reports.mit({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on SUBMIT ACTIVITY REPORT', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await reports.activity({}, res);
    sinon.assert.calledOnce(mock);
  });
});
