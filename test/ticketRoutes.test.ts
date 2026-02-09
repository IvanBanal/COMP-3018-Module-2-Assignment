import request from "supertest";
import app from "../src/app";

describe("Ticket Routes (1 test per route", () => {
    it("should create a ticket", async () => {
        // Arrange & Act
        const res = await request(app).post("/api/v1/tickets").send({
            title: "Login issue",
            description: "Cannot login",
            priority: "high"
        });

        // Assert
        expect(res.status).toBe(201);
    });

    it("should retrieve all tickets", async () => {
        // Arrange & Act
        const res = await request(app).get("/api/v1/tickets");

        // Assert
        expect(res.status).toBe(200);
    });

    it("should retrieve a ticket by ID", async () => {
        // Arrange & Act
        const res = await request(app).get("/api/v1/tickets/1");

        // Assert
        expect(res.status).toBe(200);
    });

    it("should update a ticket", async () => {
        // Arrange & Act
        const res = await request(app).put("/api/v1/tickets/1").send({
            priority: "medium",
            status: "in-progress"
        });

        // Assert
        expect(res.status).toBe(200);
    });

    it("should delete a ticket", async () => {
        // Arrange & Act
        const res = await request(app).delete("/api/v1/tickets/1");

        // Assert
        expect(res.status).toBe(200);
    });

    it("should return ticket urgency", async () => {
        // Arrange & Act
        const res = await request(app).get("/api/v1/tickets/2/urgency");

        // Assert
        expect(res.status).toBe(200);
    });
});