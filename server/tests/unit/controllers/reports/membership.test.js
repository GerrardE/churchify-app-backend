import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { MembershipController as membership } from "@controllers/reports";
import { membershipFinder, membershipPermission } from "@middlewares/reports";

chai.use(chaiHttp);

describe("MEMBERSHIP CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on CREATE MEMBERSHIP", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await membership.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on UPDATE MEMBERSHIP", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await membership.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GETALL MEMBERSHIPS ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await membership.getAll({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GET MEMBERSHIP ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await membership.getById({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on DELETE MEMBERSHIP", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await membership.delete({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND MEMBERSHIP", async () => {
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

    await membershipFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on MEMBERSHIP PERMISSION", async () => {
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

    await membershipPermission(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
