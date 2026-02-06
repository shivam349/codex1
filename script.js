// Newsletter form handler
const form = document.querySelector('.newsletter-form');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const emailInput = form.querySelector('input[type="email"]');
  if (emailInput.value.trim()) {
    alert('Thank you for subscribing! You will receive your 10% coupon soon.');
    form.reset();
  }
});

// Fetch and display products from API
fetch("http://localhost:5000/api/products")
  .then(res => res.json())
  .then(data => {
    console.log('Products loaded:', data);

    const container = document.getElementById("products");

    if (data.length === 0) {
      container.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No products available yet. Add products via the admin panel.</p>';
      return;
    }

    data.forEach(p => {
      container.innerHTML += `
        <article class="product-card">
          <img src="${p.image}" alt="${p.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <span class="price">₹${p.price}</span>
          <button class="btn btn-primary">Add to Cart</button>
        </article>
      `;
    });
  })
  .catch(error => {
    console.error('Error loading products:', error);
    const container = document.getElementById("products");
    container.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: red;">Failed to load products. Make sure the backend server is running on port 5000.</p>';
  });
