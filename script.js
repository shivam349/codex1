const form = document.querySelector('.newsletter-form');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const emailInput = form.querySelector('input[type="email"]');
  if (emailInput.value.trim()) {
    alert('Thank you for subscribing! You will receive your 10% coupon soon.');
    form.reset();
  }
});
