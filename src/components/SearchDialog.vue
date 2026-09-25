<template>
  <Teleport to="body">
    <Transition name="search">
      <div
        v-if="modelValue"
        class="search-overlay"
        @mousedown.self="close"
      >
        <div
          class="search-dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
        >

          <!-- =====================================================
               TOP BAR
               ===================================================== -->

          <div class="search-top">
            <label class="search-field">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4.5 4.5" />
              </svg>

              <input
                ref="inputRef"
                v-model="query"
                type="text"
                inputmode="search"
                enterkeyhint="search"
                autocomplete="off"
                spellcheck="false"
                placeholder="Search clocks, earrings, trays…"
                aria-label="Search products"
                @keydown.enter.prevent="viewAll"
              />

              <button
                v-if="query"
                type="button"
                class="field-clear"
                aria-label="Clear search"
                @click="clearQuery"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </label>

            <button
              type="button"
              class="close-button"
              aria-label="Close search"
              @click="close"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>


          <!-- =====================================================
               BODY
               ===================================================== -->

          <div class="search-body">

            <!-- TRENDING -->

            <section
              v-if="!isFiltering && trending.length"
              class="block"
            >
              <h3 class="block-title">Trending now</h3>

              <div class="chips">
                <button
                  v-for="item in trending"
                  :key="item.id"
                  type="button"
                  class="chip chip-soft"
                  @click="query = item.name"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="6.5" />
                    <path d="m16 16 4.5 4.5" />
                  </svg>
                  {{ item.name }}
                </button>
              </div>
            </section>


            <!-- CATEGORIES -->

            <section class="block">
              <h3 class="block-title">Categories</h3>

              <div class="chips">
                <button
                  v-for="cat in shopCategories"
                  :key="cat.id"
                  type="button"
                  class="chip chip-outline"
                  :class="{ 'is-active': activeCategory === cat.id }"
                  :aria-pressed="activeCategory === cat.id"
                  @click="toggleCategory(cat.id)"
                >
                  {{ cat.label }}
                </button>
              </div>
            </section>


            <!-- PRODUCTS -->

            <section class="block">
              <h3 class="block-title">
                {{ isFiltering ? resultsTitle : 'Popular products' }}
              </h3>

              <ul
                v-if="visibleProducts.length"
                class="product-grid"
              >
                <li
                  v-for="product in visibleProducts"
                  :key="product.id"
                >
                  <button
                    type="button"
                    class="product-card"
                    @click="openProduct(product)"
                  >
                    <span class="product-media">
                      <img
                        :src="product.image"
                        :alt="product.name"
                        loading="lazy"
                      />

                      <span
                        v-if="product.trending"
                        class="product-tag"
                      >
                        Trending
                      </span>
                    </span>

                    <span class="product-info">
                      <span class="product-name">{{ product.name }}</span>
                      <span class="product-price">{{ priceLabel(product) }}</span>
                    </span>
                  </button>
                </li>
              </ul>


              <!-- EMPTY STATE -->

              <div
                v-else
                class="empty"
              >
                <p class="empty-title">
                  No products match “{{ query.trim() || activeCategoryLabel }}”
                </p>

                <p class="empty-text">
                  Check the spelling, try a shorter word, or pick a category above.
                </p>

                <button
                  type="button"
                  class="text-button"
                  @click="reset"
                >
                  Clear search
                </button>
              </div>
            </section>

          </div>


          <!-- =====================================================
               FOOTER
               ===================================================== -->

          <div
            v-if="isFiltering && visibleProducts.length"
            class="search-footer"
          >
            <button
              type="button"
              class="footer-button"
              @click="viewAll"
            >
              View all {{ filtered.length }}
              {{ filtered.length === 1 ? 'result' : 'results' }} in shop
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>


<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  nextTick,
  onBeforeUnmount
} from 'vue'
import { useRouter } from 'vue-router'

/* Adjust this path to wherever your products file lives */
import {
  products,
  categories,
  hasPrice,
  type Product
} from '../data/products'


/* =========================================================
   V-MODEL
   ========================================================= */

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const router = useRouter()


/* =========================================================
   STATE
   ========================================================= */

