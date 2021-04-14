import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import preachers from "@controllers/preachers";
import { preacherFinder, preacherPermission } from "@middlewares/preacher.middleware";

chai.use(chaiHttp);

describe("PREACHER CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on CREATE PREACHER", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await preachers.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on UPDATE PREACHER", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await preachers.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on DELETE PREACHER", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await preachers.delete({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND PREACHER", async () => {
    const next = sinon.spy();
    const mock = sinon.spy();
    const req = {
      params: {
        id: 5
      }
    };

    const res = {
      status: () => ({
        json: mock
      })
    };

    await preacherFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on PREACHER PERMISSION", async () => {
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

    await preacherPermission(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
