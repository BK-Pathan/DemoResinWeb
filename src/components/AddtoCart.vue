<script setup lang="ts">
/* =========================================================
   ADD TO CART BUTTON
   Reusable, self-contained. Import this everywhere instead
   of re-writing the button (Shop grid, Product detail page,
   related-products, etc).

   Handles:
   - Saving to the same cart storage/event used across the app
   - "Flying image" animation from the button to the navbar
     cart icon
   - Button bounce + icon morph (cart -> check) feedback
   ========================================================= */

import { ref } from 'vue'

/* =========================================================
   TYPES
   ========================================================= */

interface CartProduct {
  id: string
  name: string
  price: number
  image?: string
}

/* =========================================================
   PROPS
   ========================================================= */

const props = defineProps<{
  product: CartProduct
  disabled?: boolean
}>()

const emit = defineEmits<{
  (event: 'added', product: CartProduct): void
}>()

/* =========================================================
   SETTINGS
   ========================================================= */

const CART_STORAGE_KEY = 'royal-resin-cart'

/*
 * Put this attribute on whatever element is your navbar
 * cart icon, e.g. <button data-cart-icon @click="...">.
 * The flying clone will animate toward it. If it isn't
 * found, the animation falls back to the top-right corner
 * of the screen so nothing breaks.
 */
const CART_ICON_SELECTOR = '[data-cart-icon]'

/* =========================================================
   STATE
   ========================================================= */

const btnRef = ref<HTMLElement | null>(null)
const isAdded = ref(false)
const isBouncing = ref(false)

let addedTimeout: ReturnType<typeof setTimeout> | null = null
let bounceTimeout: ReturnType<typeof setTimeout> | null = null

/* =========================================================
   CART SAVE (same storage + event as the rest of the app)
   ========================================================= */

const saveToCart = (product: CartProduct) => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY)
    const cart = saved ? JSON.parse(saved) : []

    const existing = cart.find(
      (item: { id: string; quantity: number }) =>
        item.id === product.id
    )

    if (existing) {
      existing.quantity += 1
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: Number(product.price || 0),
        image: product.image || '',
        quantity: 1
      })
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))

    window.dispatchEvent(
      new CustomEvent('royal-cart-updated', { detail: cart })
    )
  } catch (error) {
    console.error('Failed to add product to cart:', error)
  }
}

/* =========================================================
   FLYING IMAGE ANIMATION
   ========================================================= */

const flyToCart = () => {
  if (!props.product.image || !btnRef.value) return

  const startRect = btnRef.value.getBoundingClientRect()

  const cartIcon = document.querySelector(
    CART_ICON_SELECTOR
  ) as HTMLElement | null

  const endRect = cartIcon
    ? cartIcon.getBoundingClientRect()
    : {
        left: window.innerWidth - 40,
        top: 20,
        width: 24,
        height: 24
      }

  const flyer = document.createElement('img')
  flyer.src = props.product.image
  flyer.style.position = 'fixed'
  flyer.style.zIndex = '2000'
  flyer.style.left = `${startRect.left + startRect.width / 2 - 22}px`
  flyer.style.top = `${startRect.top + startRect.height / 2 - 22}px`
  flyer.style.width = '44px'
  flyer.style.height = '44px'
  flyer.style.borderRadius = '50%'
  flyer.style.objectFit = 'cover'
  flyer.style.pointerEvents = 'none'
  flyer.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.35)'
  flyer.style.willChange = 'transform, opacity'

  document.body.appendChild(flyer)

  const deltaX =
    endRect.left + endRect.width / 2 - (startRect.left + startRect.width / 2)

  const deltaY =
    endRect.top + endRect.height / 2 - (startRect.top + startRect.height / 2)

  const animation = flyer.animate(
    [
      {
        transform: 'translate(0, 0) scale(1)',
        opacity: 1,
        offset: 0
      },
      {
        transform: `translate(${deltaX * 0.5}px, ${
          deltaY * 0.5 - 60
        }px) scale(0.7)`,
        opacity: 1,
        offset: 0.55
      },
      {
        transform: `translate(${deltaX}px, ${deltaY}px) scale(0.15)`,
        opacity: 0.2,
        offset: 1
      }
    ],
    {
      duration: 700,
      easing: 'cubic-bezier(0.35, 0, 0.2, 1)'
    }
  )

  animation.onfinish = () => {
    flyer.remove()

    if (cartIcon) {
      const bump = cartIcon.animate(
        [
          { transform: 'scale(1)' },
          { transform: 'scale(1.25)' },
          { transform: 'scale(1)' }
        ],
        { duration: 320, easing: 'ease-out' }
      )
      bump.play()
    }
  }
}

