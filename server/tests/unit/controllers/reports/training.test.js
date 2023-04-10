import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { TrainingController as training } from "@controllers/reports";
import { trainingFinder, trainingPermission } from "@middlewares/reports";

chai.use(chaiHttp);

describe("TRAINING CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on CREATE TRAINING", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await training.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on UPDATE TRAINING", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await training.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GETALL TRAININGS ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await training.getAll({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GET TRAINING ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await training.getById({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on DELETE TRAINING", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await training.delete({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND TRAINING", async () => {
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

    await trainingFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on TRAINING PERMISSION", async () => {
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

    await trainingPermission(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
