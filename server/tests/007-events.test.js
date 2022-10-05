import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";
import createTestEvent from "./factory/event-factory";

chai.use(chaiHttp);
const { expect } = chai;

let user, event;

describe("EVENTS TESTS", () => {
  describe("CREATE EVENT ***", () => {
    it("should return success on event test login ===========> ", (done) => {
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
    it("should return success on create event ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/events")
          .set({ Authorization: user.token })
          .send({
            address: "Lagos road",
            branchid: "1",
            name: "Power For Living",
            date: "2020-12-04T15:12:13.758Z",
            notes: "A good event"
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Event created successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on create event ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/events")
          .set({ Authorization: user.token })
          .send({
            name: "P",
            date: "2020-12-04T15:12:13.758Z",
            notes: "A good event"
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
          .post("/api/v1/events")
          .set({ Authorization: user.token })
          .send({
            branchid: "1",
            name: "Power For Living",
            date: "2020-12-04T15:12:13.758Z",
            notes: "A good event",
            address: "Lagos road",
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

  describe("GET EVENTS ***", () => {
    it("should return success on get events ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/events")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Events retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET EVENT ***", () => {
    it("should return success on getting an event ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/events/1")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Event retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("UPDATE EVENT ***", () => {
    it("should return success on update an event ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/events/1")
          .set({ Authorization: user.token })
          .send({
            branchid: "1",
            name: "Power",
            date: "2020-12-04T15:12:13.758Z",
            notes: "A good event"
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Event updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on update event ===========> ", (done) => {
      try {
        chai.request(index)
          .put("/api/v1/events/1")
          .set({ Authorization: user.token })
          .send({
            notes: "A good event"
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

  describe("DELETE EVENT ***", () => {
    before(async () => {
      const userid = user.id;
      event = await createTestEvent({ userid });
    });
    it("should return success on delete event ===========> ", (done) => {
      try {
        chai.request(index)
          .delete(`/api/v1/events/${event.id}`)
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Event deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
