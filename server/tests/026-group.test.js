import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";
import setup from "./factory/setup";
import { createTestGroup } from "./factory";

chai.use(chaiHttp);
const { expect } = chai;

let user, group, branch, zone;

describe("GROUP TESTS", () => {
  before(async () => {
    const setupData = await setup();

    user = setupData.user.dataValues;
    branch = setupData.branch.dataValues;
    zone = setupData.zone.dataValues;
  });
  describe("CREATE GROUP ***", () => {
    it("should return success on group test login ===========> ", (done) => {
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
    it("should return success on create group ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/groups")
          .set({ Authorization: user.token })
          .send({
            cmf: 190,
            cwf: 102,
            cyf: 101,
            rcf: 12,
            gymcf: 12,
            ywcf: "12",
            yaf: "12",
            teens: "12",
            branchid: branch.id,
            zoneid: zone.id,
            notes: "Nice group report",
            date: "2020-12-04T15:12:13.758Z",
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Group created successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on create group ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/groups")
          .set({ Authorization: user.token })
          .send({
            branchid: branch.id,
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.errors.rcf).to.eql("rcf field is required");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET GROUPS ***", () => {
    it("should return success on get groups ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/groups")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Groups retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET GROUP ***", () => {
    it("should return success on getting an group ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/groups/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Group retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("UPDATE GROUP ***", () => {
    it("should return success on update an group ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/groups/1")
          .set({ Authorization: user.token })
          .send({
            cmf: 190,
            cwf: 102,
            cyf: 101,
            rcf: 12,
            gymcf: 12,
            ywcf: "12",
            yaf: "12",
            teens: "12",
            branchid: branch.id,
            zoneid: zone.id,
            notes: "Nice updated group report",
            date: "2020-12-04T15:12:13.758Z",
            updatedAt: "2020-12-04T15:12:13.758Z",
            createdAt: "2020-12-04T15:12:13.758Z",
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Group updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on update group ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/groups/1")
          .set({ Authorization: user.token })
          .send({
            notes: "A good group"
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

  describe("DELETE GROUP ***", () => {
    before(async () => {
      const userid = user.id;
      group = await createTestGroup({
        userid,
        branchid: branch.id,
        zoneid: zone.id,
      });
    });
    it("should return success on delete group ===========> ", (done) => {
      try {
        chai.request(index)
          .delete(`/api/v1/groups/${group.id}`)
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Group deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
