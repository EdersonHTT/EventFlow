import { Router } from "express";
import userRouter from "./User.route";
import authRouter from "./Auth.route";
import eventRouter from "./Event.route";
import ticketRouter from "./Ticket.route";
import locationRouter from "./Location.route";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/events", eventRouter);
router.use("/tickets", ticketRouter);
router.use("/locations", locationRouter);

export default router;