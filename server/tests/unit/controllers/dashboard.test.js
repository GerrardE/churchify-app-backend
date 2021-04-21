import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import dashboard from "@controllers/dashboard";

chai.use(chaiHttp);

describe("DASHBOARD CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on GETALL STATISTICS ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await dashboard.getStatistics({}, res);
    sinon.assert.calledOnce(mock);
  });
});
