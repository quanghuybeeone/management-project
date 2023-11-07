import express from "express";
import {
  deleteUser,
  getEmployees,
  getLeaders,
  getMembers,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/users.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauth", verifyToken, (req,res,next)=>{
    res.send("Đã đăng nhập")
})
router.get("/checkUser/:id", verifyUser, (req,res,next)=>{
    res.send("User nè")
})
router.get("/checkAdmin/:id", verifyAdmin, (req,res,next)=>{
    res.send("Admin nè")
})

//UPDATE
router.put("/:id", updateUser);

//DELETE
router.delete("/:id", deleteUser);

//GET
router.get("/find/:id", getUser);

//GET ALL
router.get("/", getUsers);
router.get("/members", getMembers);
router.get("/employees", getEmployees);
router.get("/leaders", getLeaders);

export default router;