const query = ref('')
const activeCategory = ref('')
const inputRef = ref<HTMLInputElement | null>(null)


/* =========================================================
   DATA
   ========================================================= */

const shopCategories = categories.filter(
  (cat) => cat.id !== 'all'
)

const trending = products.filter(
  (product) => product.trending
)

/* Trending items first, then the rest — capped at 6 */
const popular = [
  ...products.filter((p) => p.trending),
  ...products.filter((p) => !p.trending)
].slice(0, 6)


/* =========================================================
   SEARCH
   ========================================================= */

const isFiltering = computed(() => {
  return Boolean(query.value.trim() || activeCategory.value)
})

const categoryLabel = (id: string) => {
  return categories.find((cat) => cat.id === id)?.label ?? ''
}

const activeCategoryLabel = computed(() => {
  return categoryLabel(activeCategory.value)
})

const filtered = computed(() => {
  const terms = query.value
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)

  return products.filter((product) => {
    if (
      activeCategory.value &&
      product.category !== activeCategory.value
    ) {
      return false
    }

    const haystack = [
      product.name,
      product.note,
      product.description ?? '',
      categoryLabel(product.category)
    ]
      .join(' ')
      .toLowerCase()

    return terms.every((term) => haystack.includes(term))
  })
})

const visibleProducts = computed(() => {
  return isFiltering.value ? filtered.value : popular
})

const resultsTitle = computed(() => {
  const count = filtered.value.length

  return `${count} ${count === 1 ? 'result' : 'results'}`
})


/* =========================================================
   PRICE
   ========================================================= */

const priceLabel = (product: Product) => {
  if (product.sizes?.length) {
    const lowest = Math.min(
      ...product.sizes.map((size) => size.price)
    )

    return `From Rs ${lowest.toLocaleString('en-PK')}`
  }

  return hasPrice(product)
    ? `Rs ${product.price.toLocaleString('en-PK')}`
    : 'Ask for price'
}


/* =========================================================
   ACTIONS
   ========================================================= */

const close = () => {
  emit('update:modelValue', false)
}

const clearQuery = () => {
  query.value = ''
  inputRef.value?.focus()
}

const reset = () => {
  query.value = ''
  activeCategory.value = ''
  inputRef.value?.focus()
}

const toggleCategory = (id: string) => {
  activeCategory.value = activeCategory.value === id ? '' : id
}

/*
  Change these two functions if your shop page reads
  different query params or you have a product detail route,
  e.g. router.push(`/shop/${product.id}`)
*/
const openProduct = (product: Product) => {
  close()

  router.push({
    path: '/shop',
    query: { search: product.name }
  })
}

const viewAll = () => {
  if (!isFiltering.value) return

  close()

  router.push({
    path: '/shop',
    query: {
      ...(query.value.trim() && { search: query.value.trim() }),
      ...(activeCategory.value && { category: activeCategory.value })
    }
  })
}


/* =========================================================
   KEYBOARD + SCROLL LOCK
   ========================================================= */

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    close()
  }
}

let previousOverflow = ''

watch(
  () => props.modelValue,
  async (open) => {
    if (open) {
      previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKeydown)

      await nextTick()
      inputRef.value?.focus()
    } else {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeydown)

      /* wait for the fade-out before wiping the content */
      setTimeout(() => {
        query.value = ''
        activeCategory.value = ''
      }, 220)
    }
  }
)

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)

  if (props.modelValue) {
    document.body.style.overflow = previousOverflow
  }
})
</script>


<style scoped>

/* =========================================================
   OVERLAY
   ========================================================= */

.search-overlay {
  position: fixed;
  inset: 0;

  z-index: 200;

  display: flex;

  align-items: flex-start;
  justify-content: center;

  padding: 10vh 16px 16px;

  background: rgba(0, 0, 0, 0.6);

  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
}


/* =========================================================
   DIALOG
   ========================================================= */

.search-dialog {
  width: min(640px, 100%);

  max-height: min(680px, calc(100dvh - 10vh - 32px));

  display: flex;

  flex-direction: column;

  overflow: hidden;

  background: var(--color-surface-dark);

  border: 1px solid var(--color-border-dark);

  border-radius: 20px;

  color: var(--color-text-primary);

  font-family: var(--font-body);

  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
}


