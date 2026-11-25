import express from "express";
import {
  getBirthdays,
  getBirthdayById,
  getBirthdayBySlug,
  createBirthday,
  updateBirthday,
  deleteBirthday,
  uploadPhotos,
  deletePhoto,
  updatePhotoCaption,
} from "../controllers/birthdayController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", protect, getBirthdays);
router.get("/id/:id", protect, getBirthdayById);
router.post("/", protect, createBirthday);
router.put("/:id", protect, updateBirthday);
router.delete("/:id", protect, deleteBirthday);

router.post("/:id/photos", protect, upload.array("photos", 10), uploadPhotos);
router.delete("/:id/photos/:photoId", protect, deletePhoto);
router.put("/:id/photos/:photoId", protect, updatePhotoCaption);

// Public route - must come last so it doesn't clash with "/id/:id"
router.get("/:slug", getBirthdayBySlug);

export default router;
