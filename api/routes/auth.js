import express from "express";
import { login, register, changepassword } from "../controllers/auth.js";

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.put("/changepassword/:id", changepassword)

export default router