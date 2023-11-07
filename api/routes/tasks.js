import express from "express";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/tasks.js";


const router = express.Router();

//CREATE
router.post("/", createTask);

//UPDATE
router.put("/:id", updateTask);

//DELETE
router.delete("/:id", deleteTask);

//GET
router.get("/find/:id", getTask);

//GET ALL
router.get("/", getTasks);
// router.get("/project/:id", getTasksByProjecId);

export default router;
