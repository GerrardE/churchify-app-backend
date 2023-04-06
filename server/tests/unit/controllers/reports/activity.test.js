import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { ActivityController as activity } from "@controllers/reports";
import { activityFinder, activityPermission } from "@middlewares/reports";

chai.use(chaiHttp);

describe("ACTIVITY CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on CREATE ACTIVITY", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await activity.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on UPDATE ACTIVITY", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await activity.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GETALL ACTIVITYS ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await activity.getAll({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GET ACTIVITY ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await activity.getById({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on DELETE ACTIVITY", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await activity.delete({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND ACTIVITY", async () => {
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

    await activityFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on ACTIVITY PERMISSION", async () => {
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

    await activityPermission(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
