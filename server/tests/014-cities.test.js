import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";
import setup from "./factory/setup";
import { createTestCity } from "./factory";

chai.use(chaiHttp);
const { expect } = chai;

let user, country, state, city1, city;

describe("CITY TESTS", () => {
  before(async () => {
    const setupData = await setup();

    country = setupData.country.dataValues;
    state = setupData.state.dataValues;
    city = setupData.city.dataValues;
  });
  describe("CREATE CITY ***", () => {
    it("should return success on city test login ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/users/auth/signin")
          .send({
            email: "tester@trem.org",
            password: "testpassword"
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
    it("should return success on create city ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/cities")
          .set({ Authorization: user.token })
          .send({
            name: "Lasgidi",
            state_id: state.id,
            state_code: "XX",
            country_id: country.id,
            country_code: "XX",
            latitude: 20.1,
            longitude: 20.1,
            flag: 20,
            wikiDataId: 89,
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("City created successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on create country ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/cities")
          .set({ Authorization: user.token })
          .send({
            name: "A",
            state_id: state.id,
            state_code: state.stateCode,
            country_id: country.id,
            country_code: country.countryCode,
            latitude: 20.1,
            longitude: 20.1,
            flag: 20,
            wikiDataId: 89,
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
          .post("/api/v1/cities")
          .set({ Authorization: user.token })
          .send({
            name: "Lasgidi",
            state_id: state.id,
            state_code: "XX",
            country_id: country.id,
            country_code: "XX",
            latitude: 20.1,
            longitude: 20.1,
            flag: 20,
            wikiDataId: 89,
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

  describe("GET CITY ***", () => {
    it("should return success on city test login ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/users/auth/signin")
          .send({
            email: "tester@trem.org",
            password: "testpassword"
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

  describe("UPDATE CITY ***", () => {
    it("should return success on update a city ===========> ", (done) => {
      try {
        chai.request(index)
          .put(`/api/v1/cities/${city.id}`)
          .set({ Authorization: user.token })
          .send({
            name: "Lasgi",
            state_id: state.id,
            state_code: "XX",
            country_id: country.id,
            country_code: "XX",
            latitude: 20.1,
            longitude: 20.1,
            flag: 20,
            wikiDataId: 89,
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("City updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on update city ===========> ", (done) => {
      try {
        chai.request(index)
          .put(`/api/v1/cities/${city.id}`)
          .set({ Authorization: user.token })
          .send({
            flag: 20,
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

  describe("DELETE CITY ***", () => {
    before(async () => {
      const userid = user.id;
      city1 = await createTestCity({
        userid,
      });
    });
    it("should return success on delete city ===========> ", (done) => {
      try {
        chai.request(index)
          .delete(`/api/v1/cities/${city1.id}`)
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("City deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
