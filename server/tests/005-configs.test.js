import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";

chai.use(chaiHttp);
const { expect } = chai;

let user;

describe("CONFIGS TESTS", () => {
  describe("CREATE CONFIG ***", () => {
    it("should return success on config test login ===========> ", (done) => {
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
    it("should return success on create config ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/configs")
          .set({ Authorization: user.token })
          .send({
            name: "Alabama",
            type: "report",
            config: [{}],
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Config created successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/configs")
          .set({ Authorization: user.token })
          .send({
            name: "A",
            type: "report",
            config: [{}],
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
    it("should handle unique validation error ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/configs")
          .set({ Authorization: user.token })
          .send({
            name: "Alabama",
            type: "report",
            config: [{}],
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

  describe("GET CONFIGS ***", () => {
    it("should return success on get configs ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/configs")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Configs retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET CONFIG ***", () => {
    it("should return success on get config ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/configs/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Config retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("UPDATE CONFIG ***", () => {
    it("should return success on update config ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/configs/1")
          .set({ Authorization: user.token })
          .send({
            name: "Alabama",
            type: "report",
            config: [{}],
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Config updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/configs/1")
          .set({ Authorization: user.token })
          .send({
            name: "A",
            type: "report",
            config: [],
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

  describe("UPDATE CONFIG ***", () => {
    it("should return success on delete config ===========> ", (done) => {
      try {
        chai.request(index)
          .delete("/api/v1/configs/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Config deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
