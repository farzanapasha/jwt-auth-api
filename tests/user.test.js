const request = require("supertest");
const app = require("../server"); // Import app, NOT starting the server manually
const db = require("../models/db");
jest.mock("../models/db"); // Mock the db module

describe("User API Tests", () => {
  // Test case for fetching a user by ID
  it("should fetch a user by ID", async () => {
    // Mock the db.query function for fetching a user by ID
    db.query.mockImplementation((query, values, callback) => {
      if (query.includes("SELECT id, name, email FROM users WHERE id = ?")) {
        // Simulate user found by ID
        callback(null, [{ id: 1, name: "Test User", email: "test@example.com" }]);
      }
    });

    const res = await request(app).get("/api/users/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toBe(1);
    expect(res.body.name).toBe("Test User");
    expect(res.body.email).toBe("test@example.com");
  });

  // Test case for user not found
  it("should return an error if user not found", async () => {
    // Mock the db.query function to simulate no user found
    db.query.mockImplementation((query, values, callback) => {
      if (query.includes("SELECT id, name, email FROM users WHERE id = ?")) {
        // Simulate no user found by ID
        callback(null, []);
      }
    });

    const res = await request(app).get("/api/users/999");
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBe("User not found");
  });

  // Test case for updating a user
  it("should update a user", async () => {
    // Mock the db.query function for checking if user exists before update
    db.query.mockImplementation((query, values, callback) => {
      if (query.includes("SELECT * FROM users WHERE email = ?")) {
        // Simulate user exists with the same email
        callback(null, [{ id: 1, name: "Test User", email: "test@example.com" }]);
      } else if (query.includes("UPDATE users SET")) {
        // Simulate successful update
        callback(null, { affectedRows: 1 });
      }
    });

    const res = await request(app)
      .put("/api/users/1")
      .send({ name: "Updated User", email: "test@example.com", password: "newpassword123" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("User updated successfully");
  });

  // Test case for updating a non-existent user
  it("should return an error if user not found during update", async () => {
    // Mock the db.query function to simulate no user found for update
    db.query.mockImplementation((query, values, callback) => {
      if (query.includes("SELECT * FROM users WHERE email = ?")) {
        // Simulate user does not exist
        callback(null, []);
      } else if (query.includes("UPDATE users SET")) {
        // Simulate no affected rows for non-existent user
        callback(null, { affectedRows: 0 });
      }
    });

    const res = await request(app)
      .put("/api/users/999")
      .send({ name: "Non-Existent User", email: "nonexistent@example.com", password: "newpassword123" });

    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBe("User not found or no changes made");
  });
});

