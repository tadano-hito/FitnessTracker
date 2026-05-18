import Nutrition from "../models/Nutrition.js";
import {
  searchFoods,
  getFoodsByCategory,
  generateMealPlan,
  FOOD_CATEGORIES,
} from "../data/pakistaniFoods.js";

// ─────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────
const dayRange = (dateStr) => {
  const base = dateStr ? new Date(dateStr) : new Date();
  const start = new Date(base);
  start.setUTCHours(0, 0, 0, 0);
  const end = new Date(base);
  end.setUTCHours(23, 59, 59, 999);
  return { start, end };
};

const getUserId = (req) => req.user._id || req.user.id;

const buildSummary = (meals) =>
  meals.reduce(
    (acc, m) => {
      acc.totalCalories += m.totalCalories;
      acc.totalProtein  += m.totalProtein;
      acc.totalCarbs    += m.totalCarbs;
      acc.totalFats     += m.totalFats;
      return acc;
    },
    { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFats: 0 }
  );

// ─────────────────────────────────────────────
//  FOOD DATABASE ROUTES (no DB hit — instant)
// ─────────────────────────────────────────────

/**
 * GET /api/nutrition/foods/search?q=karahi
 * Search local Pakistani food database
 */
export const searchLocalFoods = (req, res) => {
  const { q = '', limit = 12 } = req.query;
  const results = searchFoods(q, parseInt(limit));
  return res.json({ success: true, data: results, count: results.length });
};

/**
 * GET /api/nutrition/foods/categories
 * Returns list of all food categories
 */
export const getFoodCategories = (_req, res) => {
  return res.json({ success: true, data: FOOD_CATEGORIES });
};

/**
 * GET /api/nutrition/foods/category?cat=Breakfast
 * Returns all foods in a given category
 */
export const getFoodsBycat = (req, res) => {
  const { cat = '' } = req.query;
  const results = getFoodsByCategory(cat);
  return res.json({ success: true, data: results, count: results.length });
};

// ─────────────────────────────────────────────
//  MEAL PLAN GENERATOR
// ─────────────────────────────────────────────

/**
 * GET /api/nutrition/meal-plan?goal=lose&calories=1800
 * goal: 'lose' | 'gain' | 'maintain'
 */
export const getMealPlan = (req, res) => {
  const { goal = 'maintain', calories } = req.query;

  const validGoals = ['lose', 'gain', 'maintain'];
  if (!validGoals.includes(goal)) {
    return res.status(400).json({
      success: false,
      message: "goal must be 'lose', 'gain', or 'maintain'",
    });
  }

  const targetCalories = parseInt(calories) || 2000;
  const plan = generateMealPlan(targetCalories, goal);
  return res.json({ success: true, data: plan });
};

// ─────────────────────────────────────────────
//  LOG A MEAL
// ─────────────────────────────────────────────

/**
 * POST /api/nutrition
 * Body: { mealType, foodItems, notes, date }
 */
export const logMeal = async (req, res) => {
  try {
    const { mealType, foodItems, notes, date } = req.body;

    if (!mealType || !foodItems || foodItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "mealType and at least one foodItem are required.",
      });
    }

    const mealDate = date ? new Date(date) : new Date();
    mealDate.setUTCHours(0, 0, 0, 0);

    const meal = new Nutrition({
      user: getUserId(req),
      mealType,
      foodItems,
      date: mealDate,
      notes,
    });

    await meal.save();
    return res.status(201).json({ success: true, data: meal });
  } catch (err) {
    console.error("logMeal error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ─────────────────────────────────────────────
//  GET TODAY'S MEALS
// ─────────────────────────────────────────────

/**
 * GET /api/nutrition/today
 */
export const getTodaysMeals = async (req, res) => {
  try {
    const { start, end } = dayRange();
    const meals = await Nutrition.find({
      user: getUserId(req),
      date: { $gte: start, $lte: end },
    }).sort({ createdAt: 1 });

    const summary = buildSummary(meals);
    return res.json({ success: true, data: meals, summary });
  } catch (err) {
    console.error("getTodaysMeals error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ─────────────────────────────────────────────
//  GET MEALS BY DATE  (existing)
// ─────────────────────────────────────────────

/**
 * GET /api/nutrition?date=2025-01-15
 */
export const getMealsByDate = async (req, res) => {
  try {
    const { date } = req.query;
    const { start, end } = dayRange(date);

    const meals = await Nutrition.find({
      user: getUserId(req),
      date: { $gte: start, $lte: end },
    }).sort({ createdAt: 1 });

    const summary = buildSummary(meals);
    return res.json({ success: true, data: meals, summary });
  } catch (err) {
    console.error("getMealsByDate error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ─────────────────────────────────────────────
//  GET WEEKLY HISTORY  ← NEW
// ─────────────────────────────────────────────

/**
 * GET /api/nutrition/history?days=7
 * Returns per-day calorie & macro totals for the last N days
 */
export const getWeeklyHistory = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const result = [];

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setUTCDate(d.getUTCDate() - i);
      const { start, end } = dayRange(d);

      const meals = await Nutrition.find({
        user: getUserId(req),
        date: { $gte: start, $lte: end },
      });

      const summary = buildSummary(meals);
      result.push({
        date: start.toISOString().split('T')[0],
        label: start.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        ...summary,
        mealCount: meals.length,
      });
    }

    return res.json({ success: true, data: result });
  } catch (err) {
    console.error("getWeeklyHistory error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ─────────────────────────────────────────────
//  EDIT A MEAL  ← NEW
// ─────────────────────────────────────────────

/**
 * PUT /api/nutrition/:id
 * Body: { mealType?, foodItems?, notes? }
 */
export const editMeal = async (req, res) => {
  try {
    const meal = await Nutrition.findOne({
      _id: req.params.id,
      user: getUserId(req),
    });

    if (!meal) {
      return res.status(404).json({ success: false, message: "Meal not found." });
    }

    const { mealType, foodItems, notes } = req.body;
    if (mealType)   meal.mealType   = mealType;
    if (foodItems && foodItems.length > 0) meal.foodItems = foodItems;
    if (notes !== undefined) meal.notes = notes;

    await meal.save(); // pre-save hook recalculates totals
    return res.json({ success: true, data: meal });
  } catch (err) {
    console.error("editMeal error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ─────────────────────────────────────────────
//  DELETE A MEAL
// ─────────────────────────────────────────────

/**
 * DELETE /api/nutrition/:id
 */
export const deleteMeal = async (req, res) => {
  try {
    const meal = await Nutrition.findOne({
      _id: req.params.id,
      user: getUserId(req),
    });

    if (!meal) {
      return res.status(404).json({ success: false, message: "Meal not found." });
    }

    await meal.deleteOne();
    return res.json({ success: true, message: "Meal deleted." });
  } catch (err) {
    console.error("deleteMeal error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};