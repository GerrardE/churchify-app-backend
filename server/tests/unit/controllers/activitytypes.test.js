import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import activitytypes from "@controllers/activitytypes";
import { activityTypeFinder, activityTypePermission } from "@middlewares/activitytypes.middleware";

chai.use(chaiHttp);

describe("ACTIVITYTYPE CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on CREATE ACTIVITYTYPE", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await activitytypes.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on UPDATE ACTIVITYTYPE", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await activitytypes.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GETALL ACTIVITYTYPES ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await activitytypes.getAll({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GET ACTIVITYTYPE ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await activitytypes.getById({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on DELETE ACTIVITYTYPE", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await activitytypes.delete({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND ACTIVITYTYPE", async () => {
    const next = sinon.spy();
    const mock = sinon.spy();
    const req = {
      params: {
        id: 50190922234
      }
    };

    const res = {
      status: () => ({
        json: mock
      })
    };

    await activityTypeFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on ACTIVITYTYPE PERMISSION", async () => {
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

    await activityTypePermission(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
