import express from "express";
import {
  // food database (no auth needed, but keeping behind protect anyway)
  searchLocalFoods,
  getFoodCategories,
  getFoodsBycat,
  // meal plan
  getMealPlan,
  // CRUD
  logMeal,
  getTodaysMeals,
  getMealsByDate,
  getWeeklyHistory,
  editMeal,
  deleteMeal,
} from "../controllers/nutritionController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

// ── Food database ──────────────────────────────
router.get("/foods/search",     searchLocalFoods);  // ?q=karahi
router.get("/foods/categories", getFoodCategories);
router.get("/foods/category",   getFoodsBycat);     // ?cat=Breakfast

// ── Meal plan ──────────────────────────────────
router.get("/meal-plan",        getMealPlan);        // ?goal=lose&calories=1800

// ── Meals CRUD ─────────────────────────────────
router.post("/",                logMeal);
router.get("/today",            getTodaysMeals);
router.get("/history",          getWeeklyHistory);   // ?days=7
router.get("/",                 getMealsByDate);      // ?date=2025-01-15
router.put("/:id",              editMeal);            // ← NEW: edit
router.delete("/:id",           deleteMeal);

export default router;