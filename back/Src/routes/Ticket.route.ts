import { Router } from "express";
import { TicketController } from "../controllers/TicketController";
import { validateTicket } from "../validators/TicketValidator";
import { authMiddleware } from "../Middleware/authMiddleware";
import { roleMiddleware } from "../Middleware/roleMiddleware";
import { Role } from "../models/role/Role";

const ticketRouter = Router();
const ticketCon = new TicketController();

ticketRouter.get("/", authMiddleware, roleMiddleware([Role.admin, Role.user]), ticketCon.listAll.bind(ticketCon));
ticketRouter.get("/event/:eventId", ticketCon.listByEvent.bind(ticketCon));
ticketRouter.get("/status/:status", ticketCon.listByStatus.bind(ticketCon));
ticketRouter.patch("/:id/check", authMiddleware, roleMiddleware([Role.user]), ticketCon.check.bind(ticketCon));
ticketRouter.get("/:id", ticketCon.listById.bind(ticketCon));
ticketRouter.post("/", validateTicket(), ticketCon.create.bind(ticketCon));
ticketRouter.put("/:id", validateTicket(true), ticketCon.update.bind(ticketCon));
ticketRouter.delete("/:id", ticketCon.delete.bind(ticketCon));

export default ticketRouter;
