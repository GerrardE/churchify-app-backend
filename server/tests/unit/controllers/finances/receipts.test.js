import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { ReceiptController as receipt } from "@controllers/finances";
import { receiptFinder, receiptPermission } from "@middlewares/finances";

chai.use(chaiHttp);

describe("RECEIPT CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on CREATE RECEIPT", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await receipt.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on UPDATE RECEIPT", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await receipt.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GETALL RECEIPTS ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await receipt.getAll({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GET RECEIPT ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await receipt.getById({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on DELETE RECEIPT", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await receipt.delete({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND RECEIPT", async () => {
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

    await receiptFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on RECEIPT PERMISSION", async () => {
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

    await receiptPermission(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
