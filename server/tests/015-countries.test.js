import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";
import setup from "./factory/setup";
import { createTestCountry } from "./factory";

chai.use(chaiHttp);
const { expect } = chai;

let user, country, country1;

describe("COUNTRY TESTS", () => {
  before(async () => {
    const setupData = await setup();

    country = setupData.country.dataValues;
  });
  describe("CREATE COUNTRY ***", () => {
    it("should return success on country test login ===========> ", (done) => {
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
    it("should return success on create country ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/countries")
          .set({ Authorization: user.token })
          .send({
            name: "Alanska",
            country_code: 1298,
            fips_code: 452,
            iso2: "iso2",
            iso3: "iso3",
            phonecode: "+2356",
            capital: "Alaka",
            currency: "NNN",
            native: "Alan",
            region: "Lana",
            subregion: "Lana Region",
            emoji: "emoji",
            emojiU: "emojiU",
            flag: 20,
            wikiDataId: 456,
            userid: user.id,
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Country created successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on create country ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/countries")
          .set({ Authorization: user.token })
          .send({
            name: "A",
            country_code: 1298,
            fips_code: 452,
            iso2: "iso2",
            iso3: "iso3",
            phonecode: "+2356",
            capital: "Alaka",
            currency: "NNN",
            native: "Alan",
            region: "Lana",
            subregion: "Lana Region",
            emoji: "emoji",
            emojiU: "emojiU",
            flag: 20,
            wikiDataId: 456,
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
          .post("/api/v1/countries")
          .set({ Authorization: user.token })
          .send({
            name: "Alanska",
            country_code: 1298,
            fips_code: 452,
            iso2: "iso2",
            iso3: "iso3",
            phonecode: "+2356",
            capital: "Alaka",
            currency: "NNN",
            native: "Alan",
            region: "Lana",
            subregion: "Lana Region",
            emoji: "emoji",
            emojiU: "emojiU",
            flag: 20,
            wikiDataId: 456,
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

  describe("GET COUNTRY ***", () => {
    it("should return success on country test login ===========> ", (done) => {
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

  describe("UPDATE country ***", () => {
    it("should return success on update a country ===========> ", (done) => {
      try {
        chai.request(index)
          .put(`/api/v1/countries/${country.id}`)
          .set({ Authorization: user.token })
          .send({
            name: "Alaka",
            country_code: 1298,
            fips_code: 452,
            iso2: "iso2",
            iso3: "iso3",
            phonecode: "+2356",
            capital: "Alaka",
            currency: "NNN",
            native: "Alan",
            region: "Lana",
            subregion: "Lana Region",
            emoji: "emoji",
            emojiU: "emojiU",
            flag: 20,
            wikiDataId: 456,
            userid: user.id,
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Country updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on update country ===========> ", (done) => {
      try {
        chai.request(index)
          .put(`/api/v1/countries/${country.id}`)
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

  describe("DELETE country ***", () => {
    before(async () => {
      const userid = user.id;
      country1 = await createTestCountry({
        userid,
      });
    });
    it("should return success on delete country ===========> ", (done) => {
      try {
        chai.request(index)
          .delete(`/api/v1/countries/${country1.id}`)
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Country deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
