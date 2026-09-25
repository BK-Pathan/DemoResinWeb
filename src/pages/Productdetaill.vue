<script setup lang="ts">

import {
  computed,
  onUnmounted,
  ref,
  watch
} from 'vue'

import { useRoute } from 'vue-router'

import {
  categories,
  products,
  hasPrice,
  getProductById
} from '../data/products'

/* =========================================================
   SETTINGS
   ========================================================= */

const currency = 'Rs'
const CART_STORAGE_KEY = 'royal-resin-cart'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  size?: string
}

/* =========================================================
   PRODUCT
   ========================================================= */

const route = useRoute()

const product = computed(() =>
  getProductById(String(route.params.id))
)

/* =========================================================
   CATEGORY
   ========================================================= */

const categoryLabel = computed(() => {
  return (
    categories.find(
      category => category.id === product.value?.category
    )?.label ?? ''
  )
})

/* =========================================================
   DESCRIPTION
   ========================================================= */

const description = computed(() => {
  return (
    product.value?.description ||
    'A handcrafted resin piece, made with care by Royal Resin Art. Custom colours and designs are available on request.'
  )
})

/* =========================================================
   RELATED PRODUCTS
   ========================================================= */

const relatedProducts = computed(() => {
  const current = product.value

  if (!current) return []

  return products.filter(item => {
    return (
      item.category === current.category &&
      item.id !== current.id
    )
  })
})

/* =========================================================
   SIZE SELECTION
   ========================================================= */

const selectedSize = ref<string | null>(null)

watch(
  product,
  current => {
    selectedSize.value =
      current?.sizes?.[0]?.label ?? null
  },
  { immediate: true }
)

const selectSize = (label: string) => {
  selectedSize.value = label
}

/* =========================================================
   ACTIVE PRICE
   ========================================================= */

const activePrice = computed<number | undefined>(() => {
  const current = product.value

  if (!current) return undefined

  if (current.sizes && current.sizes.length) {
    const match = current.sizes.find(
      size => size.label === selectedSize.value
    )

    return (match ?? current.sizes[0]).price
  }

  return hasPrice(current)
    ? current.price
    : undefined
})

/* =========================================================
   PRICE
   ========================================================= */

const formatPrice = (value: number) =>
  `${currency} ${Number(value).toLocaleString()}`

/* =========================================================
   QUANTITY
   ========================================================= */

const quantity = ref(1)

const decrease = () => {
  if (quantity.value > 1) {
    quantity.value -= 1
  }
}

const increase = () => {
  if (quantity.value < 99) {
    quantity.value += 1
  }
}

/* =========================================================
   CART
   ========================================================= */

const added = ref(false)

let addedTimeout: ReturnType<typeof setTimeout> | null = null

const readCart = (): CartItem[] => {
  try {
    const parsed = JSON.parse(
      localStorage.getItem(CART_STORAGE_KEY) || '[]'
    )

    return Array.isArray(parsed)
      ? parsed
      : []
  } catch {
    return []
  }
}

const addToCart = () => {
  const item = product.value
  const price = activePrice.value

  if (!item || price === undefined) return

  const cart = readCart()

  const existing = cart.find(
    cartItem =>
      cartItem.id === item.id &&
      cartItem.size ===
        (selectedSize.value ?? undefined)
  )

  if (existing) {
    existing.quantity += quantity.value
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price,
      image: item.image || '',
      quantity: quantity.value,
      size: selectedSize.value ?? undefined
    })
  }

  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify(cart)
  )

  window.dispatchEvent(
    new CustomEvent('royal-cart-updated', {
      detail: cart
    })
  )

  added.value = true

  if (addedTimeout) {
    clearTimeout(addedTimeout)
  }

  addedTimeout = setTimeout(() => {
    added.value = false
  }, 1500)
}

/* =========================================================
   PAGE TITLE
   ========================================================= */

watch(
  product,
  current => {
    if (typeof document === 'undefined') return

    document.title = current
      ? `${current.name} — Royal Resin Art`
      : 'Product not found — Royal Resin Art'
  },
  { immediate: true }
)

/* =========================================================
   PRODUCT CHANGE
   ========================================================= */

