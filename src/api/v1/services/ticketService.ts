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

