import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";
import setup from "./factory/setup";
import { createTestTraining } from "./factory";

chai.use(chaiHttp);
const { expect } = chai;

let user, training, branch, trainingtype, zone;

describe("TRAINING TESTS", () => {
  before(async () => {
    const setupData = await setup();

    user = setupData.user.dataValues;
    trainingtype = setupData.trainingtype.dataValues;
    zone = setupData.zone.dataValues;
    branch = setupData.branch.dataValues;
  });
  describe("CREATE TRAINING ***", () => {
    it("should return success on training test login ===========> ", (done) => {
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
    it("should return success on create training ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/trainingreports")
          .set({ Authorization: user.token })
          .send({
            trainees: "23",
            converts: "1",
            notes: "Good training report",
            branchid: branch.id,
            trainingtypeid: trainingtype.id,
            date: "2020-12-04T15:12:13.758Z",
            zoneid: zone.id
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Training created successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on create training ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/trainingreports")
          .set({ Authorization: user.token })
          .send({
            branchid: branch.id,
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.errors.zone).to.eql("zone field is required");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET TRAININGS ***", () => {
    it("should return success on get trainings ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/trainingreports")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Trainings retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET TRAINING ***", () => {
    it("should return success on getting an training ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/trainingreports/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Training retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("UPDATE TRAINING ***", () => {
    it("should return success on update an training ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/trainingreports/1")
          .set({ Authorization: user.token })
          .send({
            trainees: "23",
            converts: "1",
            notes: "Good updated training report",
            branchid: branch.id,
            trainingtypeid: trainingtype.id,
            date: "2020-12-04T15:12:13.758Z",
            zoneid: zone.id,
            updatedAt: "2020-12-04T15:12:13.758Z",
            createdAt: "2020-12-04T15:12:13.758Z",
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Training updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on update training ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/trainingreports/1")
          .set({ Authorization: user.token })
          .send({
            notes: "A good training"
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

  describe("DELETE TRAINING ***", () => {
    before(async () => {
      const userid = user.id;
      training = await createTestTraining({
        userid,
        branchid: branch.id,
        zoneid: zone.id,
        trainingtypeid: trainingtype.id
      });
    });
    it("should return success on delete training ===========> ", (done) => {
      try {
        chai.request(index)
          .delete(`/api/v1/trainingreports/${training.id}`)
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Training deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
