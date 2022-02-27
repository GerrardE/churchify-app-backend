import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";
import createTestEvent from "./factory/event-factory";
import createTestPreacher from "./factory/preacher-factory";
import createTestActivityType from "./factory/activitytypes-factory";
import createTestTrainingType from "./factory/trainingtypes-factory";
import setup from "./factory/setup";

chai.use(chaiHttp);
const { expect } = chai;

let user, event, preachr, branch, zone, fellowship;

describe("REPORT TESTS", () => {
  before(async () => {
    const setupData = await setup();

    branch = setupData.branch;
    zone = setupData.zone;
    fellowship = setupData.fellowship;
  });
  describe("SUBMIT MEMBERSHIP REPORT ***", () => {
    it("should return success on report test login ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/users/auth/signin")
          .send({
            email: "ezeugwajuliet@gmail.com",
            password: "testpass"
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
    it("should return success on submit a membership report ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/reports/membership")
          .set({ Authorization: user.token })
          .send({
            adults: "10",
            children: "2",
            tithers: "12",
            newmembers: "11",
            notes: "good report",
            branchid: branch.id,
            date: "2020-12-04T15:12:13.758Z",
            zoneid: zone.id
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Membership report submitted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should return validation error on submit a membership report ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/reports/membership")
          .set({ Authorization: user.token })
          .send({
            adults: "10",
            children: "2",
            tithers: "12",
            newmembers: "11",
            notes: "",
            branchid: branch.id
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

  describe("SUBMIT ATTENDANCE REPORT ***", () => {
    before(async () => {
      const userid = user.id;
      event = await createTestEvent({ userid });
      preachr = await createTestPreacher({ userid });
    });
    it("should return success on submit an attendance ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/reports/attendance")
          .set({ Authorization: user.token })
          .send({
            children: "12",
            women: "12",
            men: "11",
            eventid: event.id,
            preacherid: preachr.id,
            notes: "A very good note",
            branchid: branch.id,
            date: "2020-12-04T15:12:13.758Z",
            zoneid: zone.id
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Attendance submitted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should return validation error on submit an attendance ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/reports/attendance")
          .set({ Authorization: user.token })
          .send({
            children: "12",
            women: "12",
            men: "11",
            eventid: event.id,
            preacherid: "1",
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.errors.branch).to.eql("branch field is required");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("SUBMIT TRAINING REPORT ***", () => {
    before(async () => {
      const userid = user.id;
      await createTestActivityType({ userid });
      await createTestTrainingType({ userid });
    });
    it("should return success on submit a training report ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/reports/training")
          .set({ Authorization: user.token })
          .send({
            trainees: "23",
            converts: "1",
            notes: "Good training report",
            branchid: branch.id,
            trainingtypeid: "1",
            date: "2020-12-04T15:12:13.758Z",
            zoneid: zone.id
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Training report submitted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should return validation error on submit a training report ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/reports/training")
          .set({ Authorization: user.token })
          .send({
            trainees: "23",
            converts: "1",
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

  describe("SUBMIT ACTIVITY REPORT ***", () => {
    it("should return success on submit an activity report ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/reports/activity")
          .set({ Authorization: user.token })
          .send({
            council: "2",
            special: "4",
            project: "2",
            notes: "God report",
            branchid: branch.id,
            activitytypeid: "1",
            date: "2020-12-04T15:12:13.758Z",
            zoneid: zone.id
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Activity report submitted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should return validation error on submit an activity report ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/reports/activity")
          .set({ Authorization: user.token })
          .send({
            council: "2",
            special: "4",
            project: "2",
            notes: "",
            branchid: branch.id
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

  describe("SUBMIT GROUP REPORT ***", () => {
    it("should return success on submit a group report ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/reports/group")
          .set({ Authorization: user.token })
          .send({
            cmf: "13",
            cwf: "1",
            gymcf: "12",
            ywcf: "12",
            yaf: "12",
            teens: "12",
            rcf: "7",
            branchid: branch.id,
            notes: "Nice group report",
            date: "2020-12-04T15:12:13.758Z",
            zoneid: zone.id
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Group report submitted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should return validation error on submit a group report ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/reports/group")
          .set({ Authorization: user.token })
          .send({
            cmf: "13",
            cwf: "1",
            cyf: "12",
            rcf: "7",
            branchid: branch.id,
            notes: ""
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

  describe("SUBMIT FELLOWSHIP REPORT ***", () => {
    it("should return success on submit a fellowship report ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/reports/freport")
          .set({ Authorization: user.token })
          .send({
            newcells: "10",
            totalcells: "11",
            attendance: "2",
            fellowshipid: Number(fellowship.id),
            notes: "Good job on the report",
            date: "2020-12-04T15:12:13.758Z",
            zoneid: zone.id,
            branchid: branch.id
          })
          .end((err, res) => {
            console.log(branch, "branch, zone", zone)
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Fellowship report submitted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should return validation error on submit a fellowship report ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/reports/freport")
          .set({ Authorization: user.token })
          .send({
            newcells: "1",
            totalcells: "11",
            attendance: "2",
            fellowshipid: Number(fellowship.id),
            notes: ""
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

  describe("GENERATE GLOBAL REPORT ***", () => {
    it("should return success on generate a global attendance report ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/reports/attendances/global")
          .set({ Authorization: user.token })
          .send({"eventid":"1","from":"2021-05-17","to":"2021-10-17"})
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Global attendance retrieved 2021-05-17-2021-10-17 successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should return error on generate a global attendance report ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/reports/attendances/global")
          .set({ Authorization: user.token })
          .send({"eventid":"1","from":"","to":""})
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
          .post("/api/v1/reports/attendances/zones")
          .set({ Authorization: user.token })
          .send({"eventid":"1","zoneid":"1","from":"2021-05-17","to":"2021-10-17"})
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Zone attendance retrieved 2021-05-17-2021-10-17 successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should return error on generate a zone attendance report ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/reports/attendances/zones")
          .set({ Authorization: user.token })
          .send({"eventid":"1","zoneid":"1","from":"","to":""})
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
          .post("/api/v1/reports/attendances/branches")
          .set({ Authorization: user.token })
          .send({"eventid":"1","branchid":"1","from":"2021-06-17","to":"2021-10-20"})
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Branch attendance retrieved 2021-06-17-2021-10-20 successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should return error on generate a branch attendance report ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/reports/attendances/branches")
          .set({ Authorization: user.token })
          .send({"eventid":"1","branchid":"1","from":"","to":""})
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
