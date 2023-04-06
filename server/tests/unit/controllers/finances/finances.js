import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { FinanceController as finance } from "@controllers/finances";
import { financeFinder, financePermission } from "@middlewares/finances";

chai.use(chaiHttp);

describe("FINANCE CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on CREATE FINANCE", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await finance.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on UPDATE FINANCE", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await finance.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GETALL FINANCES ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await finance.getAll({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GET FINANCE ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await finance.getById({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on DELETE FINANCE", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await finance.delete({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND FINANCE", async () => {
    const next = sinon.spy();
    const mock = sinon.spy();
    const req = {
      params: {
        id: 51090290190
      }
    };

    const res = {
      status: () => ({
        json: mock
      })
    };

    await financeFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FINANCE PERMISSION", async () => {
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

    await financePermission(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
