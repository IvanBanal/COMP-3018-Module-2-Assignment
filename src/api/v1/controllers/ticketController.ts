import { Request, Response } from "express";
import * as service from "../services/ticketService";
import { HTTP_STATUS } from "../../../constants/httpConstants";

// These are arrays representing allowed priority levels and ticket statuses.
const priorities = ["critical", "high", "medium", "low"];
const statuses = ["open", "in-progress", "resolved"];

// Create a new ticket.
export const createTicket = (req: Request, res: Response) => {
    const { title, description, priority} = req.body;

    // Edge cases validations.
    if (!title) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Missing required field: title" });
        return;
    }
    if (!description) {
       res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Missing required field: description" });
       return; 
    } 
    if (!priorities.includes(priority)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid priority. Must be one of: critical, high, medium, low" });
        return;
    }

    const ticket = service.createTicket({ title, description, priority });
    res.status(HTTP_STATUS.CREATED).json(ticket);
}

// Get all tickets.
export const getAllTickets = (req: Request, res: Response) => {
    const tickets = service.getAllTickets();
    res.status(HTTP_STATUS.OK).json({
        message: "Tickets retrieved",
        count: tickets.length,
        data: tickets
    });
};

// Get ticket by ID.
export const getTicketById = (req: Request, res: Response) => {
    const ticket = service.getTicketById(Number(req.params.id));
    if (!ticket) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
        return;
    }
    
    res.status(HTTP_STATUS.OK).json(ticket);
};  

// Update a ticket.
export const updateTicket = (req: Request, res: Response) => {
    const { priority, status } = req.body;

    if (priority && !priorities.includes(priority)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid priority. Must be one of: critical, high, medium, low" });
        return;
    }
    if (status && !statuses.includes(status)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid status. Must be one of: open, in-progress, resolved" });
        return;
    }

    const updated = service.updateTicket(Number(req.params.id), req.body);
    if (!updated) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
        return;
    }

    res.status(HTTP_STATUS.OK).json(updated);
};

// Delete a ticket.
export const deleteTicket = (req: Request, res: Response) => {
    const deleted = service.deleteTicket(Number(req.params.id));
    if (!deleted) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
        return;
    }

    res.status(HTTP_STATUS.OK).json({ message: "Ticket deleted" });
};

// Get a ticket with urgency.
export const getTicketWithUrgency = (req: Request, res: Response) => {
    const ticket = service.getTicketWithUrgency(Number(req.params.id));
    if (!ticket) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
        return;
    }

    res.status(HTTP_STATUS.OK).json(ticket);
};