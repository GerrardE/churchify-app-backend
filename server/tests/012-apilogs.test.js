import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";

chai.use(chaiHttp);
const { expect } = chai;

let user;

describe("APILOG TESTS", () => {
  describe("GET APILOGS ***", () => {
    it("should return success on apilog test login ===========> ", (done) => {
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
    it("should return success on get all apilogs ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/apilogs")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Apilogs retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET APILOG ***", () => {
    it("should return success on get an apilog ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/apilogs/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Apilog retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("DELETE APILOG ***", () => {
    it("should return success on delete an apilog ===========> ", (done) => {
      try {
        chai.request(index)
          .delete("/api/v1/apilogs/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Apilog deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
