<template>
  <div class="cart-page">

    <!-- ================= BREADCRUMB ================= -->
    <div class="container">

      <div
        class="breadcrumb anim-rise"
        style="--delay: 0s"
      >
        <span>Home</span>
        <span class="separator">/</span>
        <span>Your Cart</span>
      </div>

      <div
        class="page-header anim-rise"
        style="--delay: .06s"
      >
        <div>
          <h1>Your Cart</h1>
          <p>{{ cart.length }} handcrafted pieces in your collection</p>
        </div>

        <div class="cart-count">
          <Transition name="pop" mode="out-in">
            <span :key="totalItems" class="count-num">{{ totalItems }}</span>
          </Transition>
          {{ totalItems === 1 ? 'Item' : 'Items' }}
        </div>
      </div>

      <!-- ================= SHIPPING BAR ================= -->
      <div
        class="shipping-wrap anim-rise"
        style="--delay: .12s"
      >
        <div
          class="shipping-message"
          :class="{ 'shipping-unlocked': freeShippingUnlocked }"
        >

          <!-- Celebration burst when free shipping unlocks -->
          <div class="confetti" aria-hidden="true">
            <span
              v-for="piece in confetti"
              :key="piece.id"
              class="confetti-piece"
              :class="`shape-${piece.shape}`"
              :style="{
                '--x': piece.x + 'px',
                '--y': piece.y + 'px',
                '--r': piece.rot + 'deg',
                '--d': piece.delay + 's'
              }"
            ></span>
          </div>

          <div class="shipping-icon">
            <span v-if="!freeShippingUnlocked">✦</span>
            <span v-else>✓</span>
          </div>

          <div class="shipping-content">

            <strong v-if="remainingForFreeShipping > 0">
              Add {{ formatPrice(remainingAnimated) }} more for
              <span>FREE SHIPPING!</span>
            </strong>

            <strong v-else>
              You've unlocked <span>FREE SHIPPING!</span>
            </strong>

            <!-- Progress -->
            <div class="shipping-progress">

              <div
                class="shipping-progress-fill"
                :style="{ width: shippingProgress + '%' }"
              ></div>

              <!-- Moving Parcel -->
              <div
                class="shipping-parcel"
                :class="{ 'parcel-complete': freeShippingUnlocked }"
                :style="{ left: `calc(${shippingProgress}% - 10px)` }"
              >
                <span v-if="!freeShippingUnlocked">▣</span>
                <span v-else>✓</span>
              </div>

            </div>

            <!-- Shipping status -->
            <div class="shipping-status">

              <span v-if="!freeShippingUnlocked">
                {{ Math.round(shippingProgress) }}% to free shipping
              </span>

              <span v-else>
                Free shipping unlocked
              </span>

            </div>

          </div>

          <!-- Delivery Icon -->
          <div
            class="shipping-truck"
            :class="{ 'truck-complete': freeShippingUnlocked }"
          >
            <span class="truck-body">▰</span>
            <span class="truck-wheel wheel-one"></span>
            <span class="truck-wheel wheel-two"></span>
          </div>

        </div>
      </div>

      <!-- ================= MAIN CART ================= -->
      <div class="cart-layout">

        <!-- LEFT SIDE -->
        <section
          class="cart-section anim-rise"
          style="--delay: .18s"
        >

          <div class="cart-card">

            <!-- TABLE HEADER -->
            <div
              class="cart-table-header"
              v-if="cart.length"
            >
              <span>PRODUCT</span>
              <span>PRICE</span>
              <span>QUANTITY</span>
              <span>TOTAL</span>
              <span></span>
            </div>

            <!-- CART ITEMS -->
            <TransitionGroup
              name="cart-row"
              tag="div"
              class="cart-rows"
            >
              <div
                v-for="(item, index) in cart"
                :key="item.id"
                class="cart-item"
                :style="{ '--i': index }"
              >

                <!-- Product -->
                <div class="product-info">

                  <div class="product-image">
                    <img
                      :src="item.image"
                      :alt="item.name"
                    />
                  </div>

                  <div class="product-details">
                    <h3>{{ item.name }}</h3>

                    <p v-if="item.variant">
                      {{ item.variant }}
                    </p>

                    <button
                      class="mobile-remove"
                      @click="removeItem(item.id)"
                    >
                      Remove
                    </button>
                  </div>

                </div>

                <!-- Price -->
                <div class="item-price">

                  <span
                    v-if="item.oldPrice"
                    class="old-price"
                  >
                    {{ formatPrice(item.oldPrice) }}
                  </span>

                  <strong>
                    {{ formatPrice(item.price) }}
                  </strong>

                </div>

                <!-- Quantity -->
                <div class="quantity-control">

                  <button
                    @click="decreaseQuantity(item)"
                    :disabled="item.quantity <= 1"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <Transition name="pop" mode="out-in">
                    <span :key="item.quantity">{{ item.quantity }}</span>
                  </Transition>

                  <button
                    @click="increaseQuantity(item)"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>

                </div>

                <!-- Total -->
                <div class="item-total">
                  <Transition name="pop" mode="out-in">
                    <span :key="item.price * item.quantity">
                      {{ formatPrice(item.price * item.quantity) }}
                    </span>
                  </Transition>
                </div>

                <!-- Remove -->
                <button
                  class="remove-btn"
                  @click="removeItem(item.id)"
                  aria-label="Remove product"
                >
                  ×
                </button>

              </div>
            </TransitionGroup>

            <!-- Empty cart -->
            <div
              v-if="cart.length === 0"
              class="empty-cart"
            >
              <div class="empty-icon">◇</div>

              <h2>Your collection is empty</h2>

              <p>
                Discover our handcrafted resin pieces and add something
                beautiful to your collection.
              </p>

              <button
                class="dark-button"
                @click="continueShopping"
              >
                Explore Collection
              </button>
            </div>

          </div>

          <!-- GUARANTEE -->
          <div
            class="shopping-guarantee"
            v-if="cart.length"
          >
            <span>✓</span>
            Secure shopping · Handcrafted with care
          </div>

        </section>

        <!-- ================= ORDER SUMMARY ================= -->
        <aside
          class="order-summary anim-rise"
          style="--delay: .26s"
        >

          <div class="summary-inner">

            <div class="summary-title">
              <span>Order Summary</span>

              <span class="summary-items">
                {{ totalItems }} items
              </span>
            </div>

            <!-- Subtotal -->
            <div class="summary-row">
              <span>Subtotal</span>

              <strong>
                {{ formatPrice(subtotalAnimated) }}
              </strong>
            </div>

            <!-- Coupon discount -->
            <Transition name="fade-slide">
              <div
                v-if="couponApplied"
                class="summary-row"
              >
                <span>Discount (10%)</span>

                <strong class="free-text">
                  − {{ formatPrice(discountAnimated) }}
                </strong>
              </div>
            </Transition>

            <!-- Shipping -->
            <div class="summary-row">

              <span>Shipping</span>

              <strong
                v-if="shipping === 0"
                class="free-text"
              >
                FREE
              </strong>

              <strong v-else>
                {{ formatPrice(shipping) }}
              </strong>

            </div>

            <div class="summary-divider"></div>

            <!-- Coupon -->
            <div class="coupon-section">

              <label>Coupon code</label>

              <div
                class="coupon-input"
                :class="{ 'is-shaking': couponShake }"
              >

                <input
                  v-model="couponCode"
                  type="text"
                  placeholder="Enter coupon code"
                  @keyup.enter="applyCoupon"
                />

                <button @click="applyCoupon">
                  Apply
                </button>

              </div>

              <Transition name="fade-slide" mode="out-in">
                <p
                  v-if="couponMessage"
                  :key="couponMessage"
                  :class="{
                    'coupon-success': couponApplied,
                    'coupon-error': !couponApplied
                  }"
                >
                  {{ couponMessage }}
                </p>
              </Transition>

            </div>

            <!-- Total -->
            <div class="total-row">

              <div>
                <span>Total</span>

                <small>
                  Shipping calculated at checkout
                </small>
              </div>

              <strong>
                {{ formatPrice(totalAnimated) }}
              </strong>

            </div>

            <!-- Checkout -->
            <button
              class="checkout-btn"
              :disabled="cart.length === 0"
              @click="proceedToCheckout"
            >
              Proceed to Checkout
              <span>→</span>
            </button>

            <button
              class="continue-btn"
              @click="continueShopping"
            >
              Continue Shopping
            </button>

          </div>

        </aside>

      </div>

      <!-- ================= RECOMMENDATIONS ================= -->
      <section
        class="recommendations"
        v-if="recommendations.length"
      >

        <div
          v-reveal
          class="recommendation-heading reveal"
        >

          <div>
            <span class="eyebrow">
              CURATED FOR YOU
            </span>

            <h2>
              You might also like
            </h2>
          </div>

          <button
            class="view-all"
            @click="continueShopping"
          >
            View Collection →
          </button>

        </div>

        <TransitionGroup
          name="rec"
          tag="div"
          class="recommendation-grid"
        >

          <article
  v-for="(product, index) in recommendations"
  :key="product.id"
  v-reveal
  class="recommendation-card reveal"
  :style="{ '--i': index }"
  @click="openProduct(product)"
