import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";
import setup from "./factory/setup";
import { createTestState } from "./factory";

chai.use(chaiHttp);
const { expect } = chai;

let user, state, country, state1;

describe("STATE TESTS", () => {
  before(async () => {
    const setupData = await setup();

    country = setupData.country.dataValues;
    state = setupData.state.dataValues;
  });
  describe("CREATE STATE ***", () => {
    it("should return success on state test login ===========> ", (done) => {
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
    it("should return success on create state ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/states")
          .set({ Authorization: user.token })
          .send({
            name: "Jejelo",
            country_id: country.id,
            country_code: "XX",
            fips_code: 1092,
            iso2: "iso",
            flag: 20,
            wikiDataId: 10,
            userid: user.id,
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("State created successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on create state ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/states")
          .set({ Authorization: user.token })
          .send({
            name: "P",
            country_id: country.id,
            country_code: "XX",
            fips_code: 1092,
            iso2: "iso",
            flag: 20,
            wikiDataId: 10,
            userid: user.id,
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
          .post("/api/v1/states")
          .set({ Authorization: user.token })
          .send({
            name: "Jejelo",
            country_id: country.id,
            country_code: "XX",
            fips_code: 1092,
            iso2: "iso",
            flag: 20,
            wikiDataId: 10,
            userid: user.id,
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
  describe("GET STATE ***", () => {
    it("should return success on get state by id ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/states/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("State retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET STATES ***", () => {
    it("should return success on get states by countryid ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/states/1/country")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("States retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("UPDATE STATE ***", () => {
    it("should return success on update a state ===========> ", (done) => {
      try {
        chai.request(index)
          .put(`/api/v1/states/${state.id}`)
          .set({ Authorization: user.token })
          .send({
            name: "Jejeo",
            country_id: country.id,
            country_code: "XX",
            fips_code: 1092,
            iso2: "iso",
            flag: 20,
            wikiDataId: 10,
            userid: user.id,
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("State updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on update state ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/states/1")
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

  describe("DELETE STATE ***", () => {
    before(async () => {
      const userid = user.id;
      state1 = await createTestState({
        userid,
      });
    });
    it("should return success on delete state ===========> ", (done) => {
      try {
        chai.request(index)
          .delete(`/api/v1/states/${state1.id}`)
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("State deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
