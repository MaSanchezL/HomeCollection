import jwt from "jsonwebtoken";


const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if(!token){
      return res.status(400).json({ message: "el token debe estar presente" });
    }
    const extractToken = token.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(extractToken, process.env.JWT_SECRET);
    req.user = decoded.email;
    next();
  } catch (error) {
    return res.status(400).json({ message: "el token es invalido" });
  }
};

export { verifyToken };











// lo que estaba, lo mismo de las pizzas
/*import "dotenv/config";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    // console.log(error);
    return res.status(401).send({ error: "Invalid token" });
  }
};

export default authMiddleware;*/