>

            <div class="recommendation-image">

              <span
                v-if="product.discount"
                class="discount-badge"
              >
                {{ product.discount }}% OFF
              </span>

             <!-- <button
  class="recommendation-add"
  @click.stop="addToCart(product)"
>
  Add to Cart
</button> -->

              <img
                :src="product.image"
                :alt="product.name"
              />

            </div>

            <div class="recommendation-info">

              <span class="product-category">
                {{ categoryLabel(product.category) }}
              </span>

              <h3>
                {{ product.name }}
              </h3>

              <div class="recommendation-price">

                <strong>
                  {{ formatPrice(product.price) }}
                </strong>

                <span v-if="product.oldPrice">
                  {{ formatPrice(product.oldPrice) }}
                </span>

              </div>

              <button
                class="recommendation-add"
                @click="addToCart(product)"
              >
                Add to Cart
              </button>

            </div>

          </article>

        </TransitionGroup>

      </section>

    </div>

    <!-- Added-to-cart toast -->
    <Transition name="toast">
      <div
        v-if="toast"
        class="toast"
        role="status"
      >
        <span class="toast-check">✓</span>
        {{ toast }}
      </div>
    </Transition>

    <!-- Floating Chat -->
    <button class="chat-button">
      <span></span>
    </button>

  </div>
</template>


<script setup>
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch
} from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches


// =====================================================
// SCROLL REVEAL DIRECTIVE  (v-reveal)
// =====================================================

const vReveal = {
  mounted(el) {
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    el._revealObserver = observer
  },

  unmounted(el) {
    el._revealObserver?.disconnect()
  }
}


function openProduct(product) {
  router.push(`/product/${product.id}`)
}

// =====================================================
// CART STORAGE
// =====================================================

const CART_STORAGE_KEY = 'royal-resin-cart'

const cart = ref([])

/* becomes true after the first load, so the
   celebration doesn't fire on page open */
const ready = ref(false)

const loadCart = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY)
    const parsed = saved ? JSON.parse(saved) : []

    cart.value = Array.isArray(parsed)
      ? parsed
      : []

  } catch {
    cart.value = []
  }
}

const saveCart = () => {
  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify(cart.value)
  )

  window.dispatchEvent(
    new CustomEvent(
      'royal-cart-updated',
      {
        detail: cart.value
      }
    )
  )
}

const handleCartUpdate = () => {
  loadCart()
}

let toastTimer = null
let confettiTimer = null

onMounted(async () => {

  loadCart()

  window.addEventListener(
    'royal-cart-updated',
    handleCartUpdate
  )

  window.addEventListener(
    'storage',
    handleCartUpdate
  )

  await nextTick()

  ready.value = true

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

  clearTimeout(toastTimer)
  clearTimeout(confettiTimer)

})


// =====================================================
// CATEGORY LABELS
// =====================================================

const categories = [
  {
    id: 'all',
    label: 'All Products'
  },
  {
    id: 'jewellery',
    label: 'Jewellery'
  },
  {
    id: 'home',
    label: 'Home Décor'
  },
  {
    id: 'trays',
    label: 'Trays & Coasters'
  },
  {
    id: 'accessories',
    label: 'Pens & Accessories'
  },
  {
    id: 'custom',
    label: 'Custom & Keepsakes'
  }
]

