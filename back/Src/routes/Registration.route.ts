import { Router } from "express";
import { RegistrationController } from "../controllers/RegistrationController";
import { authMiddleware } from "../Middleware/authMiddleware";
import { roleMiddleware } from "../Middleware/roleMiddleware";
import { validateRequest } from "../Middleware/ValidationUser";
import { Role } from "../models/role/Role";
import { registrationSchema } from "../validators/RegistrationValidator";

const registrationRouter = Router();
const registrationCon = new RegistrationController();

registrationRouter.get("/", authMiddleware, roleMiddleware([Role.admin]), registrationCon.listRegistrations.bind(registrationCon));
registrationRouter.post("/", authMiddleware, roleMiddleware([Role.admin, Role.user]), validateRequest(registrationSchema), registrationCon.create.bind(registrationCon));
registrationRouter.get("/id/:id", authMiddleware, roleMiddleware([Role.admin, Role.user]), registrationCon.listRegistrationById.bind(registrationCon));
registrationRouter.get("/user/:userId", authMiddleware, roleMiddleware([Role.admin, Role.user]), registrationCon.listRegistrationsByUser.bind(registrationCon));
registrationRouter.get("/event/:eventId", authMiddleware, roleMiddleware([Role.admin, Role.user]), registrationCon.listRegistrationsByEvent.bind(registrationCon));
registrationRouter.get("/user/:userId/event/:eventId", authMiddleware, roleMiddleware([Role.admin, Role.user]), registrationCon.listRegistrationByUserAndEvent.bind(registrationCon));
registrationRouter.put("/update/:id", authMiddleware, roleMiddleware([Role.admin, Role.user]), validateRequest(registrationSchema), registrationCon.update.bind(registrationCon));
registrationRouter.delete("/delete/:id", authMiddleware, roleMiddleware([Role.admin, Role.user]), registrationCon.delete.bind(registrationCon));

export default registrationRouter;