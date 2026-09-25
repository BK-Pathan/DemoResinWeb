```vue
<script setup lang="ts">

import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  watch
} from 'vue'

/* =========================================================
   SETTINGS
   ========================================================= */

const CART_STORAGE_KEY = 'royal-resin-cart'

/* =========================================================
   TYPES
   ========================================================= */

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

/* =========================================================
   STATE
   ========================================================= */

const isOpen = ref(false)
const cartItems = ref<CartItem[]>([])

/* =========================================================
   CART LOAD / SAVE
   ========================================================= */

const loadCart = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY)
    const parsed = saved ? JSON.parse(saved) : []

    cartItems.value = Array.isArray(parsed) ? parsed : []
  } catch {
    cartItems.value = []
  }
}

const saveCart = () => {
  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify(cartItems.value)
  )

  window.dispatchEvent(
    new CustomEvent('royal-cart-updated', {
      detail: cartItems.value
    })
  )
}

/* =========================================================
   COMPUTED
   ========================================================= */

const cartCount = computed(() => {
  return cartItems.value.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  )
})

const subtotal = computed(() => {
  return cartItems.value.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  )
})

const formatPrice = (value: number) => {
  return `Rs ${Number(value).toLocaleString()}`
}

/* =========================================================
   CART ACTIONS
   ========================================================= */

const increaseQuantity = (id: string) => {
  const item = cartItems.value.find(
    item => item.id === id
  )

  if (!item) return

  item.quantity += 1
  saveCart()
}

const decreaseQuantity = (id: string) => {
  const item = cartItems.value.find(
    item => item.id === id
  )

  if (!item) return

  if (item.quantity > 1) {
    item.quantity -= 1
  } else {
    cartItems.value = cartItems.value.filter(
      item => item.id !== id
    )
  }

  saveCart()
}

const removeItem = (id: string) => {
  cartItems.value = cartItems.value.filter(
    item => item.id !== id
  )

  saveCart()
}

const clearCart = () => {
  cartItems.value = []
  saveCart()
}

/* =========================================================
   OPEN / CLOSE

   The navbar cart icon opens this drawer by dispatching
   the "royal-cart-open" window event.
   ========================================================= */

const open = () => {
  loadCart()
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
}

/* =========================================================
   EVENT HANDLERS
   ========================================================= */

const handleOpenRequest = () => {
  open()
}

const handleCartUpdate = () => {
  loadCart()
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    close()
  }
}

/* =========================================================
   BODY SCROLL LOCK
   ========================================================= */

watch(isOpen, open => {
  document.body.style.overflow = open
    ? 'hidden'
    : ''
})

/* =========================================================
   LIFECYCLE
   ========================================================= */

onMounted(() => {
  loadCart()

  window.addEventListener(
    'royal-cart-open',
    handleOpenRequest
  )

  window.addEventListener(
    'royal-cart-updated',
    handleCartUpdate
  )

  window.addEventListener(
    'storage',
    handleCartUpdate
  )

  window.addEventListener(
    'keydown',
    handleKeydown
  )
})

onUnmounted(() => {
  window.removeEventListener(
    'royal-cart-open',
    handleOpenRequest
  )

  window.removeEventListener(
    'royal-cart-updated',
    handleCartUpdate
  )

  window.removeEventListener(
    'storage',
    handleCartUpdate
  )

  window.removeEventListener(
    'keydown',
    handleKeydown
  )

  document.body.style.overflow = ''
})

</script>

<template>

  <Teleport to="body">

    <!-- OVERLAY -->
    <div
      class="cart-overlay"
      :class="{ 'is-open': isOpen }"
      @click="close"
    ></div>

    <!-- DRAWER -->
    <aside
      class="cart-drawer"
      :class="{ 'is-open': isOpen }"
      aria-label="Shopping cart"
      :aria-hidden="!isOpen"
    >

      <!-- HEADER -->
      <div class="drawer-header">

        <div class="drawer-header-content">

          <span class="drawer-eyebrow">
            YOUR SELECTION
          </span>

          <h2>
            Cart

            <span v-if="cartCount">
              ({{ cartCount }})
            </span>
          </h2>

        </div>

        <div class="drawer-header-actions">

          <button
            v-if="cartItems.length"
            type="button"
            class="clear-cart"
            @click="clearCart"
          >
            Clear Cart
          </button>

          <button
            type="button"
            class="drawer-close"
            aria-label="Close cart"
            @click="close"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>

        </div>

      </div>

      <!-- EMPTY STATE -->
      <div
        v-if="cartItems.length === 0"
        class="drawer-empty"
      >

        <div class="empty-icon">

          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M6 8h12l-1 11H7L6 8Z" />
            <path d="M9 8a3 3 0 0 1 6 0" />
          </svg>

        </div>

        <h3>
          Nothing here yet
        </h3>

        <p>
          Explore our handmade resin collection and add
          something beautiful to your cart.
        </p>

        <RouterLink
          to=""
          class="continue-shopping"
          @click="close"
        >
          Continue Shopping
        </RouterLink>

      </div>

      <!-- ITEMS -->
      <template v-else>

        <div class="drawer-items">

          <article
            v-for="item in cartItems"
            :key="item.id"
            class="drawer-item"
          >

            <div class="drawer-item-image">
              <img
                :src="item.image"
                :alt="item.name"
              />
            </div>

            <div class="drawer-item-info">

              <h3>
                {{ item.name }}
              </h3>

              <span class="drawer-item-price">
                {{ formatPrice(item.price) }}
              </span>

              <div class="quantity-control">

                <button
                  type="button"
                  aria-label="Decrease quantity"
                  @click="decreaseQuantity(item.id)"
                >
                  −
                </button>

                <span>
                  {{ item.quantity }}
                </span>

                <button
                  type="button"
                  aria-label="Increase quantity"
                  @click="increaseQuantity(item.id)"
                >
                  +
                </button>

              </div>

            </div>

            <div class="drawer-item-side">

              <span class="drawer-item-total">
                {{
                  formatPrice(
                    item.price * item.quantity
                  )
                }}
              </span>

              <button
                type="button"
                class="remove-item"
                aria-label="Remove item"
                @click="removeItem(item.id)"
              >

                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M4 7h16" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M6 7l1 13h10l1-13" />
                  <path d="M9 7l1-3h4l1 3" />
                </svg>

              </button>

            </div>

          </article>

        </div>

        <!-- FOOTER -->
        <div class="drawer-footer">

          <div class="summary-row">

            <span>
              Subtotal
            </span>

            <strong>
              {{ formatPrice(subtotal) }}
            </strong>

          </div>

          <p class="checkout-note">
            Shipping and final order details will be
            confirmed during checkout.
          </p>

          <RouterLink
            to=""
            class="checkout-button"
            @click="close"
          >

            Checkout

            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>

          </RouterLink>

          <RouterLink
            to=""
            class="continue-shopping-link"
            @click="close"
          >
            Continue Shopping
          </RouterLink>

        </div>

      </template>

    </aside>

  </Teleport>

</template>

<style scoped>

/* =========================================================
   OVERLAY
   ========================================================= */

.cart-overlay {
  position: fixed;
  inset: 0;
  z-index: 998;

  background: rgba(0, 0, 0, 0.55);

  opacity: 0;
  visibility: hidden;

  transition:
    opacity 0.3s ease,
    visibility 0s linear 0.3s;
}

.cart-overlay.is-open {
  opacity: 1;
  visibility: visible;

  transition:
    opacity 0.3s ease,
    visibility 0s;
}

/* =========================================================
   DRAWER
   ========================================================= */

.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;

  z-index: 999;

  width: min(420px, 100vw);

  display: flex;
  flex-direction: column;

  background: var(--color-bg-dark);
  color: var(--color-text-primary);

  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.35);

  transform: translateX(100%);

  transition: transform 0.35s ease;
}

.cart-drawer.is-open {
  transform: translateX(0);
}

/* =========================================================
   HEADER
   ========================================================= */

.drawer-header {
  flex-shrink: 0;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: var(--space-md);

  padding:
    var(--space-xl)
    var(--space-lg)
    var(--space-lg);

  border-bottom:
    1px solid
    var(--color-border-dark-soft);
}

.drawer-header-content {
  min-width: 0;
}

.drawer-eyebrow {
  display: block;

  margin-bottom: var(--space-xs);

  color: var(--color-accent);

  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 600;

  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.drawer-header h2 {
  margin: 0;

  color: var(--color-text-primary);

  font-family: var(--font-heading);
  font-size: 26px;
  font-weight: 500;
}

.drawer-header h2 span {
  color: var(--color-text-muted);
  font-size: 16px;
}

.drawer-header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-sm);

  flex-shrink: 0;
}

.clear-cart {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 32px;
  padding: 0 var(--space-sm);

  background: var(--color-brand-gold-dark);
  border: 1px solid var(--color-brand-gold-dark);
  border-radius: 50px;

  color: var(--color-button-primary-text);

  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;

  white-space: nowrap;
  cursor: pointer;

  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.clear-cart:hover {
  background: var(--color-button-primary-hover);
  border-color: var(--color-button-primary-hover);
  color: var(--color-button-primary-text);

  transform: translateY(-1px);
}

.clear-cart:focus-visible {
  outline: 2px solid var(--color-accent-light);
  outline-offset: 2px;
}
.drawer-close {
  width: 36px;
  height: 36px;

  flex-shrink: 0;

  display: grid;
  place-items: center;

  background: transparent;
  border: 0;
  border-radius: 50%;

  color: var(--color-icon-light);

  cursor: pointer;

  transition:
    color 0.25s ease,
    background 0.25s ease;
}

.drawer-close:hover {
  color: var(--color-accent-light);
  background: var(--color-border-dark-soft);
}

.drawer-close:focus-visible {
  outline: 2px solid var(--color-accent-light);
  outline-offset: 2px;
}

.drawer-close svg {
  width: 18px;
  height: 18px;

  fill: none;
  stroke: currentColor;

  stroke-width: 1.6;

  stroke-linecap: round;
  stroke-linejoin: round;
}

/* =========================================================
   EMPTY STATE
   ========================================================= */

.drawer-empty {
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;

  padding:
    var(--space-2xl)
    var(--space-lg);
}

.empty-icon {
  width: 60px;
  height: 60px;

  margin-bottom: var(--space-lg);

  display: grid;
  place-items: center;

  border:
    1px solid
    var(--color-border-dark);

  border-radius: 50%;

  color: var(--color-accent);
}

.empty-icon svg {
  width: 26px;
  height: 26px;

  fill: none;
  stroke: currentColor;

  stroke-width: 1.5;

  stroke-linecap: round;
  stroke-linejoin: round;
}

.drawer-empty h3 {
  margin:
    0
    0
    var(--space-sm);

  color: var(--color-text-primary);

  font-family: var(--font-heading);
  font-size: 24px;
  font-weight: 500;
}

.drawer-empty p {
  max-width: 280px;

  margin:
    0
    0
    var(--space-xl);

  color: var(--color-text-secondary);

  font-family: var(--font-body);
  font-size: 13px;
  line-height: 1.7;
}

.continue-shopping {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  min-height: 44px;

  padding:
    0
    var(--space-lg);

  background: var(--color-button-primary);

  border:
    1px solid
    var(--color-button-primary);

  border-radius: var(--radius-md);

  color: var(--color-button-primary-text);

  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;

  text-decoration: none;

  transition:
    background 0.25s ease,
    transform 0.25s ease;
}

.continue-shopping:hover {
  background: var(--color-button-primary-hover);
  transform: translateY(-2px);
}

/* =========================================================
   ITEMS
   ========================================================= */

.drawer-items {
  flex: 1;

  min-height: 0;

  overflow-y: auto;

  padding: var(--space-lg);

  display: flex;
  flex-direction: column;

  gap: var(--space-lg);

  /*
   * Hide scrollbar while keeping
   * normal mouse / touch scrolling.
   */

  scrollbar-width: none;
  -ms-overflow-style: none;
}

.drawer-items::-webkit-scrollbar {
  display: none;
}

.drawer-item {
  display: grid;

  grid-template-columns:
    64px
    minmax(0, 1fr)
    auto;

  gap: var(--space-md);
}

.drawer-item-image {
  width: 64px;
  height: 64px;

  overflow: hidden;

  border-radius: var(--radius-md);

  background:
    var(--color-surface-dark-soft);
}

.drawer-item-image img {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
}

.drawer-item-info {
  min-width: 0;
}

.drawer-item-info h3 {
  margin:
    0
    0
    var(--space-xs);

  color: var(--color-text-primary);

  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 500;

  line-height: 1.3;
}

.drawer-item-price {
  display: block;

  margin-bottom: var(--space-sm);

  color: var(--color-text-muted);

  font-family: var(--font-body);
  font-size: 12px;
}

.quantity-control {
  display: inline-flex;

  align-items: center;

  border:
    1px solid
    var(--color-border-dark-soft);

  border-radius: var(--radius-sm);

  overflow: hidden;
}

.quantity-control button {
  width: 26px;
  height: 26px;

  border: 0;

  background:
    var(--color-surface-dark-soft);

  color: var(--color-text-primary);

  font-size: 14px;
  line-height: 1;

  cursor: pointer;
}

.quantity-control button:hover {
  background:
    var(--color-border-dark-soft);
}

.quantity-control span {
  width: 26px;

  text-align: center;

  color: var(--color-text-primary);

  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
}

.drawer-item-side {
  display: flex;
  flex-direction: column;

  align-items: flex-end;
  justify-content: space-between;
}

.drawer-item-total {
  color: var(--color-text-primary);

  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
}

.remove-item {
  width: 26px;
  height: 26px;

  display: grid;
  place-items: center;

  background: transparent;

  border: 0;
  border-radius: var(--radius-sm);

  color: var(--color-text-muted);

  cursor: pointer;

  transition:
    color 0.2s ease,
    background 0.2s ease;
}

.remove-item:hover {
  color: var(--color-accent-light);

  background:
    var(--color-border-dark-soft);
}

.remove-item svg {
  width: 14px;
  height: 14px;

  fill: none;
  stroke: currentColor;

  stroke-width: 1.5;

  stroke-linecap: round;
  stroke-linejoin: round;
}

/* =========================================================
   FOOTER
   ========================================================= */

.drawer-footer {
  flex-shrink: 0;

  padding: var(--space-lg);

  border-top:
    1px solid
    var(--color-border-dark-soft);
}

.summary-row {
  display: flex;

  align-items: center;
  justify-content: space-between;

  margin-bottom: var(--space-md);

  color: var(--color-text-secondary);

  font-family: var(--font-body);
  font-size: 14px;
}

.summary-row strong {
  color: var(--color-accent-light);

  font-family: var(--font-heading);
  font-size: 22px;
  font-weight: 500;
}

.checkout-note {
  margin:
    0
    0
    var(--space-lg);

  color: var(--color-text-muted);

  font-family: var(--font-body);
  font-size: 11px;

  line-height: 1.6;
}

.checkout-button {
  display: flex;

  align-items: center;
  justify-content: center;

  gap: var(--space-sm);

  min-height: 48px;

  margin-bottom: var(--space-sm);

  padding:
    0
    var(--space-lg);

  background: var(--color-button-primary);

  border:
    1px solid
    var(--color-button-primary);

  border-radius: var(--radius-md);

  color: var(--color-button-primary-text);

  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 700;

  letter-spacing: 0.3px;

  text-decoration: none;

  transition:
    background 0.25s ease,
    transform 0.25s ease;
}

.checkout-button:hover {
  background: var(--color-button-primary-hover);

  transform: translateY(-2px);
}

.checkout-button svg {
  width: 16px;
  height: 16px;

  fill: none;
  stroke: currentColor;

  stroke-width: 1.7;

  stroke-linecap: round;
  stroke-linejoin: round;
}

.continue-shopping-link {
  display: block;

  color: var(--color-text-secondary);

  font-family: var(--font-body);
  font-size: 12px;

  text-align: center;
  text-decoration: none;

  transition:
    color 0.2s ease;
}

.continue-shopping-link:hover {
  color: var(--color-accent-light);
}

/* =========================================================
   SMALL MOBILE
   ========================================================= */

@media (max-width: 420px) {

  .cart-drawer {
    width: 100vw;
  }

  .drawer-header {
    padding:
      var(--space-lg)
      var(--space-md);
  }

  .drawer-header-actions {
    gap: 4px;
  }

  .clear-cart {
    font-size: 10px;
  }

  .drawer-items {
    padding: var(--space-md);
  }

  .drawer-footer {
    padding: var(--space-md);
  }

}

/* =========================================================
   REDUCED MOTION
   ========================================================= */

@media (prefers-reduced-motion: reduce) {

  .cart-overlay,
  .cart-drawer,
  .continue-shopping,
  .checkout-button,
  .drawer-close,
  .clear-cart,
  .remove-item,
  .continue-shopping-link {
    transition: none;
  }

}

</style>
```
