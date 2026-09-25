<script setup lang="ts">

import AddToCartButton from '../components/AddtoCart.vue'

import {
  computed,
  onMounted,
  ref,
  watch
} from 'vue'

import { useRoute, useRouter } from 'vue-router'

import {
  products,
  categories,
  hasPrice
} from '../data/products'

import type { Product } from '../data/products'

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
   ROUTE
   ========================================================= */

const route = useRoute()
const router = useRouter()

/* =========================================================
   SETTINGS
   ========================================================= */

const currency = 'Rs'

/* =========================================================
   CATEGORY HELPERS
   ========================================================= */

const categoryLabel = (id: string) =>
  categories.find(category => category.id === id)?.label || id

/* =========================================================
   SORT / TOOLBAR OPTIONS
   ========================================================= */

const sortOptions = [
  {
    id: 'featured',
    label: 'Featured'
  },
  {
    id: 'price-asc',
    label: 'Price: Low to High'
  },
  {
    id: 'price-desc',
    label: 'Price: High to Low'
  },
  {
    id: 'top-rated',
    label: 'Top Rated'
  },
  {
    id: 'name-asc',
    label: 'Name: A-Z'
  }
]

const perPageOptions = [8, 12, 20]

const columnOptions = [2, 3, 4]

/* =========================================================
   PRICE BOUNDS
   ========================================================= */

const priceValues = products
  .filter(hasPrice)
  .map(product => product.price)

const priceMin = priceValues.length
  ? Math.min(...priceValues)
  : 0

const priceMax = priceValues.length
  ? Math.max(...priceValues)
  : 5000

const formatPrice = (value: number) =>
  `${currency} ${Number(value).toLocaleString()}`

/* =========================================================
   SHOP STATE
   ========================================================= */

const shopRoot = ref<HTMLElement | null>(null)

const activeCategory = ref(
  (route.query.category as string) || 'all'
)

const sortBy = ref('featured')

const perPage = ref(12)

const columns = ref(4)

const currentPage = ref(1)

const filtersOpen = ref(false)

/* =========================================================
   CUSTOM DROPDOWNS
   ========================================================= */

const sortOpen = ref(false)

const perPageOpen = ref(false)

const selectedSortLabel = computed(() =>
  sortOptions.find(
    option => option.id === sortBy.value
  )?.label || 'Featured'
)

/* =========================================================
   PRICE FILTER
   ========================================================= */

const minInput = ref(priceMin)

const maxInput = ref(priceMax)

const appliedMin = ref<number | null>(null)

const appliedMax = ref<number | null>(null)

/* =========================================================
   DROPDOWN HELPERS
   ========================================================= */

const closeDropdowns = () => {
  sortOpen.value = false
  perPageOpen.value = false
}

const toggleSort = () => {
  perPageOpen.value = false
  sortOpen.value = !sortOpen.value
}

const togglePerPage = () => {
  sortOpen.value = false
  perPageOpen.value = !perPageOpen.value
}

const selectSort = (id: string) => {
  sortBy.value = id
  sortOpen.value = false
}

const selectPerPage = (value: number) => {
  perPage.value = value
  perPageOpen.value = false
}

/* =========================================================
   PRICE SLIDER
   ========================================================= */

const sliderStyle = computed(() => {

  const range = priceMax - priceMin

  const value = Number(maxInput.value)

  const safeValue = Number.isFinite(value)
    ? value
    : priceMin

  const percent =
    range > 0
      ? Math.min(
          100,
          Math.max(
            0,
            ((safeValue - priceMin) / range) * 100
          )
        )
      : 100

  return {
    backgroundImage: `linear-gradient(
      to right,
      var(--color-accent) 0%,
      var(--color-accent) ${percent}%,
      var(--color-border-dark-soft) ${percent}%,
      var(--color-border-dark-soft) 100%
    )`
  }
})

const clampPrice = (
  value: number | string,
  fallback: number
) => {

  const number = Number(value)

  if (
    value === '' ||
    !Number.isFinite(number)
  ) {
    return fallback
  }

  return Math.min(
    priceMax,
    Math.max(priceMin, number)
  )
}

const isPriceFiltered = computed(
  () =>
    appliedMin.value !== null ||
    appliedMax.value !== null
)

const applyPrice = () => {

  let min = clampPrice(
    minInput.value,
    priceMin
  )

  let max = clampPrice(
    maxInput.value,
    priceMax
  )

  if (min > max) {
    const temp = min
    min = max
    max = temp
  }

  minInput.value = min

  maxInput.value = max

  appliedMin.value =
    min === priceMin
      ? null
      : min

  appliedMax.value =
    max === priceMax
      ? null
      : max

  closeFilters()
}

const clearPrice = () => {

  minInput.value = priceMin

  maxInput.value = priceMax

  appliedMin.value = null

  appliedMax.value = null
}

const resetFilters = () => {

  selectCategory('all')

  sortBy.value = 'featured'

  clearPrice()

  currentPage.value = 1
}

/* =========================================================
   FILTER + SORT
   ========================================================= */

const byPrice =
  (direction: number) =>
  (a: Product, b: Product) => {

    const aHas = hasPrice(a)

    const bHas = hasPrice(b)

    if (!aHas && !bHas) return 0

    if (!aHas) return 1

    if (!bHas) return -1

    return direction * (
      a.price - b.price
    )
  }

const filteredProducts = computed(() => {

  const list = products.filter(product => {

    if (
      activeCategory.value !== 'all' &&
      product.category !== activeCategory.value
    ) {
      return false
    }

    if (hasPrice(product)) {

      if (
        appliedMin.value !== null &&
        product.price < appliedMin.value
      ) {
        return false
      }

      if (
        appliedMax.value !== null &&
        product.price > appliedMax.value
      ) {
        return false
      }
    }

    return true
  })

  const sorted = [...list]

  if (sortBy.value === 'price-asc') {
    sorted.sort(byPrice(1))
  }

  if (sortBy.value === 'price-desc') {
    sorted.sort(byPrice(-1))
  }

  if (sortBy.value === 'top-rated') {

    sorted.sort(
      (a, b) =>
        (b.rating ?? 0) -
        (a.rating ?? 0)
    )
  }

  if (sortBy.value === 'name-asc') {

    sorted.sort(
      (a, b) =>
        a.name.localeCompare(b.name)
    )
  }

  return sorted
})