watch(
  () => route.params.id,
  () => {
    quantity.value = 1
    added.value = false

    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
)

/* =========================================================
   CLEANUP
   ========================================================= */

onUnmounted(() => {
  if (addedTimeout) {
    clearTimeout(addedTimeout)
  }
})

</script>

<template>

  <section class="pd-section">

    <div class="pd-inner">

      <!-- ===================================================
           NOT FOUND
           =================================================== -->

      <div
        v-if="!product"
        class="pd-empty"
      >

        <h1>
          Product not found
        </h1>

        <p>
          Ye product available nahi hai ya link
          ghalat hai.
        </p>

        <RouterLink
          to="/shop"
          class="pd-button pd-button-primary"
        >
          Back to Shop
        </RouterLink>

      </div>

      <template v-else>

        <!-- ===================================================
             BREADCRUMB
             =================================================== -->

        <nav
          class="pd-breadcrumb"
          aria-label="Breadcrumb"
        >

          <RouterLink to="/shop">
            Shop
          </RouterLink>

          <span aria-hidden="true">
            /
          </span>

          <RouterLink
            :to="`/shop?category=${product.category}`"
            class="pd-breadcrumb-category"
          >
            {{ categoryLabel }}
          </RouterLink>

          <span aria-hidden="true">
            /
          </span>

          <span
            class="pd-breadcrumb-current"
            aria-current="page"
          >
            {{ product.name }}
          </span>

        </nav>

        <!-- ===================================================
             PRODUCT
             =================================================== -->

        <div class="pd-layout">

          <!-- IMAGE -->

          <div class="pd-media">

            <img
              v-if="product.image"
              :src="product.image"
              :alt="product.name"
              class="pd-image"
            />

            <div
              v-else
              class="pd-placeholder"
              aria-hidden="true"
            >

              <svg viewBox="0 0 24 24">

                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="16"
                  rx="2"
                />

                <circle
                  cx="9"
                  cy="10"
                  r="1.6"
                />

                <path
                  d="m4 18 5-5 4 4 3-3 4 4"
                />

              </svg>

            </div>

          </div>

          <!-- INFO -->

          <div class="pd-info">

            <p class="pd-category">
              {{ categoryLabel }}
            </p>

            <h1 class="pd-title">
              {{ product.name }}
            </h1>

            <p
              v-if="activePrice !== undefined"
              class="pd-price"
            >
              {{ formatPrice(activePrice) }}
            </p>

            <p
              v-if="product.note"
              class="pd-note"
            >
              {{ product.note }}
            </p>

            <!-- SIZE SELECTOR -->

            <div
              v-if="product.sizes && product.sizes.length"
              class="pd-sizes"
            >

              <p class="pd-sizes-label">
                Select Size
              </p>

              <div
                class="pd-size-options"
                role="group"
                aria-label="Select size"
              >

                <button
                  v-for="size in product.sizes"
                  :key="size.label"
                  type="button"
                  class="pd-size-button"
                  :class="{
                    'is-active':
                      selectedSize === size.label
                  }"
                  :aria-pressed="
                    selectedSize === size.label
                  "
                  @click="selectSize(size.label)"
                >
                  {{ size.label }}
                </button>

              </div>

            </div>

            <p class="pd-description">
              {{ description }}
            </p>

            <ul class="pd-points">

              <li>
                Handcrafted resin piece
              </li>

              <li>
                Custom colours &amp; designs on request
              </li>

            </ul>

            <!-- BUY -->

            <div
              v-if="activePrice !== undefined"
              class="pd-buy"
            >

              <div
                class="pd-qty"
                role="group"
                aria-label="Quantity"
              >

                <button
                  type="button"
                  aria-label="Decrease quantity"
                  :disabled="quantity <= 1"
                  @click="decrease"
                >
                  −
                </button>

                <span aria-live="polite">
                  {{ quantity }}
                </span>

                <button
                  type="button"
                  aria-label="Increase quantity"
                  :disabled="quantity >= 99"
                  @click="increase"
                >
                  +
                </button>

              </div>

              <button
                type="button"
                class="pd-button pd-button-primary"
                :class="{ 'is-added': added }"
                @click="addToCart"
              >
                {{
                  added
                    ? 'Added to Cart ✓'
                    : 'Add to Cart'
                }}
              </button>

            </div>

            <!-- SECONDARY ACTIONS -->

            <div class="pd-secondary-actions">

              <a
                href="/#contact"
                class="pd-button pd-button-outline"
              >
                Ask about a custom order
              </a>

              <RouterLink
                to="/shop"
                class="pd-button pd-button-outline"
              >
                Continue shopping
              </RouterLink>

            </div>

          </div>

        </div>

        <!-- ===================================================
             RELATED PRODUCTS
             =================================================== -->

        <div
          v-if="relatedProducts.length"
          class="pd-related"
        >

          <div class="pd-related-heading">

            <div>

              <p class="pd-related-eyebrow">
                Explore more
              </p>

              <h2 class="pd-related-title">
                More from {{ categoryLabel }}
              </h2>

            </div>

            <RouterLink
              :to="`/shop?category=${product.category}`"
              class="pd-category-link"
            >
              View all →
            </RouterLink>

          </div>

          <ul class="pd-related-grid">

            <li
              v-for="item in relatedProducts"
              :key="item.id"
            >

              <RouterLink
                :to="`/product/${item.id}`"
                class="pd-related-card"
              >

                <span class="pd-related-media">

                  <img
                    v-if="item.image"
                    :src="item.image"
                    :alt="item.name"
                    loading="lazy"
                  />

                  <span
                    v-else
                    class="pd-related-placeholder"
                  >

                    <svg viewBox="0 0 24 24">

                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="16"
                        rx="2"
                      />

                      <circle
                        cx="9"
                        cy="10"
                        r="1.6"
                      />

                      <path
                        d="m4 18 5-5 4 4 3-3 4 4"
                      />

                    </svg>

                  </span>

                </span>

                <span class="pd-related-body">

                  <span class="pd-related-name">
                    {{ item.name }}
                  </span>

                  <span
                    v-if="hasPrice(item)"
                    class="pd-related-price"
                  >
                    {{ formatPrice(item.price) }}
                  </span>

                  <span
                    v-else
                    class="pd-related-note"
                  >
                    Custom order
                  </span>

                </span>

              </RouterLink>

            </li>

          </ul>

        </div>

      </template>

    </div>

  </section>

