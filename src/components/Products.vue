<script setup lang="ts">

/* =========================================================
   IMPORTS
   ========================================================= */

import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

import AddToCartButton from '../components/AddtoCart.vue'

import {
  products,
  categories,
  hasPrice,
  type Product
} from '../data/products'


/* =========================================================
   PROPS
   ========================================================= */

defineProps({
  isPage: {
    type: Boolean,
    default: false
  }
})


/* =========================================================
   PAGE TITLE
   ========================================================= */

onMounted(() => {
  document.title = 'Royal Resin Studio'
})


/* =========================================================
   CATEGORY LABEL
   ========================================================= */

const categoryLabel = (id: string) => {

  return categories.find(
    (category) => category.id === id
  )?.label

}


/* =========================================================
   FILTERING
   ========================================================= */

const activeCategory = ref('all')


const visibleProducts = computed<Product[]>(() => {

  if (activeCategory.value === 'all') {
    return products
  }

  return products.filter(
    (product) =>
      product.category === activeCategory.value
  )

})


/* =========================================================
   PRODUCT COUNT
   ========================================================= */

const countFor = (id: string) => {

  if (id === 'all') {
    return products.length
  }

  return products.filter(
    (product) =>
      product.category === id
  ).length

}


/* =========================================================
   INFINITE CATEGORY LOOP
   ========================================================= */

/*
  6 copies are rendered.

  Animation moves exactly 50% of the complete track.
  Because the track contains repeated identical sets,
  the next identical set is already underneath the viewport.

  This makes the loop visually continuous on:
  - Desktop
  - Laptop
  - Tablet
  - Mobile
*/

const isCategoryLoopPaused = ref(false)


const pauseCategoryLoop = () => {

  isCategoryLoopPaused.value = true

}


const resumeCategoryLoop = () => {

  isCategoryLoopPaused.value = false

}


/* =========================================================
   CLEANUP
   ========================================================= */

onBeforeUnmount(() => {

  isCategoryLoopPaused.value = false

})

</script>


<template>

  <section
    id="shop"
    class="shop-section"
    :class="{ 'is-page': isPage }"
  >

    <div class="shop-inner">


      <!-- =====================================================
           HEADER
           ===================================================== -->

      <div class="shop-header">

        <div class="shop-heading">

          <p class="eyebrow">
            HANDCRAFTED RESIN
          </p>


          <component
            :is="isPage ? 'h1' : 'h2'"
            class="shop-title"
          >

            Our

            <span>
              Shop
            </span>

          </component>

        </div>


        <p class="shop-intro">

          Browse all
          <!-- {{ products.length }} -->
          handcrafted resin pieces.

          Custom orders are always welcome.

        </p>

      </div>


      <!-- =====================================================
           FILTERS
           ===================================================== -->

      <div class="shop-toolbar">

        <div
          class="filter-wrapper"
          @mouseenter="pauseCategoryLoop"
          @mouseleave="resumeCategoryLoop"
          @focusin="pauseCategoryLoop"
          @focusout="resumeCategoryLoop"
        >

          <!-- =================================================
               INFINITE CATEGORY MARQUEE
               DESKTOP + TABLET + MOBILE
               ================================================= -->

          <div
            class="filter-marquee"
            :class="{
              'is-paused': isCategoryLoopPaused
            }"
          >

            <div class="filter-track">

              <!--
                6 IDENTICAL SETS

                Only first set is exposed to screen readers.
                Remaining copies are decorative duplicates.
              -->

              <div
                v-for="copy in 6"
                :key="`category-set-${copy}`"
                class="filter-set"
                :aria-hidden="copy !== 1 ? 'true' : undefined"
              >

                <button
                  v-for="category in categories"
                  :key="`${copy}-${category.id}`"
                  type="button"
                  class="filter-button"
                  :class="{
                    'is-active':
                      activeCategory === category.id
                  }"
                  :aria-pressed="
                    activeCategory === category.id
                  "
                  :tabindex="copy === 1 ? 0 : -1"
                  @click="
                    activeCategory = category.id
                  "
                >

                  <span class="filter-label">
                    {{ category.label }}
                  </span>

                  <span class="filter-count">
                    {{ countFor(category.id) }}
                  </span>

                </button>

              </div>

            </div>

          </div>

        </div>


        <!-- =================================================
             RESULT COUNT
             ================================================= -->

        <p
          class="result-count"
          aria-live="polite"
        >

          {{ visibleProducts.length }}

          products

        </p>

      </div>


      <!-- =====================================================
           PRODUCT GRID
           ===================================================== -->

      <ul class="product-grid">

        <li
          v-for="product in visibleProducts"
          :key="product.id"
        >

          <article class="product-card">


            <!-- =================================================
                 IMAGE
                 ================================================= -->

            <RouterLink
              :to="`/product/${product.id}`"
              class="product-media"
              :aria-label="`View ${product.name}`"
            >

              <img
                v-if="product.image"
                :src="product.image"
                :alt="product.name"
                class="product-image"
                loading="lazy"
              />


              <div
                v-else
                class="product-placeholder"
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

            </RouterLink>


            <!-- =================================================
                 PRODUCT INFO
                 ================================================= -->

            <div class="product-info">

              <p class="product-category">
                {{ categoryLabel(product.category) }}
              </p>


              <!-- TITLE -->

              <h3>

                <RouterLink
                  :to="`/product/${product.id}`"
                  class="product-title-link"
                >

                  {{ product.name }}

                </RouterLink>

              </h3>


              <!-- NOTE -->

              <p
                v-if="product.note"
                class="product-note"
              >

                {{ product.note }}

              </p>


              <!-- =================================================
                   FOOTER
                   ================================================= -->

              <div class="product-footer">


                <!-- PRICE -->

                <span
                  v-if="hasPrice(product)"
                  class="product-price"
                >

                  Rs
                  {{ product.price.toLocaleString() }}

                </span>


                <!-- =================================================
                     ADD TO CART
                     ================================================= -->

                <div class="cart-button-wrap">

                  <AddToCartButton
                    :product="{
                      id: product.id,
                      name: product.name,
                      price: Number(product.price || 0),
                      image: product.image || ''
                    }"
                  />

                </div>

              </div>

            </div>

          </article>

        </li>

      </ul>

    </div>

  </section>