/* =========================================================
   PAGINATION
   ========================================================= */

const totalPages = computed(() =>
  Math.max(
    1,
    Math.ceil(
      filteredProducts.value.length /
        perPage.value
    )
  )
)

const pagedProducts = computed(() => {

  const start =
    (currentPage.value - 1) *
    perPage.value

  return filteredProducts.value.slice(
    start,
    start + perPage.value
  )
})

const rangeStart = computed(() =>
  filteredProducts.value.length
    ? (
        (currentPage.value - 1) *
          perPage.value
      ) + 1
    : 0
)

const rangeEnd = computed(() =>
  Math.min(
    currentPage.value *
      perPage.value,
    filteredProducts.value.length
  )
)

/* =========================================================
   CATEGORY COUNT
   ========================================================= */

const countFor = (id: string) =>
  id === 'all'
    ? products.length
    : products.filter(
        product =>
          product.category === id
      ).length

/* =========================================================
   TRENDING
   ========================================================= */

const trendingProducts = computed(() =>
  products
    .filter(product => product.trending)
    .slice(0, 4)
)

/* =========================================================
   WATCHERS
   ========================================================= */

watch(
  [
    activeCategory,
    sortBy,
    perPage,
    appliedMin,
    appliedMax
  ],
  () => {
    currentPage.value = 1
  }
)

watch(
  totalPages,
  pages => {

    if (
      currentPage.value > pages
    ) {
      currentPage.value = pages
    }
  }
)

watch(
  () => route.query.category,
  value => {

    const next =
      (value as string) || 'all'

    if (
      next !== activeCategory.value
    ) {
      activeCategory.value = next
    }
  }
)

/* =========================================================
   ACTIONS
   ========================================================= */

const selectCategory = (id: string) => {

  activeCategory.value = id

  closeDropdowns()

  router.push({
    query:
      id === 'all'
        ? {}
        : {
            category: id
          }
  })

  closeFilters()
}