</template>

<style scoped>

/* =========================================================
   MAIN
   ========================================================= */

.pd-section {
  width: 100%;
  min-height: 100svh;
  padding:
    calc(var(--space-4xl) + var(--space-md))
    0
    var(--space-3xl);

  background: var(--color-bg-dark);
  color: var(--color-text-primary);

  overflow-x: hidden;
  box-sizing: border-box;
}

.pd-inner {
  width: min(1200px, calc(100% - var(--space-xl)));
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

/* =========================================================
   BREADCRUMB
   ========================================================= */

.pd-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-sm);

  width: 100%;
  margin-bottom: var(--space-xl);

  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: 13px;
  line-height: 1.6;
}

.pd-breadcrumb a {
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.pd-breadcrumb a:hover {
  color: var(--color-accent-light);
}

.pd-breadcrumb-current {
  color: var(--color-accent);
  overflow-wrap: anywhere;
}

.pd-breadcrumb-category {
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.pd-breadcrumb-category:hover {
  color: var(--color-accent);
}

/* =========================================================
   PRODUCT LAYOUT
   ========================================================= */

.pd-layout {
  display: grid;
  grid-template-columns:
    minmax(0, 1fr)
    minmax(0, 1fr);

  gap: clamp(
    var(--space-xl),
    4vw,
    var(--space-3xl)
  );

  align-items: start;
  width: 100%;
  min-width: 0;
}

/* =========================================================
   IMAGE
   ========================================================= */

.pd-media {
  width: 100%;
  min-width: 0;
  overflow: hidden;

  aspect-ratio: 1 / 1;

  background: var(--color-surface-dark);
  border: 1px solid var(--color-border-dark-soft);
  border-radius: var(--radius-lg);

  box-sizing: border-box;
}

.pd-image {
  display: block;
  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center;

  transition: transform 0.5s ease;
}

.pd-media:hover .pd-image {
  transform: scale(1.015);
}

.pd-placeholder {
  width: 100%;
  height: 100%;

  display: grid;
  place-items: center;
}

.pd-placeholder svg {
  width: 56px;
  height: 56px;

  fill: none;
  stroke: var(--color-icon-primary);
  stroke-width: 1.3;
  stroke-linecap: round;
  stroke-linejoin: round;

  opacity: 0.6;
}

/* =========================================================
   INFO
   ========================================================= */

.pd-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  min-width: 0;
}

.pd-category {
  margin: 0 0 var(--space-sm);

  color: var(--color-accent);
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 3px;
  line-height: 1.5;
  text-transform: uppercase;
}

.pd-title {
  width: 100%;
  max-width: 680px;

  margin: 0;

  font-family: var(--font-heading);
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -1px;

  overflow-wrap: anywhere;
}

.pd-price {
  margin: var(--space-md) 0 0;

  color: var(--color-accent);
  font-family: var(--font-body);
  font-size: clamp(20px, 2vw, 24px);
  font-weight: 600;
}

.pd-note {
  margin: var(--space-sm) 0 0;

  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: 13px;
  line-height: 1.6;

  overflow-wrap: anywhere;
}

/* =========================================================
   SIZE SELECTOR
   ========================================================= */

.pd-sizes {
  width: 100%;
  margin: var(--space-lg) 0 0;
}

.pd-sizes-label {
  margin: 0 0 var(--space-sm);

  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.pd-size-options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);

  max-width: 100%;
}

