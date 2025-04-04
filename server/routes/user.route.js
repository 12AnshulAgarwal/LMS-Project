import express from "express";
import { login, logout, profile, register } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/Profile").get(isAuthenticated,profile);
router.route("/logout").get(isAuthenticated,logout);

export default router;
