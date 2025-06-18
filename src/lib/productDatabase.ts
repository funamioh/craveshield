// Product database with nutritional info and alternatives
export interface Product {
  name: string;
  calories: number;
  cost: number;
  currency: string;
  alternative: {
    name: string;
    description: string;
    recipe: string[];
    calories: number;
    prepTime: string;
  };
}

export const productDatabase: Record<string, Product> = {
  // Fast Food
  "big mac": {
    name: "Big Mac",
    calories: 550,
    cost: 6.99,
    currency: "USD",
    alternative: {
      name: "Homemade Turkey Burger",
      description: "A healthier burger alternative with lean turkey and fresh vegetables",
      recipe: [
        "1 lb ground turkey (93% lean)",
        "1 whole wheat bun",
        "Lettuce, tomato, onion",
        "1 tbsp olive oil",
        "Season with salt, pepper, garlic powder",
        "Grill turkey patty for 6-7 minutes each side",
        "Assemble with fresh vegetables"
      ],
      calories: 320,
      prepTime: "15 minutes"
    }
  },
  "pizza": {
    name: "Large Pizza Slice",
    calories: 400,
    cost: 3.50,
    currency: "USD",
    alternative: {
      name: "Cauliflower Crust Personal Pizza",
      description: "A low-carb pizza alternative that's just as satisfying",
      recipe: [
        "1 head cauliflower, riced",
        "1 egg",
        "1/4 cup mozzarella cheese",
        "2 tbsp tomato sauce",
        "Fresh basil and vegetables",
        "Preheat oven to 425F",
        "Mix cauliflower, egg, and cheese for crust",
        "Bake crust 15 min, add toppings, bake 10 more min"
      ],
      calories: 180,
      prepTime: "30 minutes"
    }
  },
  // Sweets
  "chocolate chip cookies": {
    name: "Chocolate Chip Cookies (3 pieces)",
    calories: 450,
    cost: 4.99,
    currency: "USD",
    alternative: {
      name: "Oatmeal Banana Cookies",
      description: "Naturally sweetened cookies with no added sugar",
      recipe: [
        "2 ripe bananas, mashed",
        "1 cup rolled oats",
        "1/4 cup dark chocolate chips",
        "1 tsp vanilla extract",
        "1/2 tsp cinnamon",
        "Preheat oven to 350F",
        "Mix all ingredients",
        "Drop spoonfuls on baking sheet",
        "Bake for 12-15 minutes"
      ],
      calories: 180,
      prepTime: "20 minutes"
    }
  },
  "ice cream": {
    name: "Ice Cream (1 cup)",
    calories: 350,
    cost: 5.99,
    currency: "USD",
    alternative: {
      name: "Frozen Banana Nice Cream",
      description: "Creamy, naturally sweet ice cream alternative",
      recipe: [
        "3 frozen bananas, sliced",
        "2 tbsp almond milk",
        "1 tsp vanilla extract",
        "Optional: 1 tbsp cocoa powder or berries",
        "Blend frozen bananas in food processor",
        "Add milk gradually until creamy",
        "Add vanilla and mix-ins",
        "Serve immediately or freeze for firmer texture"
      ],
      calories: 120,
      prepTime: "5 minutes"
    }
  },
  "donuts": {
    name: "Glazed Donut",
    calories: 260,
    cost: 1.99,
    currency: "USD",
    alternative: {
      name: "Baked Apple Cinnamon Rings",
      description: "Sweet, satisfying rings without the guilt",
      recipe: [
        "2 large apples, cored and sliced into rings",
        "1/2 cup whole wheat flour",
        "1/4 cup oats, ground",
        "1 tsp cinnamon",
        "2 tbsp honey",
        "1 egg, beaten",
        "Dip apple rings in egg, then flour mixture",
        "Bake at 375F for 15-20 minutes until golden"
      ],
      calories: 95,
      prepTime: "25 minutes"
    }
  },
  // Snacks
  "potato chips": {
    name: "Potato Chips (1 bag)",
    calories: 320,
    cost: 2.49,
    currency: "USD",
    alternative: {
      name: "Baked Sweet Potato Chips",
      description: "Crispy, naturally sweet chips with more nutrients",
      recipe: [
        "2 large sweet potatoes, thinly sliced",
        "1 tbsp olive oil",
        "1/2 tsp sea salt",
        "Optional: paprika, garlic powder",
        "Preheat oven to 400F",
        "Toss slices with oil and seasonings",
        "Arrange on baking sheet in single layer",
        "Bake 15-20 minutes, flipping halfway"
      ],
      calories: 140,
      prepTime: "30 minutes"
    }
  },
  "candy bar": {
    name: "Chocolate Candy Bar",
    calories: 280,
    cost: 1.79,
    currency: "USD",
    alternative: {
      name: "Dark Chocolate Energy Bites",
      description: "Naturally sweet energy bites with protein and fiber",
      recipe: [
        "1 cup dates, pitted",
        "1/2 cup almonds",
        "2 tbsp cocoa powder",
        "1 tbsp chia seeds",
        "1 tsp vanilla extract",
        "Process dates and almonds in food processor",
        "Add cocoa, chia seeds, and vanilla",
        "Roll into small balls",
        "Refrigerate for 30 minutes"
      ],
      calories: 150,
      prepTime: "15 minutes"
    }
  },
  // International Foods
  "ramen": {
    name: "Instant Ramen (1 package)",
    calories: 380,
    cost: 1.50,
    currency: "USD",
    alternative: {
      name: "Homemade Vegetable Ramen",
      description: "Fresh, nutritious ramen with real vegetables and lean protein",
      recipe: [
        "2 cups low-sodium chicken or vegetable broth",
        "1 pack shirataki noodles or zucchini noodles",
        "1 soft-boiled egg",
        "1/2 cup mixed vegetables (carrots, spinach, mushrooms)",
        "1 green onion, sliced",
        "1 tsp miso paste (optional)",
        "Heat broth and add miso paste",
        "Add vegetables and cook for 3-4 minutes",
        "Add noodles and heat through",
        "Top with egg and green onions"
      ],
      calories: 180,
      prepTime: "15 minutes"
    }
  },
  "sushi": {
    name: "Sushi Roll (8 pieces)",
    calories: 450,
    cost: 12.99,
    currency: "USD",
    alternative: {
      name: "Homemade Sushi Bowl",
      description: "Deconstructed sushi with fresh ingredients and brown rice",
      recipe: [
        "1 cup cooked brown rice",
        "4 oz fresh salmon or tuna (sashimi grade)",
        "1/2 avocado, sliced",
        "1/2 cucumber, julienned",
        "1 sheet nori, cut into strips",
        "1 tbsp low-sodium soy sauce",
        "1 tsp wasabi",
        "Pickled ginger",
        "Arrange rice in bowl",
        "Top with fish, avocado, and cucumber",
        "Garnish with nori strips",
        "Serve with soy sauce and wasabi"
      ],
      calories: 320,
      prepTime: "10 minutes"
    }
  },
  "tacos": {
    name: "Fast Food Tacos (3 pieces)",
    calories: 520,
    cost: 8.99,
    currency: "USD",
    alternative: {
      name: "Lettuce Wrap Tacos",
      description: "Fresh lettuce wraps with lean protein and vegetables",
      recipe: [
        "6 large lettuce leaves (butter lettuce or iceberg)",
        "6 oz lean ground turkey or chicken",
        "1/2 cup black beans",
        "1/4 cup corn",
        "1/4 cup diced tomatoes",
        "1/4 avocado, diced",
        "2 tbsp salsa",
        "1 tbsp Greek yogurt",
        "Cook protein with taco seasoning",
        "Warm beans and corn",
        "Fill lettuce leaves with ingredients",
        "Top with salsa and yogurt"
      ],
      calories: 280,
      prepTime: "20 minutes"
    }
  },
  "pasta": {
    name: "Restaurant Pasta (1 serving)",
    calories: 650,
    cost: 15.99,
    currency: "USD",
    alternative: {
      name: "Zucchini Noodle Pasta",
      description: "Light and fresh zucchini noodles with homemade sauce",
      recipe: [
        "2 large zucchini, spiralized",
        "1 cup cherry tomatoes",
        "2 cloves garlic, minced",
        "2 tbsp olive oil",
        "1/4 cup fresh basil",
        "2 tbsp parmesan cheese",
        "Salt and pepper to taste",
        "Saute garlic in olive oil",
        "Add tomatoes and cook until soft",
        "Add zucchini noodles for 2-3 minutes",
        "Toss with basil and parmesan"
      ],
      calories: 220,
      prepTime: "15 minutes"
    }
  },
  "fried chicken": {
    name: "Fried Chicken (3 pieces)",
    calories: 740,
    cost: 9.99,
    currency: "USD",
    alternative: {
      name: "Baked Crispy Chicken",
      description: "Crispy baked chicken with herbs and spices",
      recipe: [
        "3 chicken thighs, skinless",
        "1/2 cup whole wheat breadcrumbs",
        "1/4 cup parmesan cheese",
        "1 tsp paprika",
        "1 tsp garlic powder",
        "1 tsp dried herbs",
        "2 tbsp olive oil",
        "Preheat oven to 425F",
        "Mix breadcrumbs with cheese and spices",
        "Brush chicken with oil",
        "Coat with breadcrumb mixture",
        "Bake for 25-30 minutes until crispy"
      ],
      calories: 380,
      prepTime: "35 minutes"
    }
  }
};

