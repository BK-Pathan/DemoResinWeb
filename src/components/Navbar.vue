<template>
  <header
    class="site-header"
    :class="{ 'is-solid': isSolid }"
  >
    <div class="header-inner">

      <!-- =====================================================
           MOBILE HAMBURGER
           ===================================================== -->
      <button
        type="button"
        class="icon-button mobile-menu-button"
        :aria-label="isOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="isOpen"
        aria-controls="mobile-panel"
        @click="toggle"
      >
        <svg
          v-if="!isOpen"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>

        <svg
          v-else
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>

      <!-- =====================================================
           LOGO
           ===================================================== -->
      <RouterLink
        to="/"
        class="brand"
        aria-label="Royal Resin Art — Home"
        @click="close"
      >
        <img
          src="/logo.png"
          alt="Royal Resin Art"
          class="brand-logo"
        />
      </RouterLink>

      <!-- =====================================================
           DESKTOP NAV
           ===================================================== -->
      <nav
        class="main-nav"
        aria-label="Main"
      >
        <ul>
          <li
            v-for="link in links"
            :key="link.to"
          >
            <RouterLink
              :to="link.to"
              class="nav-link"
              active-class="is-active"
              exact-active-class="is-active"
              @click="close"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <!-- =====================================================
           ACTIONS
           ===================================================== -->
      <div class="header-actions">

        <!-- SEARCH -->
        <button
          type="button"
          class="icon-button search-button"
          aria-label="Search"
          aria-haspopup="dialog"
          @click="openSearch"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              cx="11"
              cy="11"
              r="6.5"
            />
            <path d="m16 16 4.5 4.5" />
          </svg>
        </button>

        <!-- CART -->
        <button
          type="button"
          class="icon-button cart-button"
          :aria-label="
            cartCount
              ? `Open shopping cart, ${cartCount} items`
              : 'Open shopping cart'
          "
          @click="openCart"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M5 8h14l-1 12H6z" />
            <path d="M9 8V7a3 3 0 0 1 6 0v1" />
          </svg>

          <span
            v-if="cartCount > 0"
            class="cart-badge"
          >
            {{ cartCount > 9 ? '9+' : cartCount }}
          </span>
        </button>

      </div>
    </div>

    <!-- =====================================================
         MOBILE OVERLAY
         ===================================================== -->
    <Transition name="mobile-overlay">
      <button
        v-if="isOpen"
        type="button"
        class="mobile-overlay"
        aria-label="Close menu"
        @click="close"
      ></button>
    </Transition>

    <!-- =====================================================
         MOBILE DRAWER
         ===================================================== -->
    <aside
      id="mobile-panel"
      class="mobile-panel"
      :class="{ 'is-open': isOpen }"
      :aria-hidden="!isOpen"
      aria-label="Mobile navigation"
    >
      <div class="mobile-panel-inner">

        <!-- DRAWER HEADER -->
        <div class="mobile-panel-header">
          <span class="mobile-panel-title">
            Menu
          </span>

          <button
            type="button"
            class="mobile-close"
            aria-label="Close menu"
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

        <!-- DRAWER NAVIGATION -->
        <nav
          class="mobile-navigation"
          aria-label="Mobile navigation"
        >
          <ul>
            <li
              v-for="link in links"
              :key="link.to"
            >
              <RouterLink
                :to="link.to"
                class="mobile-link"
                active-class="is-active"
                exact-active-class="is-active"
                @click="close"
              >
                <span class="mobile-link-label">
                  {{ link.label }}
                </span>

                <svg
                  class="mobile-link-arrow"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M5 12h13" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </RouterLink>
            </li>
          </ul>
        </nav>

      </div>
    </aside>

    <!-- =====================================================
         SEARCH DIALOG
         ===================================================== -->
    <SearchDialog v-model="isSearchOpen" />

  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import {
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount
} from 'vue'
import SearchDialog from './SearchDialog.vue'

/* =========================================================
   EVENTS
   ========================================================= */

const emit = defineEmits(['search'])

/* =========================================================
   NAVIGATION LINKS
   ========================================================= */

const links = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Review', to: '/review' },
  { label: 'Contact', to: '/contact' }
]

/* =========================================================
   STATE
   ========================================================= */

const isScrolled = ref(false)
const isOpen = ref(false)
const isSearchOpen = ref(false)

/* =========================================================
   SEARCH
   ========================================================= */

const openSearch = () => {
  close()
  isSearchOpen.value = true
  emit('search')
}

