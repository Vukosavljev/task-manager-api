import { Router } from "express";
import * as TaskControllers from "../controllers";

const router = Router();

router.get("/:id", TaskControllers.getTask);
router.get("/", TaskControllers.getTasks);
router.post("/", TaskControllers.createTask);
router.patch("/:id", TaskControllers.updateTask);
router.delete("/:id", TaskControllers.deleteTask);

export default router;
