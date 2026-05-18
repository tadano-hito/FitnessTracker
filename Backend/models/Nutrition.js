// models/Nutrition.js — you already have this
import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  calories: { type: Number, required: true, min: 0 },
  protein:  { type: Number, default: 0, min: 0 },
  carbs:    { type: Number, default: 0, min: 0 },
  fats:     { type: Number, default: 0, min: 0 },
});

const nutritionSchema = new mongoose.Schema(
  {
    user:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mealType:  { type: String, enum: ["breakfast", "lunch", "dinner", "snacks"], required: true },
    foodItems: { type: [foodItemSchema], validate: { validator: (arr) => arr.length > 0, message: "At least one food item is required." } },
    totalCalories: { type: Number, default: 0 },
    totalProtein:  { type: Number, default: 0 },
    totalCarbs:    { type: Number, default: 0 },
    totalFats:     { type: Number, default: 0 },
    date:  { type: Date, required: true, default: () => { const d = new Date(); d.setUTCHours(0,0,0,0); return d } },
    notes: { type: String, trim: true, maxlength: 500 },
  },
  { timestamps: true }
);

// pre-save auto-calculates totals
nutritionSchema.pre("save", async function() {
  this.totalCalories = this.foodItems.reduce((s, i) => s + i.calories, 0);
  this.totalProtein  = this.foodItems.reduce((s, i) => s + i.protein,  0);
  this.totalCarbs    = this.foodItems.reduce((s, i) => s + i.carbs,    0);
  this.totalFats     = this.foodItems.reduce((s, i) => s + i.fats,     0);
});

export default mongoose.model("Nutrition", nutritionSchema);