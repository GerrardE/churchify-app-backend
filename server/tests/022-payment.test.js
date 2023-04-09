import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";
import setup from "./factory/setup";
import { createTestPayment } from "./factory";

chai.use(chaiHttp);
const { expect } = chai;

let user, finance, payment;

describe("PAYMENT TESTS", () => {
  before(async () => {
    const setupData = await setup();

    finance = setupData.finance.dataValues;
  });
  describe("CREATE PAYMENT ***", () => {
    it("should return success on payment test login ===========> ", (done) => {
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
    it("should return success on create payment ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/finance/payments")
          .set({ Authorization: user.token })
          .send({
            nationalofficeremittance: "the remittance",
            hqbuilding: 100,
            zonalhqremittance: 100,
            salariesallowances: 1000,
            pastorpension: 100,
            crusadeandmissionary: 1008,
            personalwelfare: 1007,
            transport: 100,
            accomodation: 1003,
            donations: 1600,
            entertainment: 1100,
            medicalwelfare: 1001,
            stationery: 1006,
            churchexpenses: 1002,
            officeexpenses: 45,
            rentpersonage: 1008,
            churchrent: 1003,
            telephoneandinternet: 4100,
            electricity: 2100,
            fuels: 3100,
            subscriptions: 1090,
            security: 100,
            bankcharges: 100,
            groupexpenses: 100,
            loanadvanced: 1500,
            loanrepayed: 100,
            furnituremaintenance: 1080,
            eqptmaintenance: 100,
            motormaintenance: 100,
            churchbldmaintenance: 100,
            parsonagemaintenance: 700,
            uploads: [
              "receipt1",
              "receipt3"
            ],
            financeid: finance.id,
            notes: "Payments for lagos"
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Payment created successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on create payment ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/finance/payments")
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

  describe("GET PAYMENTS ***", () => {
    it("should return success on get payments ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/finance/payments")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Payments retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET PAYMENT ***", () => {
    it("should return success on getting an payment ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/finance/payments/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Payment retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("UPDATE PAYMENT ***", () => {
    it("should return success on update an payment ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/finance/payments/1")
          .set({ Authorization: user.token })
          .send({
            nationalofficeremittance: "the updated remittance",
            hqbuilding: 100,
            zonalhqremittance: 100,
            salariesallowances: 1000,
            pastorpension: 100,
            crusadeandmissionary: 1008,
            personalwelfare: 1007,
            transport: 100,
            accomodation: 1003,
            donations: 1600,
            entertainment: 1100,
            medicalwelfare: 1001,
            stationery: 1006,
            churchexpenses: 1002,
            officeexpenses: 45,
            rentpersonage: 1008,
            churchrent: 1003,
            telephoneandinternet: 4100,
            electricity: 2100,
            fuels: 3100,
            subscriptions: 1090,
            security: 100,
            bankcharges: 100,
            groupexpenses: 100,
            loanadvanced: 1500,
            loanrepayed: 100,
            furnituremaintenance: 1080,
            eqptmaintenance: 100,
            motormaintenance: 100,
            churchbldmaintenance: 100,
            parsonagemaintenance: 700,
            uploads: [
              "receipt1",
              "receipt3"
            ],
            financeid: finance.id,
            notes: "Payments for lagos"
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Payment updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on update payment ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/finance/payments/1")
          .set({ Authorization: user.token })
          .send({
            notes: "A good payment"
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

  describe("DELETE PAYMENT ***", () => {
    before(async () => {
      const userid = user.id;
      payment = await createTestPayment({
        userid,
        financeid: finance.id,
      });
    });
    it("should return success on delete payment ===========> ", (done) => {
      try {
        chai.request(index)
          .delete(`/api/v1/finance/payments/${payment.id}`)
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Payment deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
