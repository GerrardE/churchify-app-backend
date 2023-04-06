import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { RemunerationController as remuneration } from "@controllers/finances";
import { remunerationFinder, remunerationPermission } from "@middlewares/finances";

chai.use(chaiHttp);

describe("REMUNERATION CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on CREATE REMUNERATION", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await remuneration.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on UPDATE REMUNERATION", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await remuneration.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GETALL REMUNERATIONS ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await remuneration.getAll({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GET REMUNERATION ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await remuneration.getById({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on DELETE REMUNERATION", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await remuneration.delete({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND REMUNERATION", async () => {
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

    await remunerationFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on REMUNERATION PERMISSION", async () => {
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

    await remunerationPermission(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
