import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import countries from "@controllers/countries";
import countryFinder from "@middlewares/country.middleware";

chai.use(chaiHttp);

describe("COUNTRY CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on get all COUNTRIES ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await countries.getAll({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GET COUNTRY ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await countries.getById({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND COUNTRY", async () => {
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

    await countryFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
