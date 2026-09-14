import { Router } from "express";
import { LocationController } from "../controllers/LocationController";

const locationRouter = Router();
const locationCon = new LocationController();

locationRouter.post("/", locationCon.create.bind(locationCon));
locationRouter.put("/:id", locationCon.update.bind(locationCon));
locationRouter.delete("/:id", locationCon.delete.bind(locationCon));
locationRouter.get("/", locationCon.listAll.bind(locationCon));
locationRouter.get("/:id", locationCon.listById.bind(locationCon));
locationRouter.get("/name/:name", locationCon.listByName.bind(locationCon));

export default locationRouter;