import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";
import setup from "./factory/setup";
import { createTestAttendance } from "./factory";

chai.use(chaiHttp);
const { expect } = chai;

let user, attendance, branch, zone, evnt, preacher;

describe("ATTENDANCE TESTS", () => {
  before(async () => {
    const setupData = await setup();

    user = setupData.user.dataValues;
    branch = setupData.branch.dataValues;
    zone = setupData.zone.dataValues;
    evnt = setupData.evnt.dataValues;
    preacher = setupData.preacher.dataValues;
  });
  describe("CREATE ATTENDANCE ***", () => {
    it("should return success on attendance test login ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/users/auth/signin")
          .send({
            email: "tester@trem.org",
            password: "testpassword"
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("payload");
            expect(res.body.payload).to.be.an("object");
            user = res.body.payload;
            expect(user.token).to.be.a("string");
            expect(res.body.message).to.eql("Login successful");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should return success on create attendance ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/attendances")
          .set({ Authorization: user.token })
          .send({
            children: "12",
            women: "12",
            men: "11",
            eventid: evnt.id,
            preacherid: preacher.id,
            branchid: branch.id,
            date: "2020-12-04T15:12:13.758Z",
            zoneid: zone.id,
            notes: "A very good note",
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Attendance created successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on create attendance ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/attendances")
          .set({ Authorization: user.token })
          .send({
            children: "12",
            women: "12",
            men: "11",
            eventid: evnt.id,
            preacherid: preacher.id,
            branchid: branch.id,
            date: "2020-12-04T15:12:13.758Z",
            zoneid: zone.id,
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.errors.notes).to.eql("notes field is required");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET ATTENDANCES ***", () => {
    it("should return success on get attendances ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/attendances")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Attendances retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET ATTENDANCE ***", () => {
    it("should return success on getting an attendance ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/attendances/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Attendance retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("UPDATE ATTENDANCE ***", () => {
    it("should return success on update an attendance ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/attendances/1")
          .set({ Authorization: user.token })
          .send({
            children: "12",
            women: "12",
            men: "11",
            eventid: evnt.id,
            preacherid: preacher.id,
            branchid: branch.id,
            date: "2020-12-04T15:12:13.758Z",
            zoneid: zone.id,
            notes: "A updated note",
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Attendance updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on update attendance ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/attendances/1")
          .set({ Authorization: user.token })
          .send({
            notes: "A good attendance"
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.message).to.eql("Error: invalid input");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("DELETE ATTENDANCE ***", () => {
    before(async () => {
      const userid = user.id;
      attendance = await createTestAttendance({
        userid,
        eventid: evnt.id,
        preacherid: preacher.id,
        branchid: branch.id,
        zoneid: zone.id,
      });
    });
    it("should return success on delete attendance ===========> ", (done) => {
      try {
        chai.request(index)
          .delete(`/api/v1/attendances/${attendance.id}`)
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Attendance deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GENERATE GLOBAL REPORT ***", () => {
    it("should return success on generate a global attendance report ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/attendances/global")
          .set({ Authorization: user.token })
          .send({ eventid: "1", from: "2021-05-17", to: "2021-10-17" })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Attendance (global) retrieved 2021-05-17-2021-10-17 successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should return error on generate a global attendance report ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/attendances/global")
          .set({ Authorization: user.token })
          .send({ eventid: "1", from: "", to: "" })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.message).to.eql("Global attendance could not be retrieved");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GENERATE REPORT BY ZONE ***", () => {
    it("should return success on generate a zone attendance report ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/attendances/zones")
          .set({ Authorization: user.token })
          .send({
            eventid: "1", zoneid: "1", from: "2021-05-17", to: "2021-10-17"
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Attendance (zone) retrieved 2021-05-17-2021-10-17 successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should return error on generate a zone attendance report ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/attendances/zones")
          .set({ Authorization: user.token })
          .send({
            eventid: "1", zoneid: "1", from: "", to: ""
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.message).to.eql("Zone attendance could not be retrieved");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GENERATE REPORT BY BRANCH ***", () => {
    it("should return success on generate a branch attendance report ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/attendances/branches")
          .set({ Authorization: user.token })
          .send({
            eventid: "1", branchid: "1", from: "2021-06-17", to: "2021-10-20"
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Attendance (branch) retrieved 2021-06-17-2021-10-20 successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should return error on generate a branch attendance report ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/attendances/branches")
          .set({ Authorization: user.token })
          .send({
            eventid: "1", branchid: "1", from: "", to: ""
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.message).to.eql("Branch attendance could not be retrieved");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
