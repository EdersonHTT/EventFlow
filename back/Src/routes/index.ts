import { Router } from "express";
import userRouter from "./User.route";
import authRouter from "./Auth.route";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);

export default router;