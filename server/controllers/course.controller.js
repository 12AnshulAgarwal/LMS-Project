import { Course } from "../ models/course.model.js";
export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        message: "Course Title and Category Required",
        success: false,
      });
    }
    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });
    return res.status(201).json({
      message: "Course created successfully",
      success: true,
      course,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to create Course",
      success: false,
    });
  }
};

export const getCreatorCourse=async(req,res)=>{
  try{
    const userId=req.id;
    const Courses=await Course.find({creator:userId});
    if(!Courses){
      return res.status(404).json({
        Courses:[],
        message:"Course not found"
      })
    };
    return res.status(200).json({
      Courses
    })
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      message: "Failed to get Course",
      success: false,
    });
  }
}
