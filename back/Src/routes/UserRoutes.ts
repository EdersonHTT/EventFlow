import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRouter = Router();
const userCon = new UserController();

userRouter.get("/", userCon.listUsers.bind(userCon));
userRouter.get("/id/:id", userCon.listUserById.bind(userCon));
userRouter.get("/email/:email", userCon.listUserByEmail.bind(userCon));
userRouter.get("/cpf/:cpf", userCon.listUserByCpf.bind(userCon));
userRouter.post("/login", userCon.login.bind(userCon));
userRouter.post("/create", userCon.create.bind(userCon));
userRouter.put("/update/:id", userCon.update.bind(userCon));
userRouter.delete("/delete/:id", userCon.delete.bind(userCon));

export default userRouter;