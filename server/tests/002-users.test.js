import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";

chai.use(chaiHttp);
const { expect } = chai;

let user;
let guestuser;

describe("USER TESTS", () => {
  describe("USER SIGNUP ***", () => {
    it("should return success on sign up ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/auth/signup")
          .send({
            firstname: "Test",
            lastname: "User",
            phone: "08086814343",
            email: "test@gmail.com",
            zoneid: 1,
            branchid: 1,
            city: 1,
            state: 1,
            country: 1,
            password: "testpass"
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property("payload");
            expect(res.body.payload).to.be.an("object");
            guestuser = res.body.payload;
            expect(guestuser.token).to.be.a("string");
            expect(res.body.message).to.eql("Registration successful");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/auth/signup")
          .send({
            firstname: "Test",
            lastname: "User",
            phone: "08086814343",
            email: "test@gmail",
            branchid: 1,
            country: 1,
            password: "testpass"
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.errors.email).to.eql("Email is invalid");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle unique validation error ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/auth/signup")
          .send({
            firstname: "Test",
            lastname: "User",
            phone: "08086814343",
            email: "test@gmail.com",
            branchid: 1,
            country: 1,
            zoneid: 1,
            city: 1,
            state: 1,
            password: "testpass"
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property("errors");
            expect(res.body).to.be.an("object");
            expect(res.body.message.email).to.eql("email has already been taken");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("USER LOGIN ***", () => {
    it("should return success on LOGIN ===========> ", (done) => {
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
    it("should return invalid PASSWORD ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/auth/signin")
          .send({
            email: "test@gmail.com",
            password: "testpas"
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("status");
            expect(res.body.message).to.eql("Invalid email or password");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should return invalid EMAIL ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/auth/signin")
          .send({
            email: "tests@gmail.com",
            password: "testpass"
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("status");
            expect(res.body.message).to.eql("Invalid email or password");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle VALIDATION ERROR ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/auth/signin")
          .send({
            email: "test@gmailcom",
            password: "testpass"
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("status");
            expect(res.body.errors.email).to.eql("Email is invalid");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("USER GETALL ***", () => {
    it("should return success on get all users ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/users")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("payload");
            expect(res.body.payload).to.be.an("array");
            expect(res.body.message).to.eql("Users retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should return permission error on get all users ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/users")
          .set({ Authorization: guestuser.token })
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("status");
            expect(res.body.message).to.eql("You do not have enough permissions");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("USER GET ONE USER ***", () => {
    it("should return success on get user ===========> ", (done) => {
      try {
        chai.request(index)
          .get(`/api/v1/users/${guestuser.id}`)
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("payload");
            expect(res.body.payload).to.be.an("object");
            expect(res.body.message).to.eql("User retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should return not found on get user ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/users/100")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("status");
            expect(res.body.message).to.eql("User does not exist");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should return permission error on get user ===========> ", (done) => {
      try {
        chai.request(index)
          .get(`/api/v1/users/${guestuser.id}`)
          .set({ Authorization: guestuser.token })
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("status");
            expect(res.body.message).to.eql("You do not have enough permissions");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("USER UPDATE ***", () => {
    it("should return success on user update ===========> ", (done) => {
      try {
        chai.request(index)
          .put(`/api/v1/users/${guestuser.id}`)
          .set({ Authorization: user.token })
          .send({
            firstname: "Tet",
            lastname: "User",
            phone: "08086814343",
            email: "test@gmail.com",
            zoneid: 1,
            branchid: 1,
            city: 1,
            state: 1,
            country: 1,
            password: "testpass"
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("payload");
            expect(res.body.payload).to.be.an("object");
            expect(res.body.message).to.eql("User updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle user update validation error ===========> ", (done) => {
      try {
        chai.request(index)
          .put(`/api/v1/users/${guestuser.id}`)
          .set({ Authorization: user.token })
          .send({
            firstname: "Test",
            lastname: "User",
            phone: "08086814343",
            email: "test@gmail",
            branchid: 1,
            country: 1,
            password: "testpass"
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.message).to.eql("Error: invalid input");
            expect(res.body.errors.email).to.eql("Email is invalid");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle user update unique validation error ===========> ", (done) => {
      try {
        chai.request(index)
          .put(`/api/v1/users/${guestuser.id}`)
          .set({ Authorization: user.token })
          .send({
            firstname: "Test",
            lastname: "User",
            phone: "08086814343",
            email: "ezeugwajuliet@gmail.com",
            branchid: 1,
            country: 1,
            zoneid: 1,
            city: 1,
            state: 1,
            password: "testpass"
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property("errors");
            expect(res.body).to.be.an("object");
            expect(res.body.message.email).to.eql("email has already been taken");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("USER ASSIGN ROLE ***", () => {
    it("should return success on user assign role ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/roles")
          .set({ Authorization: user.token })
          .send({
            role: 3,
            id: guestuser.id
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("payload");
            expect(res.body.payload).to.be.an("array");
            expect(res.body.message).to.eql("Role assigned successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("USER UNASSIGN ROLE ***", () => {
    it("should return success on user unassign role ===========> ", (done) => {
      try {
        chai.request(index)
          .delete("/api/v1/roles")
          .set({ Authorization: user.token })
          .send({
            role: 3,
            id: guestuser.id
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("payload");
            expect(res.body.payload).to.be.an("number");
            expect(res.body.message).to.eql("Role unassigned successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
