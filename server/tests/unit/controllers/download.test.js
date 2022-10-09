import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import downloads from "@controllers/downloads";
import { downloadFinder, downloadPermission } from "@middlewares/download.middleware";

chai.use(chaiHttp);

describe("DOWNLOAD CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on CREATE DOWNLOAD", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await downloads.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on UPDATE DOWNLOAD", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await downloads.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GETALL DOWNLOADS ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await downloads.getAll({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GET DOWNLOAD ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await downloads.getById({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on DELETE DOWNLOAD", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await downloads.delete({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND DOWNLOAD", async () => {
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

    await downloadFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on DOWNLOAD PERMISSION", async () => {
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

    await downloadPermission(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
