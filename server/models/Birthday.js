import mongoose from "mongoose";

const photoSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    caption: { type: String, default: "" },
  },
  { _id: true }
);

const birthdaySchema = new mongoose.Schema(
  {
    recipientName: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    birthdayDate: { type: Date },

    greeting: {
      type: String,
      default: "And this little surprise is just for you",
    },

    personalLetter: {
      type: String,
      default: "",
    },

    finalMessage: {
      type: String,
      default: "Never stop smiling",
    },

    wishes: {
      type: [String],
      default: [
        "Happiness",
        "Love",
        "Beautiful Memories",
        "Endless Celebrations",
        "Success",
        "Lots of Laughter",
      ],
    },

    photos: {
      type: [photoSchema],
      default: [],
    },

    musicUrl: { type: String, default: "" },

    theme: {
      type: String,
      enum: ["classic-red", "pink-love", "purple-dream", "pastel", "dark-night"],
      default: "classic-red",
    },

  },
  { timestamps: true }
);

export default mongoose.model("Birthday", birthdaySchema);
