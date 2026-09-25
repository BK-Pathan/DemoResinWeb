<template>
  <div class="checkout-page">
    <div class="container">

      <!-- ================= BREADCRUMB ================= -->
      <div class="breadcrumb">
        <RouterLink to="/checkout">Cart</RouterLink>
        <span class="separator">→</span>
        <span>Checkout</span>
      </div>

      <div class="page-header">
        <h1>Checkout</h1>
        <p>Almost there — confirm your details and place your order.</p>
      </div>

      <!-- ================= EMPTY CART GUARD ================= -->
      <div v-if="!cart.length && !orderPlaced" class="empty-checkout">
        <div class="empty-icon">◇</div>

        <h2>Your cart is empty</h2>

        <p>
          Add a few handcrafted pieces before checking out.
        </p>

        <RouterLink to="/shop" class="dark-button">
          Explore Collection
        </RouterLink>
      </div>

      <!-- ================= ORDER PLACED ================= -->
      <div v-else-if="orderPlaced" class="order-success">
        <div class="success-icon">✓</div>

        <h2>Order placed successfully</h2>

        <p>
          Thank you, {{ form.firstName || 'friend' }} — we've received your
          order and will reach out shortly to confirm delivery details.
        </p>

        <RouterLink to="/shop" class="dark-button">
          Continue Shopping
        </RouterLink>
      </div>

      <!-- ================= CHECKOUT LAYOUT ================= -->
      <div v-else class="checkout-layout">

        <!-- ================= LEFT: FORM ================= -->
        <section class="checkout-form-card">
          <form @submit.prevent="placeOrder">

            <!-- 01 CONTACT -->
            <div class="form-section">
              <h2>
                <span class="step-no">01</span>
                Contact
              </h2>

              <label class="field">
                <span>Email or mobile phone number</span>

                <input
                  v-model="form.contact"
                  type="text"
                  placeholder="you@example.com"
                  required
                />
              </label>
            </div>

            <!-- 02 DELIVERY ADDRESS -->
            <div class="form-section">
              <h2>
                <span class="step-no">02</span>
                Delivery address
              </h2>

              <label class="field">
                <span>Country/Region</span>

                <div class="select-wrap">
                  <select v-model="form.country">
                    <option>Pakistan</option>
                    <option>United Arab Emirates</option>
                    <option>Saudi Arabia</option>
                    <option>United Kingdom</option>
                    <option>United States</option>
                  </select>

                  <svg
                    class="select-chevron"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </label>

              <div class="field-row">
                <label class="field">
                  <span>First name</span>

                  <input
                    v-model="form.firstName"
                    type="text"
                    required
                  />
                </label>

                <label class="field">
                  <span>Last name (optional)</span>

                  <input
                    v-model="form.lastName"
                    type="text"
                  />
                </label>
              </div>

              <label class="field">
                <span>Address</span>

                <input
                  v-model="form.address"
                  type="text"
                  required
                />
              </label>

              <div class="field-row">
                <label class="field">
                  <span>City</span>

                  <input
                    v-model="form.city"
                    type="text"
                    required
                  />
                </label>

                <label class="field">
                  <span>Postal code (optional)</span>

                  <input
                    v-model="form.postalCode"
                    type="text"
                  />
                </label>
              </div>

              <label class="field">
                <span>Phone</span>

                <input
                  v-model="form.phone"
                  type="tel"
                  required
                />
              </label>
            </div>

            <!-- 03 SHIPPING METHOD -->
            <div class="form-section">
              <h2>
                <span class="step-no">03</span>
                Shipping method
              </h2>

              <label class="option-row is-selected">
                <span class="option-radio">
                  <span class="option-radio-dot"></span>
                </span>

                <span class="option-label">
                  Standard delivery
                </span>

                <span
                  v-if="isFreeDelivery"
                  class="option-value"
                >
                  FREE
                </span>

                <span
                  v-else
                  class="option-value"
                >
                  {{ formatPrice(shipping) }}
                </span>
              </label>
            </div>

            <!-- 04 PAYMENT -->
            <div class="form-section">
              <h2>
                <span class="step-no">04</span>
                Payment
              </h2>

              <p class="section-note">
                All transactions are secure and encrypted.
              </p>

              <label class="option-row is-selected">
                <span class="option-radio">
                  <span class="option-radio-dot"></span>
                </span>

                <span class="option-label">
                  Cash on Delivery (COD)
                </span>
              </label>
            </div>

            <!-- ================= CHECKOUT ACTIONS ================= -->
            <div class="checkout-actions">

              <RouterLink
                to="/checkout"
                class="view-cart-btn"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6" />
                  <circle cx="10" cy="20" r="1.2" />
                  <circle cx="18" cy="20" r="1.2" />
                </svg>

                <span>View Cart</span>
              </RouterLink>

              <button
                type="submit"
                class="place-order-btn"
              >
                Complete order · {{ formatPrice(total) }}
              </button>

            </div>

          </form>
        </section>

        <!-- ================= RIGHT: ORDER SUMMARY ================= -->
        <aside class="order-summary-card">

          <div class="summary-header">
            <h2>Your order</h2>

            <span class="items-badge">
              {{ totalItems }}
              {{ totalItems === 1 ? 'item' : 'items' }}
            </span>
          </div>

          <div class="summary-items">
            <div
              v-for="item in cart"
              :key="item.id"
              class="summary-item"
            >
              <div class="summary-item-image">
                <span class="qty-badge">
                  {{ item.quantity }}
                </span>

                <img
                  :src="item.image"
                  :alt="item.name"
                />
              </div>

              <div class="summary-item-info">
                <h3>{{ item.name }}</h3>

                <span class="summary-item-meta">
                  {{ formatPrice(item.price) }} × {{ item.quantity }}
                </span>
              </div>

              <div class="summary-item-total">
                {{ formatPrice(item.price * item.quantity) }}
              </div>
            </div>
          </div>

          <div class="summary-divider"></div>

          <!-- SUBTOTAL -->
          <div class="summary-row">
            <span>Subtotal</span>

            <strong>
              {{ formatPrice(subtotal) }}
            </strong>
          </div>

          <!-- DELIVERY -->
          <div class="summary-row delivery-row">
            <span>Delivery charges</span>

            <strong
              v-if="isFreeDelivery"
              class="free-text"
            >
              FREE
            </strong>

            <strong
              v-else
              class="delivery-price"
            >
              {{ formatPrice(shipping) }}
            </strong>
          </div>

          <div
            v-if="!isFreeDelivery"
            class="free-delivery-hint"
          >
            Add
            {{ formatPrice(FREE_DELIVERY_THRESHOLD - subtotal) }}
            more for FREE delivery
          </div>

          <div
            v-else
            class="free-delivery-hint is-free"
          >
            ✓ Free delivery unlocked
          </div>

          <div class="summary-divider"></div>

          <!-- TOTAL -->
          <div class="summary-row total-row">
            <span>Total</span>

            <strong>
              {{ formatPrice(total) }}
            </strong>
          </div>

          <div class="cod-note">
            <span class="cod-dot"></span>

            Payable on delivery — Cash on Delivery (COD)
          </div>

        </aside>

      </div>

    </div>
  </div>
