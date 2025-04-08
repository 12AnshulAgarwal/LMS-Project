import { Course } from "../ models/course.model.js";
export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      res.status(400).json({
        message: "Course Title and Category Required",
        success: false,
      });
    }
    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to create Course",
      success: false,
    });
  }
};
