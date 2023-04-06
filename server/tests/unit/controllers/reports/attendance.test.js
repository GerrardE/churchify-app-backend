import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { AttendanceController as attendance } from "@controllers/reports";
import { attendanceFinder, attendancePermission } from "@middlewares/reports";

chai.use(chaiHttp);

describe("ATTENDANCE CONTROLLER TESTS", () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should handle error on CREATE ATTENDANCE", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await attendance.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on UPDATE ATTENDANCE", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await attendance.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GETALL ATTENDANCES ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await attendance.getAll({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on GET ATTENDANCE ===========> ", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await attendance.getById({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on DELETE ATTENDANCE", async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await attendance.delete({}, res);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on FIND ATTENDANCE", async () => {
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

    await attendanceFinder(req, res, next);
    sinon.assert.calledOnce(mock);
  });

  it("should handle error on ATTENDANCE PERMISSION", async () => {
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

    await attendancePermission(req, res, next);
    sinon.assert.calledOnce(mock);
  });
});
