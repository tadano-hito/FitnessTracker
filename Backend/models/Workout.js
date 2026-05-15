import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    exerciseName: {
      type: String,
      required: [true, "Exercise name is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: ["strength", "cardio", "flexibility"],
      required: [true, "Category is required"],
    },
    sets: {
      type: Number,
      min: 1,
      default: null,
    },
    reps: {
      type: Number,
      min: 1,
      default: null,
    },
    weight: {
      type: Number,
      min: 0,
      default: null,
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Workout = mongoose.model("Workout", workoutSchema);

export default Workout;