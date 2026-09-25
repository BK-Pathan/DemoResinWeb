<template>
  <section class="royal-hero">

    <!-- =====================================================
         BACKGROUND IMAGE
         ===================================================== -->
    <div class="hero-background">
      <div class="hero-art">
        <img
          src="../assets/HeroBg.png"
          alt="Handcrafted Royal Resin Art clock"
          class="art-image"
          decoding="async"
          fetchpriority="high"
        />
      </div>

      <div class="hero-shade"></div>
    </div>

    <!-- =====================================================
         MAIN CONTENT
         ===================================================== -->
    <div class="hero-content">
      <div class="hero-copy">

        <div class="eyebrow">
          <span>HANDCRAFTED WITH PASSION</span>
        </div>

        <h1>
          Unique Resin Art
          <span>for Your Space</span>
        </h1>

        <p class="hero-description">
          Transforming simple surfaces into timeless pieces
          of art — handcrafted, custom, and always unique.
        </p>


        <a
        href="/shop"
          class="hero-cta">
         <span>Shop Now</span>
        </a>
      

      </div>
    </div>

    <!-- =====================================================
         TRUST FEATURES
         ===================================================== -->
    <div class="hero-features">

      <!-- Handmade -->
      <div class="feature">
        <div class="feature-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 2.5 20 5.5v6c0 4.7-3.4 8.4-8 10-4.6-1.6-8-5.3-8-10v-6z"
            />
            <path
              d="M12 16.5s-4.5-2.7-4.5-5.7a2.5 2.5 0 0 1 4.5-1.5 2.5 2.5 0 0 1 4.5 1.5c0 3-4.5 5.7-4.5 5.7z"
            />
          </svg>
        </div>

        <div class="feature-text">
          <strong>Handmade</strong>
          <span>With Love</span>
        </div>
      </div>

      <!-- Premium -->
      <div class="feature">
        <div class="feature-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 2.5 20 5.5v6c0 4.7-3.4 8.4-8 10-4.6-1.6-8-5.3-8-10v-6z"
            />
            <path d="M8.5 10.5 10.5 8h3l2 2.5-3.5 5.5z" />
            <path d="M8.5 10.5h7" />
          </svg>
        </div>

        <div class="feature-text">
          <strong>Premium</strong>
          <span>Quality</span>
        </div>
      </div>

      <!-- Custom -->
      <div class="feature">
        <div class="feature-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.5 19.5 7v10L12 21.5 4.5 17V7z" />
            <path
              d="M12 8l1.2 2.8L16 12l-2.8 1.2L12 16l-1.2-2.8L8 12l2.8-1.2z"
            />
          </svg>
        </div>

        <div class="feature-text">
          <strong>Custom Orders</strong>
          <span>Available</span>
        </div>
      </div>

      <!-- Shipping -->
      <div class="feature">
        <div class="feature-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.5 19.5 7v10L12 21.5 4.5 17V7z" />
            <path d="M12 8.2 15.5 10v4L12 15.8 8.5 14v-4z" />
            <path d="M8.5 10 12 11.8 15.5 10M12 11.8v4" />
          </svg>
        </div>

        <div class="feature-text">
          <strong>Worldwide</strong>
          <span>Shipping</span>
        </div>
      </div>

    </div>

    <!-- =====================================================
         SCROLL INDICATOR
         ===================================================== -->
    <div class="scroll-indicator">
      <svg
        class="scroll-arrow"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 4v15M6 13l6 6 6-6" />
      </svg>

      <span>Scroll Down</span>
    </div>

  </section>
</template>

<style scoped>

/* =========================================================
   HERO BASE

   --s               : size multiplier. 1 on normal screens,
                       raised on large monitors (see tiers
                       below) so text/buttons scale up.
   --container-*     : SAME values are used by SiteHeader.vue,
                       so logo / nav / hero text always line
                       up on every screen size.
   ========================================================= */

.royal-hero {
  --s: 1;

  --container-max: 1380px;
  --container-gutter: 96px;
  --container-width: min(
    var(--container-max),
    calc(100% - var(--container-gutter))
  );

  position: relative;

  width: 100%;
  max-width: 100%;

  min-height: 100svh;
  min-height: 100dvh;

  margin: 0;
  padding: 0;

  overflow: hidden;
  isolation: isolate;

  box-sizing: border-box;

  background: linear-gradient(
    110deg,
    var(--color-bg-dark) 10%,
    var(--color-brand-navy-deep) 55%,
    var(--color-brand-navy) 100%
  );

  color: var(--color-text-primary);
}