</template>


<style scoped>

/* =========================================================
   SECTION
   ========================================================= */

.shop-section {

  width: 100%;

  padding:
    var(--space-4xl)
    0;

  background:
    var(--color-bg-dark);

  color:
    var(--color-text-primary);

  scroll-margin-top:
    80px;

  box-sizing:
    border-box;

  overflow:
    hidden;
}


.shop-section.is-page {

  min-height:
    100svh;

  padding-top:
    calc(
      var(--space-4xl)
      +
      var(--space-lg)
    );

}


/* =========================================================
   CONTAINER
   ========================================================= */

.shop-inner {

  width:
    min(
      1240px,
      calc(100% - var(--space-4xl))
    );

  margin:
    0 auto;

  box-sizing:
    border-box;

  min-width:
    0;

}


/* =========================================================
   HEADER
   ========================================================= */

.shop-header {

  display:
    flex;

  align-items:
    flex-end;

  justify-content:
    space-between;

  gap:
    var(--space-2xl);

  margin-bottom:
    var(--space-2xl);

  min-width:
    0;

}


.shop-heading {

  min-width:
    0;

}


.eyebrow {

  margin:
    0
    0
    var(--space-md);

  color:
    var(--color-accent);

  font-family:
    var(--font-body);

  font-size:
    11px;

  font-weight:
    600;

  letter-spacing:
    3px;

  line-height:
    1.4;

}


.shop-title {

  margin:
    0;

  color:
    var(--color-text-primary);

  font-family:
    var(--font-heading);

  font-size:
    clamp(
      36px,
      4vw,
      56px
    );

  font-weight:
    500;

  line-height:
    1.1;

  letter-spacing:
    -1.2px;

}


.shop-title span {

  display:
    block;

}


.shop-intro {

  width:
    100%;

  max-width:
    340px;

  margin:
    0;

  color:
    var(--color-text-secondary);

  font-family:
    var(--font-body);

  font-size:
    15px;

  line-height:
    1.8;

}


/* =========================================================
   TOOLBAR
   ========================================================= */

.shop-toolbar {

  display:
    flex;

  align-items:
    center;

  justify-content:
    space-between;

  gap:
    var(--space-lg);

  margin-bottom:
    var(--space-xl);

  padding-bottom:
    var(--space-lg);

  border-bottom:
    1px solid
    var(--color-border-dark-soft);

  min-width:
    0;

}