const goToPage = (page: number) => {

  if (
    page < 1 ||
    page > totalPages.value
  ) {
    return
  }

  currentPage.value = page

  shopRoot.value?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

/* =========================================================
   MOBILE FILTER DRAWER
   ========================================================= */

const openFilters = () => {

  filtersOpen.value = true

  closeDropdowns()

  if (
    typeof document !== 'undefined'
  ) {
    document.body.style.overflow = 'hidden'
  }
}

const closeFilters = () => {

  filtersOpen.value = false

  if (
    typeof document !== 'undefined'
  ) {
    document.body.style.overflow = ''
  }
}

const toggleFilters = () => {

  if (filtersOpen.value) {
    closeFilters()
  } else {
    openFilters()
  }
}

/* =========================================================
   LIFECYCLE
   ========================================================= */

onMounted(() => {

  document.title =
    'Royal Resin Studio'

})

</script>

<template>

  <section
    id="shop"
    ref="shopRoot"
    class="shop-section"
    :class="{
      'is-page': isPage
    }"
  >

    <div class="shop-inner">

      <!-- =================================================
           HEADER
      ================================================== -->

      <div class="shop-header">

        <p class="eyebrow">
          HANDCRAFTED RESIN
        </p>

        <component
          :is="isPage ? 'h1' : 'h2'"
          class="shop-title"
        >
          Our
          <span>Shop</span>
        </component>

        <p class="shop-intro">
          Browse all
          <!-- {{ products.length }} -->
          handcrafted resin pieces.
          Custom orders are always welcome.
        </p>

      </div>

      <!-- =================================================
           FILTER BACKDROP
      ================================================== -->

      <Transition name="filter-backdrop">

        <button
          v-if="filtersOpen"
          type="button"
          class="filter-backdrop"
          aria-label="Close filters"
          @click="closeFilters"
        />

      </Transition>

      <div class="shop-layout">

        <!-- =================================================
             SIDEBAR
        ================================================== -->

        <aside
          id="shop-sidebar"
          class="sidebar"
          :class="{
            'is-open': filtersOpen
          }"
          aria-label="Shop filters"
        >

          <!-- MOBILE HEADER -->

          <div class="mobile-filter-header">

            <div>

              <p class="mobile-filter-eyebrow">
                SHOP
              </p>

              <h2>
                Filters
              </h2>

            </div>

            <button
              type="button"
              class="filter-close"
              aria-label="Close filters"
              @click="closeFilters"
            >

              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                />
              </svg>

            </button>

          </div>

          <!-- =================================================
               CATEGORIES
          ================================================== -->

          <div class="side-card">

            <h2 class="side-title">
              Categories
            </h2>

            <ul class="category-list">

              <li
                v-for="category in categories"
                :key="category.id"
              >

                <button
                  type="button"
                  class="category-button"
                  :class="{
                    'is-active':
                      activeCategory ===
                      category.id
                  }"
                  :aria-pressed="
                    activeCategory ===
                    category.id
                  "
                  @click="
                    selectCategory(
                      category.id
                    )
                  "
                >

                  <span>
                    {{ category.label }}
                  </span>

                  <span class="category-count">
                    {{ countFor(category.id) }}
                  </span>

                </button>

              </li>

            </ul>

          </div>

          <!-- =================================================
               PRICE
          ================================================== -->

          <div class="side-card">

            <h2 class="side-title">
              Price Limit
            </h2>

            <div class="price-row">

              <label class="price-field">

                <span
                  class="price-prefix"
                  aria-hidden="true"
                >
                  {{ currency }}
                </span>

                <input
                  v-model.number="minInput"
                  type="number"
                  inputmode="numeric"
                  :min="priceMin"
                  :max="priceMax"
                  aria-label="Minimum price"
                />

              </label>

              <span
                class="price-dash"
                aria-hidden="true"
              >
                —
              </span>

              <label class="price-field">

                <span
                  class="price-prefix"
                  aria-hidden="true"
                >
                  {{ currency }}
                </span>

                <input
                  v-model.number="maxInput"
                  type="number"
                  inputmode="numeric"
                  :min="priceMin"
                  :max="priceMax"
                  aria-label="Maximum price"
                />

              </label>

            </div>

            <input
              v-model.number="maxInput"
              class="price-slider"
              type="range"
              step="1"
              :min="priceMin"
              :max="priceMax"
              :style="sliderStyle"
              aria-label="Maximum price slider"
            />

            <button
              type="button"
              class="button-primary"
              @click="applyPrice"
            >
              Apply Filter
            </button>

            <button
              v-if="isPriceFiltered"
              type="button"
              class="clear-price"
              @click="clearPrice"
            >
              Clear price filter
            </button>

          </div>

          <!-- =================================================
               TRENDING
          ================================================== -->

          <div
            v-if="trendingProducts.length"
            class="side-card trending-card"
          >

            <h2 class="side-title">
              Trending Products
            </h2>

            <ul class="trending-list">

              <li
                v-for="product in trendingProducts"
                :key="product.id"
              >

                <RouterLink
                  :to="`/product/${product.id}`"
                  class="trending-item"
                  :aria-label="
                    `View ${product.name}`
                  "
                  @click="closeFilters"
                >

                  <span class="trending-thumb">

                    <img
                      v-if="product.image"
                      :src="product.image"
                      :alt="product.name"
                      loading="lazy"
                    />

                  </span>

                  <span class="trending-text">

                    <span class="trending-name">
                      {{ product.name }}
                    </span>

                    <span
                      v-if="hasPrice(product)"
                      class="trending-price"
                    >
                      {{ formatPrice(product.price) }}
                    </span>

                  </span>

                </RouterLink>

              </li>

            </ul>

          </div>

        </aside>

        <!-- =================================================
             MAIN
        ================================================== -->

        <div class="shop-main">

          <!-- =================================================
               TOOLBAR
          ================================================== -->

          <div class="toolbar">

            <!-- FILTER BUTTON -->

            <button
              type="button"
              class="filters-toggle"
              :aria-expanded="filtersOpen"
              aria-controls="shop-sidebar"
              @click="toggleFilters"
            >

              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M4 6h16M7 12h10M10 18h4"
                />
              </svg>

              Filters

            </button>

            <!-- =================================================
                 VIEW
            ================================================== -->

            <div
              class="toolbar-group view-group"
            >

              <span class="toolbar-label">
                View
              </span>

              <div
                class="view-buttons"
                role="group"
                aria-label="Products per row"
              >

                <button
                  v-for="count in columnOptions"
                  :key="count"
                  type="button"
                  class="view-button"
                  :class="{
                    'is-active':
                      columns === count
                  }"
                  :aria-pressed="
                    columns === count
                  "
                  :aria-label="
                    `${count} columns`
                  "
                  @click="
                    columns = count
                  "
                >

                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >

                    <rect
                      v-for="index in count"
                      :key="index"
                      :x="
                        3 +
                        (index - 1) *
                          (18 / count)
                      "
                      y="4"
                      :width="
                        18 / count - 2
                      "
                      height="16"
                      rx="1"
                    />

                  </svg>

                </button>

              </div>

            </div>

            <!-- =================================================
                 PER PAGE
            ================================================== -->

            <div
              class="toolbar-group per-page-group"
            >

              <label class="toolbar-label">
                Per page
              </label>

              <div
                class="custom-select custom-select-small"
                :class="{
                  'is-open':
                    perPageOpen
                }"
              >

                <button
                  type="button"
                  class="custom-select-trigger"
                  :aria-expanded="
                    perPageOpen
                  "
                  aria-haspopup="listbox"
                  @click="togglePerPage"
                >

                  <span>
                    {{ perPage }}
                  </span>

                  <svg
                    class="custom-select-chevron"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="m6 9 6 6 6-6"
                    />
                  </svg>

                </button>

                <div
                  v-if="perPageOpen"
                  class="custom-select-menu per-page-menu"
                  role="listbox"
                >

                  <button
                    v-for="count in perPageOptions"
                    :key="count"
                    type="button"
                    class="custom-select-option"
                    :class="{
                      'is-selected':
                        perPage === count
                    }"
                    role="option"
                    :aria-selected="
                      perPage === count
                    "
                    @click="
                      selectPerPage(count)
                    "
                  >
                    {{ count }}
                  </button>

                </div>

              </div>

            </div>

            <!-- =================================================
                 SORT
            ================================================== -->

            <div
              class="toolbar-group sort-group"
            >

              <label class="toolbar-label">
                Sort by
              </label>

              <div
                class="custom-select custom-sort-select"
                :class="{
                  'is-open':
                    sortOpen
                }"
              >

                <button
                  type="button"
                  class="custom-select-trigger"
                  aria-haspopup="listbox"
                  :aria-expanded="
                    sortOpen
                  "
                  @click="toggleSort"
                >

                  <span>
                    {{ selectedSortLabel }}
                  </span>

                  <svg
                    class="custom-select-chevron"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="m6 9 6 6 6-6"
                    />
                  </svg>

                </button>

                <div
                  v-if="sortOpen"
                  class="custom-select-menu sort-menu"
                  role="listbox"
                >

                  <button
                    v-for="option in sortOptions"
                    :key="option.id"
                    type="button"
                    class="custom-select-option"
                    :class="{
                      'is-selected':
                        sortBy === option.id
                    }"
                    role="option"
                    :aria-selected="
                      sortBy === option.id
                    "
                    @click="
                      selectSort(option.id)
                    "
                  >
                    {{ option.label }}
                  </button>

                </div>

              </div>

            </div>

          </div>

          <!-- =================================================
               RESULT COUNT
          ================================================== -->

          <p
            class="result-count"
            aria-live="polite"
          >
            {{ filteredProducts.length }}
            products
          </p>

          <!-- =================================================
               EMPTY
          ================================================== -->

          <div
            v-if="!filteredProducts.length"
            class="empty-state"
          >

            <p>
              No products match these
              filters.
            </p>

            <button
              type="button"
              class="button-secondary"
              @click="resetFilters"
            >
              Reset filters
            </button>

          </div>

          <!-- =================================================
               PRODUCT GRID
          ================================================== -->

          <ul
            v-else
            class="product-grid"
            :class="`cols-${columns}`"
          >

            <li
              v-for="product in pagedProducts"
              :key="product.id"
            >

              <article class="product-card">

                <!-- IMAGE -->

                <RouterLink
                  :to="`/product/${product.id}`"
                  class="product-media"
                  :aria-label="
                    `View ${product.name}`
                  "
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

                    <svg
                      viewBox="0 0 24 24"
                    >

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

                <!-- INFO -->

                <div class="product-info">

                  <p class="product-category">
                    {{
                      categoryLabel(
                        product.category
                      )
                    }}
                  </p>

                  <h3>

                    <RouterLink
                      :to="
                        `/product/${product.id}`
                      "
                      class="product-title-link"
                    >
                      {{ product.name }}
                    </RouterLink>

                  </h3>

                  <p
                    v-if="product.note"
                    class="product-note"
                  >
                    {{ product.note }}
                  </p>

                  <div
                    class="product-price-row"
                  >

                    <span
                      v-if="hasPrice(product)"
                      class="product-price"
                    >
                      {{
                        formatPrice(
                          product.price
                        )
                      }}
                    </span>

                  </div>

                  <div
                    class="product-actions"
                  >

                    <AddToCartButton
                      :product="{
                        id: product.id,
                        name: product.name,
                        price:
                          hasPrice(product)
                            ? product.price
                            : 0,
                        image:
                          product.image || ''
                      }"
                      :disabled="
                        !hasPrice(product)
                      "
                    />

                  </div>

                </div>

              </article>

            </li>

          </ul>

          <!-- =================================================
               PAGINATION
          ================================================== -->

          <div
            v-if="filteredProducts.length"
            class="pagination-wrap"
          >

            <nav
              v-if="totalPages > 1"
              class="pagination"
              aria-label="Pagination"
            >

              <button
                type="button"
                class="page-button"
                :disabled="
                  currentPage === 1
                "
                aria-label="Previous page"
                @click="
                  goToPage(
                    currentPage - 1
                  )
                "
              >

                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="m15 6-6 6 6 6"
                  />
                </svg>

              </button>

              <button
                v-for="page in totalPages"
                :key="page"
                type="button"
                class="page-button"
                :class="{
                  'is-active':
                    currentPage === page
                }"
                :aria-current="
                  currentPage === page
                    ? 'page'
                    : undefined
                "
                @click="
                  goToPage(page)
                "
              >
                {{ page }}
              </button>

              <button
                type="button"
                class="page-button"
                :disabled="
                  currentPage === totalPages
                "
                aria-label="Next page"
                @click="
                  goToPage(
                    currentPage + 1
                  )
                "
              >

                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="m9 6 6 6-6 6"
                  />
                </svg>

              </button>

            </nav>

            <p class="showing-text">
              Showing
              {{ rangeStart }}–{{ rangeEnd }}
              of
              {{ filteredProducts.length }}
              products
            </p>

          </div>

        </div>

      </div>

    </div>

  </section>

