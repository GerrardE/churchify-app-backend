import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { PaymentController as payment } from "@controllers/finances";
import { paymentFinder, paymentPermission } from "@middlewares/finances";

chai.use(chaiHttp);

describe("PAYMENT CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on CREATE PAYMENT", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await payment.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on UPDATE PAYMENT", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await payment.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GETALL PAYMENTS ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await payment.getAll({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GET PAYMENT ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await payment.getById({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on DELETE PAYMENT", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await payment.delete({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND PAYMENT", async () => {
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

    await paymentFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on PAYMENT PERMISSION", async () => {
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

    await paymentPermission(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
