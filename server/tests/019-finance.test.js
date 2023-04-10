import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";
import setup from "./factory/setup";
import { createTestFinance } from "./factory";

chai.use(chaiHttp);
const { expect } = chai;

let user, finance, finance1, zone, branch, preacher;

describe("FINANCE TESTS", () => {
  before(async () => {
    const setupData = await setup();

    zone = setupData.zone.dataValues;
    branch = setupData.branch.dataValues;
    preacher = setupData.preacher.dataValues;

    finance = setupData.finance.dataValues;
  });
  describe("CREATE FINANCE ***", () => {
    it("should return success on finance test login ===========> ", (done) => {
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
    it("should return success on create finance ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/finances")
          .set({ Authorization: user.token })
          .send({
            name: "test finance",
            zoneid: zone.id,
            branchid: branch.id,
            preacherid: preacher.id,
            userid: user.id,
            notes: finance.notes,
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Finance created successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on create finance ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/finances")
          .set({ Authorization: user.token })
          .send({
            name: "P",
            notes: "A good finance"
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.errors.name).to.eql("name must be between 2 and 100 characters");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle unique validation error ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/finances")
          .set({ Authorization: user.token })
          .send({
            name: "test finance",
            zoneid: zone.id,
            branchid: branch.id,
            preacherid: preacher.id,
            userid: user.id,
            notes: finance.notes,
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

  describe("GET FINANCES ***", () => {
    it("should return success on get finances ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/finances")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Finances retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET FINANCE ***", () => {
    it("should return success on getting an finance ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/finances/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Finance retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("UPDATE FINANCE ***", () => {
    it("should return success on update a finance ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/finances/1")
          .set({ Authorization: user.token })
          .send({
            name: "Test finance for update",
            zoneid: zone.id,
            branchid: branch.id,
            preacherid: preacher.id,
            userid: user.id,
            notes: finance.notes,
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Finance updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on update finance ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/finances/1")
          .set({ Authorization: user.token })
          .send({
            notes: "A good finance"
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

  describe("DELETE FINANCE ***", () => {
    before(async () => {
      const userid = user.id;
      finance1 = await createTestFinance({
        userid,
        zoneid: zone.id,
        branchid: branch.id,
        preacherid: preacher.id,
      });
    });
    it("should return success on delete finance ===========> ", (done) => {
      try {
        chai.request(index)
          .delete(`/api/v1/finances/${finance1.id}`)
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Finance deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
