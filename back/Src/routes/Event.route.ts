import { Router } from "express";
import { EventController } from "../controllers/EventController";
import { authMiddleware } from "../Middleware/authMiddleware";
import { roleMiddleware } from "../Middleware/roleMiddleware";
import { Role } from "../models/role/Role";
import { validateRequest } from "../Middleware/ValidationUser";
import { eventCreateSchema, eventUpdateSchema } from "../validators/EventValidator";

const eventRouter = Router();
const eventCon = new EventController();

eventRouter.get("/", authMiddleware, roleMiddleware([Role.admin, Role.user]), eventCon.listEvents.bind(eventCon));
eventRouter.post("/", authMiddleware, roleMiddleware([Role.admin]), validateRequest(eventCreateSchema), eventCon.create.bind(eventCon));
eventRouter.get("/id/:id", authMiddleware, roleMiddleware([Role.admin, Role.user]), eventCon.listEventById.bind(eventCon));
eventRouter.get("/name/:name", authMiddleware, roleMiddleware([Role.admin, Role.user]), eventCon.listEventByName.bind(eventCon));
eventRouter.get("/category/:categoryId", authMiddleware, roleMiddleware([Role.admin, Role.user]), eventCon.listEventsByCategory.bind(eventCon));
eventRouter.get("/location/:locationId", authMiddleware, roleMiddleware([Role.admin, Role.user]), eventCon.listEventsByLocation.bind(eventCon));
eventRouter.put("/update/:id", authMiddleware, roleMiddleware([Role.admin]), validateRequest(eventUpdateSchema), eventCon.update.bind(eventCon));
eventRouter.delete("/delete/:id", authMiddleware, roleMiddleware([Role.admin]), eventCon.delete.bind(eventCon));

export default eventRouter;
