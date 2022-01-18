import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";
import createTestActivityType from "./factory/activitytypes-factory";

chai.use(chaiHttp);
const { expect } = chai;

let user, activitytype;

describe("ACTIVITYTYPES TESTS", () => {
  describe("CREATE ACTIVITYTYPE ***", () => {
    it("should return success on activitytype test login ===========> ", (done) => {
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
    it("should return success on create activitytype ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/activitytypes")
          .set({ Authorization: user.token })
          .send({
            branchid: "1",
            name: "Power For Living",
            notes: "A good activitytype"
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("ActivityType created successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on create activitytype ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/activitytypes")
          .set({ Authorization: user.token })
          .send({
            name: "P",
            notes: "A good activitytype"
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
          .post("/api/v1/activitytypes")
          .set({ Authorization: user.token })
          .send({
            branchid: "1",
            name: "Power For Living",
            notes: "A good activitytype",
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

  describe("GET ACTIVITYTYPES ***", () => {
    it("should return success on get activitytypes ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/activitytypes")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("ActivityTypes retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET ACTIVITYTYPE ***", () => {
    it("should return success on getting an activitytype ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/activitytypes/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("ActivityType retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("UPDATE ACTIVITYTYPE ***", () => {
    it("should return success on update an activitytype ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/activitytypes/1")
          .set({ Authorization: user.token })
          .send({
            branchid: "1",
            name: "Power",
            notes: "A good ActivityType"
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("ActivityType updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on update activitytype ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/activitytypes/1")
          .set({ Authorization: user.token })
          .send({
            notes: "A good ActivityType"
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

  describe("DELETE ACTIVITYTYPE ***", () => {
    before(async () => {
      const userid = user.id;
      activitytype = await createTestActivityType({ userid });
    });
    it("should return success on delete activitytype ===========> ", (done) => {
      try {
        chai.request(index)
          .delete(`/api/v1/activitytypes/${activitytype.id}`)
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("ActivityType deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
