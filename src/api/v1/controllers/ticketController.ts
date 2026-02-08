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