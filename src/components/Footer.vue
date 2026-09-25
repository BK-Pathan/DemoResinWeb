<script setup>
import { RouterLink } from 'vue-router'

/* =========================================================
   CONTACT DETAILS (same values as ContactSection.vue)
   Empty values are not rendered.
   ========================================================= */

const contactInfo = {
  whatsapp: '',
  email: '',
  instagram: '',
  location: ''
}

/* =========================================================
   LINKS
   ========================================================= */

const quickLinks = [
  { label: 'Home', to: '/' },
  // { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  // { label: 'Review', to: '/review' },
  { label: 'Contact', to: '/contact' }
]

const categories = [
  'Jewellery',
  'Home Décor',
  'Trays & Coasters',
  'Pens & Accessories',
  'Custom & Keepsakes'
]

/* =========================================================
   CONTACT ROWS
   ========================================================= */

const whatsappNumber = contactInfo.whatsapp.replace(/\D/g, '')

const instagramHandle = contactInfo.instagram
  .replace(/^https?:\/\/(www\.)?instagram\.com\//i, '')
  .replace(/^@/, '')
  .replace(/\/$/, '')

const contactRows = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: contactInfo.whatsapp,
    href: whatsappNumber ? `https://wa.me/${whatsappNumber}` : '',
    external: true
  },
  {
    id: 'email',
    label: 'Email',
    value: contactInfo.email,
    href: contactInfo.email ? `mailto:${contactInfo.email}` : '',
    external: false
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: instagramHandle ? `@${instagramHandle}` : '',
    href: instagramHandle ? `https://instagram.com/${instagramHandle}` : '',
    external: true
  },
  {
    id: 'location',
    label: 'Location',
    value: contactInfo.location,
    href: '',
    external: false
  }
].filter((row) => row.value)

/* =========================================================
   MISC
   ========================================================= */

