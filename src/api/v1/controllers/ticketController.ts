import { Request, Response } from "express";
import * as service from "../services/ticketService";

// These are arrays representing allowed priority levels and ticket statuses.
const priorities = ["critical", "high", "medium", "low"];
const statuses = ["open", "in-progress", "resolved"];