/* =========================================================
   CART
   ========================================================= */

const CART_STORAGE_KEY = 'royal-resin-cart'
const cartItems = ref([])

const loadCart = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY)
    const parsed = saved ? JSON.parse(saved) : []

    cartItems.value = Array.isArray(parsed) ? parsed : []
  } catch {
    cartItems.value = []
  }
}

const cartCount = computed(() => {
  return cartItems.value.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  )
})

const handleCartUpdate = () => {
  loadCart()
}

const openCart = () => {
  close()
  window.dispatchEvent(new CustomEvent('royal-cart-open'))
}

/* =========================================================
   HEADER SOLID STATE
   ========================================================= */

const isSolid = computed(() => {
  return isScrolled.value || isOpen.value
})

/* =========================================================
   MOBILE MENU
   ========================================================= */

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

/* =========================================================
   SCROLL
   ========================================================= */

const onScroll = () => {
  isScrolled.value = window.scrollY > 24
}

/* =========================================================
   KEYBOARD
   ========================================================= */

const onKeydown = (event) => {
  if (event.key === 'Escape') {
    close()
  }
}

/* =========================================================
   RESIZE
   ========================================================= */

const onResize = () => {
  if (window.innerWidth > 900) {
    close()
  }
}

/* =========================================================
   BODY SCROLL LOCK
   (locks <html> as well as <body> so it works in every
   browser, including iOS Safari)
   ========================================================= */

watch(isOpen, (open) => {
  const value = open ? 'hidden' : ''

  document.documentElement.style.overflow = value
  document.body.style.overflow = value
})

/* =========================================================
   MOUNT
   ========================================================= */

onMounted(() => {
  onScroll()
  loadCart()

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', onResize)
  window.addEventListener('royal-cart-updated', handleCartUpdate)
  window.addEventListener('storage', handleCartUpdate)
})

/* =========================================================
   UNMOUNT
   ========================================================= */

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('royal-cart-updated', handleCartUpdate)
  window.removeEventListener('storage', handleCartUpdate)

  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
})
</script>

<style scoped>

/* =========================================================
   HEADER

   IMPORTANT: the solid background + blur live on ::before.
   `backdrop-filter` on the header itself turns the header
   into the containing block for every `position: fixed`
   child — that was shrinking the drawer/overlay and causing
   the gap at the bottom of the mobile menu.
   ========================================================= */

.site-header {
  --nav-height: 88px;
  --nav-height-solid: 68px;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  z-index: 100;
}

.site-header::before {
  content: "";

  position: absolute;
  inset: 0;
  z-index: -1;

  background: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border-dark);

  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);

  opacity: 0;
  pointer-events: none;

  transition: opacity 0.35s ease;
}

.site-header.is-solid::before {
  opacity: 1;
}

/* =========================================================
   HEADER INNER
   ========================================================= */

.header-inner {
  width: min(1380px, calc(100% - 96px));
  height: var(--nav-height);

  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  transition: height 0.35s ease;
}

.is-solid .header-inner {
  height: var(--nav-height-solid);
}

/* =========================================================
   LOGO
   ========================================================= */

.brand {
  justify-self: start;

  display: inline-flex;
  align-items: center;

  text-decoration: none;
}

.brand-logo {
  width: 60px;
  height: 60px;

  display: block;

  object-fit: cover;
  border-radius: 50%;
  overflow: hidden;
}

.brand:focus-visible {
  outline: 2px solid var(--color-accent-light);
  outline-offset: 4px;
  border-radius: 50%;
}

/* =========================================================
   DESKTOP NAV
   ========================================================= */

.main-nav {
  justify-self: center;
}

.main-nav ul {
  display: flex;
  align-items: center;
  gap: 40px;

  margin: 0;
  padding: 0;

  list-style: none;
}

.nav-link {
  position: relative;

  padding: var(--space-sm) 0;

  color: var(--color-text-primary);

  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.3px;

  text-decoration: none;

  transition: color 0.25s ease;
}

.nav-link::after {
  content: "";

  position: absolute;
  left: 0;
  bottom: 0;

  width: 100%;
  height: 1px;

  background: var(--color-accent);

  transform: scaleX(0);
  transform-origin: left;

  transition: transform 0.3s ease;
}

.nav-link:hover,
.nav-link.is-active {
  color: var(--color-accent-light);
}

.nav-link.is-active::after,
.nav-link:hover::after {
  transform: scaleX(1);
}

