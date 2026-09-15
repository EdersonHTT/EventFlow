import { Router } from "express";
import userRouter from "./User.route";
import authRouter from "./Auth.route";
import eventRouter from "./Event.route";
import registrationRouter from "./Registration.route";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/events", eventRouter);
router.use("/registrations", registrationRouter);

export default router;