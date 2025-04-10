import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { createCourse, getCreatorCourse } from "../controllers/course.controller.js";
const router = express.Router();

router.route("/").post(isAuthenticated,createCourse);
router.route("/").get(isAuthenticated,getCreatorCourse);

export default router;
