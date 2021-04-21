import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import roles from "@controllers/roles";
import { roleFinder, rolePermission } from "@middlewares/role.middleware";

chai.use(chaiHttp);

describe("ROLE CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on CREATE ROLE", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await roles.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on ASSIGN PERMISSION", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await roles.assignpermissions({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on UNASSIGN PERMISSION", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await roles.unassignpermissions({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on UPDATE ROLE", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await roles.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GETALL ROLES ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await roles.getAll({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GET ROLE ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await roles.getById({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on DELETE ROLE", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await roles.delete({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND ROLE", async () => {
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

    await roleFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on ROLE role", async () => {
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

    await rolePermission(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