</template>

<style scoped>

/* =========================================================
   SECTION
   ========================================================= */

.shop-section {
  position: relative;
  width: 100%;
  padding:
    var(--space-2xl)
    0
    var(--space-3xl);
  background: var(--color-bg-dark);
  color: var(--color-text-primary);
  scroll-margin-top: 80px;
}

.shop-section.is-page {
  min-height: 100svh;
  padding-top:
    calc(
      var(--space-4xl) +
      var(--space-md)
    );
}

.shop-inner {
  width:
    min(
      1400px,
      calc(100% - var(--space-xl))
    );
  margin: 0 auto;
}

/* =========================================================
   HEADER
   ========================================================= */

.shop-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--space-2xl);
  text-align: center;
}

.eyebrow {
  margin:
    0
    0
    var(--space-md);
  color: var(--color-accent);
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 3px;
}

.shop-title {
  margin: 0;
  color: var(--color-text-primary);
  font-family: var(--font-heading);
  font-size:
    clamp(
      36px,
      4vw,
      56px
    );
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -1.2px;
  text-align: center;
  white-space: nowrap;
}

.shop-title span {
  margin-left: var(--space-sm);
}

.shop-intro {
  max-width: 520px;
  margin:
    var(--space-lg)
    0
    0;
  color: var(--color-text-secondary);
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.8;
  text-align: center;
}

/* =========================================================
   LAYOUT
   ========================================================= */

.shop-layout {
  display: grid;
  grid-template-columns:
    270px
    minmax(0, 1fr);
  align-items: start;
  gap: var(--space-lg);
}

.shop-main {
  position: relative;
  min-width: 0;
  width: 100%;
}

/* =========================================================
   SIDEBAR
   ========================================================= */

.sidebar {
  position: sticky;
  top: 100px;
  display: grid;
  gap: var(--space-md);
  min-width: 0;
}

.side-card {
  padding: var(--space-lg);
  background: var(--color-surface-dark);
  border:
    1px solid
    var(--color-border-dark-soft);
  border-radius: var(--radius-lg);
}