</template>


<script setup>
import {
  computed,
  onMounted,
  onUnmounted,
  reactive,
  ref
} from 'vue'

const CART_STORAGE_KEY = 'royal-resin-cart'

/*
 * =====================================================
 * DELIVERY SETTINGS
 * =====================================================
 *
 * Orders below Rs. 10,000:
 *     Rs. 250 delivery
 *
 * Orders Rs. 10,000 or above:
 *     FREE delivery
 */

const FREE_DELIVERY_THRESHOLD = 10000
const DELIVERY_CHARGE = 250

const cart = ref([])

/* =====================================================
   CART
   ===================================================== */

const loadCart = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY)
    const parsed = saved ? JSON.parse(saved) : []

    cart.value = Array.isArray(parsed) ? parsed : []
  } catch {
    cart.value = []
  }
}

const clearCart = () => {
  cart.value = []

  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify([])
  )

  window.dispatchEvent(
    new CustomEvent('royal-cart-updated', {
      detail: []
    })
  )
}

const handleCartUpdate = () => {
  loadCart()
}

onMounted(() => {
  loadCart()

  window.addEventListener(
    'royal-cart-updated',
    handleCartUpdate
  )

  window.addEventListener(
    'storage',
    handleCartUpdate
  )
})

onUnmounted(() => {
  window.removeEventListener(
    'royal-cart-updated',
    handleCartUpdate
  )

  window.removeEventListener(
    'storage',
    handleCartUpdate
  )
})

