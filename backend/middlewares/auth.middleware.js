// backend/middlewares/auth.middleware.js

import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import Model from "../models/Model.js";
import Admin from "../models/Admin.js";

// =============================================
// Extract Token
// Priority:
// 1. Authorization Header
// 2. Admin Cookie
// 3. Model Cookie
// 4. Query Param
// =============================================
const extractToken = (req) => {
  // Authorization Header
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  // Admin Cookie
  if (req.cookies?.adminToken) {
    return req.cookies.adminToken;
  }

  // Model Cookie
  if (req.cookies?.token) {
    return req.cookies.token;
  }

  // Query Param
  if (req.query?.token) {
    return req.query.token;
  }

  return null;
};

// =============================================
// Required Authentication
// =============================================
export const authMiddleware = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided. Please login first.",
      });
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    // console.log("====================================");
    // console.log("TOKEN:", token);
    // console.log("DECODED:", decoded);
    // console.log("AUTH HEADER:", req.headers.authorization);
    // console.log("COOKIES:", req.cookies);
    // console.log("====================================");

    let user = null;

    // ==========================
    // ADMIN
    // ==========================
    if (
      ["super_admin", "admin", "sub_admin"].includes(decoded.role)
    ) {
      user = await Admin.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Admin not found.",
        });
      }

      req.user = {
        id: user._id.toString(),
        ...user.toObject(),
        isAdmin: true,
      };

      return next();
    }

    // ==========================
    // MODEL
    // ==========================
    user = await Model.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Model not found.",
      });
    }

    req.user = {
      id: user._id.toString(),
      ...user.toObject(),
      isAdmin: false,
    };

    next();

  } catch (error) {

    console.error("AUTH ERROR:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Authentication failed.",
    });
  }
};

// =============================================
// Optional Authentication
// =============================================
export const protectOptional = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    let user = null;

    if (
      ["super_admin", "admin", "sub_admin"].includes(decoded.role)
    ) {
      user = await Admin.findById(decoded.id).select("-password");

      if (user) {
        req.user = {
          id: user._id.toString(),
          ...user.toObject(),
          isAdmin: true,
        };

        return next();
      }
    }

    user = await Model.findById(decoded.id).select("-password");

    req.user = user
      ? {
          id: user._id.toString(),
          ...user.toObject(),
          isAdmin: false,
        }
      : null;

    next();

  } catch (err) {
    req.user = null;
    next();
  }
};

export const authOptional = protectOptional;