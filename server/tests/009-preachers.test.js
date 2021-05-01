import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";

chai.use(chaiHttp);
const { expect } = chai;

let user;

describe("PREACHERS TESTS", () => {
  describe("CREATE PREACHER ***", () => {
    it("should return success on preacher test login ===========> ", (done) => {
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
    it("should return success on create a preacher ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/preachers")
          .set({ Authorization: user.token })
          .send({
            firstname: "Ugo",
            lastname: "Eze",
            email: "ugo@gmail.com",
            phone: "08137776789",
            country: "1",
            state: "1",
            address: "Lagos",
            city: "1",
            branchid: "1",
            notes: "A good coach"
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Preacher created successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on create preacher ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/preachers")
          .set({ Authorization: user.token })
          .send({
            firstname: "U",
            lastname: "Eze",
            country: "1",
            state: "1",
            address: "Lagos",
            city: "1",
            branchid: "1",
            notes: "A good coach"
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.errors.firstname).to.eql("firstname must be between 2 and 20 characters");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle unique validation error on create preacher ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/preachers")
          .set({ Authorization: user.token })
          .send({
            firstname: "Ugo",
            email: "ugo@gmail.com",
            phone: "08137776789",
            lastname: "Eze",
            country: "1",
            state: "1",
            address: "Lagos",
            city: "1",
            branchid: "1",
            notes: "A good coach"
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.message.email).to.eql("email has already been taken");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET PREACHERS ***", () => {
    it("should return success on get all preachers ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/preachers")
          .set({ Authorization: user.token })
          .end((_err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Preachers retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET PREACHER ***", () => {
    it("should return success on get a preacher ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/preachers/1")
          .set({ Authorization: user.token })
          .end((_err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Preacher retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("UPDATE PREACHER ***", () => {
    it("should return success on update a preacher ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/preachers/1")
          .set({ Authorization: user.token })
          .send({
            firstname: "Ugochucku",
            lastname: "Eze",
            country: "1",
            state: "1",
            address: "Lagos",
            city: "1",
            branchid: "1",
            notes: "A good coach",
            email: "ugo@gmail.com",
            phone: "08137776789",
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Preacher updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on update preacher ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/preachers/1")
          .set({ Authorization: user.token })
          .send({
            country: "1",
            state: "1",
            address: "Lagos",
            city: "1",
            branchid: "1",
            notes: "A good coach"
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

  describe("DELETE PREACHER ***", () => {
    it("should return success on delete a preacher ===========> ", (done) => {
      try {
        chai.request(index)
          .delete("/api/v1/preachers/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Preacher deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