/* =====================================================
   TOTALS
   ===================================================== */

const totalItems = computed(() =>
  cart.value.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  )
)

const subtotal = computed(() =>
  cart.value.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
      Number(item.quantity || 0),
    0
  )
)

/*
 * Free delivery is unlocked at Rs. 10,000
 */
const isFreeDelivery = computed(() =>
  subtotal.value >= FREE_DELIVERY_THRESHOLD
)

/*
 * Delivery charge:
 *
 * Rs. 10,000 or above = FREE
 * Below Rs. 10,000 = Rs. 250
 */
const shipping = computed(() =>
  isFreeDelivery.value
    ? 0
    : DELIVERY_CHARGE
)

const total = computed(() =>
  subtotal.value + shipping.value
)

function formatPrice(value) {
  return `Rs. ${Math.round(value).toLocaleString()}`
}

/* =====================================================
   FORM
   ===================================================== */

const form = reactive({
  contact: '',
  country: 'Pakistan',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  postalCode: '',
  phone: ''
})

const orderPlaced = ref(false)

/* =====================================================
   PLACE ORDER
   ===================================================== */

function placeOrder() {
  if (!cart.value.length) return

  orderPlaced.value = true

  clearCart()
}
</script>


<style scoped>

/* =====================================================
   PAGE
   ===================================================== */

.checkout-page {
  /* Height of the fixed navbar (88px desktop, 72px on tablet/mobile) */
  --nav-offset: 88px;

  min-height: 100vh;
  background: var(--color-brand-navy-deep);
  color: var(--color-text-primary);
  font-family: var(--font-body);

  /* Clears the fixed navbar, then adds normal page spacing */
  padding: calc(var(--nav-offset) + var(--space-xl)) 0 var(--space-4xl);
}

.container {
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
}

/* =====================================================
   BREADCRUMB
   ===================================================== */

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text-muted);
  font-size: 12px;
  margin-bottom: var(--space-lg);
}

.breadcrumb a {
  color: var(--color-text-muted);
  text-decoration: none;
}

.breadcrumb a:hover {
  color: var(--color-accent-light);
}

.breadcrumb span:last-child {
  color: var(--color-accent-light);
}

.separator {
  opacity: .5;
}

/* =====================================================
   HEADER
   ===================================================== */

.page-header {
  margin-bottom: var(--space-lg);
}

.page-header h1 {
  font-family: var(--font-heading);
  font-size: clamp(32px, 4vw, 46px);
  font-weight: 500;
  margin: 0 0 6px;
  color: var(--color-brand-gold-light);
}

.page-header p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 14px;
}

/* =====================================================
   EMPTY / SUCCESS STATES
   ===================================================== */

.empty-checkout,
.order-success {
  text-align: center;
  padding: 70px 25px;
  background: var(--color-brand-navy-light);
  border: 1px solid var(--color-border-dark);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-soft);
}

.empty-icon {
  color: var(--color-accent);
  font-size: 40px;
  margin-bottom: 10px;
}

.success-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 16px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--color-accent);
  color: var(--color-brand-navy-deep);
  font-size: 22px;
}

.empty-checkout h2,
.order-success h2 {
  font-family: var(--font-heading);
  color: var(--color-text-primary);
  font-weight: 500;
  margin: 0 0 8px;
}

.empty-checkout p,
.order-success p {
  max-width: 420px;
  margin: 0 auto 20px;
  color: var(--color-text-secondary);
  font-size: 13px;
}

