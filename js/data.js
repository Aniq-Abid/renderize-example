// cached data fetched from 'https://dummyjson.com/products'
const data = {
  "products": [
    {
      "id": 1,
      "title": "Essence Mascara Lash Princess",
      "category": "beauty",
      "price": 9.99,
      "discountPercentage": 7.17,
      "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
      "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
      "brand": "Essence"
    },
    {
      "id": 2,
      "title": "Eyeshadow Palette with Mirror",
      "category": "beauty",
      "price": 19.99,
      "discountPercentage": 5.5,
      "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png",
      "description": "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
      "brand": "Glamour Beauty"
    },
    {
      "id": 3,
      "title": "Powder Canister",
      "category": "beauty",
      "price": 14.99,
      "discountPercentage": 18.14,
      "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png",
      "description": "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
      "brand": "Velvet Touch"
    },
    {
      "id": 4,
      "title": "Red Lipstick",
      "category": "beauty",
      "price": 12.99,
      "discountPercentage": 19.03,
      "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png",
      "description": "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
      "brand": "Chic Cosmetics"
    },
    {
      "id": 5,
      "title": "Red Nail Polish",
      "category": "beauty",
      "price": 8.99,
      "discountPercentage": 2.46,
      "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png",
      "description": "The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.",
      "brand": "Nail Couture"
    },
    {
      "id": 6,
      "title": "Calvin Klein CK One",
      "category": "fragrances",
      "price": 49.99,
      "discountPercentage": 0.32,
      "thumbnail": "https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/thumbnail.png",
      "description": "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
      "brand": "Calvin Klein"
    },
    {
      "id": 7,
      "title": "Chanel Coco Noir Eau De",
      "category": "fragrances",
      "price": 129.99,
      "discountPercentage": 18.64,
      "thumbnail": "https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/thumbnail.png",
      "description": "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
      "brand": "Chanel"
    },
    {
      "id": 8,
      "title": "Dior J'adore",
      "category": "fragrances",
      "price": 89.99,
      "discountPercentage": 17.44,
      "thumbnail": "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/thumbnail.png",
      "description": "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
      "brand": "Dior"
    },
    {
      "id": 9,
      "title": "Dolce Shine Eau de",
      "category": "fragrances",
      "price": 69.99,
      "discountPercentage": 11.47,
      "thumbnail": "https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/thumbnail.png",
      "description": "Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It's a joyful and youthful scent.",
      "brand": "Dolce & Gabbana"
    },
    {
      "id": 10,
      "title": "Gucci Bloom Eau de",
      "category": "fragrances",
      "price": 79.99,
      "discountPercentage": 8.9,
      "thumbnail": "https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/thumbnail.png",
      "description": "Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It's a modern and romantic scent.",
      "brand": "Gucci"
    },
    {
      "id": 11,
      "title": "Annibale Colombo Bed",
      "category": "furniture",
      "price": 1899.99,
      "discountPercentage": 0.29,
      "thumbnail": "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/thumbnail.png",
      "description": "The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.",
      "brand": "Annibale Colombo"
    },
    {
      "id": 12,
      "title": "Annibale Colombo Sofa",
      "category": "furniture",
      "price": 2499.99,
      "discountPercentage": 18.54,
      "thumbnail": "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/thumbnail.png",
      "description": "The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.",
      "brand": "Annibale Colombo"
    },
    {
      "id": 13,
      "title": "Bedside Table African Cherry",
      "category": "furniture",
      "price": 299.99,
      "discountPercentage": 9.58,
      "thumbnail": "https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/thumbnail.png",
      "description": "The Bedside Table in African Cherry is a stylish and functional addition to your bedroom, providing convenient storage space and a touch of elegance.",
      "brand": "Furniture Co."
    },
    {
      "id": 14,
      "title": "Knoll Saarinen Executive Conference Chair",
      "category": "furniture",
      "price": 499.99,
      "discountPercentage": 15.23,
      "thumbnail": "https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/thumbnail.png",
      "description": "The Knoll Saarinen Executive Conference Chair is a modern and ergonomic chair, perfect for your office or conference room with its timeless design.",
      "brand": "Knoll"
    },
    {
      "id": 15,
      "title": "Wooden Bathroom Sink With Mirror",
      "category": "furniture",
      "price": 799.99,
      "discountPercentage": 11.22,
      "thumbnail": "https://cdn.dummyjson.com/products/images/furniture/Wooden%20Bathroom%20Sink%20With%20Mirror/thumbnail.png",
      "description": "The Wooden Bathroom Sink with Mirror is a unique and stylish addition to your bathroom, featuring a wooden sink countertop and a matching mirror.",
      "brand": "Bath Trends"
    },
    {
      "id": 16,
      "title": "Apple",
      "category": "groceries",
      "price": 1.99,
      "discountPercentage": 1.97,
      "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Apple/thumbnail.png",
      "description": "Fresh and crisp apples, perfect for snacking or incorporating into various recipes."
    },
    {
      "id": 17,
      "title": "Beef Steak",
      "category": "groceries",
      "price": 12.99,
      "discountPercentage": 17.99,
      "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Beef%20Steak/thumbnail.png",
      "description": "High-quality beef steak, great for grilling or cooking to your preferred level of doneness."
    },
    {
      "id": 18,
      "title": "Cat Food",
      "category": "groceries",
      "price": 8.99,
      "discountPercentage": 9.57,
      "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Cat%20Food/thumbnail.png",
      "description": "Nutritious cat food formulated to meet the dietary needs of your feline friend."
    },
    {
      "id": 19,
      "title": "Chicken Meat",
      "category": "groceries",
      "price": 9.99,
      "discountPercentage": 10.46,
      "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Chicken%20Meat/thumbnail.png",
      "description": "Fresh and tender chicken meat, suitable for various culinary preparations."
    },
    {
      "id": 20,
      "title": "Cooking Oil",
      "category": "groceries",
      "price": 4.99,
      "discountPercentage": 18.89,
      "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Cooking%20Oil/thumbnail.png",
      "description": "Versatile cooking oil suitable for frying, sautéing, and various culinary applications."
    },
    {
      "id": 21,
      "title": "Cucumber",
      "category": "groceries",
      "price": 1.49,
      "discountPercentage": 11.44,
      "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Cucumber/thumbnail.png",
      "description": "Crisp and hydrating cucumbers, ideal for salads, snacks, or as a refreshing side."
    },
    {
      "id": 22,
      "title": "Dog Food",
      "category": "groceries",
      "price": 10.99,
      "discountPercentage": 18.15,
      "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Dog%20Food/thumbnail.png",
      "description": "Specially formulated dog food designed to provide essential nutrients for your canine companion."
    },
    {
      "id": 23,
      "title": "Eggs",
      "category": "groceries",
      "price": 2.99,
      "discountPercentage": 5.8,
      "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Eggs/thumbnail.png",
      "description": "Fresh eggs, a versatile ingredient for baking, cooking, or breakfast."
    },
    {
      "id": 24,
      "title": "Fish Steak",
      "category": "groceries",
      "price": 14.99,
      "discountPercentage": 7,
      "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Fish%20Steak/thumbnail.png",
      "description": "Quality fish steak, suitable for grilling, baking, or pan-searing."
    },
    {
      "id": 25,
      "title": "Green Bell Pepper",
      "category": "groceries",
      "price": 1.29,
      "discountPercentage": 15.5,
      "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Green%20Bell%20Pepper/thumbnail.png",
      "description": "Fresh and vibrant green bell pepper, perfect for adding color and flavor to your dishes."
    },
    {
      "id": 26,
      "title": "Green Chili Pepper",
      "category": "groceries",
      "price": 0.99,
      "discountPercentage": 18.51,
      "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Green%20Chili%20Pepper/thumbnail.png",
      "description": "Spicy green chili pepper, ideal for adding heat to your favorite recipes."
    },
    {
      "id": 27,
      "title": "Honey Jar",
      "category": "groceries",
      "price": 6.99,
      "discountPercentage": 1.91,
      "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Honey%20Jar/thumbnail.png",
      "description": "Pure and natural honey in a convenient jar, perfect for sweetening beverages or drizzling over food."
    },
    {
      "id": 28,
      "title": "Ice Cream",
      "category": "groceries",
      "price": 5.49,
      "discountPercentage": 7.58,
      "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Ice%20Cream/thumbnail.png",
      "description": "Creamy and delicious ice cream, available in various flavors for a delightful treat."
    },
    {
      "id": 29,
      "title": "Juice",
      "category": "groceries",
      "price": 3.99,
      "discountPercentage": 5.45,
      "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Juice/thumbnail.png",
      "description": "Refreshing fruit juice, packed with vitamins and great for staying hydrated."
    },
    {
      "id": 30,
      "title": "Kiwi",
      "category": "groceries",
      "price": 2.49,
      "discountPercentage": 10.32,
      "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Kiwi/thumbnail.png",
      "description": "Nutrient-rich kiwi, perfect for snacking or adding a tropical twist to your dishes."
    },
    {
      "id": 1,
      "title": "Essence Mascara Lash Princess",
      "category": "beauty",
      "price": 9.99,
      "discountPercentage": 7.17,
      "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
      "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
      "brand": "Essence"
    },
    {
      "id": 2,
      "title": "Eyeshadow Palette with Mirror",
      "category": "beauty",
      "price": 19.99,
      "discountPercentage": 5.5,
      "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png",
      "description": "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
      "brand": "Glamour Beauty"
    },
    {
      "id": 3,
      "title": "Powder Canister",
      "category": "beauty",
      "price": 14.99,
      "discountPercentage": 18.14,
      "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png",
      "description": "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
      "brand": "Velvet Touch"
    },
    {
      "id": 4,
      "title": "Red Lipstick",
      "category": "beauty",
      "price": 12.99,
      "discountPercentage": 19.03,
      "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png",
      "description": "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
      "brand": "Chic Cosmetics"
    },
    {
      "id": 5,
      "title": "Red Nail Polish",
      "category": "beauty",
      "price": 8.99,
      "discountPercentage": 2.46,
      "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png",
      "description": "The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.",
      "brand": "Nail Couture"
    },
    {
      "id": 6,
      "title": "Calvin Klein CK One",
      "category": "fragrances",
      "price": 49.99,
      "discountPercentage": 0.32,
      "thumbnail": "https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/thumbnail.png",
      "description": "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
      "brand": "Calvin Klein"
    },
    {
      "id": 7,
      "title": "Chanel Coco Noir Eau De",
      "category": "fragrances",
      "price": 129.99,
      "discountPercentage": 18.64,
      "thumbnail": "https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/thumbnail.png",
      "description": "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
      "brand": "Chanel"
    },
    {
      "id": 8,
      "title": "Dior J'adore",
      "category": "fragrances",
      "price": 89.99,
      "discountPercentage": 17.44,
      "thumbnail": "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/thumbnail.png",
      "description": "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
      "brand": "Dior"
    },
    {
      "id": 9,
      "title": "Dolce Shine Eau de",
      "category": "fragrances",
      "price": 69.99,
      "discountPercentage": 11.47,
      "thumbnail": "https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/thumbnail.png",
      "description": "Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It's a joyful and youthful scent.",
      "brand": "Dolce & Gabbana"
    },
    {
      "id": 10,
      "title": "Gucci Bloom Eau de",
      "category": "fragrances",
      "price": 79.99,
      "discountPercentage": 8.9,
      "thumbnail": "https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/thumbnail.png",
      "description": "Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It's a modern and romantic scent.",
      "brand": "Gucci"
    }
  ],
  "total": 194,
  "skip": 0,
  "limit": 30
}
export default data