/* =========================================================
   FILTER WRAPPER
   ========================================================= */

.filter-wrapper {

  position:
    relative;

  flex:
    1;

  min-width:
    0;

  width:
    100%;

  overflow:
    hidden;

}


/* =========================================================
   INFINITE MARQUEE
   ========================================================= */

.filter-marquee {

  width:
    100%;

  overflow:
    hidden;

  mask-image:
    linear-gradient(
      to right,
      transparent 0%,
      black 4%,
      black 96%,
      transparent 100%
    );

  -webkit-mask-image:
    linear-gradient(
      to right,
      transparent 0%,
      black 4%,
      black 96%,
      transparent 100%
    );

}


/* =========================================================
   TRACK
   ========================================================= */

.filter-track {

  display:
    flex;

  width:
    max-content;

  align-items:
    center;

  animation:
    categoryInfiniteLoop
    32s
    linear
    infinite;

  will-change:
    transform;

}


/*
  Same animation on every screen.

  Because 6 identical category sets exist,
  moving 50% of the track lands on another
  identical sequence.
*/

.filter-marquee.is-paused
.filter-track {

  animation-play-state:
    paused;

}


/* =========================================================
   CATEGORY SET
   ========================================================= */

.filter-set {

  display:
    flex;

  align-items:
    center;

  gap:
    var(--space-sm);

  flex-shrink:
    0;

  padding-right:
    var(--space-sm);

}


/* =========================================================
   FILTER BUTTON
   ========================================================= */

.filter-button {

  display:
    inline-flex;

  align-items:
    center;

  justify-content:
    center;

  gap:
    var(--space-sm);

  min-height:
    40px;

  padding:
    0
    var(--space-md);

  flex:
    0 0 auto;

  white-space:
    nowrap;

  background:
    transparent;

  border:
    1px solid
    var(--color-border-dark-soft);

  border-radius:
    var(--radius-md);

  color:
    var(--color-text-secondary);

  font-family:
    var(--font-body);

  font-size:
    13px;

  font-weight:
    500;

  cursor:
    pointer;

  transition:
    background 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease;

  box-sizing:
    border-box;

}


.filter-button:hover {

  color:
    var(--color-accent-light);

  border-color:
    var(--color-border-dark);

}


.filter-button:focus-visible {

  outline:
    2px solid
    var(--color-accent-light);

  outline-offset:
    2px;

}


.filter-button.is-active {

  background:
    var(--color-button-primary);

  border-color:
    var(--color-button-primary);

  color:
    var(--color-button-primary-text);

}


.filter-count {

  color:
    var(--color-text-muted);

  font-size:
    11px;

}


.filter-button.is-active
.filter-count {

  color:
    var(--color-button-primary-text);

}


/* =========================================================
   RESULT COUNT
   ========================================================= */

.result-count {

  margin:
    0;

  flex-shrink:
    0;

  color:
    var(--color-text-muted);

  font-family:
    var(--font-body);

  font-size:
    13px;

  white-space:
    nowrap;

}


/* =========================================================
   INFINITE ANIMATION
   ========================================================= */

@keyframes categoryInfiniteLoop {

  from {

    transform:
      translate3d(0, 0, 0);

  }

  to {

    transform:
      translate3d(-50%, 0, 0);

  }

}


/* =========================================================
   PRODUCT GRID
   ========================================================= */

.product-grid {

  display:
    grid;

  grid-template-columns:
    repeat(
      4,
      minmax(0, 1fr)
    );

  gap:
    var(--space-lg);

  margin:
    0;

  padding:
    0;

  list-style:
    none;

  width:
    100%;

  box-sizing:
    border-box;

}


.product-grid li {

  display:
    flex;

  min-width:
    0;

}


/* =========================================================
   PRODUCT CARD
   ========================================================= */

.product-card {

  flex:
    1;

  min-width:
    0;

  display:
    flex;

  flex-direction:
    column;

  overflow:
    hidden;

  background:
    var(--color-surface-dark);

  border:
    1px solid
    var(--color-border-dark-soft);

  border-radius:
    var(--radius-lg);

  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

}


.product-card:hover {

  border-color:
    var(--color-border-dark);

  box-shadow:
    var(--shadow-card);

}