.dark-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 25px;
  background: var(--color-button-primary);
  border: 1px solid var(--color-button-primary);
  border-radius: var(--radius-md);
  color: var(--color-button-primary-text);
  font-size: 11px;
  font-weight: 700;
  text-decoration: none;
  transition: .25s ease;
}

.dark-button:hover {
  background: var(--color-button-primary-hover);
}

/* =====================================================
   LAYOUT
   ===================================================== */

.checkout-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 400px;
  gap: var(--space-lg);
  align-items: start;
}

/* =====================================================
   FORM CARD
   ===================================================== */

.checkout-form-card {
  background: var(--color-brand-navy-light);
  border: 1px solid var(--color-border-dark);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-soft);
  padding: var(--space-xl);
}

.form-section {
  padding-bottom: var(--space-xl);
  margin-bottom: var(--space-xl);
  border-bottom: 1px solid var(--color-border-dark-soft);
}

.form-section:last-of-type {
  border-bottom: 0;
  margin-bottom: var(--space-lg);
  padding-bottom: 0;
}

.form-section h2 {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 var(--space-lg);
  font-family: var(--font-heading);
  font-size: 19px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.step-no {
  color: var(--color-accent-light);
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .06em;
}

.section-note {
  margin: -6px 0 var(--space-md);
  color: var(--color-text-muted);
  font-size: 12px;
}

/* =====================================================
   FIELDS
   ===================================================== */

.field {
  display: block;
  margin-bottom: var(--space-md);
}

.field:last-child {
  margin-bottom: 0;
}

.field > span {
  display: block;
  margin-bottom: 7px;
  color: var(--color-text-secondary);
  font-size: 12px;
}

.field input {
  width: 100%;
  min-height: 46px;
  box-sizing: border-box;
  padding: 0 14px;
  border: 1px solid var(--color-border-dark);
  border-radius: var(--radius-md);
  background: var(--color-surface-dark-soft);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  font-size: 13px;
  outline: none;
  transition: border-color .2s ease;
}

.field input:focus {
  border-color: var(--color-accent);
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}

.select-wrap {
  position: relative;
}

.select-wrap select {
  width: 100%;
  min-height: 46px;
  appearance: none;
  -webkit-appearance: none;
  box-sizing: border-box;
  padding: 0 var(--space-2xl) 0 14px;
  border: 1px solid var(--color-border-dark);
  border-radius: var(--radius-md);
  background: var(--color-surface-dark-soft);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  font-size: 13px;
  cursor: pointer;
}

.select-wrap select:focus {
  border-color: var(--color-accent);
}

.select-chevron {
  position: absolute;
  top: 50%;
  right: 14px;
  width: 16px;
  height: 16px;
  fill: none;
  stroke: var(--color-accent-light);
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  transform: translateY(-50%);
  pointer-events: none;
}

/* =====================================================
   OPTION ROWS
   ===================================================== */

.option-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 16px;
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-md);
  background: rgba(212, 166, 74, 0.12);
  cursor: default;
}

.option-radio {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 1px solid var(--color-accent-light);
  display: grid;
  place-items: center;
}

.option-radio-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--color-accent-light);
}

.option-label {
  flex: 1;
  color: var(--color-text-primary);
  font-size: 13px;
  font-weight: 600;
}

.option-value {
  color: var(--color-accent-light);
  font-size: 12px;
  font-weight: 700;
}

/* =====================================================
   CHECKOUT ACTIONS
   ===================================================== */

.checkout-actions {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 10px;
}

.view-cart-btn {
  flex: 0 0 auto;
  width: auto;
  min-height: 46px;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 20px;
  border: 1px solid var(--color-border-dark);
  border-radius: var(--radius-md);
  background: var(--color-surface-dark-soft);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  transition: .25s ease;
}

.view-cart-btn svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.view-cart-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent-light);
  background: var(--color-brand-navy);
}

/* =====================================================
   SUBMIT
   ===================================================== */

.place-order-btn {
  flex: 1;
  width: auto;
  min-height: 50px;
  border: 1px solid var(--color-button-primary);
  border-radius: var(--radius-md);
  background: var(--color-button-primary);
  color: var(--color-button-primary-text);
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: .25s ease;
}

