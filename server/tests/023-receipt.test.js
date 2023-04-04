import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";
import setup from "./factory/setup";
import { createTestReceipt } from "./factory";

chai.use(chaiHttp);
const { expect } = chai;

let user, finance, receipt;

describe("RECEIPT TESTS", () => {
  before(async () => {
    const setupData = await setup();

    finance = setupData.finance.dataValues;
  });
  describe("CREATE RECEIPT ***", () => {
    it("should return success on receipt test login ===========> ", (done) => {
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
    it("should return success on create receipt ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/finance/receipts")
          .set({ Authorization: user.token })
          .send({
            month: "2023-04-01",
            offerings: 800,
            tithes: 800,
            seedfaith: 800,
            thanksgiving: 900,
            annualthanksgiving: 70,
            buildingprojects: 800,
            otherprojects: 600,
            crusadeandmissionary: 80,
            ministrydeposits: 70,
            assetdisposal: 700,
            interestincome: 40,
            loanrepaidbydebtors: 7,
            loanreceived: 100,
            donationreceived: 90,
            uploads: [
              "receipt1",
              "receipt3"
            ],
            financeid: finance.id,
            notes: "Receipts for lagos"
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Receipt created successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on create receipt ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/finance/receipts")
          .set({ Authorization: user.token })
          .send({
            financeid: finance.id,
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.errors.uploads).to.eql("please upload all supporting documents e.g receipts");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET RECEIPTS ***", () => {
    it("should return success on get receipts ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/finance/receipts")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Receipts retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET RECEIPT ***", () => {
    it("should return success on getting an receipt ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/finance/receipts/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Receipt retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("UPDATE RECEIPT ***", () => {
    it("should return success on update an receipt ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/finance/receipts/1")
          .set({ Authorization: user.token })
          .send({
            month: "2023-04-01",
            offerings: 800,
            tithes: 800,
            seedfaith: 800,
            thanksgiving: 900,
            annualthanksgiving: 70,
            buildingprojects: 800,
            otherprojects: 600,
            crusadeandmissionary: 80,
            ministrydeposits: 70,
            assetdisposal: 700,
            interestincome: 40,
            loanrepaidbydebtors: 7,
            loanreceived: 100,
            donationreceived: 90,
            uploads: [
              "receipt1",
              "receipt3"
            ],
            financeid: finance.id,
            notes: "Receipts updated for lagos"
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Receipt updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on update receipt ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/finance/receipts/1")
          .set({ Authorization: user.token })
          .send({
            notes: "A good receipt"
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

  describe("DELETE RECEIPT ***", () => {
    before(async () => {
      const userid = user.id;
      receipt = await createTestReceipt({
        userid,
        financeid: finance.id,
      });
    });
    it("should return success on delete receipt ===========> ", (done) => {
      try {
        chai.request(index)
          .delete(`/api/v1/finance/receipts/${receipt.id}`)
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Receipt deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
