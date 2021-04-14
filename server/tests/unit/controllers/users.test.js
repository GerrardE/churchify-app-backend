import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import users from "@controllers/users";
import { createToken, verifyToken } from "@middlewares/Token";

chai.use(chaiHttp);
const { expect } = chai;

describe("USER CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on SIGNUP USER ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await users.signup({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle CREATE TOKEN ===========> ", async () => {
    const payload = { id: 1 };
    const token = await createToken(payload);

    expect(token).to.be.a("string");
  });

  it("should handle VERIFY TOKEN ===========> ", async () => {
    const req = {
      headers: { authorization: "" },
      body: { token: "xx" }
    };

    const next = sinon.spy();
    const jsonFunc = sinon.spy();
    const res = {
      status: () => ({
        json: jsonFunc
      }),
      message: "Invalid token supplied"
    };

    await verifyToken(req, res, next);
    sinon.assert.calledOnce(jsonFunc);
  });

  it("should handle VERIFY TOKEN when no token supplied ===========> ", async () => {
    const req = {
      headers: { authorization: "" },
      body: { token: "" },
      decoded: ""
    };

    const next = sinon.spy();
    const jsonFunc = sinon.spy();
    const res = {
      status: () => ({
        json: jsonFunc
      }),
      message: "No token supplied"
    };

    await verifyToken(req, res, next);
    sinon.assert.calledOnce(jsonFunc);
  });

  it("should handle error on LOGIN USER ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await users.signin({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GETALL USERS ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await users.getAllUsers({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GET USER ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await users.getUser({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on UPDATE USER ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await users.updateUser({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on ASSIGN ROLE ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await users.assignrole({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on UNASSIGN ROLE ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await users.unassignrole({}, res);
    sinon.assert.calledOnce(mock);
  });
});
