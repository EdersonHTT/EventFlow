import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../Middleware/authMiddleware";
import { roleMiddleware } from "../Middleware/roleMiddleware";
import { Role } from "../models/role/Role";
import { validateUser } from "../Middleware/ValidationUser";
import { userUpdateSchema } from "../validators/UserValidator";

const userRouter = Router();
const userCon = new UserController();

userRouter.get("/", authMiddleware, roleMiddleware([Role.admin]), userCon.listUsers.bind(userCon));
userRouter.post("/", authMiddleware, roleMiddleware([Role.admin]), validateUser(), userCon.create.bind(userCon));
userRouter.get("/id/:id", authMiddleware, roleMiddleware([Role.admin, Role.user]), userCon.listUserById.bind(userCon));
userRouter.get("/email/:email", authMiddleware, roleMiddleware([Role.admin, Role.user]), userCon.listUserByEmail.bind(userCon));
userRouter.get("/cpf/:cpf", authMiddleware, roleMiddleware([Role.admin, Role.user]), userCon.listUserByCpf.bind(userCon));
userRouter.put("/update/:id", authMiddleware, roleMiddleware([Role.admin]), validateUser(userUpdateSchema), userCon.update.bind(userCon));
userRouter.delete("/delete/:id", authMiddleware, roleMiddleware([Role.admin]), userCon.delete.bind(userCon));

export default userRouter;