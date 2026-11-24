import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new admin (used for initial setup)
// @route   POST /api/auth/register
export const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please provide name, email and password");
    }

    const existing = await Admin.findOne({ email: email.toLowerCase() });
    if (existing) {
      res.status(400);
      throw new Error("An admin with this email already exists");
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

// @desc    Login admin
// @route   POST /api/auth/login
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide email and password");
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged-in admin profile
// @route   GET /api/auth/me
export const getMe = async (req, res, next) => {
  try {
    res.json(req.admin);
  } catch (error) {
    next(error);
  }
};
