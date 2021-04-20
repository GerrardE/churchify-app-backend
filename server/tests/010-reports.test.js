import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";

chai.use(chaiHttp);
const { expect } = chai;

let user;

describe("REPORT TESTS", () => {
  describe("SUBMIT MEMBERSHIP REPORT ***", () => {
    it("should return success on report test login ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/auth/signin")
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
            branchid: "1"
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
            branchid: "1"
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
    it("should return success on submit an attendance ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/reports/attendances")
          .set({ Authorization: user.token })
          .send({
            children: "12",
            women: "12",
            men: "11",
            eventid: "1",
            preacherid: "1",
            notes: "A very good note",
            branchid: "1"
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
          .post("/api/v1/reports/attendances")
          .set({ Authorization: user.token })
          .send({
            children: "12",
            women: "12",
            men: "11",
            eventid: "1",
            preacherid: "1",
            notes: "",
            branchid: "1"
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

  describe("SUBMIT TRAINING REPORT ***", () => {
    it("should return success on submit a training report ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/reports/training")
          .set({ Authorization: user.token })
          .send({
            trainees: "23",
            converts: "1",
            notes: "Good training report",
            branchid: "1"
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
            notes: "",
            branchid: "1"
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
            branchid: "1"
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
            branchid: "1"
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
            cyf: "12",
            rcf: "7",
            branchid: "1",
            notes: "Nice group report"
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
            branchid: "1",
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
            newcells: "1",
            totalcells: "11",
            attendance: "2",
            fellowshipid: "1",
            notes: "Good job on the report"
          })
          .end((err, res) => {
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
            fellowshipid: "1",
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
});
