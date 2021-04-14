import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import branches from "@controllers/branches";
import { branchFinder, branchPermission } from "@middlewares/branch.middleware";

chai.use(chaiHttp);

describe("BRANCH CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on CREATE BRANCH", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await branches.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on UPDATE BRANCH", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await branches.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GETALL BRANCHES ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await branches.getAll({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GET BRANCH ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await branches.getById({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on DELETE BRANCH", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await branches.delete({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND BRANCH", async () => {
    const next = sinon.spy();
    const mock = sinon.spy();
    const req = {
      params: {
        id: 100
      }
    };

    const res = {
      status: () => ({
        json: mock
      })
    };

    await branchFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on BRANCH PERMISSION", async () => {
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

    await branchPermission(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
