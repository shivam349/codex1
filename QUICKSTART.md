# Mithila Makhana - 3D E-Commerce Platform

## Quick Start Guide

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd codex1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   - Navigate to `http://localhost:3000`
   - The website will auto-reload on file changes

## Project Overview

This is a premium 3D e-commerce website built with:
- **Next.js**: Modern React framework
- **Three.js & React Three Fiber**: 3D visualization
- **GSAP**: Scroll animations
- **Tailwind CSS**: Styling

## Key Pages

### Home Page (`/`)
- Hero section with interactive 3D scene
- Product showcase grid
- Special offers display
- Benefits section
- Customer testimonials
- Call-to-action section

### Product Pages (`/product/[productName]`)
- Interactive 3D product viewer
- Detailed product information
- Nutrition facts
- Size and quantity selection
- Customer reviews
- Related products

## File Organization

### Components (`/components`)
- **Navigation.js** - Sticky header navigation
- **HeroSection.js** - Main hero with 3D
- **ProductShowcase.js** - Product grid
- **ProductDetail.js** - Product page content
- **MakhanaScene.js** - Main 3D visualization
- **ProductViewer.js** - Product-specific 3D
- **BenefitsSection.js** - Why choose us
- **TestimonialSection.js** - Reviews section
- **SpecialOffersSection.js** - Promotions
- **CTASection.js** - Call to action
- **Footer.js** - Footer

### Styles (`/app`)
- **globals.css** - Global styles + animations
- **layout.js** - Root layout wrapper

## Animation Framework

### GSAP Scroll Triggers
```javascript
// Example animation
gsap.from(element, {
  scrollTrigger: {
    trigger: element,
    start: 'top 80%',
    scrub: 1 // smooth scrubbing
  },
  opacity: 0,
  y: 30
});
```

### CSS Animations
- Fade effects
- Slide animations
- Glow effects
- Smooth transitions

## 3D Implementation

### Three.js Components
- Custom geometry shapes
- Material properties (phong, standard)
- Lighting (ambient, point lights)
- Sparkle particle effects
- OrbitControls for interaction

### React Three Fiber
- Canvas component for rendering
- useFrame hook for animations
- Drei helpers (Float, OrbitControls, Sparkles)

## Tailwind Configuration

Custom utilities in `tailwind.config.js`:
- Custom colors (amber/orange palette)
- Extended spacing
- Custom shadows

## Development Tips

### Modifying 3D Effects
1. Edit `/components/MakhanaScene.js` for main scene
2. Edit `/components/ProductViewer.js` for product-specific effects
3. Adjust geometry, materials, and lighting

### Changing Colors
Update Tailwind classes throughout components:
- Primary: `from-amber-600 to-orange-500`
- Secondary: `from-orange-400 to-red-400`

### Adding Animations
1. Import GSAP and ScrollTrigger
2. Use refs to target elements
3. Define animation in useEffect

## Build & Deploy

### Production Build
```bash
npm run build
npm start
```

### Performance Optimization
- Next.js automatic code splitting
- Image optimization
- CSS purging by Tailwind
- Lazy loading of components

## Customization Guide

### Add New Product
1. Create product object with details
2. Add route in `/app/product/[product]/page.js`
3. Create custom 3D viewer in `ProductViewer.js`

### Modify Product Grid
Edit `/components/ProductShowcase.js`:
- Update products array
- Adjust card layout
- Modify animations

### Change Color Scheme
1. Update Tailwind colors in classes
2. Modify gradient definitions
3. Update lighting colors in 3D components

## Performance Metrics

- First Contentful Paint (FCP): < 2s
- Interactive (TTI): < 3.5s
- Cumulative Layout Shift (CLS): < 0.1

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS 12+)

## Troubleshooting

### Issue: 3D not rendering
**Solution**: Check WebGL support in browser

### Issue: Animations lag
**Solution**: Reduce particle count, disable scrub effect

### Issue: Build errors
**Solution**: Clear `.next` folder, reinstall dependencies

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Three.js Docs](https://threejs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [GSAP Docs](https://greensock.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Support

For issues and questions, please check the GitHub repository or contact support.

---

**Happy coding!** 🚀