/* =========================================================
   IMAGE
   ========================================================= */

.product-media {

  position:
    relative;

  display:
    block;

  width:
    100%;

  aspect-ratio:
    1 / 1;

  overflow:
    hidden;

  cursor:
    pointer;

}


.product-media:focus-visible {

  outline:
    2px solid
    var(--color-accent-light);

  outline-offset:
    -2px;

}


.product-image {

  display:
    block;

  width:
    100%;

  height:
    100%;

  object-fit:
    cover;

  transition:
    transform 0.6s ease;

}


.product-card:hover
.product-image {

  transform:
    scale(1.05);

}


/* =========================================================
   PLACEHOLDER
   ========================================================= */

.product-placeholder {

  width:
    100%;

  height:
    100%;

  display:
    grid;

  place-items:
    center;

  background:
    linear-gradient(
      145deg,
      var(--color-surface-dark-soft) 0%,
      var(--color-brand-navy-light) 100%
    );

}


.product-placeholder svg {

  width:
    40px;

  height:
    40px;

  fill:
    none;

  stroke:
    var(--color-icon-primary);

  stroke-width:
    1.3;

  stroke-linecap:
    round;

  stroke-linejoin:
    round;

  opacity:
    0.6;

}


/* =========================================================
   INFO
   ========================================================= */

.product-info {

  flex:
    1;

  min-width:
    0;

  display:
    flex;

  flex-direction:
    column;

  padding:
    var(--space-md);

  box-sizing:
    border-box;

}


.product-category {

  margin:
    0
    0
    var(--space-xs);

  color:
    var(--color-text-muted);

  font-family:
    var(--font-body);

  font-size:
    11px;

}


.product-info h3 {

  margin:
    0;

  color:
    var(--color-text-primary);

  font-family:
    var(--font-heading);

  font-size:
    19px;

  font-weight:
    500;

  line-height:
    1.25;

  overflow-wrap:
    break-word;

}


.product-title-link {

  color:
    inherit;

  text-decoration:
    none;

  transition:
    color 0.3s ease;

}


.product-title-link:hover {

  color:
    var(--color-accent-light);

}


.product-title-link:focus-visible {

  outline:
    2px solid
    var(--color-accent-light);

  outline-offset:
    3px;

  border-radius:
    var(--radius-sm);

}


.product-note {

  margin:
    var(--space-sm)
    0
    0;

  color:
    var(--color-text-secondary);

  font-family:
    var(--font-body);

  font-size:
    12px;

  line-height:
    1.5;

  display:
    -webkit-box;

  -webkit-box-orient:
    vertical;

  -webkit-line-clamp:
    2;

  overflow:
    hidden;

}


/* =========================================================
   PRODUCT FOOTER
   ========================================================= */

.product-footer {

  display:
    flex;

  align-items:
    center;

  justify-content:
    space-between;

  gap:
    var(--space-sm);

  margin-top:
    auto;

  padding-top:
    var(--space-md);

  min-width:
    0;

}


/* =========================================================
   PRICE
   ========================================================= */

.product-price {

  color:
    var(--color-text-primary);

  font-family:
    var(--font-body);

  font-size:
    14px;

  font-weight:
    600;

  white-space:
    nowrap;

  flex:
    0 0 auto;

}


/* =========================================================
   ADD TO CART WRAPPER
   ========================================================= */

.cart-button-wrap {

  min-width:
    0;

  max-width:
    52%;

  flex:
    0 1 auto;

  display:
    flex;

  align-items:
    center;

  justify-content:
    flex-end;

}


/*
  These selectors target the actual button/component
  without changing your AddToCart.vue file.

  Desktop keeps the original feel.
*/

.cart-button-wrap :deep(button) {

  max-width:
    100%;

  white-space:
    nowrap;

}


/* =========================================================
   LARGE LAPTOP
   ========================================================= */

@media (max-width: 1200px) {

  .shop-inner {

    width:
      calc(100% - var(--space-3xl));

  }


  .product-grid {

    gap:
      var(--space-md);

  }


  .product-info {

    padding:
      var(--space-md);

  }

}


/* =========================================================
   LAPTOP
   ========================================================= */

