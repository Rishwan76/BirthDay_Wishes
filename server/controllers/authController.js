import { timingSafeEqual } from "crypto";
import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

export const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password, setupKey } = req.body;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      password.length < 6 ||
      typeof setupKey !== "string" ||
      !setupKey
    ) {
      res.status(400);
      throw new Error("Please provide a name, valid email, password of at least 6 characters and setup key");
    }

    const expectedKey = process.env.ADMIN_REGISTRATION_KEY;
    if (!expectedKey) {
      res.status(503);
      throw new Error("Admin registration is not configured");
    }
    const supplied = Buffer.from(setupKey);
    const expected = Buffer.from(expectedKey);
    if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
      res.status(401);
      throw new Error("Invalid setup key");
    }
    if (await Admin.exists({})) {
      res.status(403);
      throw new Error("Admin registration is closed");
    }

    const admin = await Admin.create({ name, email, password });
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id),
    });
  } catch (error) {
    next(error);
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (typeof email !== "string" || !email.trim() || typeof password !== "string" || !password) {
      res.status(400);
      throw new Error("Please provide email and password");
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin || !(await admin.matchPassword(password))) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id),
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = (req, res) => res.json(req.admin);
