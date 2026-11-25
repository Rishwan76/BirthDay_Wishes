import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

export const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      password.length < 6
    ) {
      res.status(400);
      throw new Error("Please provide a name, valid email and password of at least 6 characters");
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (await Admin.exists({ email: normalizedEmail })) {
      res.status(409);
      throw new Error("An admin with this email already exists");
    }

    const admin = await Admin.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
    });

    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
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
