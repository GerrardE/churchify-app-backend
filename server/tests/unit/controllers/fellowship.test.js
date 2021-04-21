import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import fellowships from "@controllers/fellowships";
import { fellowshipFinder, fellowshipPermission } from "@middlewares/fellowship.middleware";

chai.use(chaiHttp);

describe("FELLOWSHIP CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on CREATE FELLOWSHIP", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await fellowships.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on UPDATE FELLOWSHIP", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await fellowships.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GETALL FELLOWSHIPS ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await fellowships.getAll({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GET FELLOWSHIP ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await fellowships.getById({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on DELETE FELLOWSHIP", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await fellowships.delete({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND FELLOWSHIP", async () => {
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

    await fellowshipFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FELLOWSHIP PERMISSION", async () => {
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

    await fellowshipPermission(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