@media (max-width: 1100px) {

  .product-grid {

    grid-template-columns:
      repeat(
        3,
        minmax(0, 1fr)
      );

  }


  .shop-toolbar {

    gap:
      var(--space-md);

  }


  .filter-track {

    animation-duration:
      29s;

  }

}


/* =========================================================
   TABLET
   ========================================================= */

@media (max-width: 900px) {

  .shop-header {

    align-items:
      flex-start;

    flex-direction:
      column;

    gap:
      var(--space-lg);

  }


  .shop-intro {

    max-width:
      600px;

  }


  .product-grid {

    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );

    gap:
      var(--space-md);

  }


  .filter-track {

    animation-duration:
      27s;

  }

}


/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 768px) {

  .shop-section {

    padding:
      var(--space-3xl)
      0;

  }


  .shop-section.is-page {

    min-height:
      auto;

    padding-top:
      calc(
        var(--space-4xl)
        +
        var(--space-sm)
      );

  }


  .shop-inner {

    width:
      calc(100% - var(--space-2xl));

  }


  .shop-header {

    margin-bottom:
      var(--space-xl);

  }


  .eyebrow {

    margin-bottom:
      var(--space-sm);

    font-size:
      10px;

    letter-spacing:
      2.5px;

  }


  .shop-title {

    font-size:
      clamp(
        34px,
        9vw,
        48px
      );

    letter-spacing:
      -0.8px;

  }


  .shop-intro {

    font-size:
      13.5px;

    line-height:
      1.7;

  }


  /* =======================================================
     MOBILE TOOLBAR
     ======================================================= */

  .shop-toolbar {

    flex-direction:
      column;

    align-items:
      flex-start;

    gap:
      var(--space-md);

    margin-bottom:
      var(--space-lg);

  }


  .filter-wrapper {

    width:
      100%;

  }


  /*
    KEEP THE SAME INFINITE LOOP ON MOBILE.

    No mobile replacement/scroll list.
  */

  .filter-marquee {

    display:
      block;

    width:
      calc(100% + 20px);

    margin-left:
      -10px;

    mask-image:
      linear-gradient(
        to right,
        transparent 0%,
        black 7%,
        black 93%,
        transparent 100%
      );

    -webkit-mask-image:
      linear-gradient(
        to right,
        transparent 0%,
        black 7%,
        black 93%,
        transparent 100%
      );

  }


  .filter-track {

    animation-duration:
      24s;

  }


  .filter-set {

    gap:
      7px;

    padding-right:
      7px;

  }


  .filter-button {

    min-height:
      36px;

    padding:
      0 11px;

    gap:
      6px;

    border-radius:
      var(--radius-sm);

    font-size:
      11px;

  }


  .filter-count {

    font-size:
      9px;

  }


  .result-count {

    font-size:
      12px;

  }


  /* =======================================================
     PRODUCT GRID
     2 PER ROW
     ======================================================= */

  .product-grid {

    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );

    gap:
      var(--space-md);

  }


  .product-card {

    border-radius:
      var(--radius-md);

  }


  .product-info {

    padding:
      10px;

  }


  .product-category {

    font-size:
      9px;

  }


  .product-info h3 {

    font-size:
      clamp(
        15px,
        4vw,
        18px
      );

    line-height:
      1.2;

  }


  .product-note {

    font-size:
      10px;

    line-height:
      1.45;

  }


  /* =======================================================
     MOBILE PRODUCT FOOTER
     ======================================================= */

  .product-footer {

    gap:
      5px;

    padding-top:
      9px;

  }


  .product-price {

    font-size:
      11px;

  }


  /*
    COMPACT ADD TO CART

    This prevents the button from becoming huge
    beside the price on mobile.
  */

  .cart-button-wrap {

    max-width:
      48%;

  }


  .cart-button-wrap :deep(button) {

    min-height:
      32px !important;

    height:
      32px !important;

    min-width:
      0 !important;

    width:
      auto !important;

    max-width:
      100% !important;

    padding:
      0 9px !important;

    gap:
      5px !important;

    border-radius:
      var(--radius-sm) !important;

    font-size:
      10px !important;

    line-height:
      1 !important;

  }


  .cart-button-wrap :deep(svg) {

    width:
      13px !important;

    height:
      13px !important;

  }

}


/* =========================================================
   SMALL MOBILE
   ========================================================= */

