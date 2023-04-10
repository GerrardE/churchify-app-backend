import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { AssetController as asset } from "@controllers/finances";
import { assetFinder, assetPermission } from "@middlewares/finances";

chai.use(chaiHttp);

describe("ASSET CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on CREATE ASSET", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await asset.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on UPDATE ASSET", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await asset.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GETALL ASSETS ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await asset.getAll({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GET ASSET ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await asset.getById({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on DELETE ASSET", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await asset.delete({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND ASSET", async () => {
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

    await assetFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on ASSET PERMISSION", async () => {
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

    await assetPermission(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
