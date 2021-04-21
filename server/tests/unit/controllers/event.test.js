import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import events from "@controllers/events";
import { eventFinder, eventPermission } from "@middlewares/event.middleware";

chai.use(chaiHttp);

describe("EVENT CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on CREATE EVENT", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await events.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on UPDATE EVENT", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await events.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GETALL EVENTS ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await events.getAll({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GET EVENT ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await events.getById({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on DELETE EVENT", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await events.delete({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND EVENT", async () => {
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

    await eventFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on EVENT PERMISSION", async () => {
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

    await eventPermission(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
