let cart = [];

const cartModal = document.getElementById('cartModal');
const openCartBtn = document.getElementById('openCart');
const closeCartBtn = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

openCartBtn.addEventListener('click', () => cartModal.classList.add('active'));
closeCartBtn.addEventListener('click', () => cartModal.classList.remove('active'));

cartModal.addEventListener('click', (e) => {
  if (e.target === cartModal) cartModal.classList.remove('active');
});

function addToCart(name, price) {
  const index = cart.findIndex(item => item.name === name);
  if (index > -1) {
    cart[index].qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  updateCartUI();
  cartModal.classList.add('active');
}

function updateCartUI() {
  let count = 0;
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p style="text-align: center; color: #6b7280; font-weight: 700;">YOUR BAG IS EMPTY.</p>';
  } else {
    cartItemsContainer.innerHTML = cart.map(item => {
      count += item.qty;
      total += item.price * item.qty;
      return `
        <div class="cart-row">
          <div>
            <strong>${item.name}</strong><br>
            <small>Rs. ${item.price.toLocaleString()} x ${item.qty}</small>
          </div>
          <div><strong style="color: #ff3300;">Rs. ${(item.price * item.qty).toLocaleString()}</strong></div>
        </div>
      `;
    }).join('');
  }

  cartCount.innerText = count;
  cartTotal.innerText = `RS. ${total.toLocaleString()}`;
}

function checkoutWhatsApp() {
  if (cart.length === 0) {
    alert('PLEASE ADD ITEMS TO YOUR BAG FIRST.');
    return;
  }

  let text = "Greetings KULTUR KIN.!\n\nI want to place an order for the following items:\n\n";
  let total = 0;

  cart.forEach(item => {
    text += `• ${item.name} (${item.qty}x) = Rs. ${(item.price * item.qty).toLocaleString()}\n`;
    total += item.price * item.qty;
  });

  text += `\nGRAND TOTAL: Rs. ${total.toLocaleString()}`;
  window.open(`https://wa.me/923249544172?text=${encodeURIComponent(text)}`, '_blank');
}

function calculateSize() {
  const h = parseInt(document.getElementById('calcHeight').value) || 175;
  const style = document.getElementById('calcStyle').value;
  let rec = "MEDIUM (M)";

  if (h < 165) rec = style === 'oversized' ? "MEDIUM (M)" : "SMALL (S)";
  else if (h <= 178) rec = style === 'oversized' ? "LARGE (L)" : "MEDIUM (M)";
  else rec = "EXTRA LARGE (XL)";

  document.getElementById('sizeOutput').innerHTML = `RECOMMENDED: <strong>${rec}</strong>`;
}

function postReview() {
  const name = document.getElementById('revName').value.trim();
  const text = document.getElementById('revText').value.trim();
  const stars = document.getElementById('revStars').value;

  if (!name || !text) {
    alert('Please complete all fields.');
    return;
  }

  const grid = document.getElementById('reviewsGrid');
  const card = document.createElement('div');
  card.className = 'review-card';
  card.innerHTML = `
    <div class="stars">${'⭐'.repeat(stars)}</div>
    <p class="comment">"${text}"</p>
    <div class="user">
      <strong>${name.toUpperCase()}</strong>
      <span class="verified"><i class="fa-solid fa-circle-check"></i> Verified Community Review</span>
    </div>
  `;

  grid.prepend(card);
  document.getElementById('revName').value = '';
  document.getElementById('revText').value = '';
  alert('Review posted live!');
}

function toggleFaq(el) {
  const item = el.parentElement;
  item.classList.toggle('active');
  const icon = el.querySelector('i');
  icon.className = item.classList.contains('active') ? 'fa-solid fa-minus' : 'fa-solid fa-plus';
}