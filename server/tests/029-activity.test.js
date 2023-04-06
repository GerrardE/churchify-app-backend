import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";
import setup from "./factory/setup";
import { createTestActivity } from "./factory";

chai.use(chaiHttp);
const { expect } = chai;

let user, activity, branch, zone, activitytype;

describe("ACTIVITY TESTS", () => {
  before(async () => {
    const setupData = await setup();

    user = setupData.user.dataValues;
    branch = setupData.branch.dataValues;
    zone = setupData.zone.dataValues;
    activitytype = setupData.activitytype.dataValues;
  });
  describe("CREATE ACTIVITY ***", () => {
    it("should return success on activity test login ===========> ", (done) => {
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
    it("should return success on create activity ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/activitys")
          .set({ Authorization: user.token })
          .send({
            userid: user.id,
            council: "2",
            special: "4",
            project: "2",
            branchid: branch.id,
            activitytypeid: activitytype.id,
            date: "2020-12-04T15:12:13.758Z",
            zoneid: zone.id,
            notes: "Good report",
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Activity created successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on create activity ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/activitys")
          .set({ Authorization: user.token })
          .send({
            userid: user.id,
            council: "2",
            special: "4",
            project: "2",
            branchid: branch.id,
            activitytypeid: activitytype.id,
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

  describe("GET ACTIVITIES ***", () => {
    it("should return success on get activity ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/activitys")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Activitys retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET ACTIVITY ***", () => {
    it("should return success on getting an activity ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/activitys/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Activity retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("UPDATE ACTIVITY ***", () => {
    it("should return success on update an activity ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/activitys/1")
          .set({ Authorization: user.token })
          .send({
            userid: user.id,
            council: "2",
            special: "4",
            project: "2",
            branchid: branch.id,
            activitytypeid: activitytype.id,
            date: "2020-12-04T15:12:13.758Z",
            zoneid: zone.id,
            notes: "Good activity updated",
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Activity updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on update activity ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/activitys/1")
          .set({ Authorization: user.token })
          .send({
            notes: "A good activity"
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

  describe("DELETE ACTIVITY ***", () => {
    before(async () => {
      const userid = user.id;
      activity = await createTestActivity({
        userid,
        branchid: branch.id,
        activitytypeid: activitytype.id,
        zoneid: zone.id,
      });
    });
    it("should return success on delete activity ===========> ", (done) => {
      try {
        chai.request(index)
          .delete(`/api/v1/activitys/${activity.id}`)
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Activity deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
