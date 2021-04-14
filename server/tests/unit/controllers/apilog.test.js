import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import apilogs from "@controllers/apilogs";
import { apilogFinder, apilogPermission } from "@middlewares/apilog.middleware";

chai.use(chaiHttp);

describe("APILOG CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on UPDATE APILOG", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await apilogs.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GETALL APILOGS ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await apilogs.getAll({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GET APILOG ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await apilogs.getById({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on DELETE APILOG", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await apilogs.delete({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND apilog", async () => {
    const next = sinon.spy();
    const mock = sinon.spy();
    const req = {
      params: {
        id: 100000
      }
    };

    const res = {
      status: () => ({
        json: mock
      })
    };

    await apilogFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on APILOG PERMISSION", async () => {
    const next = sinon.spy();
    const mock = sinon.spy();
    const req = {
      params: {
        id: 1
      },
      decoded: {
        id: "4ccefe52-303f-49e1-af34-cc9975a5c57f"
      }
    };

    const res = {
      status: () => ({
        json: mock
      })
    };

    await apilogPermission(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
