import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";
import setup from "./factory/setup";
import { createTestAsset } from "./factory";

chai.use(chaiHttp);
const { expect } = chai;

let user, finance, asset1;

describe("ASSET TESTS", () => {
  before(async () => {
    const setupData = await setup();

    finance = setupData.finance.dataValues;
  });
  describe("CREATE ASSET ***", () => {
    it("should return success on asset test login ===========> ", (done) => {
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
    it("should return success on create asset ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/finance/assets")
          .set({ Authorization: user.token })
          .send({
            building: 10,
            motorvehicle: 10,
            generator: 50,
            musicaleqpt: 30,
            asabaproject: 29,
            others: 59,
            uploads: ["receipt1", "receipt3"],
            financeid: finance.id,
            notes: "Asset for Lagos"
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Asset created successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on create asset ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/finance/assets")
          .set({ Authorization: user.token })
          .send({
            motorvehicle: 10,
            generator: 50,
            musicaleqpt: 30,
            asabaproject: 29,
            others: 59,
            uploads: ["receipt1", "receipt3"],
            financeid: finance.id,
            notes: "Asset for Lagos"
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.errors.building).to.eql("building field is required");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET ASSETS ***", () => {
    it("should return success on get assets ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/finance/assets")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Assets retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET ASSET ***", () => {
    it("should return success on getting an asset ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/finance/assets/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Asset retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("UPDATE ASSET ***", () => {
    it("should return success on update an asset ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/finance/assets/1")
          .set({ Authorization: user.token })
          .send({
            asabaproject: 98,
            building: 10,
            motorvehicle: 10,
            generator: 50,
            musicaleqpt: 30,
            others: 59,
            uploads: ["receipt1", "receipt3"],
            financeid: finance.id,
            notes: "Asset for Lagos"
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Asset updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on update asset ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/finance/assets/1")
          .set({ Authorization: user.token })
          .send({
            notes: "A good asset"
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

  describe("DELETE ASSET ***", () => {
    before(async () => {
      const userid = user.id;
      asset1 = await createTestAsset({
        userid,
        building: 10,
        motorvehicle: 10,
        generator: 50,
        musicaleqpt: 30,
        asabaproject: 29,
        others: 59,
        uploads: ["receipt1", "receipt3"],
        financeid: finance.id,
        notes: "Asset for Lagos"
      });
    });
    it("should return success on delete asset ===========> ", (done) => {
      try {
        chai.request(index)
          .delete(`/api/v1/finance/assets/${asset1.id}`)
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Asset deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
