// ═══════════════════════════════════════════════════════════════
//  Pakistani Foods Local Database
//  All calorie/macro values are per-serving estimates based on
//  standard Pakistani home-cooking portions & nutrition research.
//  No external API needed — search is instant & offline.
// ═══════════════════════════════════════════════════════════════

export const PAKISTANI_FOODS = [

  // ─────────────────────────────────────────
  // GHAR KA KHANA — CHICKEN
  // ─────────────────────────────────────────
  {
    id: 'chicken_karahi',
    name: 'Chicken Karahi',
    category: 'Ghar ka Khana',
    subcategory: 'Chicken',
    emoji: '🍗',
    servings: [
      { label: 'Small plate (200g)',  calories: 280, protein: 22, carbs: 6,  fats: 18 },
      { label: 'Normal plate (300g)', calories: 420, protein: 33, carbs: 9,  fats: 27 },
      { label: 'Large plate (450g)',  calories: 630, protein: 50, carbs: 14, fats: 40 },
    ],
    tags: ['lunch', 'dinner', 'high-protein'],
    gymFriendly: true,
    isStreetFood: false,
    region: 'Karachi',
  },
  {
    id: 'chicken_qorma',
    name: 'Chicken Qorma',
    category: 'Ghar ka Khana',
    subcategory: 'Chicken',
    emoji: '🍛',
    servings: [
      { label: 'Small plate (200g)',  calories: 310, protein: 20, carbs: 10, fats: 20 },
      { label: 'Normal plate (300g)', calories: 465, protein: 30, carbs: 15, fats: 30 },
      { label: 'Large plate (450g)',  calories: 698, protein: 45, carbs: 22, fats: 45 },
    ],
    tags: ['lunch', 'dinner'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'chicken_jalfrezi',
    name: 'Chicken Jalfrezi',
    category: 'Ghar ka Khana',
    subcategory: 'Chicken',
    emoji: '🌶️',
    servings: [
      { label: 'Small plate (200g)',  calories: 240, protein: 24, carbs: 8,  fats: 12 },
      { label: 'Normal plate (300g)', calories: 360, protein: 36, carbs: 12, fats: 18 },
      { label: 'Large plate (450g)',  calories: 540, protein: 54, carbs: 18, fats: 27 },
    ],
    tags: ['lunch', 'dinner', 'high-protein', 'gym-friendly'],
    gymFriendly: true,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'dahi_chicken',
    name: 'Dahi Chicken',
    category: 'Ghar ka Khana',
    subcategory: 'Chicken',
    emoji: '🍗',
    servings: [
      { label: 'Small plate (200g)',  calories: 260, protein: 23, carbs: 7,  fats: 15 },
      { label: 'Normal plate (300g)', calories: 390, protein: 35, carbs: 11, fats: 22 },
      { label: 'Large plate (450g)',  calories: 585, protein: 52, carbs: 16, fats: 33 },
    ],
    tags: ['lunch', 'dinner', 'high-protein'],
    gymFriendly: true,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'palak_chicken',
    name: 'Palak Chicken',
    category: 'Ghar ka Khana',
    subcategory: 'Chicken',
    emoji: '🥬',
    servings: [
      { label: 'Small plate (200g)',  calories: 220, protein: 22, carbs: 8,  fats: 11 },
      { label: 'Normal plate (300g)', calories: 330, protein: 33, carbs: 12, fats: 16 },
      { label: 'Large plate (450g)',  calories: 495, protein: 50, carbs: 18, fats: 24 },
    ],
    tags: ['lunch', 'dinner', 'high-protein', 'gym-friendly'],
    gymFriendly: true,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'chicken_haleem',
    name: 'Chicken Haleem',
    category: 'Ghar ka Khana',
    subcategory: 'Chicken',
    emoji: '🥣',
    servings: [
      { label: '1 bowl (250g)',  calories: 320, protein: 25, carbs: 30, fats: 10 },
      { label: '2 bowls (500g)', calories: 640, protein: 50, carbs: 60, fats: 20 },
    ],
    tags: ['lunch', 'dinner', 'high-protein'],
    gymFriendly: true,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'chicken_shorba',
    name: 'Chicken Shorba',
    category: 'Ghar ka Khana',
    subcategory: 'Chicken',
    emoji: '🍲',
    servings: [
      { label: '1 bowl (250ml)', calories: 120, protein: 14, carbs: 5, fats: 5 },
      { label: '2 bowls (500ml)',calories: 240, protein: 28, carbs: 10, fats: 10 },
    ],
    tags: ['lunch', 'dinner', 'light'],
    gymFriendly: true,
    isStreetFood: false,
    region: 'Pakistan',
  },

  // ─────────────────────────────────────────
  // GHAR KA KHANA — BEEF / MUTTON / GOSHT
  // ─────────────────────────────────────────
  {
    id: 'aloo_gosht',
    name: 'Aloo Gosht',
    category: 'Ghar ka Khana',
    subcategory: 'Gosht',
    emoji: '🥩',
    servings: [
      { label: 'Small plate (200g)',  calories: 280, protein: 18, carbs: 20, fats: 14 },
      { label: 'Normal plate (300g)', calories: 420, protein: 27, carbs: 30, fats: 21 },
      { label: 'Large plate (450g)',  calories: 630, protein: 40, carbs: 45, fats: 32 },
    ],
    tags: ['lunch', 'dinner'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'nihari',
    name: 'Nihari',
    category: 'Ghar ka Khana',
    subcategory: 'Gosht',
    emoji: '🫕',
    servings: [
      { label: '1 bowl (300g)',  calories: 420, protein: 32, carbs: 12, fats: 26 },
      { label: '2 bowls (600g)', calories: 840, protein: 64, carbs: 24, fats: 52 },
    ],
    tags: ['breakfast', 'lunch', 'high-protein'],
    gymFriendly: true,
    isStreetFood: false,
    region: 'Karachi',
  },
  {
    id: 'haleem',
    name: 'Haleem',
    category: 'Ghar ka Khana',
    subcategory: 'Gosht',
    emoji: '🥣',
    servings: [
      { label: '1 bowl (250g)',  calories: 350, protein: 28, carbs: 28, fats: 12 },
      { label: '2 bowls (500g)', calories: 700, protein: 56, carbs: 56, fats: 24 },
    ],
    tags: ['lunch', 'dinner', 'high-protein'],
    gymFriendly: true,
    isStreetFood: true,
    region: 'Karachi',
  },
  {
    id: 'paya',
    name: 'Paya',
    category: 'Ghar ka Khana',
    subcategory: 'Gosht',
    emoji: '🦴',
    servings: [
      { label: '1 bowl (300g)',  calories: 260, protein: 20, carbs: 8, fats: 16 },
      { label: '2 bowls (600g)', calories: 520, protein: 40, carbs: 16, fats: 32 },
    ],
    tags: ['breakfast', 'lunch'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'beef_karahi',
    name: 'Beef Karahi',
    category: 'Ghar ka Khana',
    subcategory: 'Gosht',
    emoji: '🥘',
    servings: [
      { label: 'Small plate (200g)',  calories: 340, protein: 26, carbs: 5,  fats: 24 },
      { label: 'Normal plate (300g)', calories: 510, protein: 39, carbs: 7,  fats: 36 },
      { label: 'Large plate (450g)',  calories: 765, protein: 58, carbs: 11, fats: 54 },
    ],
    tags: ['lunch', 'dinner', 'high-protein'],
    gymFriendly: true,
    isStreetFood: false,
    region: 'Karachi',
  },
  {
    id: 'palak_gosht',
    name: 'Palak Gosht',
    category: 'Ghar ka Khana',
    subcategory: 'Gosht',
    emoji: '🥬',
    servings: [
      { label: 'Small plate (200g)',  calories: 290, protein: 22, carbs: 10, fats: 18 },
      { label: 'Normal plate (300g)', calories: 435, protein: 33, carbs: 15, fats: 27 },
    ],
    tags: ['lunch', 'dinner'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'kofta_curry',
    name: 'Kofta Curry',
    category: 'Ghar ka Khana',
    subcategory: 'Gosht',
    emoji: '🍢',
    servings: [
      { label: '4 koftas (200g)',  calories: 310, protein: 20, carbs: 12, fats: 20 },
      { label: '6 koftas (300g)',  calories: 465, protein: 30, carbs: 18, fats: 30 },
    ],
    tags: ['lunch', 'dinner'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },

  // ─────────────────────────────────────────
  // GHAR KA KHANA — QEEMA
  // ─────────────────────────────────────────
  {
    id: 'aloo_qeema',
    name: 'Aloo Qeema',
    category: 'Ghar ka Khana',
    subcategory: 'Qeema',
    emoji: '🥩',
    servings: [
      { label: 'Small plate (150g)',  calories: 280, protein: 18, carbs: 22, fats: 14 },
      { label: 'Normal plate (250g)', calories: 465, protein: 30, carbs: 37, fats: 23 },
    ],
    tags: ['lunch', 'dinner'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'qeema_matar',
    name: 'Qeema Matar',
    category: 'Ghar ka Khana',
    subcategory: 'Qeema',
    emoji: '🟢',
    servings: [
      { label: 'Small plate (150g)',  calories: 270, protein: 20, carbs: 18, fats: 13 },
      { label: 'Normal plate (250g)', calories: 450, protein: 33, carbs: 30, fats: 22 },
    ],
    tags: ['lunch', 'dinner', 'high-protein'],
    gymFriendly: true,
    isStreetFood: false,
    region: 'Pakistan',
  },

  // ─────────────────────────────────────────
  // GHAR KA KHANA — DAAL
  // ─────────────────────────────────────────
  {
    id: 'daal_chawal',
    name: 'Daal Chawal',
    category: 'Ghar ka Khana',
    subcategory: 'Daal',
    emoji: '🍚',
    servings: [
      { label: '1 plate (350g)', calories: 420, protein: 16, carbs: 68, fats: 8  },
      { label: '2 plates (700g)',calories: 840, protein: 32, carbs: 136, fats: 16 },
    ],
    tags: ['lunch', 'dinner'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'daal_tarka',
    name: 'Daal Tarka',
    category: 'Ghar ka Khana',
    subcategory: 'Daal',
    emoji: '🍲',
    servings: [
      { label: '1 katori (150g)', calories: 180, protein: 10, carbs: 24, fats: 5 },
      { label: '2 katori (300g)', calories: 360, protein: 20, carbs: 48, fats: 10 },
    ],
    tags: ['lunch', 'dinner'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'chana_daal',
    name: 'Chana Daal',
    category: 'Ghar ka Khana',
    subcategory: 'Daal',
    emoji: '🟡',
    servings: [
      { label: '1 katori (150g)', calories: 210, protein: 12, carbs: 30, fats: 5 },
      { label: '2 katori (300g)', calories: 420, protein: 24, carbs: 60, fats: 10 },
    ],
    tags: ['lunch', 'dinner'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'masoor_daal',
    name: 'Masoor Daal',
    category: 'Ghar ka Khana',
    subcategory: 'Daal',
    emoji: '🔴',
    servings: [
      { label: '1 katori (150g)', calories: 160, protein: 11, carbs: 22, fats: 4 },
      { label: '2 katori (300g)', calories: 320, protein: 22, carbs: 44, fats: 8 },
    ],
    tags: ['lunch', 'dinner'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },

  // ─────────────────────────────────────────
  // GHAR KA KHANA — SABZI
  // ─────────────────────────────────────────
  {
    id: 'aloo_gobi',
    name: 'Aloo Gobi',
    category: 'Ghar ka Khana',
    subcategory: 'Sabzi',
    emoji: '🥦',
    servings: [
      { label: '1 katori (150g)', calories: 160, protein: 4, carbs: 22, fats: 6 },
      { label: '2 katori (300g)', calories: 320, protein: 8, carbs: 44, fats: 12 },
    ],
    tags: ['lunch', 'dinner', 'vegetarian'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'bhindi',
    name: 'Bhindi (Okra)',
    category: 'Ghar ka Khana',
    subcategory: 'Sabzi',
    emoji: '🌿',
    servings: [
      { label: '1 katori (150g)', calories: 130, protein: 3, carbs: 15, fats: 6 },
      { label: '2 katori (300g)', calories: 260, protein: 6, carbs: 30, fats: 12 },
    ],
    tags: ['lunch', 'dinner', 'vegetarian', 'light'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'sarson_saag',
    name: 'Sarson ka Saag',
    category: 'Ghar ka Khana',
    subcategory: 'Sabzi',
    emoji: '🥬',
    servings: [
      { label: '1 katori (200g)', calories: 180, protein: 6, carbs: 18, fats: 9 },
      { label: '2 katori (400g)', calories: 360, protein: 12, carbs: 36, fats: 18 },
    ],
    tags: ['lunch', 'dinner', 'vegetarian'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Punjab',
  },
  {
    id: 'baingan_bharta',
    name: 'Baingan Bharta',
    category: 'Ghar ka Khana',
    subcategory: 'Sabzi',
    emoji: '🍆',
    servings: [
      { label: '1 katori (150g)', calories: 140, protein: 3, carbs: 16, fats: 7 },
      { label: '2 katori (300g)', calories: 280, protein: 6, carbs: 32, fats: 14 },
    ],
    tags: ['lunch', 'dinner', 'vegetarian'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },

  // ─────────────────────────────────────────
  // RICE DISHES
  // ─────────────────────────────────────────
  {
    id: 'chicken_biryani',
    name: 'Chicken Biryani',
    category: 'Rice',
    subcategory: 'Biryani',
    emoji: '🍚',
    servings: [
      { label: 'Small plate (250g)', calories: 380, protein: 18, carbs: 52, fats: 11 },
      { label: 'Normal plate (400g)',calories: 608, protein: 29, carbs: 83, fats: 17 },
      { label: 'Large plate (600g)', calories: 912, protein: 43, carbs: 124, fats: 26 },
    ],
    tags: ['lunch', 'dinner'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Karachi',
  },
  {
    id: 'sindhi_biryani',
    name: 'Sindhi Biryani',
    category: 'Rice',
    subcategory: 'Biryani',
    emoji: '🌶️',
    servings: [
      { label: 'Small plate (250g)', calories: 400, protein: 18, carbs: 54, fats: 13 },
      { label: 'Normal plate (400g)',calories: 640, protein: 29, carbs: 86, fats: 21 },
      { label: 'Large plate (600g)', calories: 960, protein: 43, carbs: 129, fats: 31 },
    ],
    tags: ['lunch', 'dinner'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Sindh',
  },
  {
    id: 'beef_biryani',
    name: 'Beef Biryani',
    category: 'Rice',
    subcategory: 'Biryani',
    emoji: '🍚',
    servings: [
      { label: 'Small plate (250g)', calories: 420, protein: 20, carbs: 52, fats: 14 },
      { label: 'Normal plate (400g)',calories: 672, protein: 32, carbs: 83, fats: 22 },
      { label: 'Large plate (600g)', calories: 1008, protein: 48, carbs: 124, fats: 33 },
    ],
    tags: ['lunch', 'dinner'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Karachi',
  },
  {
    id: 'plain_chawal',
    name: 'Plain Chawal (Rice)',
    category: 'Rice',
    subcategory: 'Plain',
    emoji: '🍚',
    servings: [
      { label: '1 katori (150g)', calories: 195, protein: 4,  carbs: 43, fats: 0.5 },
      { label: '2 katori (300g)', calories: 390, protein: 8,  carbs: 86, fats: 1   },
      { label: '3 katori (450g)', calories: 585, protein: 12, carbs: 129, fats: 1.5 },
    ],
    tags: ['lunch', 'dinner'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'yakhni_pulao',
    name: 'Yakhni Pulao',
    category: 'Rice',
    subcategory: 'Pulao',
    emoji: '🍖',
    servings: [
      { label: 'Small plate (250g)', calories: 320, protein: 15, carbs: 48, fats: 8 },
      { label: 'Normal plate (400g)',calories: 512, protein: 24, carbs: 77, fats: 13 },
    ],
    tags: ['lunch', 'dinner'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'kabuli_pulao',
    name: 'Kabuli Pulao',
    category: 'Rice',
    subcategory: 'Pulao',
    emoji: '🥕',
    servings: [
      { label: 'Small plate (250g)', calories: 380, protein: 14, carbs: 55, fats: 12 },
      { label: 'Normal plate (400g)',calories: 608, protein: 22, carbs: 88, fats: 19 },
    ],
    tags: ['lunch', 'dinner'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'KPK',
  },

  // ─────────────────────────────────────────
  // ROTI / BREADS
  // ─────────────────────────────────────────
  {
    id: 'chapati',
    name: 'Chapati / Roti',
    category: 'Roti',
    subcategory: 'Bread',
    emoji: '🫓',
    servings: [
      { label: '1 roti (small, 40g)',  calories: 100, protein: 3,   carbs: 20, fats: 1   },
      { label: '1 roti (medium, 60g)', calories: 150, protein: 4.5, carbs: 30, fats: 1.5 },
      { label: '2 roti (120g)',        calories: 300, protein: 9,   carbs: 60, fats: 3   },
    ],
    tags: ['breakfast', 'lunch', 'dinner', 'diet'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'diet_roti',
    name: 'Roti (Diet — 1 piece)',
    category: 'Diet Meals',
    subcategory: 'Bread',
    emoji: '🫓',
    servings: [
      { label: '1 roti (40g)',  calories: 100, protein: 3,   carbs: 20, fats: 1   },
      { label: '2 roti (80g)',  calories: 200, protein: 6,   carbs: 40, fats: 2   },
    ],
    tags: ['breakfast', 'lunch', 'dinner', 'diet'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'brown_roti',
    name: 'Brown / Wheat Roti',
    category: 'Diet Meals',
    subcategory: 'Bread',
    emoji: '🫓',
    servings: [
      { label: '1 roti (45g)',  calories: 110, protein: 4,   carbs: 22, fats: 1   },
      { label: '2 roti (90g)',  calories: 220, protein: 8,   carbs: 44, fats: 2   },
    ],
    tags: ['breakfast', 'lunch', 'dinner', 'diet', 'gym-friendly'],
    gymFriendly: true,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'plain_paratha',
    name: 'Plain Paratha',
    category: 'Roti',
    subcategory: 'Bread',
    emoji: '🫓',
    servings: [
      { label: '1 paratha (80g)',  calories: 260, protein: 5, carbs: 34, fats: 12 },
      { label: '2 paratha (160g)', calories: 520, protein: 10, carbs: 68, fats: 24 },
    ],
    tags: ['breakfast', 'lunch'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'aloo_paratha',
    name: 'Aloo Paratha',
    category: 'Roti',
    subcategory: 'Bread',
    emoji: '🥔',
    servings: [
      { label: '1 paratha (120g)', calories: 320, protein: 6, carbs: 44, fats: 14 },
      { label: '2 paratha (240g)', calories: 640, protein: 12, carbs: 88, fats: 28 },
    ],
    tags: ['breakfast', 'lunch'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'tandoori_roti',
    name: 'Tandoori Roti',
    category: 'Roti',
    subcategory: 'Bread',
    emoji: '🫓',
    servings: [
      { label: '1 roti (70g)',  calories: 175, protein: 5, carbs: 34, fats: 2 },
      { label: '2 roti (140g)', calories: 350, protein: 10, carbs: 68, fats: 4 },
    ],
    tags: ['breakfast', 'lunch', 'dinner'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'naan',
    name: 'Naan',
    category: 'Roti',
    subcategory: 'Bread',
    emoji: '🫓',
    servings: [
      { label: '1 naan (90g)',  calories: 262, protein: 8.7, carbs: 50, fats: 2.5 },
      { label: '2 naan (180g)', calories: 524, protein: 17,  carbs: 100, fats: 5   },
    ],
    tags: ['breakfast', 'lunch', 'dinner'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },

  // ─────────────────────────────────────────
  // BREAKFAST / NASHTA
  // ─────────────────────────────────────────
  {
    id: 'anda_paratha',
    name: 'Anda Paratha',
    category: 'Breakfast',
    subcategory: 'Nashta',
    emoji: '🍳',
    servings: [
      { label: '1 paratha + 1 egg (200g)', calories: 420, protein: 14, carbs: 40, fats: 22 },
      { label: '2 paratha + 2 egg (400g)', calories: 840, protein: 28, carbs: 80, fats: 44 },
    ],
    tags: ['breakfast'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'anda_bhurji',
    name: 'Anda Bhurji',
    category: 'Breakfast',
    subcategory: 'Nashta',
    emoji: '🍳',
    servings: [
      { label: '2 eggs (120g)', calories: 210, protein: 14, carbs: 3, fats: 16 },
      { label: '3 eggs (180g)', calories: 315, protein: 21, carbs: 4, fats: 24 },
    ],
    tags: ['breakfast', 'high-protein', 'gym-friendly'],
    gymFriendly: true,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'boiled_egg',
    name: 'Boiled Egg (Anda)',
    category: 'Breakfast',
    subcategory: 'Nashta',
    emoji: '🥚',
    servings: [
      { label: '1 egg (50g)', calories: 78,  protein: 6,  carbs: 0.5, fats: 5   },
      { label: '2 eggs (100g)',calories: 156, protein: 12, carbs: 1,   fats: 10  },
      { label: '3 eggs (150g)',calories: 234, protein: 18, carbs: 1.5, fats: 15  },
    ],
    tags: ['breakfast', 'gym-friendly', 'high-protein', 'snacks'],
    gymFriendly: true,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'halwa_puri',
    name: 'Halwa Puri',
    category: 'Breakfast',
    subcategory: 'Nashta',
    emoji: '🟡',
    servings: [
      { label: '1 plate (2 puri + halwa, 300g)', calories: 620, protein: 9, carbs: 88, fats: 26 },
      { label: '1 plate + chana (400g)',          calories: 780, protein: 18, carbs: 110, fats: 28 },
    ],
    tags: ['breakfast'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'chai',
    name: 'Chai (Doodh Pati)',
    category: 'Breakfast',
    subcategory: 'Drinks',
    emoji: '☕',
    servings: [
      { label: '1 cup (200ml)',  calories: 80,  protein: 3, carbs: 9,  fats: 3 },
      { label: '2 cups (400ml)', calories: 160, protein: 6, carbs: 18, fats: 6 },
    ],
    tags: ['breakfast', 'snacks'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'lassi',
    name: 'Lassi (Meethi)',
    category: 'Breakfast',
    subcategory: 'Drinks',
    emoji: '🥛',
    servings: [
      { label: '1 glass (300ml)', calories: 200, protein: 6,  carbs: 30, fats: 6  },
      { label: '2 glass (600ml)', calories: 400, protein: 12, carbs: 60, fats: 12 },
    ],
    tags: ['breakfast', 'snacks'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Punjab',
  },
  {
    id: 'doodh',
    name: 'Doodh (Milk)',
    category: 'Breakfast',
    subcategory: 'Drinks',
    emoji: '🥛',
    servings: [
      { label: '1 glass (240ml)', calories: 149, protein: 8, carbs: 12, fats: 8 },
      { label: '2 glass (480ml)', calories: 298, protein: 16, carbs: 24, fats: 16 },
    ],
    tags: ['breakfast', 'gym-friendly'],
    gymFriendly: true,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'dahi',
    name: 'Dahi (Yogurt)',
    category: 'Breakfast',
    subcategory: 'Nashta',
    emoji: '🥣',
    servings: [
      { label: '1 katori (150g)', calories: 100, protein: 8,  carbs: 7,  fats: 4 },
      { label: '2 katori (300g)', calories: 200, protein: 16, carbs: 14, fats: 8 },
    ],
    tags: ['breakfast', 'gym-friendly', 'snacks'],
    gymFriendly: true,
    isStreetFood: false,
    region: 'Pakistan',
  },

  // ─────────────────────────────────────────
  // KARACHI STREET FOOD
  // ─────────────────────────────────────────
  {
    id: 'bun_kabab',
    name: 'Bun Kabab',
    category: 'Street Food',
    subcategory: 'Karachi',
    emoji: '🍔',
    servings: [
      { label: '1 bun kabab (150g)', calories: 350, protein: 14, carbs: 40, fats: 15 },
      { label: '2 bun kabab (300g)', calories: 700, protein: 28, carbs: 80, fats: 30 },
    ],
    tags: ['snacks', 'lunch'],
    gymFriendly: false,
    isStreetFood: true,
    region: 'Karachi',
  },
  {
    id: 'gol_gappay',
    name: 'Gol Gappay',
    category: 'Street Food',
    subcategory: 'Karachi',
    emoji: '🫧',
    servings: [
      { label: '6 pieces', calories: 115, protein: 2, carbs: 22, fats: 2 },
      { label: '12 pieces',calories: 230, protein: 4, carbs: 44, fats: 4 },
    ],
    tags: ['snacks'],
    gymFriendly: false,
    isStreetFood: true,
    region: 'Karachi',
  },
  {
    id: 'dahi_baray',
    name: 'Dahi Baray',
    category: 'Street Food',
    subcategory: 'Karachi',
    emoji: '🥣',
    servings: [
      { label: '1 plate (3 baray, 200g)', calories: 270, protein: 10, carbs: 38, fats: 8 },
      { label: '2 plates (6 baray, 400g)',calories: 540, protein: 20, carbs: 76, fats: 16 },
    ],
    tags: ['snacks', 'lunch'],
    gymFriendly: false,
    isStreetFood: true,
    region: 'Karachi',
  },
  {
    id: 'samosa',
    name: 'Samosa',
    category: 'Street Food',
    subcategory: 'Karachi',
    emoji: '🔺',
    servings: [
      { label: '1 samosa (80g)',  calories: 130, protein: 3, carbs: 16, fats: 6  },
      { label: '2 samosa (160g)', calories: 260, protein: 6, carbs: 32, fats: 12 },
      { label: '3 samosa (240g)', calories: 390, protein: 9, carbs: 48, fats: 18 },
    ],
    tags: ['snacks'],
    gymFriendly: false,
    isStreetFood: true,
    region: 'Karachi',
  },
  {
    id: 'chaat',
    name: 'Chaat',
    category: 'Street Food',
    subcategory: 'Karachi',
    emoji: '🌶️',
    servings: [
      { label: '1 plate (200g)', calories: 240, protein: 7, carbs: 42, fats: 5 },
    ],
    tags: ['snacks'],
    gymFriendly: false,
    isStreetFood: true,
    region: 'Karachi',
  },
  {
    id: 'pakora',
    name: 'Pakora',
    category: 'Street Food',
    subcategory: 'Karachi',
    emoji: '🟤',
    servings: [
      { label: '100g',  calories: 265, protein: 7,  carbs: 32, fats: 12 },
      { label: '200g',  calories: 530, protein: 14, carbs: 64, fats: 24 },
    ],
    tags: ['snacks', 'breakfast'],
    gymFriendly: false,
    isStreetFood: true,
    region: 'Karachi',
  },
  {
    id: 'katakat',
    name: 'Katakat',
    category: 'Street Food',
    subcategory: 'Karachi',
    emoji: '🥘',
    servings: [
      { label: '1 serving (200g)', calories: 420, protein: 28, carbs: 8, fats: 30 },
      { label: '2 serving (400g)', calories: 840, protein: 56, carbs: 16, fats: 60 },
    ],
    tags: ['dinner', 'street food'],
    gymFriendly: false,
    isStreetFood: true,
    region: 'Karachi',
  },

  // ─────────────────────────────────────────
  // KARACHI ROLLS
  // ─────────────────────────────────────────
  {
    id: 'chicken_roll',
    name: 'Chicken Roll',
    category: 'Rolls',
    subcategory: 'Classic',
    emoji: '🌯',
    servings: [
      { label: '1 roll (180g)', calories: 380, protein: 20, carbs: 42, fats: 14 },
      { label: '2 rolls (360g)',calories: 760, protein: 40, carbs: 84, fats: 28 },
    ],
    tags: ['lunch', 'dinner', 'snacks'],
    gymFriendly: false,
    isStreetFood: true,
    region: 'Karachi',
  },
  {
    id: 'seekh_kabab_roll',
    name: 'Seekh Kabab Roll',
    category: 'Rolls',
    subcategory: 'BBQ',
    emoji: '🌯',
    servings: [
      { label: '1 roll (200g)', calories: 420, protein: 24, carbs: 40, fats: 18 },
      { label: '2 rolls (400g)',calories: 840, protein: 48, carbs: 80, fats: 36 },
    ],
    tags: ['lunch', 'dinner', 'snacks'],
    gymFriendly: false,
    isStreetFood: true,
    region: 'Karachi',
  },
  {
    id: 'malai_boti_roll',
    name: 'Malai Boti Roll',
    category: 'Rolls',
    subcategory: 'BBQ',
    emoji: '🌯',
    servings: [
      { label: '1 roll (200g)', calories: 450, protein: 26, carbs: 40, fats: 20 },
      { label: '2 rolls (400g)',calories: 900, protein: 52, carbs: 80, fats: 40 },
    ],
    tags: ['lunch', 'dinner', 'snacks'],
    gymFriendly: false,
    isStreetFood: true,
    region: 'Karachi',
  },
  {
    id: 'zinger_roll',
    name: 'Zinger Roll',
    category: 'Rolls',
    subcategory: 'Fast Food',
    emoji: '🌯',
    servings: [
      { label: '1 roll (200g)', calories: 480, protein: 22, carbs: 48, fats: 22 },
      { label: '2 rolls (400g)',calories: 960, protein: 44, carbs: 96, fats: 44 },
    ],
    tags: ['lunch', 'dinner', 'snacks'],
    gymFriendly: false,
    isStreetFood: true,
    region: 'Karachi',
  },

  // ─────────────────────────────────────────
  // BBQ
  // ─────────────────────────────────────────
  {
    id: 'chicken_tikka',
    name: 'Chicken Tikka',
    category: 'BBQ',
    subcategory: 'Tikka',
    emoji: '🍢',
    servings: [
      { label: '2 pieces (150g)', calories: 220, protein: 30, carbs: 4,  fats: 9  },
      { label: '4 pieces (300g)', calories: 440, protein: 60, carbs: 8,  fats: 18 },
      { label: '6 pieces (450g)', calories: 660, protein: 90, carbs: 12, fats: 27 },
    ],
    tags: ['lunch', 'dinner', 'high-protein', 'gym-friendly'],
    gymFriendly: true,
    isStreetFood: false,
    region: 'Karachi',
  },
  {
    id: 'malai_tikka',
    name: 'Malai Tikka',
    category: 'BBQ',
    subcategory: 'Tikka',
    emoji: '🍢',
    servings: [
      { label: '2 pieces (150g)', calories: 280, protein: 28, carbs: 5,  fats: 16 },
      { label: '4 pieces (300g)', calories: 560, protein: 56, carbs: 10, fats: 32 },
    ],
    tags: ['lunch', 'dinner', 'high-protein'],
    gymFriendly: true,
    isStreetFood: false,
    region: 'Karachi',
  },
  {
    id: 'seekh_kabab',
    name: 'Seekh Kabab',
    category: 'BBQ',
    subcategory: 'Kabab',
    emoji: '🍡',
    servings: [
      { label: '2 seekh (120g)', calories: 200, protein: 22, carbs: 5,  fats: 11 },
      { label: '4 seekh (240g)', calories: 400, protein: 44, carbs: 10, fats: 22 },
    ],
    tags: ['lunch', 'dinner', 'high-protein', 'gym-friendly'],
    gymFriendly: true,
    isStreetFood: false,
    region: 'Karachi',
  },
  {
    id: 'chapli_kabab',
    name: 'Chapli Kabab',
    category: 'BBQ',
    subcategory: 'Kabab',
    emoji: '🍔',
    servings: [
      { label: '1 kabab (120g)', calories: 280, protein: 20, carbs: 8,  fats: 18 },
      { label: '2 kabab (240g)', calories: 560, protein: 40, carbs: 16, fats: 36 },
    ],
    tags: ['lunch', 'dinner', 'high-protein'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'KPK',
  },
  {
    id: 'shami_kabab',
    name: 'Shami Kabab',
    category: 'BBQ',
    subcategory: 'Kabab',
    emoji: '🍡',
    servings: [
      { label: '2 kabab (100g)', calories: 200, protein: 16, carbs: 12, fats: 10 },
      { label: '4 kabab (200g)', calories: 400, protein: 32, carbs: 24, fats: 20 },
    ],
    tags: ['snacks', 'lunch', 'dinner'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },
  {
    id: 'sajji',
    name: 'Sajji',
    category: 'BBQ',
    subcategory: 'Special',
    emoji: '🐔',
    servings: [
      { label: 'Half sajji (400g)', calories: 620, protein: 70, carbs: 5,  fats: 36 },
      { label: 'Full sajji (800g)', calories: 1240, protein: 140, carbs: 10, fats: 72 },
    ],
    tags: ['lunch', 'dinner', 'high-protein'],
    gymFriendly: true,
    isStreetFood: false,
    region: 'Balochistan',
  },

  // ─────────────────────────────────────────
  // FAST FOOD
  // ─────────────────────────────────────────
  {
    id: 'zinger_burger',
    name: 'Zinger Burger',
    category: 'Fast Food',
    subcategory: 'Burgers',
    emoji: '🍔',
    servings: [
      { label: '1 burger (200g)', calories: 520, protein: 26, carbs: 52, fats: 24 },
    ],
    tags: ['lunch', 'dinner'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Karachi',
  },
  {
    id: 'shawarma',
    name: 'Shawarma',
    category: 'Fast Food',
    subcategory: 'Wraps',
    emoji: '🌯',
    servings: [
      { label: '1 shawarma (220g)', calories: 480, protein: 24, carbs: 48, fats: 20 },
      { label: '2 shawarma (440g)', calories: 960, protein: 48, carbs: 96, fats: 40 },
    ],
    tags: ['lunch', 'dinner'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Karachi',
  },
  {
    id: 'masala_fries',
    name: 'Masala Fries',
    category: 'Fast Food',
    subcategory: 'Fries',
    emoji: '🍟',
    servings: [
      { label: 'Small (100g)',  calories: 300, protein: 4, carbs: 40, fats: 14 },
      { label: 'Medium (150g)', calories: 450, protein: 6, carbs: 60, fats: 21 },
      { label: 'Large (200g)',  calories: 600, protein: 8, carbs: 80, fats: 28 },
    ],
    tags: ['snacks', 'lunch'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Karachi',
  },

  // ─────────────────────────────────────────
  // PIZZA
  // ─────────────────────────────────────────
  {
    id: 'chicken_tikka_pizza',
    name: 'Chicken Tikka Pizza',
    category: 'Pizza',
    subcategory: 'Desi Fusion',
    emoji: '🍕',
    servings: [
      { label: '1 slice (100g)',    calories: 240, protein: 12, carbs: 28, fats: 9  },
      { label: '2 slices (200g)',   calories: 480, protein: 24, carbs: 56, fats: 18 },
      { label: '4 slices (400g)',   calories: 960, protein: 48, carbs: 112, fats: 36 },
    ],
    tags: ['lunch', 'dinner'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Karachi',
  },
  {
    id: 'margherita_pizza',
    name: 'Margherita Pizza',
    category: 'Pizza',
    subcategory: 'Italian',
    emoji: '🍕',
    servings: [
      { label: '1 slice (100g)',  calories: 220, protein: 9,  carbs: 30, fats: 8  },
      { label: '2 slices (200g)', calories: 440, protein: 18, carbs: 60, fats: 16 },
      { label: '4 slices (400g)', calories: 880, protein: 36, carbs: 120, fats: 32 },
    ],
    tags: ['lunch', 'dinner'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Karachi',
  },

  // ─────────────────────────────────────────
  // CHINESE
  // ─────────────────────────────────────────
  {
    id: 'chicken_fried_rice',
    name: 'Chicken Fried Rice',
    category: 'Chinese',
    subcategory: 'Rice',
    emoji: '🍳',
    servings: [
      { label: '1 plate (300g)', calories: 420, protein: 18, carbs: 58, fats: 12 },
      { label: '2 plates (600g)',calories: 840, protein: 36, carbs: 116, fats: 24 },
    ],
    tags: ['lunch', 'dinner'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Karachi',
  },
  {
    id: 'chicken_chow_mein',
    name: 'Chicken Chow Mein',
    category: 'Chinese',
    subcategory: 'Noodles',
    emoji: '🍜',
    servings: [
      { label: '1 plate (300g)', calories: 380, protein: 20, carbs: 52, fats: 10 },
      { label: '2 plates (600g)',calories: 760, protein: 40, carbs: 104, fats: 20 },
    ],
    tags: ['lunch', 'dinner'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Karachi',
  },
  {
    id: 'chicken_manchurian',
    name: 'Chicken Manchurian',
    category: 'Chinese',
    subcategory: 'Main',
    emoji: '🍲',
    servings: [
      { label: '1 plate (250g)', calories: 360, protein: 22, carbs: 30, fats: 16 },
      { label: '2 plates (500g)',calories: 720, protein: 44, carbs: 60, fats: 32 },
    ],
    tags: ['lunch', 'dinner'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Karachi',
  },
  {
    id: 'hot_sour_soup',
    name: 'Hot & Sour Soup',
    category: 'Chinese',
    subcategory: 'Soup',
    emoji: '🍜',
    servings: [
      { label: '1 bowl (300ml)', calories: 110, protein: 6, carbs: 14, fats: 3 },
      { label: '2 bowls (600ml)',calories: 220, protein: 12, carbs: 28, fats: 6 },
    ],
    tags: ['lunch', 'dinner', 'light'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Karachi',
  },

  // ─────────────────────────────────────────
  // DESSERTS
  // ─────────────────────────────────────────
  {
    id: 'kheer',
    name: 'Kheer',
    category: 'Dessert',
    subcategory: 'Mithai',
    emoji: '🍚',
    servings: [
      { label: '1 bowl (200g)', calories: 220, protein: 6, carbs: 38, fats: 6 },
      { label: '2 bowls (400g)',calories: 440, protein: 12, carbs: 76, fats: 12 },
    ],
    tags: ['dessert'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },

  // ─────────────────────────────────────────
  // SEAFOOD
  // ─────────────────────────────────────────
  {
    id: 'fried_fish',
    name: 'Fried Fish',
    category: 'Seafood',
    subcategory: 'Fish',
    emoji: '🐟',
    servings: [
      { label: '1 piece (150g)', calories: 280, protein: 24, carbs: 10, fats: 16 },
      { label: '2 pieces (300g)',calories: 560, protein: 48, carbs: 20, fats: 32 },
    ],
    tags: ['lunch', 'dinner', 'high-protein'],
    gymFriendly: true,
    isStreetFood: false,
    region: 'Karachi',
  },
  {
    id: 'prawn_masala',
    name: 'Prawn Masala',
    category: 'Seafood',
    subcategory: 'Prawns',
    emoji: '🦐',
    servings: [
      { label: '1 plate (200g)', calories: 240, protein: 28, carbs: 8, fats: 10 },
      { label: '2 plates (400g)',calories: 480, protein: 56, carbs: 16, fats: 20 },
    ],
    tags: ['lunch', 'dinner', 'high-protein', 'gym-friendly'],
    gymFriendly: true,
    isStreetFood: false,
    region: 'Karachi',
  },

  // ─────────────────────────────────────────
  // DESSERTS / MITHAI — Traditional
  // ─────────────────────────────────────────
  {
    id: 'gulab_jamun',
    name: 'Gulab Jamun',
    category: 'Dessert',
    subcategory: 'Mithai',
    emoji: '🟤',
    servings: [
      { label: '2 pieces (80g)',  calories: 260, protein: 4,  carbs: 48, fats: 7  },
      { label: '4 pieces (160g)', calories: 520, protein: 8,  carbs: 96, fats: 14 },
    ],
    tags: ['dessert', 'snacks'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'ras_malai',
    name: 'Ras Malai',
    category: 'Dessert',
    subcategory: 'Mithai',
    emoji: '🥛',
    servings: [
      { label: '2 pieces (150g)', calories: 280, protein: 8,  carbs: 38, fats: 10 },
      { label: '4 pieces (300g)', calories: 560, protein: 16, carbs: 76, fats: 20 },
    ],
    tags: ['dessert'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'jalebi',
    name: 'Jalebi',
    category: 'Dessert',
    subcategory: 'Mithai',
    emoji: '🌀',
    servings: [
      { label: '2 pieces (60g)',  calories: 200, protein: 2, carbs: 44, fats: 4 },
      { label: '4 pieces (120g)', calories: 400, protein: 4, carbs: 88, fats: 8 },
    ],
    tags: ['dessert', 'breakfast', 'snacks'],
    gymFriendly: false, isStreetFood: true, region: 'Pakistan',
  },
  {
    id: 'barfi',
    name: 'Barfi',
    category: 'Dessert',
    subcategory: 'Mithai',
    emoji: '🍬',
    servings: [
      { label: '1 piece (40g)',  calories: 160, protein: 3, carbs: 26, fats: 5 },
      { label: '2 pieces (80g)', calories: 320, protein: 6, carbs: 52, fats: 10 },
    ],
    tags: ['dessert', 'snacks'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'laddu',
    name: 'Laddu',
    category: 'Dessert',
    subcategory: 'Mithai',
    emoji: '🟡',
    servings: [
      { label: '1 piece (50g)',  calories: 180, protein: 3, carbs: 30, fats: 6 },
      { label: '2 pieces (100g)',calories: 360, protein: 6, carbs: 60, fats: 12 },
    ],
    tags: ['dessert', 'snacks'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'suji_halwa',
    name: 'Suji Halwa',
    category: 'Dessert',
    subcategory: 'Halwa',
    emoji: '🟠',
    servings: [
      { label: '1 katori (150g)', calories: 280, protein: 4, carbs: 42, fats: 10 },
      { label: '2 katori (300g)', calories: 560, protein: 8, carbs: 84, fats: 20 },
    ],
    tags: ['dessert', 'breakfast'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'gajar_halwa',
    name: 'Gajar ka Halwa',
    category: 'Dessert',
    subcategory: 'Halwa',
    emoji: '🥕',
    servings: [
      { label: '1 katori (150g)', calories: 300, protein: 5, carbs: 44, fats: 12 },
      { label: '2 katori (300g)', calories: 600, protein: 10, carbs: 88, fats: 24 },
    ],
    tags: ['dessert'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'seviyan',
    name: 'Seviyan',
    category: 'Dessert',
    subcategory: 'Sweet Dish',
    emoji: '🍮',
    servings: [
      { label: '1 bowl (200g)', calories: 260, protein: 6, carbs: 42, fats: 7 },
      { label: '2 bowls (400g)',calories: 520, protein: 12, carbs: 84, fats: 14 },
    ],
    tags: ['dessert'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'shahi_tukray',
    name: 'Shahi Tukray',
    category: 'Dessert',
    subcategory: 'Sweet Dish',
    emoji: '🍞',
    servings: [
      { label: '1 piece (120g)', calories: 320, protein: 7, carbs: 48, fats: 11 },
      { label: '2 pieces (240g)',calories: 640, protein: 14, carbs: 96, fats: 22 },
    ],
    tags: ['dessert'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'firni',
    name: 'Firni',
    category: 'Dessert',
    subcategory: 'Sweet Dish',
    emoji: '🥣',
    servings: [
      { label: '1 bowl (150g)', calories: 200, protein: 5, carbs: 34, fats: 5 },
      { label: '2 bowls (300g)',calories: 400, protein: 10, carbs: 68, fats: 10 },
    ],
    tags: ['dessert'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'zarda',
    name: 'Zarda',
    category: 'Dessert',
    subcategory: 'Sweet Dish',
    emoji: '🍚',
    servings: [
      { label: '1 plate (200g)', calories: 350, protein: 4, carbs: 68, fats: 8 },
      { label: '2 plates (400g)',calories: 700, protein: 8, carbs: 136, fats: 16 },
    ],
    tags: ['dessert'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },

  // ─────────────────────────────────────────
  // DESSERTS — Bakery & Modern
  // ─────────────────────────────────────────
  {
    id: 'chocolate_cake',
    name: 'Chocolate Cake',
    category: 'Dessert',
    subcategory: 'Bakery',
    emoji: '🎂',
    servings: [
      { label: '1 slice (100g)', calories: 370, protein: 5, carbs: 52, fats: 16 },
      { label: '2 slices (200g)',calories: 740, protein: 10, carbs: 104, fats: 32 },
    ],
    tags: ['dessert', 'snacks'],
    gymFriendly: false, isStreetFood: false, region: 'Karachi',
  },
  {
    id: 'brownie',
    name: 'Brownie',
    category: 'Dessert',
    subcategory: 'Bakery',
    emoji: '🟫',
    servings: [
      { label: '1 piece (80g)',  calories: 320, protein: 4, carbs: 42, fats: 15 },
      { label: '2 pieces (160g)',calories: 640, protein: 8, carbs: 84, fats: 30 },
    ],
    tags: ['dessert', 'snacks'],
    gymFriendly: false, isStreetFood: false, region: 'Karachi',
  },
  {
    id: 'kunafa',
    name: 'Kunafa',
    category: 'Dessert',
    subcategory: 'Bakery',
    emoji: '🧇',
    servings: [
      { label: '1 slice (150g)', calories: 420, protein: 8, carbs: 58, fats: 18 },
      { label: '2 slices (300g)',calories: 840, protein: 16, carbs: 116, fats: 36 },
    ],
    tags: ['dessert'],
    gymFriendly: false, isStreetFood: false, region: 'Karachi',
  },
  {
    id: 'ice_cream',
    name: 'Ice Cream',
    category: 'Dessert',
    subcategory: 'Frozen',
    emoji: '🍦',
    servings: [
      { label: '1 scoop (80g)',  calories: 160, protein: 3, carbs: 22, fats: 7  },
      { label: '2 scoops (160g)',calories: 320, protein: 6, carbs: 44, fats: 14 },
    ],
    tags: ['dessert', 'snacks'],
    gymFriendly: false, isStreetFood: false, region: 'Karachi',
  },
  {
    id: 'waffles',
    name: 'Waffles',
    category: 'Dessert',
    subcategory: 'Bakery',
    emoji: '🧇',
    servings: [
      { label: '1 waffle (120g)', calories: 310, protein: 7, carbs: 44, fats: 12 },
      { label: '2 waffles (240g)',calories: 620, protein: 14, carbs: 88, fats: 24 },
    ],
    tags: ['dessert', 'breakfast'],
    gymFriendly: false, isStreetFood: false, region: 'Karachi',
  },
  {
    id: 'pancakes',
    name: 'Pancakes',
    category: 'Dessert',
    subcategory: 'Bakery',
    emoji: '🥞',
    servings: [
      { label: '2 pancakes (120g)', calories: 280, protein: 7,  carbs: 42, fats: 9  },
      { label: '4 pancakes (240g)', calories: 560, protein: 14, carbs: 84, fats: 18 },
    ],
    tags: ['dessert', 'breakfast'],
    gymFriendly: false, isStreetFood: false, region: 'Karachi',
  },
  {
    id: 'donut',
    name: 'Donut',
    category: 'Dessert',
    subcategory: 'Bakery',
    emoji: '🍩',
    servings: [
      { label: '1 donut (70g)',  calories: 270, protein: 4, carbs: 34, fats: 13 },
      { label: '2 donuts (140g)',calories: 540, protein: 8, carbs: 68, fats: 26 },
    ],
    tags: ['dessert', 'snacks'],
    gymFriendly: false, isStreetFood: false, region: 'Karachi',
  },

  // ─────────────────────────────────────────
  // DRINKS — Traditional
  // ─────────────────────────────────────────
  {
    id: 'kashmiri_chai',
    name: 'Kashmiri Chai',
    category: 'Drinks',
    subcategory: 'Traditional',
    emoji: '🌸',
    servings: [
      { label: '1 cup (250ml)', calories: 120, protein: 4, carbs: 14, fats: 5 },
      { label: '2 cups (500ml)',calories: 240, protein: 8, carbs: 28, fats: 10 },
    ],
    tags: ['breakfast', 'snacks', 'drinks'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'green_tea',
    name: 'Green Tea',
    category: 'Drinks',
    subcategory: 'Traditional',
    emoji: '🍵',
    servings: [
      { label: '1 cup (240ml)', calories: 5, protein: 0, carbs: 1, fats: 0 },
      { label: '2 cups (480ml)',calories: 10, protein: 0, carbs: 2, fats: 0 },
    ],
    tags: ['breakfast', 'snacks', 'drinks', 'diet'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'rooh_afza',
    name: 'Rooh Afza Sharbat',
    category: 'Drinks',
    subcategory: 'Traditional',
    emoji: '🌹',
    servings: [
      { label: '1 glass (250ml)', calories: 110, protein: 0, carbs: 28, fats: 0 },
      { label: '2 glass (500ml)', calories: 220, protein: 0, carbs: 56, fats: 0 },
    ],
    tags: ['drinks', 'snacks'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'rooh_afza_milk',
    name: 'Rooh Afza Milk',
    category: 'Drinks',
    subcategory: 'Traditional',
    emoji: '🥛',
    servings: [
      { label: '1 glass (300ml)', calories: 200, protein: 8, carbs: 34, fats: 6 },
    ],
    tags: ['drinks', 'snacks', 'breakfast'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'salted_lassi',
    name: 'Salted Lassi',
    category: 'Drinks',
    subcategory: 'Traditional',
    emoji: '🥛',
    servings: [
      { label: '1 glass (300ml)', calories: 120, protein: 6, carbs: 10, fats: 5 },
      { label: '2 glass (600ml)', calories: 240, protein: 12, carbs: 20, fats: 10 },
    ],
    tags: ['drinks', 'snacks', 'diet'],
    gymFriendly: true, isStreetFood: false, region: 'Punjab',
  },

  // ─────────────────────────────────────────
  // DRINKS — Modern Café
  // ─────────────────────────────────────────
  {
    id: 'cold_coffee',
    name: 'Cold Coffee',
    category: 'Drinks',
    subcategory: 'Café',
    emoji: '☕',
    servings: [
      { label: '1 glass (350ml)', calories: 220, protein: 6, carbs: 30, fats: 8 },
      { label: 'Large (500ml)',   calories: 320, protein: 9, carbs: 44, fats: 12 },
    ],
    tags: ['drinks', 'snacks'],
    gymFriendly: false, isStreetFood: false, region: 'Karachi',
  },
  {
    id: 'chocolate_shake',
    name: 'Chocolate Shake',
    category: 'Drinks',
    subcategory: 'Café',
    emoji: '🍫',
    servings: [
      { label: '1 glass (350ml)', calories: 380, protein: 8, carbs: 58, fats: 14 },
      { label: 'Large (500ml)',   calories: 540, protein: 12, carbs: 82, fats: 20 },
    ],
    tags: ['drinks', 'snacks'],
    gymFriendly: false, isStreetFood: false, region: 'Karachi',
  },
  {
    id: 'bubble_tea',
    name: 'Bubble Tea',
    category: 'Drinks',
    subcategory: 'Café',
    emoji: '🧋',
    servings: [
      { label: '1 cup (400ml)', calories: 300, protein: 3, carbs: 54, fats: 6 },
    ],
    tags: ['drinks', 'snacks'],
    gymFriendly: false, isStreetFood: false, region: 'Karachi',
  },
  {
    id: 'black_coffee',
    name: 'Black Coffee',
    category: 'Drinks',
    subcategory: 'Café',
    emoji: '☕',
    servings: [
      { label: '1 cup (240ml)', calories: 5, protein: 0, carbs: 1, fats: 0 },
    ],
    tags: ['breakfast', 'drinks', 'diet'],
    gymFriendly: true, isStreetFood: false, region: 'Karachi',
  },
  {
    id: 'banana_shake',
    name: 'Banana Shake',
    category: 'Drinks',
    subcategory: 'Café',
    emoji: '🍌',
    servings: [
      { label: '1 glass (350ml)', calories: 320, protein: 9,  carbs: 52, fats: 8  },
      { label: 'Large (500ml)',   calories: 460, protein: 13, carbs: 74, fats: 12 },
    ],
    tags: ['drinks', 'snacks', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Karachi',
  },
  {
    id: 'peanut_butter_shake',
    name: 'Peanut Butter Shake',
    category: 'Drinks',
    subcategory: 'Café',
    emoji: '🥜',
    servings: [
      { label: '1 glass (350ml)', calories: 420, protein: 18, carbs: 40, fats: 20 },
      { label: 'Large (500ml)',   calories: 600, protein: 26, carbs: 58, fats: 28 },
    ],
    tags: ['drinks', 'snacks', 'gym-friendly', 'high-protein'],
    gymFriendly: true, isStreetFood: false, region: 'Karachi',
  },
  {
    id: 'mint_margarita',
    name: 'Mint Margarita',
    category: 'Drinks',
    subcategory: 'Café',
    emoji: '🌿',
    servings: [
      { label: '1 glass (350ml)', calories: 120, protein: 1, carbs: 28, fats: 0 },
    ],
    tags: ['drinks', 'snacks', 'diet'],
    gymFriendly: false, isStreetFood: false, region: 'Karachi',
  },

  // ─────────────────────────────────────────
  // DIET MEALS — Breakfast
  // ─────────────────────────────────────────
  {
    id: 'oats',
    name: 'Oats / Oatmeal',
    category: 'Diet Meals',
    subcategory: 'Breakfast',
    emoji: '🥣',
    servings: [
      { label: '1 bowl (200g)', calories: 180, protein: 7,  carbs: 32, fats: 4 },
      { label: '2 bowls (400g)',calories: 360, protein: 14, carbs: 64, fats: 8 },
    ],
    tags: ['breakfast', 'diet', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'greek_yogurt',
    name: 'Greek Yogurt',
    category: 'Diet Meals',
    subcategory: 'Breakfast',
    emoji: '🥛',
    servings: [
      { label: '1 bowl (150g)', calories: 100, protein: 17, carbs: 6,  fats: 0.5 },
      { label: '2 bowls (300g)',calories: 200, protein: 34, carbs: 12, fats: 1   },
    ],
    tags: ['breakfast', 'snacks', 'diet', 'high-protein', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'brown_bread_egg',
    name: 'Brown Bread + Egg',
    category: 'Diet Meals',
    subcategory: 'Breakfast',
    emoji: '🍳',
    servings: [
      { label: '2 slices + 1 egg (150g)', calories: 220, protein: 14, carbs: 24, fats: 7 },
      { label: '2 slices + 2 eggs (200g)',calories: 300, protein: 20, carbs: 24, fats: 12 },
    ],
    tags: ['breakfast', 'diet', 'gym-friendly', 'high-protein'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'fruit_bowl',
    name: 'Fruit Bowl',
    category: 'Diet Meals',
    subcategory: 'Breakfast',
    emoji: '🍓',
    servings: [
      { label: '1 bowl (200g)', calories: 120, protein: 2, carbs: 28, fats: 0.5 },
      { label: '2 bowls (400g)',calories: 240, protein: 4, carbs: 56, fats: 1   },
    ],
    tags: ['breakfast', 'snacks', 'diet'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },

  // ─────────────────────────────────────────
  // DIET MEALS — Lunch / Dinner
  // ─────────────────────────────────────────
  {
    id: 'grilled_chicken',
    name: 'Grilled Chicken',
    category: 'Diet Meals',
    subcategory: 'Lunch/Dinner',
    emoji: '🍗',
    servings: [
      { label: '1 piece (150g)', calories: 185, protein: 35, carbs: 0,  fats: 4  },
      { label: '2 pieces (300g)',calories: 370, protein: 70, carbs: 0,  fats: 8  },
      { label: '3 pieces (450g)',calories: 555, protein: 105, carbs: 0, fats: 12 },
    ],
    tags: ['lunch', 'dinner', 'diet', 'high-protein', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'grilled_fish_diet',
    name: 'Grilled Fish',
    category: 'Diet Meals',
    subcategory: 'Lunch/Dinner',
    emoji: '🐟',
    servings: [
      { label: '1 piece (150g)', calories: 180, protein: 30, carbs: 0, fats: 6 },
      { label: '2 pieces (300g)',calories: 360, protein: 60, carbs: 0, fats: 12 },
    ],
    tags: ['lunch', 'dinner', 'diet', 'high-protein', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'daal_light',
    name: 'Daal (Light Tarka)',
    category: 'Diet Meals',
    subcategory: 'Lunch/Dinner',
    emoji: '🍲',
    servings: [
      { label: '1 katori (150g)', calories: 140, protein: 9, carbs: 20, fats: 3 },
      { label: '2 katori (300g)', calories: 280, protein: 18, carbs: 40, fats: 6 },
    ],
    tags: ['lunch', 'dinner', 'diet'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'salad_bowl',
    name: 'Salad Bowl',
    category: 'Diet Meals',
    subcategory: 'Lunch/Dinner',
    emoji: '🥗',
    servings: [
      { label: '1 bowl (250g)', calories: 80,  protein: 3, carbs: 14, fats: 2 },
      { label: '2 bowls (500g)',calories: 160, protein: 6, carbs: 28, fats: 4 },
    ],
    tags: ['lunch', 'dinner', 'diet', 'snacks'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'chickpea_salad',
    name: 'Chickpea Salad',
    category: 'Diet Meals',
    subcategory: 'Lunch/Dinner',
    emoji: '🥗',
    servings: [
      { label: '1 bowl (250g)', calories: 220, protein: 12, carbs: 32, fats: 5 },
      { label: '2 bowls (500g)',calories: 440, protein: 24, carbs: 64, fats: 10 },
    ],
    tags: ['lunch', 'dinner', 'diet', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'lentil_soup',
    name: 'Lentil Soup',
    category: 'Diet Meals',
    subcategory: 'Lunch/Dinner',
    emoji: '🍜',
    servings: [
      { label: '1 bowl (300ml)', calories: 160, protein: 10, carbs: 22, fats: 3 },
      { label: '2 bowls (600ml)',calories: 320, protein: 20, carbs: 44, fats: 6 },
    ],
    tags: ['lunch', 'dinner', 'diet'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'vegetable_soup',
    name: 'Vegetable Soup',
    category: 'Diet Meals',
    subcategory: 'Lunch/Dinner',
    emoji: '🥣',
    servings: [
      { label: '1 bowl (300ml)', calories: 90,  protein: 4, carbs: 14, fats: 2 },
      { label: '2 bowls (600ml)',calories: 180, protein: 8, carbs: 28, fats: 4 },
    ],
    tags: ['lunch', 'dinner', 'diet'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'brown_rice_chicken',
    name: 'Brown Rice + Chicken Curry',
    category: 'Diet Meals',
    subcategory: 'Lunch/Dinner',
    emoji: '🍚',
    servings: [
      { label: '1 plate (350g)', calories: 380, protein: 28, carbs: 48, fats: 8 },
      { label: '2 plates (700g)',calories: 760, protein: 56, carbs: 96, fats: 16 },
    ],
    tags: ['lunch', 'dinner', 'diet', 'gym-friendly', 'high-protein'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'yakhni_soup',
    name: 'Yakhni Soup',
    category: 'Diet Meals',
    subcategory: 'Lunch/Dinner',
    emoji: '🍲',
    servings: [
      { label: '1 bowl (300ml)', calories: 110, protein: 12, carbs: 4, fats: 5 },
      { label: '2 bowls (600ml)',calories: 220, protein: 24, carbs: 8, fats: 10 },
    ],
    tags: ['lunch', 'dinner', 'diet', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'lauki_diet',
    name: 'Lauki (Bottle Gourd)',
    category: 'Diet Meals',
    subcategory: 'Lunch/Dinner',
    emoji: '🥒',
    servings: [
      { label: '1 katori (150g)', calories: 80,  protein: 2, carbs: 12, fats: 3 },
      { label: '2 katori (300g)', calories: 160, protein: 4, carbs: 24, fats: 6 },
    ],
    tags: ['lunch', 'dinner', 'diet'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'tori_diet',
    name: 'Tori (Ridge Gourd)',
    category: 'Diet Meals',
    subcategory: 'Lunch/Dinner',
    emoji: '🥬',
    servings: [
      { label: '1 katori (150g)', calories: 70,  protein: 2, carbs: 10, fats: 3 },
      { label: '2 katori (300g)', calories: 140, protein: 4, carbs: 20, fats: 6 },
    ],
    tags: ['lunch', 'dinner', 'diet'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },

  // ─────────────────────────────────────────
  // HEALTHY SNACKS
  // ─────────────────────────────────────────
  {
    id: 'roasted_chana',
    name: 'Roasted Chana',
    category: 'Healthy Snacks',
    subcategory: 'Snacks',
    emoji: '🟤',
    servings: [
      { label: 'Small handful (30g)',  calories: 100, protein: 6,  carbs: 14, fats: 2 },
      { label: 'Large handful (60g)',  calories: 200, protein: 12, carbs: 28, fats: 4 },
    ],
    tags: ['snacks', 'diet', 'gym-friendly', 'high-protein'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'dry_fruits',
    name: 'Dry Fruits Mix',
    category: 'Healthy Snacks',
    subcategory: 'Snacks',
    emoji: '🥜',
    servings: [
      { label: 'Small handful (30g)', calories: 160, protein: 4,  carbs: 14, fats: 10 },
      { label: 'Large handful (60g)', calories: 320, protein: 8,  carbs: 28, fats: 20 },
    ],
    tags: ['snacks', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'dates',
    name: 'Dates (Khajoor)',
    category: 'Healthy Snacks',
    subcategory: 'Snacks',
    emoji: '🟫',
    servings: [
      { label: '3 dates (30g)',  calories: 80,  protein: 0.5, carbs: 20, fats: 0 },
      { label: '6 dates (60g)',  calories: 160, protein: 1,   carbs: 40, fats: 0 },
      { label: '10 dates (100g)',calories: 280, protein: 2,   carbs: 68, fats: 0 },
    ],
    tags: ['snacks', 'diet', 'breakfast'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'peanut_butter_toast',
    name: 'Peanut Butter Toast',
    category: 'Healthy Snacks',
    subcategory: 'Snacks',
    emoji: '🍞',
    servings: [
      { label: '1 slice (60g)',  calories: 190, protein: 7,  carbs: 18, fats: 10 },
      { label: '2 slices (120g)',calories: 380, protein: 14, carbs: 36, fats: 20 },
    ],
    tags: ['snacks', 'breakfast', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'popcorn',
    name: 'Popcorn (Plain)',
    category: 'Healthy Snacks',
    subcategory: 'Snacks',
    emoji: '🍿',
    servings: [
      { label: '1 cup (15g)',  calories: 55,  protein: 2, carbs: 10, fats: 1 },
      { label: '3 cups (45g)', calories: 165, protein: 6, carbs: 30, fats: 3 },
    ],
    tags: ['snacks', 'diet'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'cucumber_sticks',
    name: 'Cucumber Sticks',
    category: 'Healthy Snacks',
    subcategory: 'Snacks',
    emoji: '🥒',
    servings: [
      { label: '1 cucumber (150g)', calories: 25,  protein: 1, carbs: 5, fats: 0 },
      { label: '2 cucumber (300g)', calories: 50,  protein: 2, carbs: 10, fats: 0 },
    ],
    tags: ['snacks', 'diet'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },

  // ─────────────────────────────────────────
  // GYM FOODS — High Protein
  // ─────────────────────────────────────────
  {
    id: 'chicken_breast',
    name: 'Chicken Breast (Plain)',
    category: 'Gym Foods',
    subcategory: 'High Protein',
    emoji: '🍗',
    servings: [
      { label: '100g',  calories: 165, protein: 31, carbs: 0, fats: 3.5 },
      { label: '150g',  calories: 248, protein: 47, carbs: 0, fats: 5   },
      { label: '200g',  calories: 330, protein: 62, carbs: 0, fats: 7   },
    ],
    tags: ['lunch', 'dinner', 'diet', 'high-protein', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'beef_steak',
    name: 'Beef Steak',
    category: 'Gym Foods',
    subcategory: 'High Protein',
    emoji: '🥩',
    servings: [
      { label: '150g', calories: 310, protein: 36, carbs: 0, fats: 18 },
      { label: '250g', calories: 518, protein: 60, carbs: 0, fats: 30 },
    ],
    tags: ['lunch', 'dinner', 'high-protein', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Karachi',
  },
  {
    id: 'paneer',
    name: 'Paneer',
    category: 'Gym Foods',
    subcategory: 'High Protein',
    emoji: '🧀',
    servings: [
      { label: '100g', calories: 265, protein: 18, carbs: 3, fats: 20 },
      { label: '150g', calories: 398, protein: 27, carbs: 5, fats: 30 },
    ],
    tags: ['lunch', 'dinner', 'high-protein', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'qeema_gym',
    name: 'Qeema (Lean Mince)',
    category: 'Gym Foods',
    subcategory: 'High Protein',
    emoji: '🥩',
    servings: [
      { label: '150g', calories: 280, protein: 28, carbs: 4, fats: 16 },
      { label: '250g', calories: 466, protein: 46, carbs: 6, fats: 26 },
    ],
    tags: ['lunch', 'dinner', 'high-protein', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'chana_gym',
    name: 'Chana (Chickpeas)',
    category: 'Gym Foods',
    subcategory: 'High Protein',
    emoji: '🟡',
    servings: [
      { label: '1 katori (150g)', calories: 210, protein: 12, carbs: 32, fats: 4 },
      { label: '2 katori (300g)', calories: 420, protein: 24, carbs: 64, fats: 8 },
    ],
    tags: ['lunch', 'dinner', 'snacks', 'high-protein', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'qeema_paratha',
    name: 'Qeema Paratha',
    category: 'Gym Foods',
    subcategory: 'Bulking',
    emoji: '🫓',
    servings: [
      { label: '1 paratha (180g)', calories: 460, protein: 22, carbs: 42, fats: 22 },
      { label: '2 paratha (360g)', calories: 920, protein: 44, carbs: 84, fats: 44 },
    ],
    tags: ['breakfast', 'lunch', 'gym-friendly', 'high-protein'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'dry_fruit_milkshake',
    name: 'Dry Fruit Milkshake',
    category: 'Gym Foods',
    subcategory: 'Bulking',
    emoji: '🥛',
    servings: [
      { label: '1 glass (350ml)', calories: 420, protein: 12, carbs: 48, fats: 20 },
      { label: 'Large (500ml)',   calories: 600, protein: 17, carbs: 68, fats: 28 },
    ],
    tags: ['breakfast', 'snacks', 'drinks', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },

  // ─────────────────────────────────────────
  // FRUITS
  // ─────────────────────────────────────────
  {
    id: 'banana',
    name: 'Banana',
    category: 'Fruits',
    subcategory: 'Fruits',
    emoji: '🍌',
    servings: [
      { label: '1 small (80g)',  calories: 72,  protein: 1, carbs: 18, fats: 0.3 },
      { label: '1 medium (120g)',calories: 108, protein: 1.5, carbs: 27, fats: 0.4 },
      { label: '2 medium (240g)',calories: 216, protein: 3, carbs: 54, fats: 0.8 },
    ],
    tags: ['snacks', 'breakfast', 'gym-friendly', 'diet'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'apple',
    name: 'Apple',
    category: 'Fruits',
    subcategory: 'Fruits',
    emoji: '🍎',
    servings: [
      { label: '1 small (130g)',  calories: 68,  protein: 0.3, carbs: 18, fats: 0.2 },
      { label: '1 medium (180g)', calories: 94,  protein: 0.5, carbs: 25, fats: 0.3 },
    ],
    tags: ['snacks', 'breakfast', 'diet'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'mango',
    name: 'Mango (Aam)',
    category: 'Fruits',
    subcategory: 'Fruits',
    emoji: '🥭',
    servings: [
      { label: 'Half mango (150g)', calories: 98,  protein: 1.4, carbs: 24, fats: 0.4 },
      { label: 'Full mango (300g)', calories: 196, protein: 2.8, carbs: 48, fats: 0.8 },
    ],
    tags: ['snacks', 'breakfast', 'diet'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'watermelon',
    name: 'Watermelon (Tarbooz)',
    category: 'Fruits',
    subcategory: 'Fruits',
    emoji: '🍉',
    servings: [
      { label: '1 slice (200g)', calories: 60,  protein: 1.2, carbs: 14, fats: 0.2 },
      { label: '2 slices (400g)',calories: 120, protein: 2.4, carbs: 28, fats: 0.4 },
    ],
    tags: ['snacks', 'diet'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'orange',
    name: 'Orange (Santra)',
    category: 'Fruits',
    subcategory: 'Fruits',
    emoji: '🍊',
    servings: [
      { label: '1 medium (130g)', calories: 62, protein: 1.2, carbs: 15, fats: 0.2 },
      { label: '2 medium (260g)', calories: 124, protein: 2.4, carbs: 30, fats: 0.4 },
    ],
    tags: ['snacks', 'breakfast', 'diet'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'grapes',
    name: 'Grapes (Angoor)',
    category: 'Fruits',
    subcategory: 'Fruits',
    emoji: '🍇',
    servings: [
      { label: '1 cup (150g)', calories: 104, protein: 1, carbs: 27, fats: 0.2 },
      { label: '2 cups (300g)',calories: 208, protein: 2, carbs: 54, fats: 0.4 },
    ],
    tags: ['snacks', 'diet'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'strawberry',
    name: 'Strawberries',
    category: 'Fruits',
    subcategory: 'Fruits',
    emoji: '🍓',
    servings: [
      { label: '1 cup (150g)', calories: 48,  protein: 1, carbs: 11, fats: 0.4 },
      { label: '2 cups (300g)',calories: 96,  protein: 2, carbs: 22, fats: 0.8 },
    ],
    tags: ['snacks', 'breakfast', 'diet'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'guava',
    name: 'Guava (Amrood)',
    category: 'Fruits',
    subcategory: 'Fruits',
    emoji: '🍈',
    servings: [
      { label: '1 medium (100g)', calories: 68, protein: 2.6, carbs: 14, fats: 1 },
      { label: '2 medium (200g)', calories: 136, protein: 5.2, carbs: 28, fats: 2 },
    ],
    tags: ['snacks', 'diet', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'pomegranate',
    name: 'Pomegranate (Anar)',
    category: 'Fruits',
    subcategory: 'Fruits',
    emoji: '🍎',
    servings: [
      { label: 'Half (100g)', calories: 83,  protein: 1.7, carbs: 19, fats: 1.2 },
      { label: 'Full (200g)', calories: 166, protein: 3.4, carbs: 38, fats: 2.4 },
    ],
    tags: ['snacks', 'diet'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },

  // ─────────────────────────────────────────
  // COMBO MEALS — realistic Pakistani combos
  // ─────────────────────────────────────────
  {
    id: 'chicken_tikka_roti',
    name: 'Chicken Tikka + Roti',
    category: 'Diet Meals',
    subcategory: 'Combo',
    emoji: '🍢',
    servings: [
      { label: '2 tikka + 1 roti (250g)', calories: 370, protein: 34, carbs: 22, fats: 14 },
      { label: '4 tikka + 2 roti (450g)', calories: 620, protein: 64, carbs: 42, fats: 24 },
    ],
    tags: ['lunch', 'dinner', 'diet', 'high-protein', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'daal_chawal_diet',
    name: 'Daal Chawal (Diet portion)',
    category: 'Diet Meals',
    subcategory: 'Combo',
    emoji: '🍚',
    servings: [
      { label: 'Small plate (250g)', calories: 300, protein: 12, carbs: 48, fats: 5 },
      { label: 'Normal plate (350g)',calories: 420, protein: 16, carbs: 68, fats: 7 },
    ],
    tags: ['lunch', 'dinner', 'diet'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'qeema_roti',
    name: 'Qeema Matar + Roti',
    category: 'Diet Meals',
    subcategory: 'Combo',
    emoji: '🥩',
    servings: [
      { label: '1 katori qeema + 1 roti (250g)', calories: 420, protein: 28, carbs: 32, fats: 18 },
      { label: '1 katori qeema + 2 roti (320g)', calories: 520, protein: 31, carbs: 52, fats: 19 },
    ],
    tags: ['lunch', 'dinner', 'diet', 'high-protein'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'palak_chicken_roti',
    name: 'Palak Chicken + Roti',
    category: 'Diet Meals',
    subcategory: 'Combo',
    emoji: '🥬',
    servings: [
      { label: '1 katori + 1 roti (250g)', calories: 380, protein: 30, carbs: 28, fats: 14 },
      { label: '1 katori + 2 roti (320g)', calories: 480, protein: 33, carbs: 48, fats: 15 },
    ],
    tags: ['lunch', 'dinner', 'diet', 'high-protein', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'grilled_fish_rice',
    name: 'Grilled Fish + Brown Rice',
    category: 'Diet Meals',
    subcategory: 'Combo',
    emoji: '🐟',
    servings: [
      { label: '1 piece fish + 1 katori rice (300g)', calories: 375, protein: 34, carbs: 44, fats: 7 },
      { label: '2 piece fish + 1 katori rice (450g)', calories: 555, protein: 64, carbs: 44, fats: 13 },
    ],
    tags: ['lunch', 'dinner', 'diet', 'high-protein', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'seekh_salad',
    name: 'Seekh Kabab + Salad',
    category: 'Diet Meals',
    subcategory: 'Combo',
    emoji: '🍡',
    servings: [
      { label: '2 seekh + salad (250g)', calories: 280, protein: 26, carbs: 16, fats: 13 },
      { label: '4 seekh + salad (400g)', calories: 480, protein: 48, carbs: 22, fats: 24 },
    ],
    tags: ['lunch', 'dinner', 'diet', 'high-protein', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Karachi',
  },
  {
    id: 'anda_bhurji_bread',
    name: 'Anda Bhurji + Brown Bread',
    category: 'Diet Meals',
    subcategory: 'Combo',
    emoji: '🍳',
    servings: [
      { label: '2 eggs + 2 slices (200g)', calories: 310, protein: 18, carbs: 26, fats: 14 },
      { label: '3 eggs + 2 slices (250g)', calories: 415, protein: 25, carbs: 27, fats: 22 },
    ],
    tags: ['breakfast', 'diet', 'high-protein', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'oats_banana',
    name: 'Oats + Banana',
    category: 'Diet Meals',
    subcategory: 'Combo',
    emoji: '🥣',
    servings: [
      { label: '1 bowl oats + 1 banana (320g)', calories: 288, protein: 8.5, carbs: 58, fats: 4 },
    ],
    tags: ['breakfast', 'diet', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'boiled_eggs_fruit',
    name: 'Boiled Eggs + Fruit',
    category: 'Diet Meals',
    subcategory: 'Combo',
    emoji: '🥚',
    servings: [
      { label: '2 eggs + apple (230g)', calories: 224, protein: 13, carbs: 19, fats: 10 },
      { label: '3 eggs + banana (270g)',calories: 342, protein: 19, carbs: 28, fats: 15 },
    ],
    tags: ['breakfast', 'diet', 'high-protein', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'yogurt_bowl',
    name: 'Yogurt Bowl',
    category: 'Diet Meals',
    subcategory: 'Combo',
    emoji: '🥣',
    servings: [
      { label: '1 bowl dahi + fruit (250g)',        calories: 190, protein: 9,  carbs: 28, fats: 5 },
      { label: '1 bowl greek yogurt + fruit (250g)',calories: 210, protein: 20, carbs: 22, fats: 3 },
    ],
    tags: ['breakfast', 'snacks', 'diet', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'soup_egg',
    name: 'Soup + Boiled Egg',
    category: 'Diet Meals',
    subcategory: 'Combo',
    emoji: '🥣',
    servings: [
      { label: '1 bowl soup + 1 egg (350g)', calories: 168, protein: 14, carbs: 10, fats: 7 },
      { label: '1 bowl soup + 2 eggs (400g)',calories: 246, protein: 20, carbs: 10, fats: 12 },
    ],
    tags: ['dinner', 'diet', 'high-protein', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'mixed_sabzi_roti',
    name: 'Mix Sabzi + Roti',
    category: 'Diet Meals',
    subcategory: 'Combo',
    emoji: '🥦',
    servings: [
      { label: '1 katori sabzi + 1 roti (230g)', calories: 260, protein: 7,  carbs: 36, fats: 9  },
      { label: '1 katori sabzi + 2 roti (300g)', calories: 360, protein: 10, carbs: 56, fats: 10 },
    ],
    tags: ['lunch', 'dinner', 'diet'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'chicken_yakhni_roti',
    name: 'Chicken Yakhni + Roti',
    category: 'Diet Meals',
    subcategory: 'Combo',
    emoji: '🍲',
    servings: [
      { label: '1 bowl yakhni + 1 roti (350g)', calories: 270, protein: 22, carbs: 24, fats: 8 },
      { label: '1 bowl yakhni + 2 roti (430g)', calories: 370, protein: 25, carbs: 44, fats: 9 },
    ],
    tags: ['lunch', 'dinner', 'diet', 'high-protein', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },

  // ─────────────────────────────────────────
  // MORE SABZI — low calorie high volume
  // ─────────────────────────────────────────
  {
    id: 'band_gobi',
    name: 'Band Gobi (Cabbage)',
    category: 'Ghar ka Khana',
    subcategory: 'Sabzi',
    emoji: '🥬',
    servings: [
      { label: '1 katori (150g)', calories: 110, protein: 3, carbs: 14, fats: 5 },
      { label: '2 katori (300g)', calories: 220, protein: 6, carbs: 28, fats: 10 },
    ],
    tags: ['lunch', 'dinner', 'diet'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'mix_sabzi',
    name: 'Mix Sabzi',
    category: 'Ghar ka Khana',
    subcategory: 'Sabzi',
    emoji: '🥦',
    servings: [
      { label: '1 katori (150g)', calories: 130, protein: 4, carbs: 16, fats: 5 },
      { label: '2 katori (300g)', calories: 260, protein: 8, carbs: 32, fats: 10 },
    ],
    tags: ['lunch', 'dinner', 'diet'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'sweet_potato',
    name: 'Sweet Potato (Shakarkandi)',
    category: 'Diet Meals',
    subcategory: 'Carbs',
    emoji: '🍠',
    servings: [
      { label: '1 medium (130g)', calories: 112, protein: 2, carbs: 26, fats: 0.1 },
      { label: '2 medium (260g)', calories: 224, protein: 4, carbs: 52, fats: 0.2 },
    ],
    tags: ['snacks', 'lunch', 'dinner', 'diet'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'khichdi_diet',
    name: 'Khichdi',
    category: 'Diet Meals',
    subcategory: 'Carbs',
    emoji: '🍚',
    servings: [
      { label: '1 plate (250g)', calories: 290, protein: 10, carbs: 50, fats: 5 },
      { label: '2 plates (500g)',calories: 580, protein: 20, carbs: 100, fats: 10 },
    ],
    tags: ['lunch', 'dinner', 'diet'],
    gymFriendly: false, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'rajma',
    name: 'Rajma (Kidney Beans)',
    category: 'Diet Meals',
    subcategory: 'Legumes',
    emoji: '🫘',
    servings: [
      { label: '1 katori (150g)', calories: 200, protein: 12, carbs: 34, fats: 4 },
      { label: '2 katori (300g)', calories: 400, protein: 24, carbs: 68, fats: 8 },
    ],
    tags: ['lunch', 'dinner', 'diet', 'high-protein'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'moong_daal_diet',
    name: 'Moong Daal (Light)',
    category: 'Diet Meals',
    subcategory: 'Legumes',
    emoji: '🟡',
    servings: [
      { label: '1 katori (150g)', calories: 140, protein: 9, carbs: 22, fats: 3 },
      { label: '2 katori (300g)', calories: 280, protein: 18, carbs: 44, fats: 6 },
    ],
    tags: ['lunch', 'dinner', 'diet', 'high-protein'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'omelette_diet',
    name: 'Omelette (Light Oil)',
    category: 'Diet Meals',
    subcategory: 'Breakfast',
    emoji: '🍳',
    servings: [
      { label: '2 egg omelette (120g)', calories: 185, protein: 13, carbs: 2, fats: 14 },
      { label: '3 egg omelette (180g)', calories: 278, protein: 20, carbs: 3, fats: 21 },
    ],
    tags: ['breakfast', 'diet', 'high-protein', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },
  {
    id: 'chicken_qeema_diet',
    name: 'Chicken Qeema (Light)',
    category: 'Diet Meals',
    subcategory: 'Lunch/Dinner',
    emoji: '🍗',
    servings: [
      { label: '1 katori (150g)', calories: 220, protein: 26, carbs: 6, fats: 10 },
      { label: '2 katori (300g)', calories: 440, protein: 52, carbs: 12, fats: 20 },
    ],
    tags: ['lunch', 'dinner', 'diet', 'high-protein', 'gym-friendly'],
    gymFriendly: true, isStreetFood: false, region: 'Pakistan',
  },

]

// ─────────────────────────────────────────────────────────────
//  SEARCH HELPER — used by the route
// ─────────────────────────────────────────────────────────────
export function searchFoods(query = '', limit = 12) {
  if (!query.trim()) return PAKISTANI_FOODS.slice(0, limit)
  const q = query.toLowerCase()
  return PAKISTANI_FOODS
    .filter(f =>
      f.name.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q) ||
      f.subcategory.toLowerCase().includes(q) ||
      f.tags.some(t => t.includes(q))
    )
    .slice(0, limit)
}

// ─────────────────────────────────────────────────────────────
//  CATEGORY HELPER
// ─────────────────────────────────────────────────────────────
export function getFoodsByCategory(category = '') {
  if (!category) return PAKISTANI_FOODS
  return PAKISTANI_FOODS.filter(f =>
    f.category.toLowerCase() === category.toLowerCase()
  )
}

// ─────────────────────────────────────────────────────────────
//  MEAL PLAN GENERATOR
//  goals: 'lose' | 'gain' | 'maintain'
// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
//  LIFESTYLE PROFILES
// ─────────────────────────────────────────────────────────────
const LIFESTYLE_PROFILES = {
  student: {
    label: 'Student',
    emoji: '📚',
    description: 'Long study hours, mostly sitting',
    tdeeMultiplier: 1.30,
    proteinPriority: 'medium',
    carbStrategy: 'moderate',
    preferredFoods: ['diet', 'light'],
    avoidHeavy: true,
  },
  office_worker: {
    label: 'Office / Desk Job',
    emoji: '💻',
    description: 'Sitting 8+ hours, low activity',
    tdeeMultiplier: 1.25,
    proteinPriority: 'medium',
    carbStrategy: 'low',
    preferredFoods: ['diet', 'high-protein'],
    avoidHeavy: true,
  },
  gym_goer: {
    label: 'Gym Goer',
    emoji: '🏋️',
    description: 'Trains 3-5x per week',
    tdeeMultiplier: 1.55,
    proteinPriority: 'high',
    carbStrategy: 'high',
    preferredFoods: ['gym-friendly', 'high-protein'],
    avoidHeavy: false,
  },
  manual_worker: {
    label: 'Physical / Labour Work',
    emoji: '🔨',
    description: 'Construction, shop work, delivery etc',
    tdeeMultiplier: 1.75,
    proteinPriority: 'high',
    carbStrategy: 'high',
    preferredFoods: ['high-protein'],
    avoidHeavy: false,
  },
  homebody: {
    label: 'Home / Housework',
    emoji: '🏠',
    description: 'Mostly at home, light activity',
    tdeeMultiplier: 1.30,
    proteinPriority: 'low',
    carbStrategy: 'moderate',
    preferredFoods: ['diet'],
    avoidHeavy: false,
  },
  athlete: {
    label: 'Athlete / Sports',
    emoji: '⚽',
    description: 'Daily sports or intense training',
    tdeeMultiplier: 1.80,
    proteinPriority: 'high',
    carbStrategy: 'very-high',
    preferredFoods: ['gym-friendly', 'high-protein'],
    avoidHeavy: false,
  },
}

// ─────────────────────────────────────────────────────────────
//  FOODS THAT ARE NEVER SUITABLE FOR WEIGHT LOSS
//  Heavy, oily, high-calorie Pakistani dishes explicitly blocked
// ─────────────────────────────────────────────────────────────
const AVOID_FOR_DIET = new Set([
  'paya', 'nihari', 'haleem', 'chicken_haleem',
  'beef_karahi', 'chicken_qorma', 'beef_qorma',
  'kofta_curry', 'nargisi_kofta',
  'aloo_paratha', 'plain_paratha',
  'halwa_puri',
  'chicken_biryani', 'beef_biryani', 'sindhi_biryani', 'mutton_biryani',
  'kabuli_pulao',
  'katakat',
  'zinger_burger', 'shawarma',
  'masala_fries',
  'chicken_tikka_pizza', 'margherita_pizza',
  'chicken_fried_rice', 'chicken_chow_mein', 'chicken_manchurian',
  'gulab_jamun', 'ras_malai', 'jalebi', 'barfi', 'laddu',
  'suji_halwa', 'gajar_halwa', 'zarda', 'shahi_tukray',
  'chocolate_cake', 'brownie', 'kunafa', 'donut',
  'chocolate_shake', 'banana_shake',
  'sajji',
  'qeema_paratha',
  'dry_fruit_milkshake',
])

// ─────────────────────────────────────────────────────────────
//  FOODS THAT ARE NOT IDEAL FOR MUSCLE GAIN (too light/low cal)
// ─────────────────────────────────────────────────────────────
const AVOID_FOR_GAIN = new Set([
  'green_tea', 'black_coffee', 'cucumber_sticks',
  'salad_bowl', 'vegetable_soup', 'lauki_diet', 'tori_diet',
  'mint_margarita', 'fruit_bowl',
  'watermelon', 'strawberry',
  'popcorn',
])

export function generateMealPlan(targetCalories, goal = 'maintain', lifestyle = 'student') {

  // ── Step 1: Get lifestyle profile ─────────────────────────
  const profile = LIFESTYLE_PROFILES[lifestyle] || LIFESTYLE_PROFILES.student

  const rand       = arr => arr[Math.floor(Math.random() * arr.length)]
  const getServing = (food, idx = 0) => ({
    ...food,
    selectedServing: food.servings[idx] || food.servings[0],
  })

  // ── Step 2: Apply goal + lifestyle filter on full DB ──────
  const goalFilter = (food) => {
    if (goal === 'lose') {
      if (AVOID_FOR_DIET.has(food.id)) return false
      // avoidHeavy lifestyles (student, office) get stricter filtering
      if (profile.avoidHeavy && food.category === 'Ghar ka Khana' &&
          food.subcategory === 'Gosht') return false
      return (
        food.tags.includes('diet') ||
        food.category === 'Diet Meals' ||
        food.category === 'Fruits' ||
        food.category === 'Healthy Snacks' ||
        food.gymFriendly === true
      )
    }
    if (goal === 'gain') {
      if (AVOID_FOR_GAIN.has(food.id)) return false
      return (
        food.gymFriendly === true ||
        food.tags.includes('high-protein') ||
        food.tags.includes('gym-friendly') ||
        food.category === 'Gym Foods'
      )
    }
    // maintain — lifestyle shapes food preference but no hard blocks
    if (profile.preferredFoods.includes('high-protein')) {
      // gym_goer / athlete / manual_worker on maintain → prefer protein-rich
      return (
        food.gymFriendly === true ||
        food.tags.includes('high-protein') ||
        food.tags.some(t => profile.preferredFoods.includes(t)) ||
        food.category === 'Ghar ka Khana' // always include home food
      )
    }
    return true
  }

  const eligibleFoods = PAKISTANI_FOODS.filter(goalFilter)

  // ── Step 3: Split by meal slot ────────────────────────────
  const breakfastFoods = eligibleFoods.filter(f => f.tags.includes('breakfast'))
  const lunchFoods     = eligibleFoods.filter(f => f.tags.includes('lunch'))
  const dinnerFoods    = eligibleFoods.filter(f => f.tags.includes('dinner'))
  const snackFoods     = eligibleFoods.filter(f =>
    f.tags.includes('snacks') ||
    f.category === 'Fruits' ||
    f.category === 'Healthy Snacks' ||
    f.category === 'Drinks'
  )

  // ── Step 4: Calculate calories ────────────────────────────
  // targetCalories = user's base goal
  // lifestyle TDEE multiplier adjusts for activity level
  // goal modifier then applies deficit/surplus on top
  const adjustedBase = Math.round(targetCalories * profile.tdeeMultiplier)

  const effectiveCalories =
    goal === 'lose'
      ? Math.min(Math.max(Math.round(adjustedBase * 0.85), 1700), 2200)
    : goal === 'gain'
      ? Math.min(Math.max(Math.round(adjustedBase * 1.20), 2600), 3500)
    : adjustedBase

  const splits = {
    breakfast: Math.round(effectiveCalories * 0.25),
    lunch:     Math.round(effectiveCalories * 0.35),
    dinner:    Math.round(effectiveCalories * 0.30),
    snacks:    Math.round(effectiveCalories * 0.10),
  }

  // ── Step 5: Per-meal calorie caps ─────────────────────────
  // Adjusted by lifestyle — active people get higher caps
  const loseCapMultiplier   = profile.tdeeMultiplier >= 1.55 ? 1.3 : 1.0
  const CAP = goal === 'lose' ? {
    breakfast: Math.round(500  * loseCapMultiplier),
    lunch:     Math.round(600  * loseCapMultiplier),
    dinner:    Math.round(550  * loseCapMultiplier),
    snacks:    Math.round(200  * loseCapMultiplier),
  } : goal === 'gain' ? {
    breakfast: 900,
    lunch:     1200,
    dinner:    1000,
    snacks:    500,
  } : null

  // ── Step 6: Pick best food per slot ──────────────────────
  const pickBest = (foods, targetCal, slot) => {
    if (!foods || foods.length === 0) return null
    const cap = CAP ? CAP[slot] : Infinity

    const candidates = []
    foods.forEach(food => {
      food.servings.forEach((srv, idx) => {
        if (srv.calories <= cap) {
          candidates.push({ food, idx, diff: Math.abs(srv.calories - targetCal) })
        }
      })
    })

    const pool = candidates.length > 0 ? candidates : (() => {
      const all = []
      foods.forEach(food => {
        food.servings.forEach((srv, idx) => {
          all.push({ food, idx, diff: Math.abs(srv.calories - targetCal) })
        })
      })
      return all
    })()

    pool.sort((a, b) => a.diff - b.diff)
    const best = pool[0]
    return best ? getServing(best.food, best.idx) : null
  }

  return {
    goal,
    lifestyle,
    lifestyleLabel: profile.label,
    lifestyleEmoji: profile.emoji,
    targetCalories,
    adjustedBase,
    effectiveCalories,
    meals: {
      breakfast: pickBest(breakfastFoods, splits.breakfast, 'breakfast'),
      lunch:     pickBest(lunchFoods,     splits.lunch,     'lunch'),
      dinner:    pickBest(dinnerFoods,    splits.dinner,    'dinner'),
      snacks:    pickBest(snackFoods,     splits.snacks,    'snacks'),
    },
    splits,
  }
}

// Export lifestyle profiles so frontend can read them for the UI
export const LIFESTYLES = Object.entries(LIFESTYLE_PROFILES).map(([value, p]) => ({
  value,
  label:       p.label,
  emoji:       p.emoji,
  description: p.description,
}))

export const FOOD_CATEGORIES = [
  'Ghar ka Khana',
  'Rice',
  'Roti',
  'Breakfast',
  'Street Food',
  'Rolls',
  'BBQ',
  'Fast Food',
  'Pizza',
  'Chinese',
  'Seafood',
  'Dessert',
  'Drinks',
  'Diet Meals',
  'Gym Foods',
  'Fruits',
  'Healthy Snacks',
]