.pd-size-button {
  min-width: 56px;
  min-height: 40px;

  padding: 0 var(--space-md);

  background: var(--color-surface-dark);
  border: 1px solid var(--color-border-dark-soft);
  border-radius: var(--radius-md);

  color: var(--color-text-secondary);
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;

  cursor: pointer;

  transition:
    color 0.3s ease,
    background 0.3s ease,
    border-color 0.3s ease;
}

.pd-size-button:hover {
  color: var(--color-accent-light);
  border-color: var(--color-border-dark);
}

.pd-size-button.is-active {
  background: var(--color-button-primary);
  border-color: var(--color-button-primary);
  color: var(--color-button-primary-text);
}

.pd-size-button:focus-visible {
  outline: 2px solid var(--color-accent-light);
  outline-offset: 2px;
}

/* =========================================================
   DESCRIPTION
   ========================================================= */

.pd-description {
  width: 100%;
  max-width: 680px;

  margin: var(--space-lg) 0 0;

  color: var(--color-text-secondary);
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.8;

  overflow-wrap: anywhere;
}

.pd-points {
  display: grid;
  gap: var(--space-xs);

  width: 100%;

  margin:
    var(--space-lg)
    0
    var(--space-xl);

  padding: 0;

  list-style: none;

  color: var(--color-text-secondary);
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.6;
}

.pd-points li {
  overflow-wrap: anywhere;
}

.pd-points li::before {
  content: '✓';
  margin-right: var(--space-sm);
  color: var(--color-accent);
}

/* =========================================================
   BUY
   ========================================================= */

.pd-buy {
  display: flex;
  align-items: center;

  gap: var(--space-md);

  width: 100%;
  min-width: 0;

  margin-bottom: var(--space-md);
}

.pd-qty {
  display: inline-flex;
  align-items: center;

  flex-shrink: 0;

  background: var(--color-surface-dark);
  border: 1px solid var(--color-border-dark-soft);
  border-radius: var(--radius-md);

  overflow: hidden;
}

.pd-qty button {
  width: 40px;
  height: 46px;

  flex-shrink: 0;

  background: transparent;
  border: 0;

  color: var(--color-text-primary);
  font-size: 18px;

  cursor: pointer;
}

.pd-qty button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pd-qty span {
  min-width: 32px;

  text-align: center;

  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 600;
}

/* =========================================================
   BUTTONS
   ========================================================= */

.pd-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 46px;

  padding:
    0
    var(--space-lg);

  border-radius: var(--radius-sm);

  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;

  text-decoration: none;
  text-align: center;

  cursor: pointer;

  transition:
    transform 0.3s ease,
    background 0.3s ease,
    border-color 0.3s ease;

  box-sizing: border-box;
}

.pd-button-primary {
  flex: 1;
  min-width: 0;

  background: var(--color-button-primary);
  border: 1px solid var(--color-button-primary);

  box-shadow: var(--shadow-gold);

  color: var(--color-button-primary-text);
}

.pd-button-primary:hover {
  background: var(--color-button-primary-hover);
  border-color: var(--color-button-primary-hover);
  transform: translateY(-2px);
}

.pd-button-primary.is-added {
  background: var(--color-button-dark);
  border-color: var(--color-button-dark);
  color: var(--color-button-dark-text);
}

/* =========================================================
   SECONDARY ACTIONS
   ========================================================= */

.pd-secondary-actions {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: var(--space-md);

  width: 100%;
  min-width: 0;
}

.pd-button-outline {
  width: 100%;
  min-width: 0;

  background: transparent;
  border: 1px solid var(--color-border-dark);

  color: var(--color-accent);

  white-space: normal;
  overflow-wrap: anywhere;
}

.pd-button-outline:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

/* =========================================================
   FOCUS
   ========================================================= */

.pd-button:focus-visible,
.pd-qty button:focus-visible,
.pd-back:focus-visible,
.pd-related-card:focus-visible,
.pd-category-link:focus-visible {
  outline: 2px solid var(--color-accent-light);
  outline-offset: 3px;
}

