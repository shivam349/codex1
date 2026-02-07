// Product images with fallback support
export const productImages = {
  classic: {
    primary: 'https://images.unsplash.com/photo-1585707572613-52b94f440404?w=400&h=400&fit=crop&q=80',
    fallback: 'https://via.placeholder.com/400x400?text=Classic+Makhana&bg=e8f4f8'
  },
  masala: {
    primary: 'https://images.unsplash.com/photo-1599599810694-fe5b4c20f7e4?w=400&h=400&fit=crop&q=80',
    fallback: 'https://via.placeholder.com/400x400?text=Masala+Makhana&bg=e8f4f8'
  },
  organic: {
    primary: 'https://images.unsplash.com/photo-1599599810768-a4f7eb6e5b6e?w=400&h=400&fit=crop&q=80',
    fallback: 'https://via.placeholder.com/400x400?text=Premium+Organic&bg=e8f4f8'
  },
  honey: {
    primary: 'https://images.unsplash.com/photo-1599599810453-d8b9e5a0e5f7?w=400&h=400&fit=crop&q=80',
    fallback: 'https://via.placeholder.com/400x400?text=Honey+Makhana&bg=e8f4f8'
  }
};

// Get product image with fallback
export const getProductImage = (productKey, useFallback = false) => {
  const images = productImages[productKey];
  if (!images) return productImages.classic.fallback;
  return useFallback ? images.fallback : images.primary;
};

// Default products with proper makhana images
export const defaultProducts = [
  {
    _id: 1,
    name: 'Classic Makhana',
    price: 499,
    image: productImages.classic.primary,
    imageFallback: productImages.classic.fallback,
    description: 'Pure roasted makhana with natural salt',
    category: 'standard',
    stock: 50,
  },
  {
    _id: 2,
    name: 'Masala Makhana',
    price: 599,
    image: productImages.masala.primary,
    imageFallback: productImages.masala.fallback,
    description: 'Traditional spiced roasted makhana',
    category: 'standard',
    stock: 50,
  },
  {
    _id: 3,
    name: 'Premium Organic',
    price: 799,
    image: productImages.organic.primary,
    imageFallback: productImages.organic.fallback,
    description: 'Certified organic makhana harvested fresh',
    category: 'organic',
    stock: 50,
  },
  {
    _id: 4,
    name: 'Honey Makhana',
    price: 699,
    image: productImages.honey.primary,
    imageFallback: productImages.honey.fallback,
    description: 'Lightly sweetened with natural honey',
    category: 'flavoured',
    stock: 50,
  },
];
