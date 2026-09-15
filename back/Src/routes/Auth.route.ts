import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validateUser } from "../Middleware/ValidationUser";
import { loginSchema } from "../validators/AuthValidator";

const authRouter = Router();
const authCon = new AuthController();

authRouter.post("/login", validateUser(loginSchema), authCon.login.bind(authCon));

export default authRouter;