const categoryLabel = (id) =>
  categories.find(
    category => category.id === id
  )?.label || id


// =====================================================
// PRODUCT CATALOG
// =====================================================

const allProducts = [
  {
    id: 'wall-clock',
    name: 'Wall Clock',
    category: 'home',
    price: 4500,
    image: 'https://i.pinimg.com/736x/c0/e1/72/c0e17217bf53f4ac34b41c5e8488e67a.jpg'
  },
  {
    id: 'quran-rehal',
    name: 'Quran Rehal',
    category: 'home',
    price: 3500,
    image: 'https://i.pinimg.com/1200x/b9/a5/dc/b9a5dc4cde4cafb60eecd9f576f9ff78.jpg'
  },
  {
    id: 'earrings',
    name: 'Resin Earrings',
    category: 'jewellery',
    price: 1200,
    image: 'https://i.pinimg.com/736x/bc/86/de/bc86def8ad2ba311406b2a6d8fcb9831.jpg'
  },
  {
    id: 'jhumka',
    name: 'Resin Jhumka',
    category: 'jewellery',
    price: 1000,
    image: 'https://i.pinimg.com/736x/48/d2/b5/48d2b5598c9d32d44def8c722501e4db.jpg'
  },
  {
    id: 'locket',
    name: 'Resin Locket',
    category: 'jewellery',
    price: 1500,
    image: 'https://i.pinimg.com/736x/8c/9f/40/8c9f40bf6eb626d41b4bb06a5f1d86fb.jpg'
  },
  {
    id: 'ring',
    name: 'Resin Ring',
    category: 'jewellery',
    price: 900,
    image: 'https://i.pinimg.com/1200x/91/cc/7f/91cc7fa407f7df92d10842147d6f611f.jpg'
  },
  {
    id: 'coasters',
    name: 'Resin Coasters',
    category: 'trays',
    price: 2200,
    image: 'https://i.pinimg.com/1200x/a9/c9/0d/a9c90d02ab2850f0d5f7e1bcefc854be.jpg'
  },
  {
    id: 'pen',
    name: 'Resin Pen',
    category: 'accessories',
    price: 800,
    image: 'https://i.pinimg.com/736x/4d/d4/63/4dd4632d1d1cb55cde3a2a609abcb769.jpg'
  },
  {
    id: 'heart-frame',
    name: 'Heart Frame',
    category: 'home',
    price: 2800,
    image: 'https://i.pinimg.com/1200x/50/dd/92/50dd9235908ebeb6a9d73759d88458ba.jpg'
  },
  {
    id: 'trinkets-tray',
    name: 'Trinkets Tray',
    category: 'trays',
    price: 2500,
    image: 'https://i.pinimg.com/736x/22/b9/59/22b959ba5285b1136ef019dcb5bd4817.jpg'
  },
  {
    id: 'bookmark',
    name: 'Resin Bookmark',
    category: 'accessories',
    price: 650,
    image: 'https://i.pinimg.com/736x/c1/9c/b5/c19cb5f3315adc6b17c2b1634ac44059.jpg'
  },
  {
    id: 'nikkah-tray',
    name: 'Nikkah Tray',
    category: 'trays',
    price: 4200,
    image: 'https://i.pinimg.com/1200x/bd/50/59/bd50592e2b2aa9d2c62a0e5640d3668d.jpg'
  },
  {
    id: 'keyrings',
    name: 'Resin Keyrings',
    category: 'accessories',
    price: 700,
    image: 'https://i.pinimg.com/736x/ef/a8/f6/efa8f6b5b3465d50081b5dfa467b21ae.jpg'
  },
  {
    id: 'customized-pen',
    name: 'Customized Pen',
    category: 'custom',
    price: 1200,
    image: 'https://i.pinimg.com/736x/2e/f1/bd/2ef1bd25f92709acec24a3fddd41ba6c.jpg'
  },
  {
    id: 'tray',
    name: 'Resin Tray',
    category: 'trays',
    price: 3000,
    image: 'https://i.pinimg.com/736x/48/c4/0c/48c40c74a3d301857001f64681cc43e8.jpg'
  },
  {
    id: 'preservation',
    name: 'Resin Preservation',
    category: 'custom',
    price: 5000,
    image: 'https://i.pinimg.com/736x/d3/fd/26/d3fd26c71ea2eb1d376d0c5bab70ff31.jpg'
  },
  {
    id: 'jewellery-box',
    name: 'Jewellery Box',
    category: 'home',
    price: 3500,
    image: 'https://i.pinimg.com/1200x/a0/22/46/a022469178b9779f0d76c2f07d492bd9.jpg'
  },
  {
    id: 'photo-frame',
    name: 'Photo Frame',
    category: 'home',
    price: 3000,
    image: 'https://i.pinimg.com/1200x/f5/4f/82/f54f82bacb2fb92595146efac714380c.jpg'
  },
  {
    id: 'pen-holder',
    name: 'Pen Holder',
    category: 'accessories',
    price: 1800,
    image: 'https://i.pinimg.com/736x/3e/53/68/3e5368144dff99d1217586400fb73fcf.jpg'
  },
  {
    id: 'serving-tray',
    name: 'Serving Tray',
    category: 'trays',
    price: 4500,
    image: 'https://i.pinimg.com/1200x/ca/b8/39/cab83903fedfba1a2e2f8de8b5701a06.jpg'
  }
]


// =====================================================
// RECOMMENDATIONS
// =====================================================

const catalog = ref(
  allProducts.map(product => ({
    ...product,
    wishlisted: false
  }))
)

const recommendations = computed(() => {

  const cartIds = new Set(
    cart.value.map(item => item.id)
  )

  return catalog.value
    .filter(product => !cartIds.has(product.id))
    .slice(0, 4)

})

function toggleWishlist(product) {
  product.wishlisted = !product.wishlisted
}

function showToast(message) {

  toast.value = message

  clearTimeout(toastTimer)

  toastTimer = setTimeout(() => {
    toast.value = ''
  }, 2200)

}

