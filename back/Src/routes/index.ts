import { Router } from "express";
import userRouter from "./User.route";
import authRouter from "./Auth.route";
import ticketRouter from "./Ticket.route";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/tickets", ticketRouter);

export default router;