/* =========================================================
   BACKGROUND
   ========================================================= */

.hero-background {
  position: absolute;
  inset: 0;

  z-index: 0;

  overflow: hidden;

  pointer-events: none;
}

/* -1px bleed on every side removes hairline seams */
.hero-art {
  position: absolute;
  top: -1px;
  right: -1px;
  bottom: -1px;
  left: -1px;
  pointer-events: none;
}

.art-image {
  display: block;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
  object-position: 70% 45%;
  user-select: none;
  pointer-events: none;
}
/* =========================================================
   HERO SHADE
   ========================================================= */

.hero-shade {
  position: absolute;
  inset: 0;

  z-index: 2;

  pointer-events: none;

  background:
    linear-gradient(
      90deg,
      var(--color-hero-shade-soft) 0%,
      var(--color-hero-shade-clear) 58%
    ),
    linear-gradient(
      0deg,
      var(--color-hero-shade-medium) 0%,
      var(--color-hero-shade-clear) 26%
    ),
    linear-gradient(
      180deg,
      var(--color-hero-shade-soft) 0%,
      var(--color-hero-shade-clear) 16%
    );
}

/* =========================================================
   MAIN CONTENT
   ========================================================= */

.hero-content {
  position: relative;

  z-index: 5;

  width: var(--container-width);

  min-height: 100svh;
  min-height: 100dvh;

  margin: 0 auto;

  display: flex;
  align-items: center;

  box-sizing: border-box;
}