.side-title {
  margin:
    0
    0
    var(--space-md);
  color: var(--color-accent);
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.mobile-filter-header {
  display: none;
}

/* =========================================================
   CATEGORIES
   ========================================================= */

.category-list,
.trending-list {
  display: grid;
  gap: var(--space-xs);
  margin: 0;
  padding: 0;
  list-style: none;
}

.category-button {
  width: 100%;
  min-height: 40px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: var(--space-sm);

  padding:
    0
    var(--space-md);

  background: transparent;
  border:
    1px solid transparent;
  border-radius: var(--radius-md);

  color: var(--color-text-secondary);

  font-family: var(--font-body);
  font-size: 14px;
  text-align: left;

  cursor: pointer;

  transition:
    color .3s ease,
    background .3s ease,
    border-color .3s ease;
}

.category-button:hover {
  color: var(--color-accent-light);
  border-color:
    var(--color-border-dark-soft);
}

.category-button:focus-visible {
  outline:
    2px solid
    var(--color-accent-light);
  outline-offset: 2px;
}

.category-button.is-active {
  background:
    var(--color-button-primary);
  border-color:
    var(--color-button-primary);
  color:
    var(--color-button-primary-text);
  font-weight: 600;
}

.category-count {
  color: var(--color-text-muted);
  font-size: 11px;
}

.category-button.is-active
.category-count {
  color:
    var(--color-button-primary-text);
}

/* =========================================================
   PRICE
   ========================================================= */

.price-row {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
}

.price-field {
  position: relative;
  flex: 1;
  min-width: 0;
}

.price-prefix {
  position: absolute;
  top: 50%;
  left: var(--space-md);
  color: var(--color-text-muted);
  font-size: 12px;
  transform: translateY(-50%);
  pointer-events: none;
}

.price-field input {
  width: 100%;
  min-height: 44px;

  padding:
    0
    var(--space-sm)
    0
    var(--space-2xl);

  box-sizing: border-box;

  background:
    var(--color-bg-dark);

  border:
    1px solid
    var(--color-border-dark-soft);

  border-radius: var(--radius-md);

  color:
    var(--color-text-primary);

  font-family: var(--font-body);
  font-size: 14px;

  appearance: textfield;
  -moz-appearance: textfield;
}

.price-field input::-webkit-outer-spin-button,
.price-field input::-webkit-inner-spin-button {
  margin: 0;
  -webkit-appearance: none;
}

.price-field input:focus-visible {
  border-color:
    var(--color-accent);

  outline:
    2px solid
    var(--color-accent-light);

  outline-offset: 2px;
}

.price-dash {
  flex-shrink: 0;
  color: var(--color-text-muted);
}

/* =========================================================
   PRICE SLIDER
   ========================================================= */

.price-slider {
  display: block;
  width: 100%;
  height: 24px;
  margin:
    0
    0
    var(--space-lg);

  padding: 0;

  appearance: none;
  -webkit-appearance: none;

  background-color: transparent;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 4px;

  cursor: pointer;
}

.price-slider::-webkit-slider-runnable-track {
  height: 24px;
  background: transparent;
}

.price-slider::-moz-range-track {
  height: 24px;
  background: transparent;
}

.price-slider::-webkit-slider-thumb {
  width: 18px;
  height: 18px;

  margin-top: 3px;

  appearance: none;
  -webkit-appearance: none;

  background:
    var(--color-bg-dark);

  border:
    2px solid
    var(--color-accent);

  border-radius: 50%;

  box-shadow:
    var(--shadow-gold);

  cursor: pointer;
}

.price-slider::-moz-range-thumb {
  width: 14px;
  height: 14px;

  appearance: none;

  background:
    var(--color-bg-dark);

  border:
    2px solid
    var(--color-accent);

  border-radius: 50%;

  box-shadow:
    var(--shadow-gold);

  cursor: pointer;
}

.price-slider:focus-visible {
  outline:
    2px solid
    var(--color-accent-light);

  outline-offset: 4px;
}

/* =========================================================
   TRENDING
   ========================================================= */

.trending-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);

  padding:
    var(--space-sm)
    0;

  text-decoration: none;
}

.trending-item:focus-visible {
  outline:
    2px solid
    var(--color-accent-light);

  outline-offset: 3px;
}

.trending-thumb {
  flex-shrink: 0;

  width: 52px;
  height: 52px;

  overflow: hidden;

  background:
    var(--color-surface-dark-soft);

  border:
    1px solid
    var(--color-border-dark-soft);

  border-radius: var(--radius-md);
}

.trending-thumb img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.trending-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  min-width: 0;
}

.trending-name {
  color: var(--color-text-primary);
  font-family: var(--font-heading);
  font-size: 15px;
  line-height: 1.3;
}

.trending-item:hover
.trending-name {
  color: var(--color-accent-light);
}

.trending-price {
  color: var(--color-accent);
  font-size: 12px;
  font-weight: 600;
}

/* =========================================================
   BUTTONS
   ========================================================= */

.button-primary,
.button-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-height: 46px;

  padding:
    0
    var(--space-lg);

  border-radius: var(--radius-sm);

  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;

  cursor: pointer;
}

.button-primary {
  background:
    var(--color-button-primary);

  border:
    1px solid
    var(--color-button-primary);

  color:
    var(--color-button-primary-text);

  box-shadow:
    var(--shadow-gold);
}

.button-primary:hover {
  background:
    var(--color-button-primary-hover);

  border-color:
    var(--color-button-primary-hover);

  transform: translateY(-2px);
}

.button-secondary {
  width: auto;

  background: transparent;

  border:
    1px solid
    var(--color-border-dark);

  color:
    var(--color-accent);
}

/* =========================================================
   TOOLBAR
   ========================================================= */

/*
 * IMPORTANT FIX:
 * Toolbar itself now has a high stacking context and
 * overflow visible, so custom dropdowns are not clipped.
 */

.toolbar {
  position: relative;
  z-index: 200;

  display: grid;

  grid-template-columns:
    auto
    auto
    minmax(0, 1fr)
    auto;

  align-items: center;

  gap: var(--space-md);

  width: 100%;

  padding:
    var(--space-md)
    var(--space-lg);

  box-sizing: border-box;

  background:
    var(--color-surface-dark);

  border:
    1px solid
    var(--color-border-dark-soft);

  border-radius: var(--radius-lg);

  overflow: visible;
}

.toolbar-group {
  position: relative;

  display: flex;
  align-items: center;

  gap: var(--space-sm);

  min-width: 0;
}

.toolbar-label {
  flex-shrink: 0;

  color:
    var(--color-text-muted);

  font-family: var(--font-body);
  font-size: 12px;
}

/*
 * Separate stacking layers.
 * Per page gets higher layer than sort.
 */

.per-page-group {
  z-index: 400;
}

.sort-group {
  justify-self: end;
  z-index: 300;
}

.view-group {
  z-index: 200;
}

/* =========================================================
   VIEW BUTTONS
   ========================================================= */

.view-buttons {
  display: flex;
  gap: var(--space-xs);
}

.view-button {
  width: 36px;
  height: 36px;

  display: grid;
  place-items: center;

  padding: 0;

  background: transparent;

  border:
    1px solid
    var(--color-border-dark-soft);

  border-radius: var(--radius-sm);

  color:
    var(--color-text-secondary);

  cursor: pointer;
}

.view-button svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.view-button:hover {
  color: var(--color-accent-light);
  border-color:
    var(--color-border-dark);
}

.view-button.is-active {
  background:
    var(--color-button-primary);

  border-color:
    var(--color-button-primary);

  color:
    var(--color-button-primary-text);
}

/* =========================================================
   CUSTOM SELECT
   ========================================================= */

.custom-select {
  position: relative;

  width: 180px;

  min-width: 0;

  isolation: isolate;
}

.custom-select-small {
  width: 84px;
  flex-shrink: 0;
}

