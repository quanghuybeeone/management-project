import express from "express";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "../controllers/projects.js";

const router = express.Router();

//CREATE
router.post("/", createProject);

//UPDATE
router.put("/:id", updateProject);

//DELETE
router.delete("/:id", deleteProject);

//GET
router.get("/find/:id", getProject);

//GET ALL
router.get("/", getProjects);

export default router;
