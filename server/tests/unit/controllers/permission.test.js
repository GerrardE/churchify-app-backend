import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import permissions from "@controllers/permissions";
import { permissionFinder, permissionPermission } from "@middlewares/permission.middleware";

chai.use(chaiHttp);

describe("PERMISSION CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on CREATE PERMISSION", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await permissions.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on UPDATE PERMISSION", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await permissions.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GETALL PERMISSIONS ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await permissions.getAll({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GET PERMISSION ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await permissions.getById({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on DELETE PERMISSION", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await permissions.delete({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND PERMISSION", async () => {
    const next = sinon.spy();
    const mock = sinon.spy();
    const req = {
      params: {
        id: 1001111111111
      }
    };

    const res = {
      status: () => ({
        json: mock
      })
    };

    await permissionFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on PERMISSION PERMISSION", async () => {
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

    await permissionPermission(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