.custom-select-trigger {
  position: relative;
  z-index: 2;

  width: 100%;
  min-height: 40px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: var(--space-sm);

  padding:
    0
    var(--space-md);

  box-sizing: border-box;

  background:
    var(--color-bg-dark);

  border:
    1px solid
    var(--color-border-dark-soft);

  border-radius: var(--radius-md);

  color:
    var(--color-text-primary);

  font-family: var(--font-body);
  font-size: 13px;

  text-align: left;

  cursor: pointer;
}

.custom-select-trigger:hover,
.custom-select.is-open
.custom-select-trigger {
  border-color:
    var(--color-accent);
}

.custom-select-trigger:focus-visible {
  outline:
    2px solid
    var(--color-accent-light);

  outline-offset: 2px;
}

.custom-select-trigger > span {
  min-width: 0;

  overflow: hidden;

  white-space: nowrap;

  text-overflow: ellipsis;
}

/* =========================================================
   CHEVRON
   ========================================================= */

.custom-select-chevron {
  flex-shrink: 0;

  width: 16px;
  height: 16px;

  fill: none;

  stroke:
    var(--color-accent);

  stroke-width: 1.6;

  stroke-linecap: round;
  stroke-linejoin: round;

  transition:
    transform .25s ease;
}

.custom-select.is-open
.custom-select-chevron {
  transform: rotate(180deg);
}

/* =========================================================
   DROPDOWN MENU
   ========================================================= */

.custom-select-menu {
  position: absolute;

  top: calc(100% + 7px);

  left: 0;
  right: 0;

  z-index: 99999;

  overflow: hidden;

  padding: 5px;

  box-sizing: border-box;

  background:
    var(--color-bg-dark);

  border:
    1px solid
    var(--color-border-dark);

  border-radius: var(--radius-md);

  box-shadow:
    0 16px 40px
      rgba(0, 0, 0, .45),
    0 6px 18px
      rgba(0, 0, 0, .3);
}

/*
 * Per-page dropdown stays exactly above the sort dropdown.
 */

.per-page-menu {
  min-width: 84px;

  left: 0;
  right: auto;

  z-index: 100000;
}

/*
 * Sort dropdown.
 */

.sort-menu {
  min-width: 180px;

  left: auto;
  right: 0;

  z-index: 99990;
}

.custom-select-option {
  display: flex;
  align-items: center;

  width: 100%;
  min-height: 40px;

  padding:
    0
    12px;

  background: transparent;

  border: 0;

  border-radius: 4px;

  color:
    var(--color-text-secondary);

  font-family: var(--font-body);
  font-size: 13px;

  text-align: left;

  cursor: pointer;
}

.custom-select-option:hover {
  background:
    var(--color-surface-dark);

  color:
    var(--color-accent-light);
}

.custom-select-option.is-selected {
  background:
    var(--color-button-primary);

  color:
    var(--color-button-primary-text);

  font-weight: 600;
}

.custom-select-option.is-selected:hover {
  background:
    var(--color-button-primary-hover);

  color:
    var(--color-button-primary-text);
}

.custom-select-small
.custom-select-trigger {
  min-height: 40px;

  padding:
    0
    12px;
}

.custom-select-small
.custom-select-option {
  min-height: 38px;

  justify-content: center;

  padding:
    0
    10px;

  text-align: center;
}

/* =========================================================
   FILTER BUTTON
   ========================================================= */

.filters-toggle {
  display: none;

  align-items: center;
  justify-content: center;

  gap: var(--space-sm);

  min-height: 40px;

  padding:
    0
    var(--space-md);

  background: transparent;

  border:
    1px solid
    var(--color-border-dark);

  border-radius: var(--radius-md);

  color:
    var(--color-accent);

  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;

  cursor: pointer;
}

.filters-toggle svg {
  width: 16px;
  height: 16px;

  fill: none;

  stroke: currentColor;

  stroke-width: 1.6;

  stroke-linecap: round;
  stroke-linejoin: round;
}

.result-count {
  margin:
    var(--space-md)
    0;

  color:
    var(--color-text-muted);

  font-family: var(--font-body);
  font-size: 13px;
}

/* =========================================================
   GRID
   ========================================================= */

.product-grid {
  display: grid;

  gap: var(--space-md);

  margin: 0;
  padding: 0;

  list-style: none;
}

.product-grid.cols-2 {
  grid-template-columns:
    repeat(2, minmax(0, 1fr));
}

.product-grid.cols-3 {
  grid-template-columns:
    repeat(3, minmax(0, 1fr));
}

.product-grid.cols-4 {
  grid-template-columns:
    repeat(4, minmax(0, 1fr));
}

.product-grid li {
  display: flex;
  min-width: 0;
}

/* =========================================================
   EMPTY
   ========================================================= */

.empty-state {
  display: grid;
  justify-items: center;

  gap: var(--space-md);

  padding:
    var(--space-3xl)
    var(--space-lg);

  background:
    var(--color-surface-dark);

  border:
    1px solid
    var(--color-border-dark-soft);

  border-radius:
    var(--radius-lg);

  color:
    var(--color-text-secondary);

  text-align: center;
}

.empty-state p {
  margin: 0;
}

/* =========================================================
   PRODUCT CARD
   ========================================================= */

.product-card {
  flex: 1;

  display: flex;
  flex-direction: column;

  min-width: 0;

  overflow: hidden;

  background:
    var(--color-surface-dark);

  border:
    1px solid
    var(--color-border-dark-soft);

  border-radius:
    var(--radius-lg);
}

.product-card:hover {
  border-color:
    var(--color-border-dark);

  box-shadow:
    var(--shadow-card);
}

.product-media {
  position: relative;

  display: block;

  width: 100%;

  aspect-ratio: 1 / 1;

  overflow: hidden;

  cursor: pointer;
}

.product-image {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;

  transition:
    transform .6s ease;
}

.product-card:hover
.product-image {
  transform: scale(1.05);
}

.product-placeholder {
  width: 100%;
  height: 100%;

  display: grid;
  place-items: center;

  background:
    linear-gradient(
      145deg,
      var(--color-surface-dark-soft),
      var(--color-brand-navy-light)
    );
}

.product-placeholder svg {
  width: 40px;
  height: 40px;

  fill: none;

  stroke:
    var(--color-icon-primary);

  stroke-width: 1.3;

  opacity: .6;
}