@media (max-width: 520px) {

  .shop-section {

    padding:
      var(--space-2xl)
      0;

  }


  .shop-inner {

    width:
      calc(100% - 24px);

  }


  .shop-title {

    font-size:
      clamp(
        30px,
        9vw,
        42px
      );

  }


  .shop-intro {

    font-size:
      12.5px;

    line-height:
      1.65;

  }


  /* =======================================================
     CATEGORY LOOP
     ======================================================= */

  .filter-marquee {

    width:
      calc(100% + 16px);

    margin-left:
      -8px;

  }


  .filter-track {

    animation-duration:
      21s;

  }


  .filter-set {

    gap:
      6px;

    padding-right:
      6px;

  }


  .filter-button {

    min-height:
      34px;

    padding:
      0 9px;

    gap:
      5px;

    font-size:
      10px;

  }


  .filter-count {

    font-size:
      8px;

  }


  /* =======================================================
     PRODUCTS
     ======================================================= */

  .product-grid {

    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );

    gap:
      10px;

  }


  .product-media {

    aspect-ratio:
      1 / 1;

  }


  .product-info {

    padding:
      9px;

  }


  .product-category {

    font-size:
      8.5px;

    margin-bottom:
      4px;

  }


  .product-info h3 {

    font-size:
      14px;

  }


  .product-note {

    font-size:
      9px;

    line-height:
      1.4;

    margin-top:
      5px;

  }


  .product-footer {

    padding-top:
      8px;

    gap:
      4px;

  }


  .product-price {

    font-size:
      10px;

  }


  /* =======================================================
     SMALLER ADD TO CART
     ======================================================= */

  .cart-button-wrap {

    max-width:
      50%;

  }


  .cart-button-wrap :deep(button) {

    min-height:
      29px !important;

    height:
      29px !important;

    padding:
      0 7px !important;

    gap:
      4px !important;

    font-size:
      9px !important;

    border-radius:
      6px !important;

  }


  .cart-button-wrap :deep(svg) {

    width:
      11px !important;

    height:
      11px !important;

  }

}


/* =========================================================
   VERY SMALL MOBILE
   STILL 2 PER ROW
   ========================================================= */

@media (max-width: 380px) {

  .shop-inner {

    width:
      calc(100% - 20px);

  }


  .filter-track {

    animation-duration:
      19s;

  }


  .filter-button {

    min-height:
      32px;

    padding:
      0 8px;

    font-size:
      9px;

  }


  .filter-count {

    font-size:
      7px;

  }


  .product-grid {

    gap:
      8px;

  }


  .product-info {

    padding:
      8px;

  }


  .product-category {

    font-size:
      8px;

  }


  .product-info h3 {

    font-size:
      13px;

  }


  .product-note {

    font-size:
      8px;

    line-height:
      1.35;

  }


  .product-price {

    font-size:
      9px;

  }


  .cart-button-wrap :deep(button) {

    min-height:
      27px !important;

    height:
      27px !important;

    padding:
      0 6px !important;

    font-size:
      8px !important;

  }


  .cart-button-wrap :deep(svg) {

    width:
      10px !important;

    height:
      10px !important;

  }

}


/* =========================================================
   ULTRA SMALL
   ========================================================= */

@media (max-width: 320px) {

  .shop-inner {

    width:
      calc(100% - 16px);

  }


  .product-grid {

    gap:
      7px;

  }


  .product-info {

    padding:
      7px;

  }


  .product-info h3 {

    font-size:
      12px;

  }


  .product-note {

    font-size:
      7.5px;

  }


  .product-price {

    font-size:
      9px;

  }


  .cart-button-wrap {

    max-width:
      52%;

  }


  .cart-button-wrap :deep(button) {

    min-height:
      25px !important;

    height:
      25px !important;

    padding:
      0 5px !important;

    font-size:
      7.5px !important;

  }


  .cart-button-wrap :deep(svg) {

    width:
      9px !important;

    height:
      9px !important;

  }

}


/* =========================================================
   REDUCED MOTION
   ========================================================= */

@media (prefers-reduced-motion: reduce) {

  .filter-track {

    animation:
      none;

  }


  .filter-button,
  .product-card,
  .product-image,
  .product-title-link {

    transition:
      none;

  }


  .product-card:hover
  .product-image {

    transform:
      none;

  }

}

</style>