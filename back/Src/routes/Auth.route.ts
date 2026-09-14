import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const authRouter = Router();
const authCon = new AuthController();

authRouter.post("/login", authCon.login.bind(authCon));

export default authRouter;