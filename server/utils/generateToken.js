import jwt from "jsonwebtoken";

// Generates a signed JWT for a given admin id
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export default generateToken;
