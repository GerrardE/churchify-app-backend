import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import states from "@controllers/states";
import { stateFinder } from "@middlewares/state.middleware";

chai.use(chaiHttp);

describe("STATE CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on get all STATES BY COUNTRY ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };
    const req = {
      params: 10000000000000000000,
      state: {
        id: 100000000000000000000000000
      }
    };

    await states.getByCountryId(req, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GET STATE ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await states.getById({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND STATE", async () => {
    const next = sinon.spy();
    const mock = sinon.spy();
    const req = {
      params: {
        id: 100000000000000000000000000
      }
    };

    const res = {
      status: () => ({
        json: mock
      })
    };

    await stateFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