.place-order-btn:hover {
  background: var(--color-button-primary-hover);
  box-shadow: var(--shadow-gold);
  transform: translateY(-1px);
}

/* =====================================================
   ORDER SUMMARY CARD
   ===================================================== */

.order-summary-card {
  position: sticky;

  /* stays below the fixed navbar while scrolling */
  top: 100px;

  background: var(--color-brand-navy-light);
  border: 1px solid var(--color-border-dark);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-card);
  padding: var(--space-xl);
}

.summary-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-lg);
}

.summary-header h2 {
  margin: 0;
  font-family: var(--font-heading);
  font-size: 22px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.items-badge {
  padding: 5px 10px;
  border-radius: 50px;
  background: var(--color-surface-dark-soft);
  color: var(--color-accent-light);
  font-size: 11px;
  font-weight: 700;
}

/* =====================================================
   SUMMARY ITEMS
   ===================================================== */

.summary-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  max-height: 340px;
  overflow-y: auto;
  padding-right: 4px;
}

.summary-item {
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
}

.summary-item-image {
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-surface-dark-soft);
  border: 1px solid var(--color-border-dark);
  flex-shrink: 0;
}

.summary-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.qty-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  z-index: 2;
  width: 20px;
  height: 20px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--color-accent);
  color: var(--color-brand-navy-deep);
  font-size: 10px;
  font-weight: 700;
  border: 2px solid var(--color-brand-navy-light);
}

.summary-item-info {
  min-width: 0;
}

.summary-item-info h3 {
  margin: 0 0 3px;
  font-family: var(--font-heading);
  font-size: 13.5px;
  font-weight: 600;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.summary-item-meta {
  color: var(--color-text-muted);
  font-size: 11px;
}

.summary-item-total {
  color: var(--color-text-primary);
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
}

/* =====================================================
   TOTALS
   ===================================================== */

.summary-divider {
  height: 1px;
  background: var(--color-border-dark-soft);
  margin: var(--space-lg) 0;
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.delivery-row {
  margin-top: var(--space-sm);
}

.free-text {
  color: var(--color-accent-light);
}

.delivery-price {
  color: var(--color-text-primary);
}

.free-delivery-hint {
  margin-top: 8px;
  color: var(--color-text-muted);
  font-size: 10.5px;
  text-align: right;
}

.free-delivery-hint.is-free {
  color: var(--color-accent-light);
  font-weight: 600;
}

.total-row span {
  color: var(--color-text-primary);
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 600;
}

.total-row strong {
  color: var(--color-accent-light);
  font-size: 18px;
}

.cod-note {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: var(--space-lg);
  padding: 12px 14px;
  border-radius: var(--radius-md);
  background: rgba(212, 166, 74, 0.1);
  color: var(--color-text-secondary);
  font-size: 11.5px;
}

.cod-dot {
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--color-accent-light);
}

/* =====================================================
   NAVBAR SWITCHES TO MOBILE HEIGHT
   ===================================================== */

@media (max-width: 900px) {
  .checkout-page {
    --nav-offset: 72px;
  }

  .order-summary-card {
    top: 84px;
  }
}

/* =====================================================
   TABLET
   ===================================================== */

@media (max-width: 950px) {
  .checkout-layout {
    grid-template-columns: 1fr;
  }

  .order-summary-card {
    position: static;
  }
}

/* =====================================================
   MOBILE
   ===================================================== */

@media (max-width: 650px) {
  .container {
    width: min(100% - 28px, 1180px);
  }

  .checkout-form-card,
  .order-summary-card {
    padding: var(--space-lg);
  }

  .field-row {
    grid-template-columns: 1fr;
  }

  .page-header h1 {
    font-size: 30px;
  }
}

/* =====================================================
   SMALL MOBILE — stack the action buttons
   ===================================================== */

@media (max-width: 420px) {
  .checkout-actions {
    flex-direction: column;
  }

  .view-cart-btn {
    width: 100%;
  }
}

</style>