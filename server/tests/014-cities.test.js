import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";

chai.use(chaiHttp);
const { expect } = chai;

let user;

describe("CITY TESTS", () => {
  describe("GET CITY ***", () => {
    it("should return success on city test login ===========> ", (done) => {
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
    it("should return success on get city by id ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/cities/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("City retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET CITIES ***", () => {
    it("should return success on get cities by stateid ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/cities/1/state")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Cities retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
