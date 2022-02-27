import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";
import setup from "./factory/setup";

chai.use(chaiHttp);
const { expect } = chai;

let user, fellowship, fellowship1, branch, city, state, country;

describe("FELLOWSHIP TESTS", () => {
  before(async () => {
    const setupData = await setup();

    fellowship = setupData.fellowship.dataValues;
    branch = setupData.branch;
    country = setupData.country;
    state = setupData.state;
    city = setupData.city;

    const setupData1 = await setup();
    fellowship1 = setupData1.fellowship.dataValues;

    console.log(fellowship, ">>>>>>fellowship")
  });
  describe("CREATE FELLOWSHIP ***", () => {
    it("should return success on fellowship test login ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/users/auth/signin")
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
    it("should return success on create a fellowship ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/fellowships")
          .set({ Authorization: user.token })
          .send({
            name: "Akoka",
            country: country.id,
            state: state.id,
            address: "Afolabi brown street",
            city: city.id,
            branchid: branch.id,
            notes: "Trem Akoka"
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Fellowship created successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/fellowships")
          .set({ Authorization: user.token })
          .send({
            name: "Ojodu",
            country: country.id,
            state: state.id,
            address: "A",
            city: city.id,
            branchid: branch.id,
            notes: "Trem Ojodu"
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.errors.address).to.eql("address must be between 5 and 200 characters");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle unique validation error ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/fellowships")
          .set({ Authorization: user.token })
          .send({
            name: "Akoka",
            country: country.id,
            state: state.id,
            address: "Afolabi brown street",
            city: city.id,
            branchid: branch.id,
            notes: "Trem Akoka"
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

  describe("GET FELLOWSHIPS ***", () => {
    it("should return success on get all fellowships ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/fellowships")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Fellowships retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("UPDATE FELLOWSHIP ***", () => {
    it("should return success on update a fellowship ===========> ", (done) => {
      try {
        chai.request(index)
          .put(`/api/v1/fellowships/${fellowship.id}`)
          .set({ Authorization: user.token })
          .send({
            name: "Akoka",
            country: country.id,
            state: state.id,
            address: "Afolabi brown street",
            city: city.id,
            branchid: branch.id,
            notes: "Trem Akoka"
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Fellowship updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error ===========> ", (done) => {
      try {
        chai.request(index)
          .put(`/api/v1/fellowships/${fellowship.id}`)
          .set({ Authorization: user.token })
          .send({
            state: state.id,
            address: "Afolabi brown street",
            city: city.id,
            branchid: branch.id,
            notes: "Trem Akoka"
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

  describe("GET FELLOWSHIP ***", () => {
    it("should return success on getting a fellowship ===========> ", (done) => {
      try {
        chai.request(index)
          .get(`/api/v1/fellowships/${fellowship.id}`)
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Fellowship retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("DELETE FELLOWSHIP ***", () => {
    it("should return success on delete a fellowship ===========> ", (done) => {
      try {
        chai.request(index)
          .delete(`/api/v1/fellowships/${fellowship1.id}`)
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Fellowship deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