.product-info {
  flex: 1;

  display: flex;
  flex-direction: column;

  min-width: 0;

  padding: var(--space-md);
}

.product-category {
  margin:
    0
    0
    var(--space-xs);

  color:
    var(--color-text-muted);

  font-size: 11px;
}

.product-info h3 {
  margin: 0;

  color:
    var(--color-text-primary);

  font-family:
    var(--font-heading);

  font-size: 19px;

  font-weight: 500;

  line-height: 1.25;
}

.product-title-link {
  color: inherit;
  text-decoration: none;
}

.product-title-link:hover {
  color:
    var(--color-accent-light);
}

.product-note {
  margin:
    var(--space-sm)
    0
    0;

  color:
    var(--color-text-secondary);

  font-size: 12px;

  line-height: 1.5;
}

.product-price-row {
  margin-top: auto;

  padding-top:
    var(--space-md);
}

.product-price {
  color:
    var(--color-text-primary);

  font-size: 14px;
  font-weight: 600;
}

.product-actions {
  display: flex;

  align-items: center;

  gap: var(--space-sm);

  margin-top:
    var(--space-md);
}

.product-actions
:deep(.add-to-cart-btn) {
  flex: 1;

  width: 100%;

  min-width: 0;
}

/* =========================================================
   PAGINATION
   ========================================================= */

.pagination-wrap {
  display: grid;

  justify-items: center;

  gap: var(--space-md);

  margin-top:
    var(--space-2xl);
}

.pagination {
  display: flex;

  flex-wrap: wrap;

  justify-content: center;

  gap: var(--space-sm);
}

.page-button {
  min-width: 40px;
  height: 40px;

  display: grid;
  place-items: center;

  padding:
    0
    var(--space-sm);

  background: transparent;

  border:
    1px solid
    var(--color-border-dark-soft);

  border-radius:
    var(--radius-md);

  color:
    var(--color-text-secondary);

  cursor: pointer;
}

.page-button svg {
  width: 16px;
  height: 16px;

  fill: none;

  stroke: currentColor;

  stroke-width: 1.8;

  stroke-linecap: round;
  stroke-linejoin: round;
}

.page-button:hover:not(:disabled) {
  color:
    var(--color-accent-light);

  border-color:
    var(--color-border-dark);
}

.page-button:disabled {
  opacity: .4;
  cursor: not-allowed;
}

.page-button.is-active {
  background:
    var(--color-button-primary);

  border-color:
    var(--color-button-primary);

  color:
    var(--color-button-primary-text);
}

.showing-text {
  margin: 0;

  color:
    var(--color-text-muted);

  font-size: 12px;
}

/* =========================================================
   FILTER BACKDROP
   ========================================================= */

.filter-backdrop {
  display: none;
}

/* =========================================================
   TABLET
   ========================================================= */

@media (max-width: 1100px) {

  .product-grid.cols-4 {
    grid-template-columns:
      repeat(3, minmax(0, 1fr));
  }

  .toolbar {
    grid-template-columns:
      auto
      auto
      minmax(0, 1fr)
      auto;
  }

  .view-group {
    display: none;
  }

}

/* =========================================================
   TABLET / FILTER
   ========================================================= */

@media (max-width: 1000px) {

  .shop-layout {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .shop-main {
    width: 100%;
  }

  .filters-toggle {
    display: inline-flex;
  }

  .sidebar {
    position: static;

    display: none;

    width: 100%;
  }

  .sidebar.is-open {
    display: grid;
  }

  .toolbar {
    grid-template-columns:
      auto
      minmax(0, 1fr)
      auto;

    width: 100%;
  }

  .sort-group {
    justify-self: end;
  }

}

/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 768px) {

  .shop-section {
    padding:
      var(--space-xl)
      0
      var(--space-2xl);
  }

  .shop-section.is-page {
    padding-top:
      var(--space-4xl);
  }

  .shop-inner {
    width:
      calc(
        100% -
        var(--space-lg)
      );
  }

  .shop-header {
    margin-bottom:
      var(--space-xl);
  }

  .shop-title {
    font-size:
      clamp(
        26px,
        7.5vw,
        46px
      );
  }

  .shop-intro {
    font-size: 14px;
  }

  /* =======================================================
     FILTER DRAWER
     ======================================================= */

  .filter-backdrop {
    position: fixed;

    inset: 0;

    z-index: 900;

    display: block;

    width: 100%;
    height: 100%;

    padding: 0;

    background:
      var(--color-overlay-dark);

    border: 0;

    cursor: pointer;
  }

  .sidebar {
    position: fixed;

    z-index: 1000;

    left: 0;
    right: 0;
    bottom: 0;
    top: auto;

    display: grid;

    grid-template-columns: 1fr;

    gap: 16px;

    width: 100%;

    max-height:
      min(
        82svh,
        720px
      );

    margin: 0;

    padding:
      0
      16px
      calc(
        20px +
        env(
          safe-area-inset-bottom
        )
      );

    box-sizing: border-box;

    overflow-y: auto;

    background:
      var(--color-bg-dark);

    border-top:
      1px solid
      var(--color-border-dark);

    border-radius:
      var(--radius-xl)
      var(--radius-xl)
      0
      0;

    box-shadow:
      var(--shadow-card);

    transform:
      translateY(110%);

    visibility: hidden;

    opacity: 0;

    transition:
      transform .35s ease,
      opacity .25s ease,
      visibility .35s ease;
  }

  .sidebar.is-open {
    display: grid;

    transform:
      translateY(0);

    visibility: visible;

    opacity: 1;
  }

  /* =======================================================
     MOBILE FILTER HEADER
     ======================================================= */

  .mobile-filter-header {
    position: sticky;

    top: 0;

    z-index: 5;

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: var(--space-md);

    margin:
      0
      -16px
      4px;

    padding:
      18px
      16px
      16px;

    background:
      var(--color-bg-dark);

    border-bottom:
      1px solid
      var(--color-border-dark-soft);
  }

  .mobile-filter-eyebrow {
    margin:
      0
      0
      var(--space-xs);

    color:
      var(--color-accent);

    font-size: 9px;

    font-weight: 600;

    letter-spacing: 2px;
  }

  .mobile-filter-header h2 {
    margin: 0;

    color:
      var(--color-text-primary);

    font-family:
      var(--font-heading);

    font-size: 24px;

    font-weight: 500;
  }

  .filter-close {
    width: 42px;
    height: 42px;

    flex-shrink: 0;

    display: grid;
    place-items: center;

    padding: 0;

    background:
      var(--color-surface-dark);

    border:
      1px solid
      var(--color-border-dark-soft);

    border-radius: 50%;

    color:
      var(--color-text-primary);

    cursor: pointer;
  }

  .filter-close svg {
    width: 18px;
    height: 18px;

    fill: none;

    stroke: currentColor;

    stroke-width: 1.7;

    stroke-linecap: round;
  }

  .sidebar .side-card {
    width: 100%;

    box-sizing: border-box;

    padding:
      18px
      16px;

    margin: 0;
  }

  /* =======================================================
     TOOLBAR
     ======================================================= */

  .toolbar {
    z-index: 200;

    grid-template-columns:
      minmax(0, 1fr)
      minmax(0, 1fr);

    gap: var(--space-sm);

    padding: var(--space-md);

    overflow: visible;
  }

  .toolbar-group {
    width: 100%;
    min-width: 0;
  }

  .toolbar-label {
    white-space: nowrap;
  }

  .filters-toggle {
    width: 100%;
  }

  .per-page-group {
    z-index: 400;
  }

  .sort-group {
    grid-column: 1 / -1;

    justify-self: stretch;

    width: 100%;

    z-index: 300;
  }

  .custom-select {
    width: 100%;
  }

  .custom-select-small {
    width: 84px;
  }

  .sort-group
  .custom-select {
    flex: 1;

    width: auto;

    min-width: 0;
  }

  .custom-select-menu {
    z-index: 99999;
  }

  /* =======================================================
     PRODUCT GRID
     ======================================================= */

  .product-grid,
  .product-grid.cols-2,
  .product-grid.cols-3,
  .product-grid.cols-4 {
    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );

    column-gap:
      var(--space-sm);

    row-gap:
      var(--space-md);
  }

  .product-card {
    width: 100%;

    border-radius:
      var(--radius-md);
  }

  .product-info {
    padding:
      var(--space-sm)
      var(--space-sm)
      var(--space-md);
  }

  .product-info h3 {
    font-size: 16px;
  }

  .product-note {
    font-size: 11px;

    display: -webkit-box;

    -webkit-line-clamp: 2;

    -webkit-box-orient: vertical;

    overflow: hidden;
  }

  .product-actions {
    align-items: stretch;

    flex-direction: column;

    gap: var(--space-xs);

    margin-top:
      var(--space-sm);
  }

  .product-actions
  :deep(.add-to-cart-btn) {
    width: 100%;
  }

}

