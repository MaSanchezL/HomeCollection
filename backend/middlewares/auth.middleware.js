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
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No autorizado" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Token inválido" });
  }
};

export default authMiddleware;*/