function addToCart(product) {

  const existing = cart.value.find(
    item => item.id === product.id
  )

  if (existing) {

    existing.quantity += 1

  } else {

    cart.value.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })

  }

  saveCart()

  showToast(`${product.name} added to your cart`)
}


// =====================================================
// CALCULATIONS
// =====================================================

const totalItems = computed(() => {

  return cart.value.reduce(
    (total, item) =>
      total + item.quantity,
    0
  )

})

const subtotal = computed(() => {

  return cart.value.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )

})


// =====================================================
// FREE SHIPPING
// =====================================================

const freeShippingLimit = 10000

const remainingForFreeShipping = computed(() => {

  return Math.max(
    freeShippingLimit - subtotal.value,
    0
  )

})

const shippingProgress = computed(() => {

  return Math.min(
    (subtotal.value / freeShippingLimit) * 100,
    100
  )

})

const freeShippingUnlocked = computed(() => {
  return subtotal.value >= freeShippingLimit
})


// =====================================================
// SHIPPING
// =====================================================

const shipping = computed(() => {

  return freeShippingUnlocked.value
    ? 0
    : 300

})


// =====================================================
// COUPON
// =====================================================

const couponCode = ref('')
const couponApplied = ref(false)
const couponMessage = ref('')
const couponShake = ref(false)

const discount = computed(() => {

  if (!couponApplied.value) {
    return 0
  }

  return subtotal.value * 0.10

})

const total = computed(() => {

  return Math.max(
    subtotal.value +
    shipping.value -
    discount.value,
    0
  )

})

function shakeCoupon() {

  couponShake.value = true

  setTimeout(() => {
    couponShake.value = false
  }, 500)

}

function applyCoupon() {

  const code =
    couponCode.value
      .trim()
      .toUpperCase()

  if (!code) {

    couponApplied.value = false

    couponMessage.value =
      'Please enter a coupon code.'

    shakeCoupon()

    return
  }

  if (code === 'ROYAL10') {

    couponApplied.value = true

    couponMessage.value =
      '10% discount applied successfully.'

  } else {

    couponApplied.value = false

    couponMessage.value =
      'Invalid or expired coupon code.'

    shakeCoupon()

  }

}


// =====================================================
// ANIMATED NUMBERS (count up / down)
// =====================================================

function useAnimatedNumber(source, duration = 700) {

  const display = ref(source.value)

  let frame = 0

  watch(source, (target) => {

    cancelAnimationFrame(frame)

    if (prefersReducedMotion()) {
      display.value = target
      return
    }

    const from = display.value
    const start = performance.now()

    const step = (now) => {

      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      display.value = from + (target - from) * eased

      if (progress < 1) {
        frame = requestAnimationFrame(step)
      }

    }

    frame = requestAnimationFrame(step)

  })

  onUnmounted(() => cancelAnimationFrame(frame))

  return display

}

const subtotalAnimated = useAnimatedNumber(subtotal)
const discountAnimated = useAnimatedNumber(discount)
const totalAnimated = useAnimatedNumber(total)
const remainingAnimated = useAnimatedNumber(remainingForFreeShipping)


// =====================================================
// FREE SHIPPING CELEBRATION
// =====================================================

const confetti = ref([])

watch(freeShippingUnlocked, (unlocked, wasUnlocked) => {

  if (!unlocked || wasUnlocked) return
  if (!ready.value || prefersReducedMotion()) return

  const count = 26

  confetti.value = Array.from({ length: count }, (_, i) => {

    const angle =
      (Math.PI * 2 * i) / count +
      Math.random() * 0.4

    const distance = 60 + Math.random() * 90

    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 24,
      rot: Math.round(Math.random() * 540 - 270),
      delay: Math.random() * 0.12,
      shape: i % 3
    }

  })

  clearTimeout(confettiTimer)

  confettiTimer = setTimeout(() => {
    confetti.value = []
  }, 1500)

})


// =====================================================
// TOAST
// =====================================================

const toast = ref('')


// =====================================================
// FUNCTIONS
// =====================================================

function formatPrice(value) {

  return `Rs. ${Math.round(value).toLocaleString()}`

}

function increaseQuantity(item) {

  item.quantity++

  saveCart()

}

function decreaseQuantity(item) {

  if (item.quantity > 1) {

    item.quantity--

    saveCart()

  }

}

function removeItem(id) {

  cart.value =
    cart.value.filter(
      item => item.id !== id
    )

  saveCart()

}

function continueShopping() {

  router.push('/shop')

}

function proceedToCheckout() {

  if (!cart.value.length) {
    return
  }

  router.push('/check')

}

</script>


<style scoped>

/* =====================================================
   PAGE
   ===================================================== */

.cart-page {
  /* Height of the fixed navbar (88px desktop, 72px tablet/mobile) */
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
   SHARED MOTION
   ===================================================== */

@keyframes riseIn {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
}

/* page-load entrance (delay set inline via --delay) */
.anim-rise {
  animation:
    riseIn .75s cubic-bezier(.2, .7, .2, 1)
    backwards;

  animation-delay: var(--delay, 0s);
}

/* scroll reveal — class is added by v-reveal */
.reveal:not(.is-visible) {
  opacity: 0;
}

.reveal.is-visible {
  animation:
    riseIn .8s cubic-bezier(.2, .7, .2, 1)
    backwards;

  animation-delay: calc(var(--i, 0) * 90ms);
}

@keyframes numPop {

  0% {
    opacity: 0;
    transform: translateY(-45%) scale(.7);
  }

  60% {
    opacity: 1;
    transform: translateY(6%) scale(1.15);
  }

  100% {
    transform: none;
  }

}

@keyframes heartPop {

  0% {
    transform: scale(.5);
  }

  55% {
    transform: scale(1.4);
  }

  100% {
    transform: scale(1);
  }

}

/* number swap: quantity, line total, item count */
.pop-enter-active {
  animation: numPop .4s cubic-bezier(.2, .8, .3, 1);
}

.pop-leave-active {
  transition: opacity .1s ease;
}

.pop-leave-to {
  opacity: 0;
}

.heart-enter-active {
  animation: heartPop .5s cubic-bezier(.2, .8, .3, 1);
}

.heart-leave-active {
  transition: opacity .08s ease;
}

.heart-leave-to {
  opacity: 0;
}

/* small messages */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity .3s ease,
    transform .3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(6px);
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
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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

.cart-count {
  color: var(--color-accent-light);
  font-size: 13px;
  font-weight: 600;
}

.count-num {
  display: inline-block;
}


/* =====================================================
   SHIPPING MESSAGE
   ===================================================== */

.shipping-message {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--color-brand-navy-light);
  border: 1px solid var(--color-border-dark);
  border-radius: var(--radius-md);
  padding: 13px 16px;
  margin-bottom: var(--space-lg);
  box-shadow: var(--shadow-soft);
  transition:
    border-color .35s ease,
    box-shadow .35s ease,
    transform .35s ease;
}