// Function to find product by name (case-insensitive, partial matching)
export function findProduct(userInput: string): Product | null {
  const input = userInput.toLowerCase();
  
  // First try exact matches
  for (const [key, product] of Object.entries(productDatabase)) {
    if (input.includes(key)) {
      return product;
    }
  }
  
  // Then try partial matches for common variations
  const variations: Record<string, string> = {
    "mcdonald": "big mac",
    "burger": "big mac",
    "cookie": "chocolate chip cookies",
    "chips": "potato chips",
    "chocolate": "candy bar",
    "candy": "candy bar",
    "donut": "donuts",
    "doughnut": "donuts",
    "noodles": "ramen",
    "instant noodles": "ramen",
    "taco": "tacos",
    "spaghetti": "pasta",
    "noodle": "pasta",
    "chicken": "fried chicken"
  };
  
  for (const [variation, productKey] of Object.entries(variations)) {
    if (input.includes(variation)) {
      return productDatabase[productKey];
    }
  }
  
  return null;
}

// Function to detect if user mentioned a food item we don't recognize
export function detectUnknownFood(userInput: string): string | null {
  const input = userInput.toLowerCase();
  
  // Common food-related keywords that suggest user is talking about food
  const foodKeywords = [
    "craving", "want", "eating", "hungry", "food", "taste", "delicious",
    "restaurant", "order", "delivery", "cook", "recipe", "meal", "snack",
    "breakfast", "lunch", "dinner", "dessert", "sweet", "savory"
  ];
  
  // Check if the message contains food-related context
  const hasFoodContext = foodKeywords.some(keyword => input.includes(keyword));
  
  if (hasFoodContext) {
    // Extract potential food names (simple approach - look for nouns that aren't common words)
    const words = input.split(/\s+/);
    const commonWords = new Set([
      "i", "am", "want", "need", "like", "love", "hate", "craving", "for", "some", "a", "an", "the",
      "really", "very", "so", "too", "just", "now", "today", "tonight", "this", "that", "these", "those",
      "and", "or", "but", "with", "without", "have", "had", "get", "got", "make", "eat", "eating"
    ]);
    
    const potentialFoodWords = words.filter(word => 
      word.length > 2 && 
      !commonWords.has(word) && 
      !foodKeywords.includes(word)
    );
    
    if (potentialFoodWords.length > 0) {
      return potentialFoodWords[0]; // Return the first potential food word
    }
  }
  
  return null;
}