/* =========================================================
   SMALL MOBILE
   ========================================================= */

@media (max-width: 560px) {

  .shop-inner {
    width:
      calc(
        100% -
        var(--space-md)
      );
  }

  .shop-title {
    font-size:
      clamp(
        22px,
        8vw,
        40px
      );
  }

  .shop-intro {
    font-size: 13px;
  }

  .toolbar {
    gap: var(--space-sm);

    padding: var(--space-sm);
  }

  .toolbar-label {
    font-size: 11px;
  }

  .filters-toggle {
    min-height: 42px;

    font-size: 12px;
  }

  .custom-select-trigger {
    min-height: 42px;

    font-size: 12px;
  }

  .custom-select-small {
    width: 76px;
  }

  .custom-select-small
  .custom-select-trigger {
    padding:
      0
      10px;
  }

  .product-grid,
  .product-grid.cols-2,
  .product-grid.cols-3,
  .product-grid.cols-4 {
    column-gap: 10px;
    row-gap: 16px;
  }

  .product-info {
    padding:
      10px
      10px
      12px;
  }

  .product-info h3 {
    font-size: 15px;
  }

  .product-actions
  :deep(.add-to-cart-btn) {
    min-height: 40px;
    font-size: 12px;
  }

  .sidebar {
    max-height: 86svh;

    padding:
      0
      12px
      calc(
        16px +
        env(
          safe-area-inset-bottom
        )
      );
  }

  .mobile-filter-header {
    margin:
      0
      -12px
      12px;

    padding:
      16px
      12px
      14px;
  }

}

/* =========================================================
   VERY SMALL MOBILE
   ========================================================= */

@media (max-width: 380px) {

  .shop-inner {
    width:
      calc(
        100% - 12px
      );
  }

  .shop-title {
    font-size:
      clamp(
        19px,
        8.5vw,
        36px
      );
  }

  .product-grid,
  .product-grid.cols-2,
  .product-grid.cols-3,
  .product-grid.cols-4 {
    column-gap: 8px;
    row-gap: 12px;
  }

  .product-info {
    padding:
      9px
      9px
      10px;
  }

  .product-info h3 {
    font-size: 14px;
  }

  .product-category {
    font-size: 9px;
  }

  .product-price {
    font-size: 12px;
  }

  .product-actions
  :deep(.add-to-cart-btn) {
    min-height: 38px;
    font-size: 11px;
  }

  .toolbar {
    grid-template-columns:
      minmax(0, 1fr)
      minmax(0, 1fr);
  }

  .toolbar-group {
    gap: 5px;
  }

  .toolbar-label {
    font-size: 10px;
  }

  .custom-select-small {
    width: 70px;
  }

}

/* =========================================================
   FILTER DRAWER ANIMATION
   ========================================================= */

.filter-backdrop-enter-active,
.filter-backdrop-leave-active {
  transition:
    opacity .3s ease;
}

.filter-backdrop-enter-from,
.filter-backdrop-leave-to {
  opacity: 0;
}

/* =========================================================
   REDUCED MOTION
   ========================================================= */

@media (prefers-reduced-motion: reduce) {

  .category-button,
  .button-primary,
  .button-secondary,
  .view-button,
  .filters-toggle,
  .product-card,
  .product-image,
  .product-title-link,
  .page-button,
  .trending-name,
  .clear-price,
  .sidebar,
  .filter-backdrop,
  .filter-close,
  .custom-select-trigger,
  .custom-select-option,
  .custom-select-chevron {
    transition: none;
  }

  .product-card:hover
  .product-image {
    transform: none;
  }

  .button-primary:hover {
    transform: none;
  }

}

</style>
