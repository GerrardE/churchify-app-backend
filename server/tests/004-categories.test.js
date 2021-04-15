import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";

chai.use(chaiHttp);
const { expect } = chai;

let user;

describe("CATEGORIES TESTS", () => {
  describe("CREATE CATEGORY ***", () => {
    it("should return success on category test login ===========> ", (done) => {
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
    it("should return success on create a category ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/categories")
          .set({ Authorization: user.token })
          .send({
            name: "Akoka",
            notes: "Best of akoka"
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Category created successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on create category ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/categories")
          .set({ Authorization: user.token })
          .send({
            name: "A",
            notes: "Best of akoka"
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.errors.name).to.eql("name must be between 2 and 20 characters");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle unique validation error on create category ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/categories")
          .set({ Authorization: user.token })
          .send({
            name: "Akoka",
            notes: "Best of akoka"
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

  describe("GET ALL CATEGORIES ***", () => {
    it("should return success on get all categories ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/categories")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Categories retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET A CATEGORY ***", () => {
    it("should return success on get a category ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/categories/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Category retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("UPDATE CATEGORY ***", () => {
    it("should return success on update category ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/categories/1")
          .set({ Authorization: user.token })
          .send({
            name: "Ejigbo",
            notes: "Best of ejigbo"
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Category updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/categories/1")
          .set({ Authorization: user.token })
          .send({
            name: "A",
            notes: ""
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

  describe("UPDATE CATEGORY ***", () => {
    it("should return success on delete a caetgory ===========> ", (done) => {
      try {
        chai.request(index)
          .delete("/api/v1/categories/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Category deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
