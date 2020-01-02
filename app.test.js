const request = require("supertest");
const app = require("./app");

describe("Root path", () => {
  it("responds to GET method", () => {
    return request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});