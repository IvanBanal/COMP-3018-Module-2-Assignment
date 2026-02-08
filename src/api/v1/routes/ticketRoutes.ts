import { Router } from "express";
import * as controller from "../controllers/ticketController"

const router = Router();

router.post('/', controller.createTicket);
router.get('/', controller.getAllTickets);
router.get('/:id', controller.getTicketById);
router.put('/:id', controller. updateTicket);
router.delete('/:id', controller.deleteTicket);
router.get('/:id/urgency', controller.getTicketWithUrgency);

export default router;