.shipping-message.shipping-unlocked {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-gold);
  animation: unlockPulse .8s ease;
}

@keyframes unlockPulse {

  0% {
    transform: scale(1);
  }

  45% {
    transform: scale(1.012);
  }

  100% {
    transform: scale(1);
  }

}


.shipping-icon {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--color-surface-dark-soft);
  color: var(--color-accent-light);
  flex-shrink: 0;
  font-size: 12px;
  transition: .3s ease;
}

.shipping-icon span {
  display: inline-block;
}

/* the sparkle slowly turns while you're still earning free shipping */
.shipping-message:not(.shipping-unlocked) .shipping-icon span {
  animation: spinSlow 6s linear infinite;
}

@keyframes spinSlow {
  to {
    transform: rotate(360deg);
  }
}

.shipping-unlocked .shipping-icon {
  background: var(--color-accent);
  color: var(--color-brand-navy-deep);
  animation: iconPop .5s ease;
}

@keyframes iconPop {

  0% {
    transform: scale(.7);
  }

  70% {
    transform: scale(1.15);
  }

  100% {
    transform: scale(1);
  }

}


.shipping-content {
  flex: 1;
  min-width: 0;
}

.shipping-content strong {
  display: block;
  font-size: 12px;
  color: var(--color-text-primary);
}

.shipping-content strong span {
  color: var(--color-accent-light);
}

.shipping-progress {
  position: relative;
  width: 100%;
  height: 5px;
  background: var(--color-border-dark-soft);
  border-radius: 20px;
  margin-top: 9px;
}

/* gold bar with a light shimmer running through it */
.shipping-progress-fill {
  height: 100%;
  background-color: var(--color-accent);
  background-image: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, .55) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  border-radius: inherit;
  transition: width .9s cubic-bezier(.4, 0, .2, 1);
  animation: shimmer 2.2s linear infinite;
}

@keyframes shimmer {

  from {
    background-position: 200% 0;
  }

  to {
    background-position: -200% 0;
  }

}


/* =====================================================
   CONFETTI BURST
   ===================================================== */

.confetti {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0;
  height: 0;
  z-index: 5;
  pointer-events: none;
}

.confetti-piece {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 2px;
  background: var(--color-accent-light);
  animation:
    confettiBurst 1.1s cubic-bezier(.15, .7, .3, 1)
    forwards;
  animation-delay: var(--d, 0s);
}

.confetti-piece.shape-1 {
  border-radius: 50%;
  background: var(--color-brand-gold);
}

.confetti-piece.shape-2 {
  width: 4px;
  height: 11px;
  background: var(--color-text-primary);
}

@keyframes confettiBurst {

  0% {
    opacity: 1;
    transform: translate(0, 0) rotate(0) scale(.4);
  }

  100% {
    opacity: 0;
    transform:
      translate(var(--x), var(--y))
      rotate(var(--r))
      scale(1);
  }

}


/* =====================================================
   MOVING PARCEL
   ===================================================== */

.shipping-parcel {
  position: absolute;
  top: 50%;
  width: 20px;
  height: 20px;
  display: grid;
  place-items: center;
  border: 1px solid var(--color-accent);
  border-radius: 50%;
  background: var(--color-brand-navy-light);
  color: var(--color-accent-light);
  font-size: 8px;
  transform: translateY(-50%);
  transition:
    left .9s cubic-bezier(.4, 0, .2, 1),
    transform .3s ease,
    background .3s ease;
  box-shadow: var(--shadow-soft);
  z-index: 2;
}

.shipping-parcel:not(.parcel-complete) {
  animation: parcelFloat 1.6s ease-in-out infinite;
}

@keyframes parcelFloat {

  0%,
  100% {
    transform:
      translateY(-50%)
      translateX(0);
  }

  50% {
    transform:
      translateY(calc(-50% - 2px))
      translateX(1px);
  }

}

.shipping-parcel.parcel-complete {
  background: var(--color-accent);
  color: var(--color-brand-navy-deep);
  border-color: var(--color-accent);
  animation: parcelComplete .6s ease;
}

@keyframes parcelComplete {

  0% {
    transform:
      translateY(-50%)
      scale(.8)
      rotate(-10deg);
  }

  60% {
    transform:
      translateY(-50%)
      scale(1.18)
      rotate(5deg);
  }

  100% {
    transform:
      translateY(-50%)
      scale(1)
      rotate(0);
  }

}


/* =====================================================
   SHIPPING STATUS
   ===================================================== */

.shipping-status {
  margin-top: 5px;
  color: var(--color-text-muted);
  font-size: 9px;
  transition: color .3s ease;
}

.shipping-unlocked .shipping-status {
  color: var(--color-accent-light);
  font-weight: 600;
}


/* =====================================================
   DELIVERY TRUCK
   ===================================================== */

.shipping-truck {
  position: relative;
  width: 38px;
  height: 25px;
  color: var(--color-text-secondary);
  flex-shrink: 0;
  transition:
    color .3s ease,
    transform .35s ease;
}

/* gentle "engine idle" bounce until free shipping is reached */
.shipping-truck:not(.truck-complete) {
  animation: truckIdle 1.1s ease-in-out infinite;
}

@keyframes truckIdle {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-1.5px);
  }

}

.truck-body {
  position: absolute;
  left: 3px;
  top: 5px;
  font-size: 21px;
  line-height: 1;
}

.truck-wheel {
  position: absolute;
  bottom: 1px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-text-secondary);
}

.wheel-one {
  left: 7px;
}

.wheel-two {
  right: 6px;
}

.truck-complete {
  color: var(--color-accent-light);
  animation: truckArrive .7s ease;
}