/* =========================================================
   CLICK HANDLER
   ========================================================= */

const handleClick = () => {
  if (props.disabled) return

  saveToCart(props.product)
  flyToCart()

  isBouncing.value = true
  isAdded.value = true

  emit('added', props.product)

  if (bounceTimeout) clearTimeout(bounceTimeout)
  bounceTimeout = setTimeout(() => {
    isBouncing.value = false
  }, 350)

  if (addedTimeout) clearTimeout(addedTimeout)
  addedTimeout = setTimeout(() => {
    isAdded.value = false
  }, 1400)
}
</script>

<template>
  <button
    ref="btnRef"
    type="button"
    class="add-to-cart-btn"
    :class="{ 'is-added': isAdded, 'is-bouncing': isBouncing }"
    :disabled="disabled"
    @click="handleClick"
  >
    <span class="icon-swap">
      <svg
        class="icon-cart"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H6"
        />
        <circle cx="10" cy="20" r="1.2" />
        <circle cx="18" cy="20" r="1.2" />
      </svg>

      <svg
        class="icon-check"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="m5 12 5 5 9-9" />
      </svg>
    </span>

    <span class="btn-text">
      {{ isAdded ? 'Added to Cart' : 'Add to Cart' }}
    </span>
  </button>
</template>

<style scoped>
.add-to-cart-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  min-height: 40px;
  padding: 0 var(--space-md);
  overflow: hidden;
  background: var(--color-button-primary);
  border: 1px solid var(--color-button-primary);
  border-radius: var(--radius-sm);
  color: var(--color-button-primary-text);
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    transform 0.15s ease;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: var(--color-button-primary-hover);
  border-color: var(--color-button-primary-hover);
  transform: translateY(-2px);
}

.add-to-cart-btn:focus-visible {
  outline: 2px solid var(--color-accent-light);
  outline-offset: 2px;
}

.add-to-cart-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.add-to-cart-btn.is-bouncing {
  animation: btn-bounce 0.35s ease;
}

.add-to-cart-btn.is-added {
  background: var(--color-button-dark);
  border-color: var(--color-button-dark);
  color: var(--color-button-dark-text);
}

@keyframes btn-bounce {
  0% {
    transform: scale(1);
  }
  35% {
    transform: scale(0.92);
  }
  65% {
    transform: scale(1.06);
  }
  100% {
    transform: scale(1);
  }
}

/* =========================================================
   ICON MORPH (cart -> check)
   ========================================================= */

.icon-swap {
  position: relative;
  width: 15px;
  height: 15px;
  flex-shrink: 0;
}

.icon-swap svg {
  position: absolute;
  inset: 0;
  width: 15px;
  height: 15px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.icon-cart {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

.icon-check {
  opacity: 0;
  transform: scale(0.4) rotate(-45deg);
}

.add-to-cart-btn.is-added .icon-cart {
  opacity: 0;
  transform: scale(0.4) rotate(45deg);
}

.add-to-cart-btn.is-added .icon-check {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

.btn-text {
  white-space: nowrap;
}

/* =========================================================
   REDUCED MOTION
   ========================================================= */

@media (prefers-reduced-motion: reduce) {
  .add-to-cart-btn,
  .add-to-cart-btn.is-bouncing,
  .icon-swap svg {
    animation: none;
    transition: none;
  }
}
</style>