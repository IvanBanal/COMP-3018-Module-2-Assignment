import { calculateUrgency, Ticket } from "../src/api/v1/services/ticketService";

describe("Urgency Calculation (3 Total Tests", () => {
    it("should return 0 score for resolved ticket", () => {
        // Arrange
        const ticket: Ticket = {
            id: 1,
            title: "Resolved ticket",
            description: "Test description",
            priority: "high",
            status: "resolved",
            createdAt: new Date().toISOString()
        };

        // Act
        const result = calculateUrgency(ticket);

        // Assert 
        expect(result.urgencyScore).toBe(0);
        expect(result.urgencyMessage).toBe("Minimal. Ticket resolved.");
    });

    it("should calculate correct urgencyScore for a medium ticket 3 days old", () => {
        // Arrange
        const date = new Date();
        // This is to calculate 3 days ago.
        date.setDate(date.getDate() - 3); 
        const ticket: Ticket = {
            id: 2,
            title: "Medium priority ticket",
            description: "Test description",
            priority: "medium",
            status: "open",
            createdAt: date.toISOString()
        };

        // Act
        const result = calculateUrgency(ticket);

        // Assert
        expect(result.urgencyScore).toBe(35);
        expect(result.urgencyMessage).toBe("Moderate. Schedule for attention.");
    });

    it("should return High urgency message for a high priority ticket that is 6 days old", () => {
        // Arrange
        const date = new Date();
        // This is to calculate 6 days ago.
        date.setDate(date.getDate() - 6);
        const ticket: Ticket = {
            id: 3,
            title: "High priority ticket",
            description: "Test description",
            priority: "high",
            status: "open",
            createdAt: date.toISOString()
        };

        // Act 
        const result = calculateUrgency(ticket);
        
        // Assert
        expect(result.urgencyScore).toBe(60)
        expect(result.urgencyMessage).toBe("High urgency. Prioritize resolution.")
    });
});