.truck-complete .truck-wheel {
  background: var(--color-accent-light);
}

@keyframes truckArrive {

  0% {
    transform: translateX(8px);
    opacity: .4;
  }

  60% {
    transform: translateX(-3px);
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }

}


/* =====================================================
   MAIN LAYOUT
   ===================================================== */

.cart-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: var(--space-lg);
  align-items: start;
}


/* =====================================================
   CART CARD
   ===================================================== */

.cart-card {
  background: var(--color-brand-navy-light);
  border: 1px solid var(--color-border-dark);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
}

.cart-table-header {
  display: grid;
  grid-template-columns:
    minmax(250px, 1fr)
    100px
    120px
    100px
    30px;
  gap: 15px;
  padding: 15px 20px;
  background: var(--color-brand-navy-light);
  color: var(--color-text-muted);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: .12em;
}

.cart-rows {
  position: relative;
}

.cart-item {
  display: grid;
  grid-template-columns:
    minmax(250px, 1fr)
    100px
    120px
    100px
    30px;
  gap: 15px;
  align-items: center;
  padding: 18px 20px;
  border-bottom: 1px solid var(--color-border-dark-soft);
  background: var(--color-brand-navy-light);
  transition: background .25s ease;
}

.cart-item:hover {
  background: color-mix(
    in srgb,
    var(--color-surface-dark-soft) 55%,
    var(--color-brand-navy-light)
  );
}

.cart-item:last-child {
  border-bottom: 0;
}

/* rows slide in one after another, slide out when removed,
   and the rest glide up to close the gap */
.cart-row-enter-active,
.cart-row-leave-active {
  transition:
    opacity .45s ease,
    transform .45s cubic-bezier(.2, .7, .2, 1);
}

.cart-row-enter-active {
  transition-delay: calc(var(--i, 0) * 80ms);
}

.cart-row-enter-from {
  opacity: 0;
  transform: translateX(-28px);
}

.cart-row-leave-to {
  opacity: 0;
  transform: translateX(48px);
}

.cart-row-leave-active {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;
}

.cart-row-move {
  transition: transform .45s cubic-bezier(.2, .7, .2, 1);
}


/* =====================================================
   PRODUCT
   ===================================================== */

.product-info {
  display: flex;
  align-items: center;
  gap: 14px;
}

.product-image {
  width: 66px;
  height: 66px;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-surface-dark-soft);
  border: 1px solid var(--color-border-dark);
  flex-shrink: 0;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .45s ease;
}

.cart-item:hover .product-image img {
  transform: scale(1.08);
}

.product-details h3 {
  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 4px;
}

.product-details p {
  color: var(--color-text-muted);
  font-size: 11px;
  margin: 0;
}


/* =====================================================
   PRICE
   ===================================================== */

.item-price {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.item-price strong {
  color: var(--color-text-primary);
  font-size: 13px;
}

.old-price {
  font-size: 10px;
  color: var(--color-text-muted);
  text-decoration: line-through;
}


/* =====================================================
   QUANTITY
   ===================================================== */

.quantity-control {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  border: 1px solid var(--color-border-dark);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.quantity-control button {
  width: 27px;
  height: 27px;
  border: 0;
  background: var(--color-surface-dark-soft);
  color: var(--color-text-primary);
  cursor: pointer;
  font-size: 15px;
  transition:
    background .2s ease,
    color .2s ease,
    transform .15s ease;
}

.quantity-control button:hover:not(:disabled) {
  background: var(--color-accent);
  color: var(--color-brand-navy-deep);
}

.quantity-control button:active:not(:disabled) {
  transform: scale(.85);
}

.quantity-control button:disabled {
  opacity: .3;
  cursor: not-allowed;
}

.quantity-control span {
  width: 28px;
  text-align: center;
  font-size: 12px;
  color: var(--color-text-primary);
}


/* =====================================================
   TOTAL
   ===================================================== */

.item-total {
  color: var(--color-text-primary);
  font-size: 13px;
  font-weight: 700;
}

.item-total span {
  display: inline-block;
}

.remove-btn {
  width: 25px;
  height: 25px;
  border: 0;
  border-radius: 50%;
  background: var(--color-surface-dark-soft);
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 16px;
  transition:
    background .2s ease,
    color .2s ease,
    transform .3s ease;
}

.remove-btn:hover {
  background: var(--color-accent);
  color: var(--color-brand-navy-deep);
  transform: rotate(90deg);
}

.mobile-remove {
  display: none;
}


/* =====================================================
   GUARANTEE
   ===================================================== */

.shopping-guarantee {
  color: var(--color-text-muted);
  font-size: 10px;
  padding: 12px 4px;
}

.shopping-guarantee span {
  color: var(--color-accent-light);
  margin-right: 4px;
}


/* =====================================================
   ORDER SUMMARY
   ===================================================== */

.order-summary {
  background: var(--color-brand-navy-light);
  border: 1px solid var(--color-border-dark);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-card);
  overflow: hidden;
}

.summary-inner {
  padding: 24px;
}

.summary-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-heading);
  color: var(--color-text-primary);
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 22px;
}

.summary-items {
  font-family: var(--font-body);
  color: var(--color-text-muted);
  font-size: 10px;
  font-weight: 400;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: var(--color-text-secondary);
  margin-bottom: 13px;
}

.summary-row strong {
  color: var(--color-text-primary);
  font-variant-numeric: tabular-nums;
}

.free-text {
  color: var(--color-accent-light) !important;
}

.summary-divider {
  height: 1px;
  background: var(--color-border-dark-soft);
  margin: 18px 0;
}


/* =====================================================
   COUPON
   ===================================================== */

.coupon-section label {
  display: block;
  font-size: 10px;
  color: var(--color-text-secondary);
  margin-bottom: 7px;
}

.coupon-input {
  display: flex;
  border: 1px solid var(--color-border-dark);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color .25s ease;
}

.coupon-input:focus-within {
  border-color: var(--color-accent);
}

.coupon-input.is-shaking {
  animation: shake .5s ease;
}

@keyframes shake {

  0%,
  100% {
    transform: translateX(0);
  }

  20% {
    transform: translateX(-7px);
  }

  40% {
    transform: translateX(6px);
  }

  60% {
    transform: translateX(-4px);
  }

  80% {
    transform: translateX(3px);
  }

}

