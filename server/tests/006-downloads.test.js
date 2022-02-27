import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";
import setup from "./factory/setup";

chai.use(chaiHttp);
const { expect } = chai;

let user, category, download, download1;

describe("DOWNLOADS TESTS", () => {
  before(async () => {
    const setupData = await setup();

    download = setupData.download.dataValues;
    category = setupData.category;

    const setupData1 = await setup();
    download1 = setupData1.download.dataValues;
  });
  describe("CREATE DOWNLOAD ***", () => {
    it("should return success on download test login ===========> ", (done) => {
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
    it("should return success on create a download ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/downloads")
          .set({ Authorization: user.token })
          .send({
            name: "Jaja",
            url: "www.james.de",
            date: "2020-12-04T15:12:13.758Z",
            categoryid: category.id,
            notes: "Ebook TCF"
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Download created successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on create download ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/downloads")
          .set({ Authorization: user.token })
          .send({
            name: "J",
            url: "www.james.de",
            date: "2020-12-04T15:12:13.758Z",
            categoryid: category.id,
            notes: "Ebook TCF"
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.errors.name).to.eql("name must be between 2 and 20 characters");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle unique validation error on create download ===========> ", (done) => {
      try {
        chai.request(index)
          .post("/api/v1/downloads")
          .set({ Authorization: user.token })
          .send({
            name: "Jaja",
            url: "www.james.de",
            date: "2020-12-04T15:12:13.758Z",
            categoryid: category.id,
            notes: "Ebook TCF"
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

  describe("GET DOWNLOADS ***", () => {
    it("should return success on get downloads ===========> ", (done) => {
      try {
        chai.request(index)
          .get("/api/v1/downloads")
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Downloads retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("GET DOWNLOAD ***", () => {
    it("should return success on get download ===========> ", (done) => {
      try {
        chai.request(index)
          .get(`/api/v1/downloads/${download.id}`)
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Download retrieved successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });

  describe("UPDATE DOWNLOAD ***", () => {
    it("should return success on update download ===========> ", (done) => {
      try {
        chai.request(index)
          .put(`/api/v1/downloads/${download.id}`)
          .set({ Authorization: user.token })
          .send({
            name: download.name,
            url: "www.james.de",
            date: "2020-12-04T15:12:13.758Z",
            categoryid: "2",
            notes: "Ebook TCF"
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Download updated successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
    it("should handle validation error on update download ===========> ", (done) => {
      try {
        chai.request(index)
          .put(`/api/v1/downloads/${download.id}`)
          .set({ Authorization: user.token })
          .send({
            url: "www.james.de",
            categoryid: "2",
            notes: "Ebook TCF"
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

  describe("DELETE DOWNLOAD ***", () => {
    it("should return success on delete download ===========> ", (done) => {
      try {
        chai.request(index)
          .delete(`/api/v1/downloads/${download1.id}`)
          .set({ Authorization: user.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("payload");
            expect(res.body.message).to.eql("Download deleted successfully");
            done();
          });
      } catch (err) {
        throw err.message;
      }
    });
  });
});