.nav-link:focus-visible {
  outline: 2px solid var(--color-accent-light);
  outline-offset: 4px;
  border-radius: var(--radius-sm);
}

/* =========================================================
   HEADER ACTIONS
   ========================================================= */

.header-actions {
  justify-self: end;

  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.icon-button {
  position: relative;

  width: 40px;
  height: 40px;

  display: grid;
  place-items: center;

  padding: 0;

  background: transparent;
  border: 0;
  border-radius: 50%;

  color: var(--color-icon-light);

  cursor: pointer;

  -webkit-tap-highlight-color: transparent;

  transition:
    color 0.25s ease,
    background 0.25s ease;
}

.icon-button svg {
  width: 20px;
  height: 20px;

  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.icon-button:hover {
  color: var(--color-accent-light);
  background: var(--color-border-dark-soft);
}

.icon-button:focus-visible {
  outline: 2px solid var(--color-accent-light);
  outline-offset: 2px;
}

/* =========================================================
   CART BADGE
   ========================================================= */

.cart-badge {
  position: absolute;
  top: 3px;
  right: 2px;

  min-width: 16px;
  height: 16px;

  display: grid;
  place-items: center;

  padding: 0 3px;

  background: var(--color-accent);
  border: 2px solid var(--color-bg-dark);
  border-radius: 999px;

  box-sizing: content-box;

  color: var(--color-bg-dark);

  font-family: var(--font-body);
  font-size: 9px;
  font-weight: 700;
  line-height: 1;
}

/* =========================================================
   MOBILE HAMBURGER (hidden on desktop)
   ========================================================= */

.mobile-menu-button {
  display: none;
}

/* =========================================================
   MOBILE OVERLAY
   ========================================================= */

.mobile-overlay {
  position: fixed;
  inset: 0;

  z-index: 104;

  width: 100%;
  height: 100%;

  padding: 0;
  margin: 0;

  border: 0;

  background: rgba(0, 0, 0, 0.55);

  cursor: pointer;

  -webkit-tap-highlight-color: transparent;
}

.mobile-overlay-enter-active,
.mobile-overlay-leave-active {
  transition: opacity 0.3s ease;
}

.mobile-overlay-enter-from,
.mobile-overlay-leave-to {
  opacity: 0;
}

/* =========================================================
   MOBILE PANEL / DRAWER

   Pinned with top:0 + bottom:0 (no fixed height), so it
   always fills the full screen — no gap at the bottom,
   even when the mobile browser toolbar shows or hides.
   ========================================================= */

.mobile-panel {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;

  z-index: 110;

  width: min(86vw, 380px);
  max-width: 100%;

  box-sizing: border-box;

  background: var(--color-surface-dark);

  transform: translate3d(-100%, 0, 0);
  visibility: hidden;
  overflow: hidden;

  transition:
    transform 0.32s cubic-bezier(0.22, 0.61, 0.36, 1),
    box-shadow 0.32s ease,
    visibility 0s linear 0.32s;
}

.mobile-panel.is-open {
  transform: translate3d(0, 0, 0);
  visibility: visible;

  box-shadow: 0 0 40px rgba(0, 0, 0, 0.45);

  transition:
    transform 0.32s cubic-bezier(0.22, 0.61, 0.36, 1),
    box-shadow 0.32s ease,
    visibility 0s;
}

/* =========================================================
   DRAWER INNER
   ========================================================= */

.mobile-panel-inner {
  width: 100%;
  height: 100%;
  min-height: 0;

  box-sizing: border-box;

  overflow-x: hidden;
  overflow-y: auto;

  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;

  padding:
    env(safe-area-inset-top, 0px)
    var(--space-md)
    max(var(--space-md), env(safe-area-inset-bottom, 0px));
}

/* =========================================================
   DRAWER HEADER
   ========================================================= */

.mobile-panel-header {
  min-height: 56px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: var(--space-lg);

  border-bottom: 1px solid var(--color-border-dark-soft);
}

.mobile-panel-title {
  color: var(--color-text-primary);

  font-family: var(--font-heading);
  font-size: 22px;
  font-weight: 500;
}

.mobile-close {
  width: 40px;
  height: 40px;

  flex: 0 0 40px;

  display: grid;
  place-items: center;

  padding: 0;

  background: transparent;
  border: 0;
  border-radius: 50%;

  color: var(--color-icon-light);

  cursor: pointer;

  transition:
    color 0.25s ease,
    background 0.25s ease;
}

.mobile-close svg {
  width: 20px;
  height: 20px;

  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.mobile-close:hover {
  color: var(--color-accent-light);
  background: var(--color-border-dark-soft);
}

.mobile-close:focus-visible {
  outline: 2px solid var(--color-accent-light);
  outline-offset: 2px;
}

/* =========================================================
   MOBILE NAV
   ========================================================= */

.mobile-navigation {
  width: 100%;
}

.mobile-navigation ul {
  margin: 0;
  padding: 0;

  list-style: none;
}

.mobile-navigation li {
  width: 100%;

  margin: 0;
  padding: 0;
}

/* =========================================================
   MOBILE LINKS
   ========================================================= */

.mobile-link {
  width: 100%;
  min-height: 54px;

  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);

  padding: 0;

  border-bottom: 1px solid var(--color-border-dark-soft);

  color: var(--color-text-primary);

  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 500;

  text-decoration: none;

  transition:
    color 0.25s ease,
    padding-left 0.25s ease;
}

.mobile-link-label {
  display: block;
  white-space: nowrap;
}

.mobile-link:hover,
.mobile-link.is-active {
  color: var(--color-accent);
}

.mobile-link:hover {
  padding-left: var(--space-sm);
}

.mobile-link-arrow {
  width: 17px;
  height: 17px;

  flex: 0 0 17px;

  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;

  transition: transform 0.25s ease;
}

.mobile-link:hover .mobile-link-arrow {
  transform: translateX(2px);
}

.mobile-link:focus-visible {
  outline: 2px solid var(--color-accent-light);
  outline-offset: -2px;
}

/* =========================================================
   LARGE TABLET / SMALL LAPTOP
   ========================================================= */

@media (max-width: 1100px) {

  .header-inner {
    width: calc(100% - 48px);
  }

  .main-nav ul {
    gap: 28px;
  }
}

/* =========================================================
   TABLET / MOBILE  (drawer mode)
   ========================================================= */

@media (max-width: 900px) {

  .site-header {
    --nav-height: 72px;
    --nav-height-solid: 64px;
  }

  .header-inner {
    width: calc(100% - 32px);
  }

  /* LEFT — HAMBURGER */
  .mobile-menu-button {
    display: grid;
    justify-self: start;
  }

  /* CENTER — LOGO */
  .brand {
    justify-self: center;
  }

  .brand-logo {
    width: 50px;
    height: 50px;
  }

  /* HIDE DESKTOP NAV */
  .main-nav {
    display: none;
  }

  /* RIGHT — SEARCH + CART */
  .header-actions {
    gap: 2px;
  }
}

/* =========================================================
   DESKTOP — drawer & overlay never render
   ========================================================= */

@media (min-width: 901px) {

  .mobile-panel,
  .mobile-overlay {
    display: none;
  }
}

/* =========================================================
   SMALL MOBILE
   ========================================================= */

@media (max-width: 420px) {

  .header-inner {
    width: calc(100% - 20px);
  }

  .icon-button {
    width: 38px;
    height: 38px;
  }

  .header-actions {
    gap: 0;
  }

  .mobile-panel-header {
    margin-bottom: var(--space-md);
  }

  .mobile-link {
    min-height: 52px;
  }
}

/* =========================================================
   VERY SMALL MOBILE
   ========================================================= */

@media (max-width: 340px) {

  .header-inner {
    width: calc(100% - 12px);
  }

  .brand-logo {
    width: 46px;
    height: 46px;
  }

  .icon-button {
    width: 36px;
    height: 36px;
  }

  .icon-button svg {
    width: 19px;
    height: 19px;
  }

  .mobile-panel {
    width: min(88vw, 300px);
  }

  .mobile-link {
    min-height: 50px;
    font-size: 17px;
  }
}

/* =========================================================
   SHORT SCREENS (landscape phones) — keep links reachable
   ========================================================= */

@media (max-height: 480px) {

  .mobile-panel-header {
    min-height: 48px;
    margin-bottom: var(--space-sm);
  }

  .mobile-link {
    min-height: 44px;
  }
}

/* =========================================================
   REDUCED MOTION
   ========================================================= */

@media (prefers-reduced-motion: reduce) {

  .site-header::before,
  .header-inner,
  .nav-link,
  .nav-link::after,
  .icon-button,
  .mobile-panel,
  .mobile-panel.is-open,
  .mobile-link,
  .mobile-close,
  .mobile-overlay,
  .mobile-overlay-enter-active,
  .mobile-overlay-leave-active,
  .mobile-link-arrow {
    transition: none;
  }
}

</style>