.coupon-input input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: none;
  padding: 11px;
  font-family: var(--font-body);
  font-size: 11px;
  color: var(--color-text-primary);
  background: var(--color-surface-dark-soft);
}

.coupon-input input::placeholder {
  color: var(--color-text-muted);
}

.coupon-input button {
  border: 0;
  padding: 0 14px;
  background: var(--color-button-primary);
  color: var(--color-button-primary-text);
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: background .2s ease;
}

.coupon-input button:hover {
  background: var(--color-button-primary-hover);
}

.coupon-success,
.coupon-error {
  font-size: 10px;
  margin: 7px 0 0;
}

.coupon-success {
  color: var(--color-accent-light);
}

.coupon-error {
  color: var(--color-text-secondary);
}


/* =====================================================
   TOTAL
   ===================================================== */

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 23px 0 17px;
}

.total-row div {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.total-row span {
  color: var(--color-text-primary);
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 600;
}

.total-row small {
  color: var(--color-text-muted);
  font-size: 8px;
}

.total-row > strong {
  color: var(--color-accent-light);
  font-size: 18px;
  font-variant-numeric: tabular-nums;
}


/* =====================================================
   BUTTONS
   ===================================================== */

.checkout-btn,
.continue-btn,
.dark-button {
  width: 100%;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-family: var(--font-body);
  transition: .25s ease;
}

.checkout-btn {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--color-button-primary);
  background: var(--color-button-primary);
  color: var(--color-button-primary-text);
  padding: 13px;
  font-size: 11px;
  font-weight: 700;
}

.checkout-btn span {
  display: inline-block;
  transition: transform .25s ease;
}

.checkout-btn:hover:not(:disabled) {
  background: var(--color-button-primary-hover);
  box-shadow: var(--shadow-gold);
  transform: translateY(-1px);
}

.checkout-btn:hover:not(:disabled) span {
  transform: translateX(6px);
}

.checkout-btn:active:not(:disabled) {
  transform: scale(.98);
}

/* light sweep that catches the eye every few seconds */
.checkout-btn:not(:disabled)::after {
  content: '';
  position: absolute;
  top: 0;
  left: -60%;
  width: 40%;
  height: 100%;
  background: linear-gradient(
    100deg,
    transparent,
    rgba(255, 255, 255, .38),
    transparent
  );
  transform: skewX(-20deg);
  animation: btnShine 3.6s ease-in-out infinite;
  pointer-events: none;
}

@keyframes btnShine {

  0%,
  55% {
    left: -60%;
  }

  100% {
    left: 130%;
  }

}

.checkout-btn:disabled {
  opacity: .5;
  cursor: not-allowed;
}

.continue-btn {
  background: transparent;
  border: 1px solid var(--color-border-dark);
  color: var(--color-text-primary);
  padding: 12px;
  margin-top: 9px;
  font-size: 10px;
}

.continue-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent-light);
}


/* =====================================================
   RECOMMENDATIONS
   ===================================================== */

.recommendations {
  margin-top: var(--space-3xl);
}

.recommendation-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: var(--space-lg);
}

.eyebrow {
  display: block;
  color: var(--color-accent-light);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: .18em;
  margin-bottom: 5px;
}

.recommendation-heading h2 {
  margin: 0;
  font-family: var(--font-heading);
  font-size: 27px;
  color: var(--color-text-primary);
  font-weight: 500;
}

.view-all {
  border: 0;
  background: transparent;
  color: var(--color-accent-light);
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
}


/* =====================================================
   PRODUCT GRID
   ===================================================== */

.recommendation-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.recommendation-card {
  background: var(--color-brand-navy-light);
  border: 1px solid var(--color-border-dark);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: .3s ease;
}

.recommendation-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-card);
  border-color: var(--color-accent);
}

/* card fades away when added to cart, neighbours slide over */
.rec-leave-active {
  transition:
    opacity .3s ease,
    transform .3s ease;
}

.rec-leave-to {
  opacity: 0;
  transform: scale(.9);
}

.rec-move {
  transition: transform .5s cubic-bezier(.2, .7, .2, 1);
}

.recommendation-image {
  height: 205px;
  position: relative;
  overflow: hidden;
  background: var(--color-surface-dark-soft);
}

.recommendation-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .5s ease;
}

.recommendation-card:hover .recommendation-image img {
  transform: scale(1.07);
}

.discount-badge {
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 2;
  padding: 5px 7px;
  background: var(--color-accent);
  color: var(--color-brand-navy-deep);
  border-radius: var(--radius-sm);
  font-size: 8px;
  font-weight: 700;
}

.wishlist-btn {
  position: absolute;
  top: 9px;
  right: 9px;
  z-index: 2;
  width: 29px;
  height: 29px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 1px solid var(--color-border-dark);
  border-radius: 50%;
  background: var(--color-surface-dark-soft);
  color: var(--color-text-primary);
  cursor: pointer;
  font-size: 16px;
  transition:
    background .2s ease,
    color .2s ease,
    transform .2s ease;
}

.wishlist-btn:hover {
  background: var(--color-accent);
  color: var(--color-brand-navy-deep);
  transform: scale(1.12);
}

.heart {
  display: inline-block;
  line-height: 1;
}

.recommendation-info {
  padding: 14px;
}

.product-category {
  color: var(--color-accent-light);
  font-size: 8px;
  text-transform: uppercase;
  letter-spacing: .12em;
}

.recommendation-info h3 {
  margin: 5px 0 8px;
  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.recommendation-price {
  display: flex;
  gap: 7px;
  align-items: center;
}

.recommendation-price strong {
  color: var(--color-accent-light);
  font-size: 12px;
}

.recommendation-price span {
  color: var(--color-text-muted);
  font-size: 9px;
  text-decoration: line-through;
}

.recommendation-add {
  width: 100%;
  margin-top: 10px;
  padding: 9px;
  border: 1px solid var(--color-border-dark);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text-primary);
  font-size: 10px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background .2s ease,
    color .2s ease,
    transform .15s ease;
}

.recommendation-add:hover {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-brand-navy-deep);
}