/* =========================================================
   TOP BAR
   ========================================================= */

.search-top {
  display: flex;

  align-items: center;

  gap: var(--space-sm);

  padding: var(--space-md);

  border-bottom: 1px solid var(--color-border-dark-soft);
}


.search-field {
  flex: 1;

  min-width: 0;

  display: flex;

  align-items: center;

  gap: 10px;

  height: 48px;

  padding: 0 8px 0 16px;

  background: var(--color-bg-dark);

  border: 1px solid transparent;

  border-radius: 999px;

  color: var(--color-text-secondary);

  cursor: text;

  transition:
    border-color 0.25s ease;
}


.search-field:focus-within {
  border-color: var(--color-accent);
}


.search-field > svg {
  flex: none;

  width: 18px;
  height: 18px;
}


.search-field input {
  flex: 1;

  min-width: 0;

  height: 100%;

  padding: 0;

  background: transparent;

  border: 0;

  outline: 0;

  color: var(--color-text-primary);

  font-family: inherit;

  /* 16px stops iOS zooming into the field */
  font-size: 16px;
}


.search-field input::placeholder {
  color: var(--color-text-secondary);
}


.field-clear,
.close-button {
  flex: none;

  display: grid;

  place-items: center;

  padding: 0;

  border: 0;

  border-radius: 50%;

  cursor: pointer;

  transition:
    color 0.25s ease,
    background 0.25s ease;
}


.field-clear {
  width: 32px;
  height: 32px;

  background: transparent;

  color: var(--color-text-secondary);
}


.close-button {
  width: 44px;
  height: 44px;

  background: var(--color-bg-dark);

  color: var(--color-text-primary);
}


.field-clear svg,
.close-button svg {
  width: 18px;
  height: 18px;
}


.field-clear:hover,
.close-button:hover {
  color: var(--color-accent-light);

  background: var(--color-border-dark-soft);
}


.search-field svg,
.field-clear svg,
.close-button svg,
.chip svg {
  fill: none;

  stroke: currentColor;

  stroke-width: 1.7;

  stroke-linecap: round;

  stroke-linejoin: round;
}


/* =========================================================
   BODY
   ========================================================= */

.search-body {
  flex: 1;

  overflow-y: auto;

  padding: var(--space-md) var(--space-lg) var(--space-lg);

  scrollbar-width: thin;

  scrollbar-color: var(--color-accent) transparent;
}


.block + .block {
  margin-top: var(--space-lg);
}


.block-title {
  margin: 0 0 var(--space-sm);

  color: var(--color-text-secondary);

  font-family: var(--font-body);

  font-size: 13px;

  font-weight: 600;

  letter-spacing: 0.3px;
}


/* =========================================================
   CHIPS
   ========================================================= */

.chips {
  display: flex;

  flex-wrap: wrap;

  gap: 8px;
}


.chip {
  display: inline-flex;

  align-items: center;

  gap: 8px;

  padding: 9px 16px;

  border-radius: 999px;

  font-family: inherit;

  font-size: 13px;

  font-weight: 500;

  cursor: pointer;

  transition:
    color 0.25s ease,
    background 0.25s ease,
    border-color 0.25s ease;
}


.chip svg {
  width: 14px;
  height: 14px;

  opacity: 0.7;
}


.chip-soft {
  background: var(--color-bg-dark);

  border: 1px solid transparent;

  color: var(--color-text-primary);
}


.chip-soft:hover {
  color: var(--color-accent-light);

  border-color: var(--color-border-dark);
}


.chip-outline {
  background: color-mix(in srgb, var(--color-accent) 10%, transparent);

  border: 1px solid color-mix(in srgb, var(--color-accent) 45%, transparent);

  color: var(--color-accent-light);
}


.chip-outline:hover {
  background: color-mix(in srgb, var(--color-accent) 20%, transparent);
}


.chip-outline.is-active {
  background: var(--color-accent);

  border-color: var(--color-accent);

  color: var(--color-bg-dark);
}


