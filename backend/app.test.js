const request = require("supertest");
const app = require("./app"); // Replace './app' with the path to your main server file

describe("Test API Endpoints", () => {
  it("should return the current server time", async () => {
    const response = await request(app)
      .get("/time")
      .set("Authorization", "mysecrettoken");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("epoch");
    expect(typeof response.body.epoch).toBe("number");
  });

  it("should return a 403 status for unauthorized request to /time", async () => {
    const response = await request(app).get("/time");
    expect(response.status).toBe(403);
  });

  // You can add more test cases for other scenarios and endpoints
});
