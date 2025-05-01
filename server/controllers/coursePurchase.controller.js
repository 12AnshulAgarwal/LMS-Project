import axios from "axios";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";

const LEMONSQUEEZY_API_KEY = process.env.LEMONSQUEEZY_API_KEY;
const LEMONSQUEEZY_STORE_ID = process.env.LEMONSQUEEZY_STORE_ID;

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found!" });

    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
    });

    // Create checkout session in LemonSqueezy
    const response = await axios.post(
      "https://api.lemonsqueezy.com/v1/checkouts",
      {
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              custom: {
                courseId: courseId,
                userId: userId,
              },
            },
            product_options: {
              enabled: true,
            },
            product_id: course.courseLemonSqueezyProductId, // you must have this field in your course model
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${LEMONSQUEEZY_API_KEY}`,
          "Content-Type": "application/vnd.api+json",
          Accept: "application/vnd.api+json",
        },
      }
    );

    const checkoutUrl = response.data.data.attributes.url;

    if (!checkoutUrl) {
      return res
        .status(400)
        .json({ success: false, message: "Error while creating checkout" });
    }

    newPurchase.paymentId = response.data.data.id; // you can store LemonSqueezy checkout ID
    await newPurchase.save();

    return res.status(200).json({
      success: true,
      url: checkoutUrl, // send the checkout page URL to frontend
    });
  } catch (error) {
    console.log(error.response?.data || error.message);
    return res
      .status(500)
      .json({ success: false, message: "Checkout session failed" });
  }
};

// Webhook handling for LemonSqueezy
export const lemonWebhook = async (req, res) => {
  try {
    const event = req.body;

    if (event.meta.event_name === "order_created") {
      const order = event.data.attributes;

      const courseId = order.custom_data?.courseId;
      const userId = order.custom_data?.userId;

      const purchase = await CoursePurchase.findOne({ courseId, userId });

      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }

      purchase.status = "completed";
      purchase.amount = order.total; // LemonSqueezy returns amount in dollars

      // Make all lectures visible
      if (purchase.courseId && purchase.courseId.lectures.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: purchase.courseId.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }

      await purchase.save();

      // Update user's enrolledCourses
      await User.findByIdAndUpdate(
        purchase.userId,
        { $addToSet: { enrolledCourses: purchase.courseId._id } },
        { new: true }
      );

      // Update course enrolled students
      await Course.findByIdAndUpdate(
        purchase.courseId._id,
        { $addToSet: { enrolledStudents: purchase.userId } },
        { new: true }
      );
    }

    res.status(200).send("Webhook received");
  } catch (error) {
    console.error("Webhook Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    const purchased = await CoursePurchase.findOne({ userId, courseId });
    console.log(purchased);

    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    return res.status(200).json({
      course,
      purchased: !!purchased,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");

    if (!purchasedCourse) {
      return res.status(404).json({
        purchasedCourse: [],
      });
    }

    return res.status(200).json({
      purchasedCourse,
    });
  } catch (error) {
    console.log(error);
  }
};
