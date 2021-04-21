import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";
import createTestZone from "./factory/zone-factory";

chai.use(chaiHttp);
const { expect } = chai;

let user, zone;

describe("ZONE TESTS", () => {
  before(async () => {
    zone = await createTestZone({});
  });
  describe("CREATE ZONE ***", () => {
    it("should return success on zone test login ===========> ", (done) => {
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
    it("should return success on create zone ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/zones")
          .set({ Authorization: user.token })
          .send({
            name: "Headquarters",
            country: "1",
            notes: "Trem HQ"
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Zone created successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on create zone ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/zones")
          .set({ Authorization: user.token })
          .send({
            name: "H",
            country: "1",
            notes: "Trem HQ"
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
    it("should handle unique validation error on create zone ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/zones")
          .set({ Authorization: user.token })
          .send({
            name: "Headquarters",
            country: "1",
            notes: "Trem HQ"
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.errors.name).to.eql("name has already been taken");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET ZONES ***", () => {
    it("should return success on get all zones ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/zones")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Zones retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET ZONE ***", () => {
    it("should return success on get a zone ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/zones/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Zone retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("UPDATE ZONE ***", () => {
    it("should return success on update a zone ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/zones/1")
          .set({ Authorization: user.token })
          .send({
            name: "Lagos Quarters",
            country: "1",
            notes: "Trem HQ"
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Zone updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on update zone ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/zones/1")
          .set({ Authorization: user.token })
          .send({
            notes: "Trem HQ"
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

  describe("DELETE ZONE ***", () => {
    it("should return success on delete a zone ===========> ", (done) => {
      try {
        chai.request(index)
          .delete(`/api/v1/zones/${zone.id}`)
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Zone deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
