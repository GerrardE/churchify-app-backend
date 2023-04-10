import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";
import setup from "./factory/setup";
import { createTestMembership } from "./factory";

chai.use(chaiHttp);
const { expect } = chai;

let user, membership, branch, zone;

describe("MEMBERSHIP TESTS", () => {
  before(async () => {
    const setupData = await setup();

    user = setupData.user.dataValues;
    branch = setupData.branch.dataValues;
    zone = setupData.zone.dataValues;
  });
  describe("CREATE MEMBERSHIP ***", () => {
    it("should return success on membership test login ===========> ", (done) => {
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
    it("should return success on create membership ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/memberships")
          .set({ Authorization: user.token })
          .send({
            userid: user.id,
            adults: 10,
            children: 20,
            tithers: 10,
            newmembers: 20,
            branchid: branch.id,
            zoneid: zone.id,
            date: "2020-12-04T15:12:13.758Z",
            notes: "A good report",
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Membership created successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on create membership ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/memberships")
          .set({ Authorization: user.token })
          .send({
            branchid: branch.id,
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.errors.zone).to.eql("zone field is required");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET MEMBERSHIPS ***", () => {
    it("should return success on get membership ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/memberships")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Memberships retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET MEMBERSHIP ***", () => {
    it("should return success on getting an membership ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/memberships/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Membership retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("UPDATE MEMBERSHIP ***", () => {
    it("should return success on update an membership ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/memberships/1")
          .set({ Authorization: user.token })
          .send({
            userid: user.id,
            adults: 10,
            children: 20,
            tithers: 10,
            newmembers: 20,
            branchid: branch.id,
            zoneid: zone.id,
            date: "2020-12-04T15:12:13.758Z",
            notes: "Memberships updated for lagos",
            updatedAt: "2020-12-04T15:12:13.758Z",
            createdAt: "2020-12-04T15:12:13.758Z",
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Membership updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on update membership ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/memberships/1")
          .set({ Authorization: user.token })
          .send({
            notes: "A good membership"
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

  describe("DELETE MEMBERSHIP ***", () => {
    before(async () => {
      const userid = user.id;
      membership = await createTestMembership({
        userid,
        zoneid: zone.id,
        branchid: branch.id
      });
    });
    it("should return success on delete membership ===========> ", (done) => {
      try {
        chai.request(index)
          .delete(`/api/v1/memberships/${membership.id}`)
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Membership deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
