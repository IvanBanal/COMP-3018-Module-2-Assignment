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
 * Calculate the age of the ticket in days.
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




