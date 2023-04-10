import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { FreportController as freport } from "@controllers/reports";
import { freportFinder, freportPermission } from "@middlewares/reports";

chai.use(chaiHttp);

describe("FREPORT CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on CREATE FREPORT", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await freport.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on UPDATE FREPORT", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await freport.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GETALL FREPORTS ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await freport.getAll({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GET FREPORT ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await freport.getById({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on DELETE FREPORT", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await freport.delete({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND FREPORT", async () => {
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

    await freportFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FREPORT PERMISSION", async () => {
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

    await freportPermission(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
