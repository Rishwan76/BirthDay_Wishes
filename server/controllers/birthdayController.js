import Birthday from "../models/Birthday.js";

// Turns any string into a clean, URL-safe slug
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// @desc    Get all birthdays (admin dashboard list)
// @route   GET /api/birthdays
export const getBirthdays = async (req, res, next) => {
  try {
    const birthdays = await Birthday.find().sort({ createdAt: -1 });
    res.json(birthdays);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single birthday by id (for admin edit/preview)
// @route   GET /api/birthdays/id/:id
export const getBirthdayById = async (req, res, next) => {
  try {
    const birthday = await Birthday.findById(req.params.id);
    if (!birthday) {
      res.status(404);
      throw new Error("Birthday not found");
    }
    res.json(birthday);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single birthday by public slug (the actual experience page)
// @route   GET /api/birthdays/:slug
export const getBirthdayBySlug = async (req, res, next) => {
  try {
    const birthday = await Birthday.findOne({ slug: req.params.slug.toLowerCase() });
    if (!birthday) {
      res.status(404);
      throw new Error("This birthday surprise couldn't be found");
    }
    res.json(birthday);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new birthday experience
// @route   POST /api/birthdays
export const createBirthday = async (req, res, next) => {
  try {
    const {
      recipientName,
      slug,
      birthdayDate,
      greeting,
      personalLetter,
      finalMessage,
      wishes,
      musicUrl,
      theme,
      photos,
    } = req.body;

    if (!recipientName) {
      res.status(400);
      throw new Error("Recipient name is required");
    }

    let finalSlug = slugify(slug || recipientName);

    // Ensure slug is unique by appending a short suffix if needed
    const existing = await Birthday.findOne({ slug: finalSlug });
    if (existing) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    const birthday = await Birthday.create({
      recipientName,
      slug: finalSlug,
      birthdayDate,
      greeting,
      personalLetter,
      finalMessage,
      wishes: Array.isArray(wishes) ? wishes : undefined,
      musicUrl,
      theme,
      photos: Array.isArray(photos) ? photos : [],
    });

    res.status(201).json(birthday);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a birthday experience
// @route   PUT /api/birthdays/:id
export const updateBirthday = async (req, res, next) => {
  try {
    const birthday = await Birthday.findById(req.params.id);
    if (!birthday) {
      res.status(404);
      throw new Error("Birthday not found");
    }

    const updatableFields = [
      "recipientName",
      "birthdayDate",
      "greeting",
      "personalLetter",
      "finalMessage",
      "wishes",
      "musicUrl",
      "theme",
      "photos",
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        birthday[field] = req.body[field];
      }
    });

    // Allow slug change, but keep it unique
    if (req.body.slug) {
      const newSlug = slugify(req.body.slug);
      if (newSlug !== birthday.slug) {
        const clash = await Birthday.findOne({ slug: newSlug });
        if (clash) {
          res.status(400);
          throw new Error("That slug is already taken, please choose another");
        }
        birthday.slug = newSlug;
      }
    }

    const updated = await birthday.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a birthday experience
// @route   DELETE /api/birthdays/:id
export const deleteBirthday = async (req, res, next) => {
  try {
    const birthday = await Birthday.findById(req.params.id);
    if (!birthday) {
      res.status(404);
      throw new Error("Birthday not found");
    }
    await birthday.deleteOne();
    res.json({ message: "Birthday deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload one or more photos to a birthday (multipart/form-data)
// @route   POST /api/birthdays/:id/photos
export const uploadPhotos = async (req, res, next) => {
  try {
    const birthday = await Birthday.findById(req.params.id);
    if (!birthday) {
      res.status(404);
      throw new Error("Birthday not found");
    }

    if (!req.files || req.files.length === 0) {
      res.status(400);
      throw new Error("No photos were uploaded");
    }

    const newPhotos = req.files.map((file) => ({
      url: `/uploads/${file.filename}`,
      caption: "",
    }));

    birthday.photos.push(...newPhotos);
    await birthday.save();

    res.status(201).json(birthday);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a single photo from a birthday
// @route   DELETE /api/birthdays/:id/photos/:photoId
export const deletePhoto = async (req, res, next) => {
  try {
    const birthday = await Birthday.findById(req.params.id);
    if (!birthday) {
      res.status(404);
      throw new Error("Birthday not found");
    }

    birthday.photos = birthday.photos.filter(
      (photo) => photo._id.toString() !== req.params.photoId
    );

    await birthday.save();
    res.json(birthday);
  } catch (error) {
    next(error);
  }
};

// @desc    Update caption of a single photo
// @route   PUT /api/birthdays/:id/photos/:photoId
export const updatePhotoCaption = async (req, res, next) => {
  try {
    const birthday = await Birthday.findById(req.params.id);
    if (!birthday) {
      res.status(404);
      throw new Error("Birthday not found");
    }

    const photo = birthday.photos.id(req.params.photoId);
    if (!photo) {
      res.status(404);
      throw new Error("Photo not found");
    }

    photo.caption = req.body.caption || "";
    await birthday.save();
    res.json(birthday);
  } catch (error) {
    next(error);
  }
};
