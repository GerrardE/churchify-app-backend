import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";
import createTestCountry from "./factory/country-factory";

chai.use(chaiHttp);
const { expect } = chai;

let user, country;

describe("COUNTRY TESTS", () => {
  before(async () => {
    country = await createTestCountry({});
  });
  describe("GET COUNTRY ***", () => {
    it("should return success on country test login ===========> ", (done) => {
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
    it("should return success on get country by id ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/countries/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Country retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should return success on get country by name ===========> ", (done) => {
      try {
        chai.request(index)
          .get(`/api/v1/countries/${country.name}/country`)
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Country retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET COUNTRIES ***", () => {
    it("should return success on get all countries ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/countries")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Countries retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