// Function to generate clarification response for unknown foods
export function generateClarificationResponse(unknownFood: string): string {
  return `I noticed you mentioned "${unknownFood}" but I don't have specific nutritional information for that food in my database yet. 

Could you help me understand what type of food this is? For example:
- Is it a snack, main dish, or dessert?
- What are the main ingredients?
- Is it similar to anything I might know (like pizza, pasta, cookies, etc.)?

This will help me give you better recommendations and alternatives! In the meantime, I can provide general healthy eating advice if you'd like.`;
}

// Function to generate response message with decision options
export function generateProductResponse(product: Product): string {
  const { name, calories, cost, currency, alternative } = product;
  
  const response = `${name} is approximately ${calories} kcal and costs $${cost} ${currency} - correct me if I'm wrong! I have a better alternative home cooking idea!

**${alternative.name}**
${alternative.description}

**Nutritional Comparison:**
- Original: ${calories} kcal
- Alternative: ${alternative.calories} kcal (${calories - alternative.calories} kcal saved!)

**Prep Time:** ${alternative.prepTime}

**Recipe:**
${alternative.recipe.map((step, index) => `${index + 1}. ${step}`).join('\n')}

This homemade alternative will satisfy your craving while being much healthier for you!

What would you like to do?`;

  return response;
}

