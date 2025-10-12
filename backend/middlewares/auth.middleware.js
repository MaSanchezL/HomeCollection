import jwt from "jsonwebtoken";
import { findUserByEmail } from "../models/auth.model.js";

export const extractTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (token) {
      const extractToken = token.split(" ")[1];
      const decoded = jwt.verify(extractToken, process.env.JWT_SECRET);
      req.user = decoded.email;
    }

    next();
  
  } catch (error) {
    return res
      .status(400)
      .json({ message: "el token es invalido", desc: error.message });
  }
};

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
    return res
      .status(400)
      .json({ message: "el token es invalido", desc: error.message });
  }
};




export const isAdminMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(400).json({ message: "el token debe estar presente" });
    }
    const extractToken = token.split(" ")[1];
    // console.log(token);
    const decoded = jwt.verify(extractToken, process.env.JWT_SECRET);

    req.user = decoded.email;
    const user = await findUserByEmail(decoded.email);
    if(!user.rol_administrador){
      return res.status(403).json({ message: "Debe ser administrador" });
    }

    next();
  } catch (error) {
    return res
      .status(400)
      .json({ message: "el token es invalido", desc: error.message });
  }
};

export default authMiddleware;
