import jwt from "jsonwebtoken";


const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(400).json({ message: "el token debe estar presente" });
    }
    const extractToken = token.split(" ")[1];
    // console.log(token);
    const decoded = jwt.verify(extractToken, process.env.JWT_SECRET);
    req.user = decoded.email;
    next();
  } catch (error) {
    return res.status(400).json({ message: "el token es invalido" });
  }
};

export  default authMiddleware ;

