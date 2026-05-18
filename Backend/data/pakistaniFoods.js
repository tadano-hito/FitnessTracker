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
    tags: ['breakfast', 'lunch', 'dinner'],
    gymFriendly: false,
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
    id: 'gulab_jamun',
    name: 'Gulab Jamun',
    category: 'Dessert',
    subcategory: 'Mithai',
    emoji: '🍮',
    servings: [
      { label: '2 pieces (80g)',  calories: 260, protein: 4,  carbs: 48, fats: 7  },
      { label: '4 pieces (160g)', calories: 520, protein: 8,  carbs: 96, fats: 14 },
    ],
    tags: ['dessert', 'snacks'],
    gymFriendly: false,
    isStreetFood: false,
    region: 'Pakistan',
  },
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
// REPLACE WITH
export function generateMealPlan(targetCalories, goal = 'maintain') {
  const breakfastFoods = PAKISTANI_FOODS.filter(f => f.tags.includes('breakfast'))
  const lunchFoods     = PAKISTANI_FOODS.filter(f => f.tags.includes('lunch'))
  const dinnerFoods    = PAKISTANI_FOODS.filter(f => f.tags.includes('dinner'))
  const snackFoods     = PAKISTANI_FOODS.filter(f => f.tags.includes('snacks'))

  const rand = arr => arr[Math.floor(Math.random() * arr.length)]
  const getServing = (food, idx = 0) => ({
    ...food,
    selectedServing: food.servings[idx] || food.servings[0],
  })

  const splits = {
    breakfast: Math.round(targetCalories * 0.25),
    lunch:     Math.round(targetCalories * 0.35),
    dinner:    Math.round(targetCalories * 0.30),
    snacks:    Math.round(targetCalories * 0.10),
  }

  // ✅ FIX 1: null guard so empty array never crashes
  const pickBest = (foods, targetCal) => {
    if (!foods || foods.length === 0) return null
    let best = null, bestDiff = Infinity
    foods.forEach(food => {
      food.servings.forEach((srv, idx) => {
        const diff = Math.abs(srv.calories - targetCal)
        if (diff < bestDiff) { bestDiff = diff; best = { food, idx } }
      })
    })
    return best ? getServing(best.food, best.idx) : getServing(rand(foods))
  }

  // ✅ FIX 2: >= 1 instead of >= 2 so snacks don't crash on gain goal
  const filterByGoal = (foods) => {
    if (goal === 'gain') {
      const gym = foods.filter(f => f.gymFriendly)
      return gym.length >= 1 ? gym : foods
    }
    return foods
  }
  return {
    goal,
    targetCalories,
    meals: {
      breakfast: pickBest(filterByGoal(breakfastFoods), splits.breakfast),
      lunch:     pickBest(filterByGoal(lunchFoods),     splits.lunch),
      dinner:    pickBest(filterByGoal(dinnerFoods),    splits.dinner),
      snacks:    pickBest(filterByGoal(snackFoods),     splits.snacks),
    },
    splits,
  }
}

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
]