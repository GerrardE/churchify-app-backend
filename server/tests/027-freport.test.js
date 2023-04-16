import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";
import setup from "./factory/setup";
import { createTestFreport } from "./factory";

chai.use(chaiHttp);
const { expect } = chai;

let user, freport, branch, zone, fellowship;

describe("FREPORT TESTS", () => {
  before(async () => {
    const setupData = await setup();

    user = setupData.user.dataValues;
    branch = setupData.branch.dataValues;
    zone = setupData.zone.dataValues;
    fellowship = setupData.fellowship.dataValues;
  });
  describe("CREATE FREPORT ***", () => {
    it("should return success on freport test login ===========> ", (done) => {
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
    it("should return success on create freport ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/freports")
          .set({ Authorization: user.token })
          .send({
            newcells: "10",
            totalcells: "11",
            attendance: "2",
            fellowshipid: Number(fellowship.id),
            notes: "Good job on the report",
            date: "2020-12-04T15:12:13.758Z",
            zoneid: zone.id,
            branchid: branch.id
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Freport created successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on create freport ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/freports")
          .set({ Authorization: user.token })
          .send({
            newcells: "1",
            totalcells: "11",
            fellowshipid: Number(fellowship.id),
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.errors.attendance).to.eql("attendance field is required");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET FREPORTS ***", () => {
    it("should return success on get freports ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/freports")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Freports retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET FREPORT ***", () => {
    it("should return success on getting an freport ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/freports/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Freport retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("UPDATE FREPORT ***", () => {
    it("should return success on update an freport ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/freports/1")
          .set({ Authorization: user.token })
          .send({
            newcells: "10",
            totalcells: "11",
            attendance: "2",
            fellowshipid: Number(fellowship.id),
            date: "2020-12-04T15:12:13.758Z",
            zoneid: zone.id,
            branchid: branch.id,
            notes: "Good updated report",
            updatedAt: "2020-12-04T15:12:13.758Z",
            createdAt: "2020-12-04T15:12:13.758Z",
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Freport updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on update freport ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/freports/1")
          .set({ Authorization: user.token })
          .send({
            notes: "A good freport"
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

  describe("DELETE FREPORT ***", () => {
    before(async () => {
      const userid = user.id;
      freport = await createTestFreport({
        userid,
        branchid: branch.id,
        fellowshipid: fellowship.id,
        zoneid: zone.id,
      });
    });
    it("should return success on delete freport ===========> ", (done) => {
      try {
        chai.request(index)
          .delete(`/api/v1/freports/${freport.id}`)
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Freport deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
