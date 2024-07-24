import { Router } from "express";
import * as TaskController from "../controllers/TaskController.js";
import { authenticateToken } from "../middlewares/auth.js";
const router = Router();

router.get("/", authenticateToken, TaskController.getTasks);
router.post("/add", authenticateToken, TaskController.addTask);
router.put("/update", authenticateToken, TaskController.updateTask);
router.delete("/delete", authenticateToken, TaskController.deleteTask);

export default router;