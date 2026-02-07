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

