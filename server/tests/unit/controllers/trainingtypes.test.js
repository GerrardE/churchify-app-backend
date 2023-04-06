import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import trainingtypes from "@controllers/trainingtypes";
import { trainingTypeFinder, trainingTypePermission } from "@middlewares/trainingtypes.middleware";

chai.use(chaiHttp);

describe("TRAININGTYPE CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on CREATE TRAININGTYPE", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await trainingtypes.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on UPDATE TRAININGTYPE", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await trainingtypes.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GETALL TRAININGTYPES ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await trainingtypes.getAll({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GET TRAININGTYPE ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await trainingtypes.getById({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on DELETE TRAININGTYPE", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await trainingtypes.delete({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND TRAININGTYPE", async () => {
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

    await trainingTypeFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on TRAININGTYPE PERMISSION", async () => {
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

    await trainingTypePermission(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