.hero-copy {
  width: 100%;
  max-width: calc(640px * var(--s));

  padding-bottom: 40px;

  animation: heroCopyReveal 1s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

/* =========================================================
   EYEBROW
   ========================================================= */

.eyebrow {
  display: flex;
  align-items: center;
  gap: calc(12px * var(--s));

  margin-bottom: calc(20px * var(--s));

  color: var(--color-accent);

  font-family: var(--font-body);
  font-size: calc(11px * var(--s));
  font-weight: 600;
  letter-spacing: calc(3px * var(--s));
}

/* =========================================================
   HEADING
   ========================================================= */

.hero-copy h1 {
  margin: 0;

  color: var(--color-text-primary);

  font-family: var(--font-heading);
  font-size: clamp(44px, 4.4vw, 84px);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.03em;

  text-wrap: balance;
}

.hero-copy h1 span {
  display: block;
}

/* =========================================================
   DESCRIPTION
   ========================================================= */

.hero-description {
  width: 100%;
  max-width: calc(440px * var(--s));

  margin: calc(26px * var(--s)) 0 calc(32px * var(--s));

  color: var(--color-text-secondary);

  font-family: var(--font-body);
  font-size: calc(15px * var(--s));
  line-height: 1.7;
}

/* =========================================================
   CTA
   ========================================================= */

.hero-cta {
  position: relative;
  z-index: 30;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: calc(14px * var(--s));
  min-height: calc(48px * var(--s));
  padding: 0 calc(22px * var(--s));
  background: var(--color-button-primary);
  color: var(--color-button-primary-text);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: calc(13px * var(--s));
  font-weight: 600;
  text-decoration: none;
  box-shadow: var(--shadow-gold);
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  pointer-events: auto;
  transition:
    transform 0.3s ease,
    background 0.3s ease;
}

.hero-cta:hover {
  transform: translateY(-2px);
  background: var(--color-button-primary-hover);
}

.hero-cta:focus-visible {
  outline: 2px solid var(--color-accent-light);
  outline-offset: 3px;
}

.cta-arrow {
  width: calc(16px * var(--s));
  height: calc(16px * var(--s));

  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;

  transition: transform 0.3s ease;
}

.hero-cta:hover .cta-arrow {
  transform: translateX(4px);
}

/* =========================================================
   TRUST FEATURES
   Left edge = left edge of .hero-content (same container)
   ========================================================= */

.hero-features {
  position: absolute;
  z-index: 20;

  left: calc((100% - var(--container-width)) / 2);
  bottom: calc(56px * var(--s));

  display: flex;
  align-items: center;
  gap: calc(44px * var(--s));
}

.feature {
  display: flex;
  align-items: center;
  gap: calc(12px * var(--s));
}

.feature-icon {
  width: calc(30px * var(--s));
  height: calc(30px * var(--s));

  flex: 0 0 calc(30px * var(--s));

  color: var(--color-icon-primary);
}

.feature-icon svg {
  display: block;

  width: 100%;
  height: 100%;

  fill: none;
  stroke: currentColor;
  stroke-width: 1.3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.feature-text {
  display: flex;
  flex-direction: column;
  gap: 2px;

  font-family: var(--font-body);
  line-height: 1.3;
}

.feature-text strong {
  color: var(--color-text-primary);

  font-size: calc(12px * var(--s));
  font-weight: 600;
}

.feature-text span {
  color: var(--color-text-secondary);

  font-size: calc(11px * var(--s));
}

/* =========================================================
   SCROLL INDICATOR
   ========================================================= */

.scroll-indicator {
  position: absolute;
  z-index: 20;

  left: 50%;
  bottom: calc(16px * var(--s));

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  transform: translateX(-50%);

  color: var(--color-text-muted);

  font-family: var(--font-body);
  font-size: calc(10px * var(--s));

  pointer-events: none;
}

.scroll-arrow {
  width: calc(14px * var(--s));
  height: calc(14px * var(--s));

  fill: none;
  stroke: var(--color-text-secondary);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;

  animation: scrollBounce 1.8s ease-in-out infinite;
}

/* =========================================================
   ANIMATIONS
   ========================================================= */

@keyframes heroCopyReveal {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scrollBounce {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(4px);
  }
}

/* =========================================================
   LARGE DESKTOP TIERS  (ascending — each one builds on the
   previous). Only variables + a few sizes change here; every
   element above scales itself through --s.
   ========================================================= */

/* ---- 1400px+ : wide laptop / desktop ---- */
@media (min-width: 1400px) {

  .art-image {
    object-position: 66% 42%;
  }
}

/* ---- 1600px+ : large desktop ---- */
@media (min-width: 1600px) {

  .royal-hero {
    --s: 1.06;
    --container-max: 1460px;
    --container-gutter: 120px;
  }
}

/* ---- 1800px+ ---- */
@media (min-width: 1800px) {

  .art-image {
    object-position: 63% 42%;
  }
}

/* ---- 1920px+ : Full HD ---- */
@media (min-width: 1920px) {

  .royal-hero {
    --s: 1.15;
    --container-max: 1520px;
    --container-gutter: 160px;
  }

  .hero-copy h1 {
    font-size: clamp(84px, 4.4vw, 100px);
  }
}

/* ---- 2200px+ : QHD / ultrawide ---- */
@media (min-width: 2200px) {

  .royal-hero {
    --s: 1.3;
    --container-max: 1640px;
    --container-gutter: 200px;
  }

  .art-image {
    object-position: 60% 42%;
  }
}

/* ---- 2560px+ : 2K / 27" monitors ---- */
@media (min-width: 2560px) {

  .royal-hero {
    --s: 1.5;
    --container-max: 1880px;
    --container-gutter: 240px;
  }

  .hero-copy h1 {
    font-size: clamp(100px, 4.4vw, 150px);
  }
}

/* ---- 3200px+ : 4K and above ---- */
@media (min-width: 3200px) {

  .royal-hero {
    --s: 1.9;
    --container-max: 2360px;
    --container-gutter: 320px;
  }

  .hero-copy h1 {
    font-size: clamp(140px, 4.4vw, 200px);
  }
}

/* ---- Super-wide monitors (21:9, 32:9): image is cropped
        top/bottom, so lean the crop toward the clock ---- */
@media (min-width: 1400px) and (min-aspect-ratio: 21/9) {

  .art-image {
    object-position: 60% 36%;
  }
}

/* ---- Short desktop windows (small laptops) ---- */
@media (min-width: 901px) and (max-height: 640px) {

  .hero-copy {
    padding-bottom: 20px;
  }

  .hero-features {
    bottom: 32px;
  }

  .scroll-indicator {
    display: none;
  }
}

/* =========================================================
   LARGE LAPTOP
   ========================================================= */

@media (max-width: 1200px) {

  .royal-hero {
    --container-gutter: 70px;
  }

  .hero-copy {
    max-width: 590px;
  }

  .hero-copy h1 {
    font-size: clamp(44px, 5.2vw, 64px);
  }

  .hero-features {
    right: calc((100% - var(--container-width)) / 2);

    gap: 30px;
  }
}

/* =========================================================
   TABLET
   ========================================================= */

@media (max-width: 900px) {

  .hero-content {
    width: calc(100% - 48px);
  }

  .hero-copy {
    max-width: 520px;

    padding-bottom: 70px;
  }

  .hero-copy h1 {
    font-size: clamp(42px, 7vw, 60px);
  }

  .hero-description {
    max-width: 410px;
  }

  .hero-features {
    left: 24px;
    right: 24px;
    bottom: 48px;

    gap: 16px;
  }

  .feature {
    gap: 9px;
  }

  .feature-icon {
    width: 27px;
    height: 27px;

    flex-basis: 27px;
  }

  .feature-text strong {
    font-size: 10px;
  }

  .feature-text span {
    font-size: 9px;
  }
}

/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 768px) {

  .royal-hero {
    min-height: 100svh;
    min-height: 100dvh;
  }

  /* -------------------------------------------------------
     CONTENT
     ------------------------------------------------------- */

  .hero-content {
    width: calc(100% - 32px);

    min-height: 100svh;
    min-height: 100dvh;

    align-items: flex-start;
    justify-content: flex-start;

    padding-top: clamp(110px, 15vh, 145px);
    padding-bottom: 170px;
  }

  .hero-copy {
    width: 100%;
    max-width: 600px;

    padding: 0;
    margin: 0 auto;

    text-align: center;
  }

  .eyebrow {
    justify-content: center;

    margin-bottom: 15px;

    font-size: 9px;
    letter-spacing: 2.4px;
  }

  .hero-copy h1 {
    font-size: clamp(38px, 10.5vw, 58px);
    line-height: 1.03;
    letter-spacing: -1.5px;
  }

  .hero-description {
    max-width: 390px;

    margin: 18px auto 24px;

    font-size: 13px;
    line-height: 1.65;
  }

  .hero-cta {
    min-height: 46px;

    padding: 0 20px;

    font-size: 12px;
  }

  /* -------------------------------------------------------
     MOBILE IMAGE — edge to edge, sits at the bottom
     ------------------------------------------------------- */

  .hero-art {
    top: auto;
    right: -1px;
    bottom: -1px;
    left: -1px;

    height: 63%;
  }

  .art-image {
    object-position: 82% 50%;

    -webkit-mask-image: linear-gradient(
      180deg,
      transparent 0%,
      rgba(0, 0, 0, 0.2) 16%,
      #000 38%
    );

    mask-image: linear-gradient(
      180deg,
      transparent 0%,
      rgba(0, 0, 0, 0.2) 16%,
      #000 38%
    );
  }

  .hero-shade {
    background: linear-gradient(
      180deg,
      var(--color-hero-shade-soft) 0%,
      var(--color-hero-shade-clear) 28%,
      var(--color-hero-shade-medium) 100%
    );
  }

  /* -------------------------------------------------------
     FEATURES
     ------------------------------------------------------- */

  .hero-features {
    left: 16px;
    right: 16px;
    bottom: 46px;

    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    align-items: start;

    gap: 8px;
  }

  .feature {
    min-width: 0;

    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 5px;

    text-align: center;
  }

  .feature-icon {
    width: 25px;
    height: 25px;

    flex: 0 0 25px;
  }

  .feature-text {
    width: 100%;

    align-items: center;

    gap: 1px;
  }

  .feature-text strong {
    width: 100%;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    font-size: 9px;
  }

  .feature-text span {
    font-size: 8px;
  }

  /* -------------------------------------------------------
     SCROLL
     ------------------------------------------------------- */

  .scroll-indicator {
    bottom: max(7px, env(safe-area-inset-bottom));

    font-size: 8px;
  }

  .scroll-arrow {
    width: 13px;
    height: 13px;
  }
}

/* =========================================================
   SMALL MOBILE
   ========================================================= */

@media (max-width: 480px) {

  .hero-content {
    width: calc(100% - 24px);

    padding-top: clamp(100px, 14vh, 125px);
    padding-bottom: 160px;
  }

  .hero-copy h1 {
    font-size: clamp(36px, 10.8vw, 48px);
    letter-spacing: -1.3px;
  }

  .hero-description {
    max-width: 350px;

    margin-top: 16px;
    margin-bottom: 22px;

    font-size: 12px;
  }

  .hero-art {
    height: 60%;
  }

  .hero-features {
    left: 10px;
    right: 10px;
    bottom: 43px;

    gap: 4px;
  }

  .feature-icon {
    width: 23px;
    height: 23px;

    flex-basis: 23px;
  }

  .feature-text strong {
    font-size: 8px;
  }

  .feature-text span {
    font-size: 7px;
  }
}

/* =========================================================
   VERY SMALL MOBILE
   ========================================================= */

@media (max-width: 360px) {

  .hero-content {
    width: calc(100% - 20px);

    padding-top: 92px;
    padding-bottom: 150px;
  }

  .eyebrow {
    margin-bottom: 12px;

    font-size: 8px;
    letter-spacing: 1.9px;
  }

  .hero-copy h1 {
    font-size: 34px;
    letter-spacing: -1px;
  }

  .hero-description {
    font-size: 11px;
    line-height: 1.55;
  }

  .hero-cta {
    min-height: 43px;

    padding: 0 17px;
    gap: 10px;

    font-size: 11px;
  }

  .hero-art {
    height: 57%;
  }

  .hero-features {
    left: 7px;
    right: 7px;
    bottom: 39px;
  }

  .feature-icon {
    width: 21px;
    height: 21px;

    flex-basis: 21px;
  }

  .feature-text strong {
    font-size: 7px;
  }

  .feature-text span {
    font-size: 6.5px;
  }

  .scroll-indicator {
    display: none;
  }
}

/* =========================================================
   LANDSCAPE MOBILE
   ========================================================= */

@media (max-width: 900px) and (orientation: landscape) {

  .hero-content {
    min-height: 100svh;
    min-height: 100dvh;

    padding-top: 90px;
    padding-bottom: 120px;
  }

  .hero-copy {
    max-width: 500px;
  }

  .hero-copy h1 {
    font-size: clamp(32px, 6vw, 46px);
  }

  .hero-description {
    margin: 12px auto 16px;

    font-size: 11px;
  }

  .hero-art {
    height: 100%;

    opacity: 0.8;
  }

  .hero-features {
    bottom: 32px;
  }

  .scroll-indicator {
    display: none;
  }
}

/* =========================================================
   REDUCED MOTION
   ========================================================= */

@media (prefers-reduced-motion: reduce) {

  .hero-copy,
  .scroll-arrow,
  .hero-cta,
  .cta-arrow {
    animation: none;
    transition: none;
  }
}
/* =========================================================
   HERO TEXT + ICON COLORS
   Desktop / Laptop = Pink
   Mobile = White
   ========================================================= */

/* ---------------------------------------------------------
   DESKTOP / LAPTOP
   Hero main text
   --------------------------------------------------------- */

.hero-copy h1 {
  color: var(--color-brand-navy);
}

.hero-description {
  color: var(--color-brand-navy);
}

/* Eyebrow */
.eyebrow {
  color: var(--color-brand-navy);
}

/* Trust feature icons */
.feature-icon {
  color: var(--color-brand-navy);
}

/* Trust feature text */
.feature-text strong {
  color: var(--color-brand-navy);
}

.feature-text span {
  color: var(--color-brand-navy-light);
}

/* Scroll indicator */
.scroll-indicator {
  color: var(--color-brand-navy);
}

.scroll-arrow {
  stroke: var(--color-brand-navy);
}


/* =========================================================
   MOBILE
   <= 768px
   Hero text + icons become white
   ========================================================= */

@media (max-width: 768px) {

  .hero-copy h1 {
    color: var(--color-text-primary);
  }

  .hero-description {
    color: var(--color-text-primary);
  }

  .eyebrow {
    color: var(--color-text-primary);
  }

  .feature-icon {
    color: var(--color-text-primary);
  }

  .feature-text strong {
    color: var(--color-text-primary);
  }

  .feature-text span {
    color: var(--color-text-secondary);
  }

  .scroll-indicator {
    color: var(--color-text-primary);
  }

  .scroll-arrow {
    stroke: var(--color-text-primary);
  }
}
</style>



