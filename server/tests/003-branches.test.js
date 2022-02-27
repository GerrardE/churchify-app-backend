import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";

chai.use(chaiHttp);
const { expect } = chai;

let user;

describe("BRANCH TESTS", () => {
  describe("CREATE BRANCH ***", () => {
    it("should return success on branch test login ===========> ", (done) => {
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
    it("should return success on create a branch ===========> ", (done) => {
      try {
        chai
          .request(index)
          .post("/api/v1/branches")
          .set({ Authorization: user.token })
          .send({
            name: "Akoka",
            country: "1",
            state: "1",
            address: "Afolabi brown street",
            city: "1",
            zoneid: "1",
            notes: "Trem Akoka",
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Branch created successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on create a branch ===========> ", (done) => {
      try {
        chai
          .request(index)
          .post("/api/v1/branches")
          .set({ Authorization: user.token })
          .send({
            name: "Ojodu",
            country: "1",
            state: "1",
            address: "A",
            city: "1",
            zoneid: "1",
            notes: "Trem Ojodu",
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.errors.address).to.eql(
              "address must be between 5 and 200 characters"
            );
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle unique validation error on create a branch ===========> ", (done) => {
      try {
        chai
          .request(index)
          .post("/api/v1/branches")
          .set({ Authorization: user.token })
          .send({
            name: "Akoka",
            country: "1",
            state: "1",
            address: "Afolabi brown street",
            city: "1",
            zoneid: "1",
            notes: "Trem Akoka",
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

  describe("GET BRANCHES ***", () => {
    it("should return success on get all branches ===========> ", (done) => {
      try {
        chai
          .request(index)
          .get("/api/v1/branches")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Branches retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET BRANCHES BY ZONE ID***", () => {
    it("should return success on get all branches ===========> ", (done) => {
      try {
        chai
          .request(index)
          .get("/api/v1/branches/1/zones")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Branches retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET ONE BRANCH ***", () => {
    it("should return success on getting a branch ===========> ", (done) => {
      try {
        chai
          .request(index)
          .get("/api/v1/branches/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Branch retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("UPDATE BRANCH ***", () => {
    it("should return success on update a branch ===========> ", (done) => {
      try {
        chai
          .request(index)
          .put("/api/v1/branches/3")
          .set({ Authorization: user.token })
          .send({
            name: "Mowe",
            country: "1",
            state: "1",
            address: "Afolabi brown street",
            city: "1",
            zoneid: "1",
            notes: "Trem Mowe",
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Branch updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on update branch ===========> ", (done) => {
      try {
        chai
          .request(index)
          .put("/api/v1/branches/3")
          .set({ Authorization: user.token })
          .send({
            city: "1",
            zoneid: "1",
            notes: "Trem Mowe",
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.message).to.eql(
              "Error: invalid input"
            );
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("DELETE BRANCH ***", () => {
    it("should return success on DELETE A BRANCH ===========> ", (done) => {
      try {
        chai
          .request(index)
          .delete("/api/v1/branches/3")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Branch deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
