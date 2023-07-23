import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import cities from "@controllers/cities";
import { cityFinder } from "@middlewares/city.middleware";

chai.use(chaiHttp);

describe("CITY CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on GETALL CITIES BY STATE ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await cities.getByStateId({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GET CITY ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await cities.getById({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND CITY", async () => {
    const next = sinon.spy();
    const mock = sinon.spy();
    const req = {
      params: {
        id: 10000000000000000000000
      }
    };

    const res = {
      status: () => ({
        json: mock
      })
    };

    await cityFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