// Function to detect user corrections for calories and price
export function detectCorrection(userInput: string): { calories?: number; price?: number; correctionDetected: boolean } {
  const input = userInput.toLowerCase();
  
  // Patterns for calorie corrections
  const caloriePatterns = [
    /actually.*?(\d+)\s*(?:kcal|cal|calorie)/i,
    /it'?s.*?(\d+)\s*(?:kcal|cal|calorie)/i,
    /more like.*?(\d+)\s*(?:kcal|cal|calorie)/i,
    /around.*?(\d+)\s*(?:kcal|cal|calorie)/i,
    /about.*?(\d+)\s*(?:kcal|cal|calorie)/i,
    /(\d+)\s*(?:kcal|cal|calorie).*?(?:actually|really|more)/i
  ];
  
  // Patterns for price corrections
  const pricePatterns = [
    /actually.*?\$?(\d+(?:\.\d{2})?)/i,
    /it'?s.*?\$?(\d+(?:\.\d{2})?)/i,
    /more like.*?\$?(\d+(?:\.\d{2})?)/i,
    /around.*?\$?(\d+(?:\.\d{2})?)/i,
    /about.*?\$?(\d+(?:\.\d{2})?)/i,
    /costs?.*?\$?(\d+(?:\.\d{2})?)/i,
    /price.*?\$?(\d+(?:\.\d{2})?)/i,
    /\$(\d+(?:\.\d{2})?).*?(?:actually|really|more)/i
  ];
  
  // Check for correction keywords
  const correctionKeywords = [
    'actually', 'wrong', 'incorrect', 'more like', 'really', 'costs more',
    'higher', 'lower', 'expensive', 'cheaper', 'correction', 'correct'
  ];
  
  const hasCorrection = correctionKeywords.some(keyword => input.includes(keyword));
  
  if (!hasCorrection) {
    return { correctionDetected: false };
  }
  
  let calories: number | undefined;
  let price: number | undefined;
  
  // Try to extract calorie correction
  for (const pattern of caloriePatterns) {
    const match = input.match(pattern);
    if (match) {
      calories = parseInt(match[1]);
      break;
    }
  }
  
  // Try to extract price correction
  for (const pattern of pricePatterns) {
    const match = input.match(pattern);
    if (match) {
      price = parseFloat(match[1]);
      break;
    }
  }
  
  return {
    calories,
    price,
    correctionDetected: calories !== undefined || price !== undefined
  };
}

// Function to generate corrected product response
export function generateCorrectedResponse(originalProduct: Product, corrections: { calories?: number; price?: number }): { response: string; correctedProduct: Product } {
  const correctedProduct: Product = {
    ...originalProduct,
    calories: corrections.calories || originalProduct.calories,
    cost: corrections.price || originalProduct.cost
  };
  
  const { name, calories, cost, currency, alternative } = correctedProduct;
  const caloriesSaved = calories - alternative.calories;
  const estimatedIngredientCost = cost * 0.3; // Assume ingredients cost 30% of original
  const moneySaved = cost - estimatedIngredientCost;
  
  let correctionAcknowledgment = "Thanks for the correction! ";
  
  if (corrections.calories && corrections.price) {
    correctionAcknowledgment += `You're right - ${name} is ${calories} kcal and costs $${cost}. `;
  } else if (corrections.calories) {
    correctionAcknowledgment += `You're right - ${name} is ${calories} kcal. `;
  } else if (corrections.price) {
    correctionAcknowledgment += `You're right - ${name} costs $${cost}. `;
  }
  
  const response = `${correctionAcknowledgment}Let me recalculate the benefits of the healthy alternative:

**${alternative.name}**
${alternative.description}

**Updated Nutritional Comparison:**
- Original: ${calories} kcal
- Alternative: ${alternative.calories} kcal (${caloriesSaved} kcal saved!)

**Updated Cost Comparison:**
- Original: $${cost}
- Alternative: ~$${estimatedIngredientCost.toFixed(2)} (estimated ingredient cost)
- Money saved: ~$${moneySaved.toFixed(2)}

**Prep Time:** ${alternative.prepTime}

**Recipe:**
${alternative.recipe.map((step, index) => `${index + 1}. ${step}`).join('\n')}

With these corrected numbers, the homemade alternative is even more beneficial! What would you like to do?`;

  return { response, correctedProduct };
}

// Function to generate decision response based on user choice
export function generateDecisionResponse(choice: 'resist' | 'alternative' | 'original', product: Product): { message: string; caloriesSaved: number; moneySaved: number } {
  const { name, calories, cost, alternative } = product;
  
  switch (choice) {
    case 'resist':
      return {
        message: `Amazing willpower! By resisting the ${name} craving completely, you've saved yourself ${calories} calories and $${cost}. That's fantastic self-control! Your body and wallet will thank you.`,
        caloriesSaved: calories,
        moneySaved: cost
      };
    
    case 'alternative':
      return {
        message: `Great choice! By choosing the ${alternative.name} instead of ${name}, you've saved ${calories - alternative.calories} calories and $${(cost * 0.7).toFixed(2)} (estimated ingredient cost). You're building healthier habits while still satisfying your craving!`,
        caloriesSaved: calories - alternative.calories,
        moneySaved: cost * 0.7 // Assuming homemade costs about 30% of store-bought
      };
    
    case 'original':
      return {
        message: `I understand cravings can be tough to resist! While you chose the original ${name} this time, remember that every small step toward healthier choices counts. Next time, maybe try the ${alternative.name} - it's just as satisfying! Keep working toward your goals.`,
        caloriesSaved: 0,
        moneySaved: 0
      };
    
    default:
      return {
        message: "I didn't quite understand your choice. Could you let me know what you decided to do?",
        caloriesSaved: 0,
        moneySaved: 0
      };
  }
}