import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import configs from "@controllers/configs";
import { configFinder, confFinder } from "@middlewares/config.middleware";

chai.use(chaiHttp);

describe("CONFIG CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on CREATE CONFIG", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await configs.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on UPDATE CONFIG", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await configs.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GETALL CONFIGS ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await configs.getAll({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GET CONFIG ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await configs.getById({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on DELETE CONFIG", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await configs.delete({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND CONFIG", async () => {
    const next = sinon.spy();
    const mock = sinon.spy();
    const req = {
      params: {
        id: 1000
      }
    };

    const res = {
      status: () => ({
        json: mock
      })
    };

    await configFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND CONFIG BY NAME", async () => {
    const next = sinon.spy();
    const mock = sinon.spy();
    const req = {
      params: {
        id: "CHinonso"
      }
    };

    const res = {
      status: () => ({
        json: mock
      })
    };

    await confFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
