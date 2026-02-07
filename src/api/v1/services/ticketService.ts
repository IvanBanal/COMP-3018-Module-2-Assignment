import { tickets } from "src/data/tickets";

/**
 * Interface representing the support ticket.
 */
export interface Ticket {
    id: number;
    title: string;
    description: string;
    // 'critical', 'high', 'medium', 'low'.
    priority: string;
    // 'open', 'in-progress', 'resolved'.
    status: string;
    createdAt: string;
}

// Base urgency scores.
// Using Record<> to construct a type.
const baseScores: Record<string, number> = {
    critical: 50,
    high: 30,
    medium: 20,
    low: 10
};

/**
 * This function will calculate the age of the ticket in days.
 * @param date ISO date string of creation.
 * @returns Number of days since the ticket was created.
 */
const ageInDays = (date: string) =>
    /**
     * Math.floor rounds down to the nearest whole number of days.
     * Date.now returns current timestamp in milliseconds (right now).
     * new Date(date) converts a date string into a JavaScript Date object.
     * .getTime() returns the date in milliseconds since midnight, 
     * January 1, 1970 UTC.
     * Dividng by 86400000 since there are 86400000 milliseconds in a day.
     */ 
    Math.floor((Date.now() - new Date(date).getTime()) / 86400000);

/**
 * This function will calculate the urgency of a ticket.
 * @param ticket Ticket object.
 * @returns Object containing urgencyScore and urgencyMessage.
 */
export const calculateUrgency = (ticket: Ticket) => {
    if (ticket.status === "resolved") {
        return { urgencyScore: 0, urgencyMessage: "Minimal. Ticket resolved." };
    }

    const score = (baseScores[ticket.priority] || 0) + ageInDays(ticket.createdAt) * 2;

    const urgencyMessage = 
        // Using Ternary operator.
        score < 40
            ? "Low urgency. Address when capacity allows."
            : score < 70
            ? "Moderate. Schedule for attention."
            : score < 100
            ? "High urgency. Prioritize resolution."
            : "Critical. Immediate attention required.";
    
    return { urgencyScore: score, urgencyMessage };
};