const year = new Date().getFullYear()

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">

      <!-- =====================================================
           TOP: BRAND + COLUMNS
           ===================================================== -->

      <div class="footer-top">

        <!-- BRAND -->
        <div class="footer-brand">
          <RouterLink
            to="/"
            class="brand"
            aria-label="Royal Resin Art — Home"
          >
            <img
              src="/logo.png"
              alt="Royal Resin Art logo"
              class="brand-logo"
            />

            <span
              class="brand-text"
              aria-hidden="true"
            >
              <span class="brand-name">RESIN</span>
              <span class="brand-sub">BY KAINAT</span>
            </span>
          </RouterLink>

          <p class="footer-about">
            Handcrafted resin wall clocks, jewellery, trays, coasters, pens,
            frames and custom keepsakes, made with care.
          </p>
        </div>

        <!-- QUICK LINKS -->
        <nav
          class="footer-column"
          aria-label="Footer"
        >
          <h3>Explore</h3>

          <ul>
            <li
              v-for="link in quickLinks"
              :key="link.to"
            >
              <RouterLink
                :to="link.to"
                class="footer-link"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <!-- CATEGORIES -->
        <div class="footer-column">
          <h3>Collections</h3>

          <ul>
            <li
              v-for="category in categories"
              :key="category"
            >
              <RouterLink
                to="/shop"
                class="footer-link"
              >
                {{ category }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- CONTACT -->
        <div
          v-if="contactRows.length"
          class="footer-column"
        >
          <h3>Get in Touch</h3>

          <ul>
            <li
              v-for="row in contactRows"
              :key="row.id"
              class="footer-contact"
            >
              <span class="footer-contact-label">
                {{ row.label }}
              </span>

              <a
                v-if="row.href"
                :href="row.href"
                class="footer-link"
                :target="row.external ? '_blank' : null"
                :rel="row.external ? 'noopener noreferrer' : null"
              >
                {{ row.value }}
              </a>

              <span
                v-else
                class="footer-text"
              >
                {{ row.value }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- =====================================================
           BOTTOM BAR
           ===================================================== -->

      <div class="footer-bottom">
        <p class="copyright">
          © {{ year }} Royal Resin Art. All rights reserved.
        </p>

        <button
          type="button"
          class="to-top"
          @click="scrollToTop"
        >
          Back to top

          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 20V4M6 10l6-6 6 6" />
          </svg>
        </button>
      </div>

    </div>
  </footer>
</template>

<style scoped>
/* =========================================================
   FOOTER
   ========================================================= */

.site-footer {
  padding:
    var(--space-4xl)
    0
    var(--space-xl);

  background:
    var(--color-bg-primary);

  border-top:
    1px solid
    var(--color-border-dark-soft);

  color:
    var(--color-text-primary);
}

.footer-inner {
  width:
    min(
      1240px,
      calc(100% - var(--space-4xl))
    );

  margin:
    0 auto;
}

.footer-top {
  display:
    grid;

  grid-template-columns:
    minmax(0, 1.5fr)
    repeat(
      3,
      minmax(0, 1fr)
    );

  gap:
    var(--space-3xl);

  padding-bottom:
    var(--space-3xl);
}

/* =========================================================
   BRAND
   ========================================================= */

.brand {
  display:
    inline-flex;

  align-items:
    center;

  gap:
    var(--space-sm);

  text-decoration:
    none;
}

.brand:focus-visible {
  outline:
    2px solid
    var(--color-accent-light);

  outline-offset:
    4px;

  border-radius:
    var(--radius-sm);
}

.brand-logo {
  width:
    44px;

  height:
    44px;

  object-fit:
    cover;

  border-radius:
    50%;

  flex-shrink:
    0;
}

.brand-text {
  display:
    flex;

  flex-direction:
    column;

  gap:
    3px;
}

.brand-name {
  color:
    var(--color-text-primary);

  font-family:
    var(--font-heading);

  font-size:
    21px;

  font-weight:
    500;

  letter-spacing:
    3px;

  line-height:
    1;
}

.brand-sub {
  color:
    var(--color-text-secondary);

  font-family:
    var(--font-body);

  font-size:
    8px;

  font-weight:
    500;

  letter-spacing:
    4.4px;

  line-height:
    1;
}

.footer-about {
  max-width:
    340px;

  margin:
    var(--space-lg)
    0
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
   COLUMNS
   ========================================================= */

.footer-column h3 {
  margin:
    0
    0
    var(--space-lg);

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

  text-transform:
    uppercase;
}

.footer-column ul {
  display:
    grid;

  gap:
    var(--space-md);

  margin:
    0;

  padding:
    0;

  list-style:
    none;
}

.footer-link {
  color:
    var(--color-text-secondary);

  font-family:
    var(--font-body);

  font-size:
    15px;

  text-decoration:
    none;

  overflow-wrap:
    anywhere;

  transition:
    color 0.3s ease;
}

.footer-link:hover {
  color:
    var(--color-accent-light);
}

.footer-link:focus-visible {
  outline:
    2px solid
    var(--color-accent-light);

  outline-offset:
    3px;

  border-radius:
    var(--radius-sm);
}

.footer-contact {
  display:
    flex;

  flex-direction:
    column;

  gap:
    var(--space-xs);
}

.footer-contact-label {
  color:
    var(--color-text-muted);

  font-family:
    var(--font-body);

  font-size:
    11px;

  font-weight:
    600;

  letter-spacing:
    2px;

  text-transform:
    uppercase;
}

.footer-text {
  color:
    var(--color-text-secondary);

  font-family:
    var(--font-body);

  font-size:
    15px;
}

/* =========================================================
   BOTTOM BAR
   ========================================================= */

.footer-bottom {
  display:
    flex;

  align-items:
    center;

  justify-content:
    space-between;

  gap:
    var(--space-lg);

  padding-top:
    var(--space-xl);

  border-top:
    1px solid
    var(--color-border-dark-soft);
}

.copyright {
  margin:
    0;

  color:
    var(--color-text-muted);

  font-family:
    var(--font-body);

  font-size:
    13px;
}

.to-top {
  display:
    inline-flex;

  align-items:
    center;

  gap:
    var(--space-sm);

  padding:
    var(--space-sm)
    0;

  background:
    transparent;

  border:
    0;

  color:
    var(--color-accent);

  font-family:
    var(--font-body);

  font-size:
    12px;

  font-weight:
    600;

  cursor:
    pointer;

  transition:
    color 0.3s ease;
}

.to-top:hover {
  color:
    var(--color-accent-light);
}

.to-top:focus-visible {
  outline:
    2px solid
    var(--color-accent-light);

  outline-offset:
    3px;

  border-radius:
    var(--radius-sm);
}

.to-top svg {
  width:
    14px;

  height:
    14px;

  fill:
    none;

  stroke:
    currentColor;

  stroke-width:
    2;

  stroke-linecap:
    round;

  stroke-linejoin:
    round;

  transition:
    transform 0.3s ease;
}

.to-top:hover svg {
  transform:
    translateY(-3px);
}

/* =========================================================
   TABLET
   ========================================================= */

@media (max-width: 1000px) {
  .footer-top {
    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );

    gap:
      var(--space-2xl);
  }

  .footer-brand {
    grid-column:
      1 / -1;
  }
}

/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 768px) {
  .site-footer {
    padding:
      var(--space-3xl)
      0
      var(--space-lg);
  }

  .footer-inner {
    width:
      calc(
        100% - var(--space-2xl)
      );
  }
}

/* =========================================================
   SMALL MOBILE
   ========================================================= */

@media (max-width: 560px) {
  .footer-top {
    grid-template-columns:
      minmax(0, 1fr);

    gap:
      var(--space-xl);
  }

  .footer-bottom {
    flex-direction:
      column;

    align-items:
      flex-start;

    gap:
      var(--space-md);
  }
}

/* =========================================================
   REDUCED MOTION
   ========================================================= */

@media (prefers-reduced-motion: reduce) {
  .footer-link,
  .to-top,
  .to-top svg {
    transition:
      none;
  }

  .to-top:hover svg {
    transform:
      none;
  }
}
</style>