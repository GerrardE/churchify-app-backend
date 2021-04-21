import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";

chai.use(chaiHttp);
const { expect } = chai;

let user;

describe("FELLOWSHIP TESTS", () => {
  describe("CREATE FELLOWSHIP ***", () => {
    it("should return success on fellowship test login ===========> ", (done) => {
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
    it("should return success on create a fellowship ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/fellowships")
          .set({ Authorization: user.token })
          .send({
            name: "Akoka",
            country: "1",
            state: "1",
            address: "Afolabi brown street",
            city: "1",
            branchid: "1",
            notes: "Trem Akoka"
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Fellowship created successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/fellowships")
          .set({ Authorization: user.token })
          .send({
            name: "Ojodu",
            country: "1",
            state: "1",
            address: "A",
            city: "1",
            branchid: "1",
            notes: "Trem Ojodu"
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.errors.address).to.eql("address must be between 5 and 200 characters");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle unique validation error ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/fellowships")
          .set({ Authorization: user.token })
          .send({
            name: "Akoka",
            country: "1",
            state: "1",
            address: "Afolabi brown street",
            city: "1",
            branchid: "1",
            notes: "Trem Akoka"
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

  describe("GET FELLOWSHIPS ***", () => {
    it("should return success on get all fellowships ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/fellowships")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Fellowships retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("UPDATE FELLOWSHIP ***", () => {
    it("should return success on update a fellowship ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/fellowships/1")
          .set({ Authorization: user.token })
          .send({
            name: "Akoka",
            country: "1",
            state: "1",
            address: "Afolabi brown street",
            city: "1",
            branchid: "1",
            notes: "Trem Akoka"
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Fellowship updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/fellowships/1")
          .set({ Authorization: user.token })
          .send({
            state: "1",
            address: "Afolabi brown street",
            city: "1",
            branchid: "1",
            notes: "Trem Akoka"
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

  describe("GET FELLOWSHIP ***", () => {
    it("should return success on getting a fellowship ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/fellowships/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Fellowship retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("DELETE FELLOWSHIP ***", () => {
    it("should return success on delete a fellowship ===========> ", (done) => {
      try {
        chai.request(index)
          .delete("/api/v1/fellowships/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Fellowship deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
