import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { GroupController as group } from "@controllers/reports";
import { groupFinder, groupPermission } from "@middlewares/reports";

chai.use(chaiHttp);

describe("GROUP CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on CREATE GROUP", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await group.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on UPDATE GROUP", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await group.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GETALL GROUPS ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await group.getAll({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GET GROUP ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await group.getById({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on DELETE GROUP", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await group.delete({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND GROUP", async () => {
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

    await groupFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GROUP PERMISSION", async () => {
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

    await groupPermission(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