.recommendation-add:active {
  transform: scale(.96);
}


/* =====================================================
   EMPTY CART
   ===================================================== */

.empty-cart {
  text-align: center;
  padding: 70px 25px;
  animation: riseIn .7s cubic-bezier(.2, .7, .2, 1) backwards;
}

.empty-icon {
  display: inline-block;
  color: var(--color-accent);
  font-size: 40px;
  margin-bottom: 10px;
  animation: gemFloat 3.4s ease-in-out infinite;
}

@keyframes gemFloat {

  0%,
  100% {
    transform: translateY(0) rotate(0) scale(1);
  }

  50% {
    transform: translateY(-9px) rotate(14deg) scale(1.08);
  }

}

.empty-cart h2 {
  font-family: var(--font-heading);
  color: var(--color-text-primary);
  font-weight: 500;
  margin: 0 0 8px;
}

.empty-cart p {
  max-width: 400px;
  margin: 0 auto 20px;
  color: var(--color-text-secondary);
  font-size: 12px;
}

.dark-button {
  width: auto;
  padding: 12px 25px;
  background: var(--color-button-primary);
  border: 1px solid var(--color-button-primary);
  color: var(--color-button-primary-text);
  font-size: 11px;
}

.dark-button:hover {
  background: var(--color-button-primary-hover);
  transform: translateY(-2px);
}


/* =====================================================
   TOAST
   ===================================================== */

.toast {
  position: fixed;
  left: 50%;
  bottom: 28px;
  z-index: 60;
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: calc(100% - 32px);
  padding: 12px 20px;
  border-radius: 999px;
  background: var(--color-brand-navy-light);
  color: var(--color-accent-light);
  box-shadow: var(--shadow-card);
  font-size: 12px;
  font-weight: 600;
  transform: translateX(-50%);
  border: 1px solid var(--color-border-dark);
}

.toast-check {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--color-accent);
  color: var(--color-brand-navy-deep);
  font-size: 11px;
}

.toast-enter-active {
  transition:
    opacity .35s ease,
    transform .45s cubic-bezier(.2, 1.2, .3, 1);
}

.toast-leave-active {
  transition:
    opacity .3s ease,
    transform .3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 24px);
}


/* =====================================================
   CHAT
   ===================================================== */

.chat-button {
  position: fixed;
  right: 25px;
  bottom: 25px;
  width: 50px;
  height: 50px;
  border: 1px solid var(--color-border-dark);
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: var(--shadow-gold);
  cursor: pointer;
  z-index: 10;
  transition: transform .25s ease;
}

.chat-button:hover {
  transform: scale(1.08);
}

.chat-button::before {
  content: '';
  position: absolute;
  width: 17px;
  height: 13px;
  border-radius: 4px;
  background: var(--color-brand-navy-deep);
  left: 16px;
  top: 16px;
}

.chat-button::after {
  content: '';
  position: absolute;
  width: 5px;
  height: 5px;
  background: var(--color-brand-navy-deep);
  transform: rotate(25deg);
  left: 17px;
  top: 27px;
}


/* =====================================================
   NAVBAR SWITCHES TO MOBILE HEIGHT
   ===================================================== */

@media (max-width: 900px) {

  .cart-page {
    --nav-offset: 72px;
  }

}


/* =====================================================
   TABLET
   ===================================================== */

@media (max-width: 950px) {

  .cart-layout {
    grid-template-columns: 1fr;
  }

  .order-summary {
    max-width: none;
  }

  .recommendation-grid {
    grid-template-columns: repeat(2, 1fr);
  }

}


/* =====================================================
   MOBILE
   ===================================================== */

@media (max-width: 650px) {

  .cart-page {
    padding-top: calc(var(--nav-offset) + var(--space-lg));
  }

  .container {
    width: min(100% - 28px, 1180px);
  }

  .page-header {
    align-items: flex-start;
  }

  .page-header h1 {
    font-size: 34px;
  }

  .cart-count {
    padding-top: 8px;
  }

  .shipping-message {
    align-items: flex-start;
  }

  .shipping-truck {
    display: none;
  }

  .shipping-content strong {
    font-size: 11px;
  }

  .cart-table-header {
    display: none;
  }

  .cart-item {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 13px;
    padding: 17px 14px;
  }

  .product-info {
    grid-column: 1 / -1;
  }

  .product-image {
    width: 72px;
    height: 72px;
  }

  .item-price {
    grid-column: 1;
  }

  .quantity-control {
    grid-column: 2;
    grid-row: 2;
  }

  .item-total {
    grid-column: 1;
    grid-row: 3;
    font-size: 14px;
  }

  .remove-btn {
    display: none;
  }

  .mobile-remove {
    display: inline-block;
    margin-top: 6px;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--color-text-muted);
    font-size: 9px;
    cursor: pointer;
  }

  .mobile-remove:hover {
    color: var(--color-accent-light);
  }

  .summary-inner {
    padding: 20px;
  }

  .recommendation-heading {
    align-items: flex-start;
    gap: 10px;
  }

  .view-all {
    padding-top: 5px;
    white-space: nowrap;
  }

  .recommendation-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .recommendation-image {
    height: 160px;
  }

  .recommendation-info {
    padding: 11px;
  }

  .recommendation-info h3 {
    font-size: 13px;
  }

  .chat-button {
    right: 16px;
    bottom: 16px;
  }

  .toast {
    bottom: 80px;
  }

}


/* =====================================================
   SMALL MOBILE
   ===================================================== */

@media (max-width: 420px) {

  .recommendation-grid {
    grid-template-columns: 1fr 1fr;
  }

  .recommendation-image {
    height: 135px;
  }

  .recommendation-heading h2 {
    font-size: 22px;
  }

  .page-header h1 {
    font-size: 30px;
  }

  .shipping-icon {
    width: 27px;
    height: 27px;
  }

  .shipping-parcel {
    width: 18px;
    height: 18px;
  }

}


/* =====================================================
   REDUCED MOTION
   ===================================================== */

@media (prefers-reduced-motion: reduce) {

  .cart-page *,
  .cart-page *::before,
  .cart-page *::after {
    animation: none !important;
    transition: none !important;
  }

  .reveal:not(.is-visible) {
    opacity: 1;
  }

}

</style>