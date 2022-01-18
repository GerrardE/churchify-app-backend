import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";
import createTestTrainingType from "./factory/trainingtypes-factory";

chai.use(chaiHttp);
const { expect } = chai;

let user, trainingtype;

describe("TRAININGTYPES TESTS", () => {
  describe("CREATE TRAININGTYPE ***", () => {
    it("should return success on trainingtype test login ===========> ", (done) => {
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
    it("should return success on create trainingtype ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/trainingtypes")
          .set({ Authorization: user.token })
          .send({
            branchid: "1",
            name: "Power For Living",
            notes: "A good trainingtype"
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("TrainingType created successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on create trainingtype ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/trainingtypes")
          .set({ Authorization: user.token })
          .send({
            name: "P",
            notes: "A good trainingtype"
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.errors.name).to.eql("name must be between 2 and 100 characters");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle unique validation error ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/trainingtypes")
          .set({ Authorization: user.token })
          .send({
            branchid: "1",
            name: "Power For Living",
            notes: "A good trainingtype",
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.message.name).to.eql("name has already been taken");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET TRAININGTYPES ***", () => {
    it("should return success on get trainingtypes ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/trainingtypes")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("TrainingTypes retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET TRAININGTYPE ***", () => {
    it("should return success on getting an trainingtype ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/trainingtypes/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("TrainingType retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("UPDATE TRAININGTYPE ***", () => {
    it("should return success on update a trainingtype ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/trainingtypes/1")
          .set({ Authorization: user.token })
          .send({
            branchid: "1",
            name: "Power",
            notes: "A good trainingtype"
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("TrainingType updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on update trainingtype ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/trainingtypes/1")
          .set({ Authorization: user.token })
          .send({
            notes: "A good trainingtype"
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

  describe("DELETE TRAININGTYPE ***", () => {
    before(async () => {
      const userid = user.id;
      trainingtype = await createTestTrainingType({ userid });
    });
    it("should return success on delete trainingtype ===========> ", (done) => {
      try {
        chai.request(index)
          .delete(`/api/v1/trainingtypes/${trainingtype.id}`)
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("TrainingType deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
