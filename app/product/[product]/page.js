import Navigation from '@/components/Navigation';
import ProductDetail from '@/components/ProductDetail';
import Footer from '@/components/Footer';

const products = {
  classic: {
    id: 1,
    name: 'Classic Makhana',
    price: 499,
    originalPrice: 599,
    rating: 4.8,
    reviews: 245,
    description: 'Pure roasted makhana with natural salt. Experience the authentic taste of Mithila with our classic collection.',
    features: [
      'Lightly roasted to perfection',
      'Natural Himalayan salt',
      '100% organic, no pesticides',
      'High in protein and calcium',
      'Crunchy and delightful taste',
      'Vacuum sealed for freshness'
    ],
    nutritionFacts: {
      caloriesPer100g: 347,
      protein: 14.5,
      fat: 3.2,
      carbs: 63.1,
      fiber: 4.2
    },
    color: '#f59e0b',
    availableSizes: [
      { size: '250g', price: 299 },
      { size: '500g', price: 499 },
      { size: '1kg', price: 899 },
      { size: '2kg', price: 1699 }
    ]
  },
  masala: {
    id: 2,
    name: 'Masala Makhana',
    price: 599,
    originalPrice: 699,
    rating: 4.9,
    reviews: 312,
    description: 'Traditional spiced roasted makhana with an authentic blend of Indian spices. Perfect for those who love bold flavors.',
    features: [
      'Aromatic spice blend',
      'Traditional recipe',
      'Low fat content',
      'No artificial flavors',
      'Rich in antioxidants',
      'Perfectly spiced'
    ],
    nutritionFacts: {
      caloriesPer100g: 360,
      protein: 15.2,
      fat: 3.8,
      carbs: 62.5,
      fiber: 4.1
    },
    color: '#f97316',
    availableSizes: [
      { size: '250g', price: 349 },
      { size: '500g', price: 599 },
      { size: '1kg', price: 999 },
      { size: '2kg', price: 1899 }
    ]
  },
  premium: {
    id: 3,
    name: 'Premium Organic',
    price: 799,
    originalPrice: 999,
    rating: 5.0,
    reviews: 189,
    description: 'Certified organic makhana harvested fresh from the pristine wetlands of Mithila. Premium quality assurance.',
    features: [
      'Certified organic',
      'Direct from farmers',
      'Premium selection',
      'Vacuum sealed',
      'Farm fresh quality',
      'Zero pesticides'
    ],
    nutritionFacts: {
      caloriesPer100g: 342,
      protein: 16.1,
      fat: 2.9,
      carbs: 64.2,
      fiber: 4.5
    },
    color: '#fb923c',
    availableSizes: [
      { size: '250g', price: 449 },
      { size: '500g', price: 799 },
      { size: '1kg', price: 1299 },
      { size: '2kg', price: 2199 }
    ]
  }
};

export default function ProductPage({ params }) {
  const productKey = params?.product || 'classic';
  const product = products[productKey] || products.classic;

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ProductDetail product={product} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
