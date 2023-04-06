import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";
import setup from "./factory/setup";
import { createTestRemuneration } from "./factory";

chai.use(chaiHttp);
const { expect } = chai;

let user, finance, remuneration;

describe("REMUNERATION TESTS", () => {
  before(async () => {
    const setupData = await setup();

    finance = setupData.finance.dataValues;
  });
  describe("CREATE REMUNERATION ***", () => {
    it("should return success on remuneration test login ===========> ", (done) => {
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
    it("should return success on create remuneration ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/finance/remunerations")
          .set({ Authorization: user.token })
          .send({
            pastorpaid: true,
            fulltimepastorcount: 7,
            uploads: [
              "receipt2",
              "receipt3"
            ],
            financeid: finance.id,
            notes: "Remuneration for lagos"
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Remuneration created successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on create remuneration ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/finance/remunerations")
          .set({ Authorization: user.token })
          .send({
            fulltimepastorcount: 7,
            uploads: [
              "receipt2",
              "receipt3"
            ],
            financeid: finance.id,
            notes: "Remuneration for lagos"
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.errors.pastorpaid).to.eql("pastorpaid field is required");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET REMUNERATIONS ***", () => {
    it("should return success on get remunerations ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/finance/remunerations")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Remunerations retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET REMUNERATION ***", () => {
    it("should return success on getting an remuneration ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/finance/remunerations/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Remuneration retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("UPDATE REMUNERATION ***", () => {
    it("should return success on update an remuneration ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/finance/remunerations/1")
          .set({ Authorization: user.token })
          .send({
            pastorpaid: true,
            fulltimepastorcount: 7,
            uploads: [
              "receipt4",
              "receipt3"
            ],
            financeid: finance.id,
            notes: "Remuneration for lagos"
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Remuneration updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on update remuneration ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/finance/remunerations/1")
          .set({ Authorization: user.token })
          .send({
            notes: "A good remuneration"
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

  describe("DELETE REMUNERATION ***", () => {
    before(async () => {
      const userid = user.id;
      remuneration = await createTestRemuneration({
        userid,
        pastorpaid: true,
        fulltimepastorcount: 7,
        uploads: [
          "receipt2",
          "receipt3"
        ],
        financeid: finance.id,
        notes: "Remuneration for lagos"
      });
    });
    it("should return success on delete remuneration ===========> ", (done) => {
      try {
        chai.request(index)
          .delete(`/api/v1/finance/remunerations/${remuneration.id}`)
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Remuneration deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