/* =========================================================
   PRODUCT GRID
   ========================================================= */

.product-grid {
  display: grid;

  grid-template-columns: repeat(3, minmax(0, 1fr));

  gap: 12px;

  margin: 0;
  padding: 0;

  list-style: none;
}


.product-card {
  width: 100%;

  display: flex;

  flex-direction: column;

  padding: 0;

  overflow: hidden;

  background: var(--color-bg-dark);

  border: 1px solid var(--color-border-dark-soft);

  border-radius: 14px;

  color: inherit;

  font-family: inherit;

  text-align: left;

  cursor: pointer;

  transition:
    border-color 0.25s ease;
}


.product-card:hover {
  border-color: var(--color-accent);
}


.product-media {
  position: relative;

  display: block;

  aspect-ratio: 1;

  overflow: hidden;
}


.product-media img {
  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;
}


.product-tag {
  position: absolute;

  top: 8px;
  left: 8px;

  padding: 3px 9px;

  background: var(--color-accent);

  border-radius: 999px;

  color: var(--color-bg-dark);

  font-size: 11px;

  font-weight: 600;

  line-height: 1.3;
}


.product-info {
  display: flex;

  flex-direction: column;

  gap: 3px;

  padding: 10px 12px 12px;
}


.product-name {
  overflow: hidden;

  color: var(--color-text-primary);

  font-size: 14px;

  font-weight: 600;

  text-overflow: ellipsis;

  white-space: nowrap;
}


.product-price {
  color: var(--color-accent-light);

  font-size: 13px;
}


/* =========================================================
   EMPTY STATE
   ========================================================= */

.empty {
  padding: var(--space-lg) 0;

  text-align: center;
}


.empty-title {
  margin: 0 0 6px;

  color: var(--color-text-primary);

  font-family: var(--font-heading);

  font-size: 20px;
}


.empty-text {
  margin: 0 0 var(--space-md);

  color: var(--color-text-secondary);

  font-size: 14px;
}


.text-button {
  padding: 8px 4px;

  background: transparent;

  border: 0;

  color: var(--color-accent-light);

  font-family: inherit;

  font-size: 14px;

  font-weight: 600;

  text-decoration: underline;

  text-underline-offset: 4px;

  cursor: pointer;
}


/* =========================================================
   FOOTER
   ========================================================= */

.search-footer {
  padding: var(--space-md);

  border-top: 1px solid var(--color-border-dark-soft);
}


.footer-button {
  width: 100%;

  height: 46px;

  background: var(--color-accent);

  border: 0;

  border-radius: 999px;

  color: var(--color-bg-dark);

  font-family: inherit;

  font-size: 14px;

  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.25s ease;
}


.footer-button:hover {
  background: var(--color-accent-light);
}


/* =========================================================
   FOCUS
   ========================================================= */

.chip:focus-visible,
.product-card:focus-visible,
.footer-button:focus-visible,
.text-button:focus-visible,
.close-button:focus-visible,
.field-clear:focus-visible {
  outline: 2px solid var(--color-accent-light);

  outline-offset: 2px;
}


/* =========================================================
   OPEN / CLOSE MOTION
   ========================================================= */

.search-enter-active,
.search-leave-active {
  transition: opacity 0.2s ease;
}


.search-enter-active .search-dialog,
.search-leave-active .search-dialog {
  transition: transform 0.25s ease;
}


.search-enter-from,
.search-leave-to {
  opacity: 0;
}


.search-enter-from .search-dialog,
.search-leave-to .search-dialog {
  transform: translateY(-14px) scale(0.98);
}


/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 600px) {

  .search-overlay {
    padding: 12px;
  }


  .search-dialog {
    max-height: calc(100dvh - 24px);

    border-radius: 18px;
  }


  .search-body {
    padding: var(--space-md);
  }


  .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}


/* =========================================================
   REDUCED MOTION
   ========================================================= */

@media (prefers-reduced-motion: reduce) {

  .search-enter-active,
  .search-leave-active,
  .search-enter-active .search-dialog,
  .search-leave-active .search-dialog,
  .chip,
  .product-card,
  .footer-button {
    transition: none;
  }
}

</style>