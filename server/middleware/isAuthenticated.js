import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({
        message: "User not Authenticated",
        success: false,
      });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      res.status(401).json({
        message: "User not Authenticated",
        success: false,
      });
    }
    req.id=decode.user;
    next();
  } catch (err) {
    console.log(err);
  }
};

export default isAuthenticated