/* =========================================================
   EMPTY
   ========================================================= */

.pd-empty {
  display: grid;
  justify-items: center;
  gap: var(--space-md);

  padding:
    var(--space-3xl)
    var(--space-lg);

  text-align: center;

  font-family: var(--font-body);
  color: var(--color-text-secondary);
}

.pd-empty h1 {
  margin: 0;

  color: var(--color-text-primary);
  font-family: var(--font-heading);
  font-weight: 500;
}

.pd-empty p {
  margin: 0;
}

/* =========================================================
   RELATED
   ========================================================= */

.pd-related {
  width: 100%;
  min-width: 0;

  margin-top: var(--space-3xl);
}

.pd-related-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: var(--space-lg);

  margin-bottom: var(--space-lg);
}

.pd-related-eyebrow {
  margin: 0 0 var(--space-xs);

  color: var(--color-accent);
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2.5px;
  text-transform: uppercase;
}

.pd-related-title {
  margin: 0;

  font-family: var(--font-heading);
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 500;

  overflow-wrap: anywhere;
}

.pd-category-link {
  flex-shrink: 0;

  color: var(--color-text-secondary);
  font-family: var(--font-body);
  font-size: 13px;
  text-decoration: none;

  transition: color 0.3s ease;
}

.pd-category-link:hover {
  color: var(--color-accent);
}

/* =========================================================
   RELATED GRID
   ========================================================= */

.pd-related-grid {
  display: grid;

  grid-template-columns:
    repeat(4, minmax(0, 1fr));

  gap: var(--space-md);

  width: 100%;
  min-width: 0;

  margin: 0;
  padding: 0;

  list-style: none;
}

.pd-related-grid > li {
  min-width: 0;
}

.pd-related-card {
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  min-width: 0;

  overflow: hidden;

  background: var(--color-surface-dark);
  border: 1px solid var(--color-border-dark-soft);
  border-radius: var(--radius-lg);

  text-decoration: none;

  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.3s ease;

  box-sizing: border-box;
}

.pd-related-card:hover {
  border-color: var(--color-border-dark);
  box-shadow: var(--shadow-card);
  transform: translateY(-3px);
}

.pd-related-media {
  display: block;

  width: 100%;
  aspect-ratio: 1 / 1;

  overflow: hidden;
}

.pd-related-media img {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;

  transition: transform 0.4s ease;
}

.pd-related-card:hover .pd-related-media img {
  transform: scale(1.04);
}

.pd-related-placeholder {
  display: grid;

  width: 100%;
  height: 100%;

  place-items: center;

  background: var(--color-surface-dark);
}

.pd-related-placeholder svg {
  width: 42px;
  height: 42px;

  fill: none;
  stroke: var(--color-icon-primary);
  stroke-width: 1.3;
  stroke-linecap: round;
  stroke-linejoin: round;

  opacity: 0.6;
}

.pd-related-body {
  display: flex;
  flex-direction: column;

  gap: var(--space-xs);

  min-width: 0;

  padding: var(--space-md);
}

.pd-related-name {
  color: var(--color-text-primary);
  font-family: var(--font-heading);
  font-size: 17px;
  line-height: 1.35;

  overflow-wrap: anywhere;
}

.pd-related-price {
  color: var(--color-accent);
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
}

.pd-related-note {
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: 12px;
}

/* =========================================================
   LARGE DESKTOP
   ========================================================= */

@media (min-width: 1440px) {

  .pd-inner {
    width: min(
      1320px,
      calc(100% - var(--space-2xl))
    );
  }

  .pd-layout {
    gap: var(--space-3xl);
  }

  .pd-title {
    font-size: clamp(42px, 3.2vw, 56px);
  }

}

/* =========================================================
   TABLET / SMALL LAPTOP
   ========================================================= */

@media (max-width: 1100px) {

  .pd-inner {
    width: min(
      100%,
      calc(100% - var(--space-xl))
    );
  }

  .pd-layout {
    gap: var(--space-xl);
  }

  .pd-related-grid {
    grid-template-columns:
      repeat(3, minmax(0, 1fr));
  }

}

/* =========================================================
   TABLET
   ========================================================= */

@media (max-width: 900px) {

  .pd-section {
    padding-top:
      calc(var(--space-3xl) + var(--space-md));
  }

  .pd-layout {
    grid-template-columns:
      minmax(0, 1fr);

    gap: var(--space-2xl);
  }

  .pd-media {
    width: 100%;
    max-width: 760px;
    margin: 0 auto;
  }

  .pd-info {
    width: 100%;
  }

  .pd-title {
    max-width: 760px;
  }

  .pd-description {
    max-width: 760px;
  }

  .pd-related-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

}

/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 560px) {

  .pd-section {
    padding:
      var(--space-4xl)
      0
      var(--space-2xl);
  }

  .pd-inner {
    width: calc(100% - var(--space-md));
    max-width: none;
  }

  /* Breadcrumb */

  .pd-breadcrumb {
    gap: 5px var(--space-xs);
    margin-bottom: var(--space-lg);

    font-size: 12px;
  }

  /* Product */

  .pd-layout {
    gap: var(--space-xl);
  }

  .pd-media {
    border-radius: var(--radius-md);
  }

  .pd-title {
    font-size: clamp(30px, 9vw, 40px);
    letter-spacing: -0.5px;
  }

  .pd-price {
    font-size: 20px;
  }

  .pd-description {
    font-size: 14px;
    line-height: 1.75;
  }

  .pd-points {
    font-size: 13px;
  }

  /* Sizes */

  .pd-size-options {
    gap: var(--space-xs);
  }

  .pd-size-button {
    min-width: 52px;
    min-height: 40px;

    padding:
      0
      var(--space-sm);
  }

  /* Buy */

  .pd-buy {
    flex-direction: row;
    align-items: stretch;
    gap: var(--space-sm);
  }

  .pd-qty {
    flex-shrink: 0;
  }

  .pd-qty button {
    width: 38px;
  }

  .pd-button-primary {
    min-width: 0;
    padding:
      0
      var(--space-md);

    white-space: nowrap;
  }

  /* Secondary */

  .pd-secondary-actions {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    gap: var(--space-sm);
  }

  .pd-button-outline {
    min-height: 44px;

    padding:
      0
      var(--space-sm);

    font-size: 11px;
    line-height: 1.35;
  }

  /* Related heading */

  .pd-related {
    margin-top: var(--space-2xl);
  }

  .pd-related-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .pd-related-title {
    font-size: 25px;
  }

  /* IMPORTANT:
     Mobile = 2 products per row
  */

  .pd-related-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    gap: var(--space-sm);
  }

  .pd-related-card {
    border-radius: var(--radius-md);
  }

  .pd-related-body {
    padding: var(--space-sm);
  }

  .pd-related-name {
    font-size: 14px;
    line-height: 1.3;
  }

  .pd-related-price {
    font-size: 12px;
  }

  .pd-related-note {
    font-size: 11px;
  }

}

/* =========================================================
   SMALL MOBILE
   ========================================================= */

@media (max-width: 380px) {

  .pd-inner {
    width: calc(100% - var(--space-sm));
  }

  .pd-title {
    font-size: 29px;
  }

  .pd-category {
    font-size: 10px;
    letter-spacing: 2.5px;
  }

  .pd-buy {
    gap: var(--space-xs);
  }

  .pd-qty button {
    width: 34px;
  }

  .pd-qty span {
    min-width: 27px;
  }

  .pd-button-primary {
    padding:
      0
      var(--space-sm);

    font-size: 12px;
  }

  .pd-secondary-actions {
    gap: 6px;
  }

  .pd-button-outline {
    padding:
      0
      5px;

    font-size: 10px;
  }

  .pd-related-grid {
    gap: 6px;
  }

  .pd-related-body {
    padding: 9px;
  }

  .pd-related-name {
    font-size: 13px;
  }

}

/* =========================================================
   VERY SMALL MOBILE
   ========================================================= */

@media (max-width: 320px) {

  .pd-inner {
    width: calc(100% - 12px);
  }

  .pd-related-name {
    font-size: 12px;
  }

  .pd-related-price {
    font-size: 11px;
  }

  .pd-related-body {
    padding: 7px;
  }

}

/* =========================================================
   REDUCED MOTION
   ========================================================= */

@media (prefers-reduced-motion: reduce) {

  .pd-button,
  .pd-related-card,
  .pd-related-media img,
  .pd-breadcrumb a,
  .pd-back,
  .pd-category-link,
  .pd-size-button,
  .pd-image {
    transition: none;
  }

  .pd-button-primary:hover,
  .pd-button-outline:hover,
  .pd-related-card:hover,
  .pd-media:hover .pd-image {
    transform: none;
  }

  .pd-related-card:hover
  .pd-related-media img {
    transform: none;
  }

}

</style>