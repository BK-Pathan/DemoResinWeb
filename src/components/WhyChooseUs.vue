<script setup lang="ts">

/* =========================================================
   REASONS
   Each icon is an array of SVG path strings (24 x 24 grid).
   ========================================================= */

const reasons = [
  {
    id: 'handmade',
    title: 'Handmade With Love',
    text: 'Every piece is poured, shaped and finished by hand, one at a time.',
    icon: [
      'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z'
    ]
  },

  {
    id: 'quality',
    title: 'Premium Quality',
    text: 'Carefully chosen materials and a patient finish for pieces made to be kept.',
    icon: [
      'M6 4h12l3 5-9 11L3 9z',
      'M3 9h18',
      'M9 4 7 9l5 11 5-11-2-5'
    ]
  },

  {
    id: 'custom',
    title: 'Custom Orders Available',
    text: 'Tell us the names, colours, sizes or designs you have in mind.',
    icon: [
      'M4 20l1-4L16 5a2.1 2.1 0 0 1 3 3L8 19z',
      'M14 7l3 3'
    ]
  },

  {
    id: 'shipping',
    title: 'Worldwide Shipping',
    text: 'We ship our pieces to customers around the world.',
    icon: [
      'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z',
      'M3 12h18',
      'M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z'
    ]
  }
]

</script>


<template>

  <section
    id="why-us"
    class="why-section"
    aria-labelledby="why-title"
  >

    <div class="why-inner">

      <!-- =====================================================
           LEFT: INTRO
           ===================================================== -->

      <div class="why-content">

        <p class="eyebrow">
          OUR PROMISE
        </p>

        <h2
          id="why-title"
          class="why-title"
        >
          Why Choose Us
        </h2>

        <p class="why-intro">
          Every Royal Resin Art piece is made with care, from wall clocks
          and jewellery to trays, pens and keepsakes made just for you.
        </p>

        <a
          href="/contact"
          class="why-button"
        >
          <span>Start a custom order</span>

          <svg
            class="why-arrow"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M4 12h16M14 6l6 6-6 6" />
          </svg>
        </a>

      </div>


      <!-- =====================================================
           RIGHT: REASONS
           ===================================================== -->

      <ul class="reasons">

        <li
          v-for="reason in reasons"
          :key="reason.id"
          class="reason"
        >

          <span
            class="reason-icon"
            aria-hidden="true"
          >

            <svg viewBox="0 0 24 24">

              <path
                v-for="(d, index) in reason.icon"
                :key="index"
                :d="d"
              />

            </svg>

          </span>


          <div class="reason-body">

            <h3>
              {{ reason.title }}
            </h3>

            <p>
              {{ reason.text }}
            </p>

          </div>

        </li>

      </ul>

    </div>

  </section>

</template>


<style scoped>

/* =========================================================
   SECTION
   ========================================================= */

.why-section {
  width: 100%;
  padding: var(--space-4xl) 0;
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  scroll-margin-top: 80px;
  overflow: hidden;
}


/* =========================================================
   MAIN CONTAINER
   ========================================================= */

.why-inner {
  width: min(1240px, calc(100% - 80px));
  margin: 0 auto;

  display: grid;
  grid-template-columns:
    minmax(280px, 0.85fr)
    minmax(0, 1.15fr);

  align-items: center;

  gap: clamp(
    40px,
    6vw,
    100px
  );
}


/* =========================================================
   LEFT CONTENT
   ========================================================= */

.why-content {
  min-width: 0;
}

.eyebrow {
  margin: 0 0 var(--space-md);

  color: var(--color-accent);

  font-family: var(--font-body);

  font-size: 11px;
  font-weight: 600;

  letter-spacing: 3px;
  line-height: 1.4;
}


.why-title {
  margin: 0;

  color: var(--color-text-primary);

  font-family: var(--font-heading);

  font-size: clamp(
    36px,
    4.2vw,
    58px
  );

  font-weight: 500;
  line-height: 1.08;

  letter-spacing: -1.4px;
}


.why-intro {
  width: 100%;
  max-width: 460px;

  margin:
    var(--space-lg)
    0
    var(--space-xl);

  color: var(--color-text-secondary);

  font-family: var(--font-body);

  font-size: 15px;
  line-height: 1.8;
}


/* =========================================================
   BUTTON
   ========================================================= */

.why-button {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  gap: var(--space-sm);

  min-height: 52px;

  padding:
    0
    var(--space-lg);

  background: var(--color-button-primary);

  border-radius: var(--radius-sm);

  box-shadow: var(--shadow-gold);

  color: var(--color-button-primary-text);

  font-family: var(--font-body);

  font-size: 13px;
  font-weight: 600;

  letter-spacing: 0.5px;

  text-decoration: none;

  transition:
    transform 0.3s ease,
    background 0.3s ease;
}


.why-button:hover {
  background: var(--color-button-primary-hover);
  transform: translateY(-2px);
}


.why-button:focus-visible {
  outline:
    2px solid
    var(--color-accent-light);

  outline-offset: 3px;
}


.why-arrow {
  flex-shrink: 0;

  width: 16px;
  height: 16px;

  fill: none;

  stroke: currentColor;
  stroke-width: 2;

  stroke-linecap: round;
  stroke-linejoin: round;

  transition:
    transform 0.3s ease;
}


.why-button:hover .why-arrow {
  transform: translateX(4px);
}


/* =========================================================
   REASONS GRID
   Desktop:
   2 columns × 2 rows
   ========================================================= */

.reasons {
  width: 100%;
  min-width: 0;

  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  margin: 0;
  padding: 0;

  list-style: none;

  border-bottom:
    1px solid
    var(--color-border-dark-soft);
}


/* =========================================================
   REASON CARD
   ========================================================= */

.reason {
  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: var(--space-lg);

  padding:
    clamp(22px, 2.5vw, 34px)
    clamp(18px, 2.2vw, 30px)
    clamp(22px, 2.5vw, 34px)
    0;

  border-top:
    1px solid
    var(--color-border-dark-soft);

  transition:
    transform 0.3s ease;
}


/* Right column */

.reason:nth-child(even) {
  padding-left:
    clamp(18px, 2.2vw, 30px);

  padding-right: 0;

  border-left:
    1px solid
    var(--color-border-dark-soft);
}


/* =========================================================
   ICON
   ========================================================= */

.reason-icon {
  flex-shrink: 0;

  width: 48px;
  height: 48px;

  display: grid;
  place-items: center;

  border:
    1px solid
    var(--color-border-dark);

  border-radius: 50%;

  color:
    var(--color-icon-primary);

  transition:
    border-color 0.3s ease,
    background 0.3s ease,
    transform 0.3s ease;
}


.reason:hover .reason-icon {
  border-color:
    var(--color-accent);

  background:
    var(--color-border-dark-soft);

  transform: translateY(-2px);
}


.reason-icon svg {
  width: 22px;
  height: 22px;

  fill: none;

  stroke: currentColor;

  stroke-width: 1.3;

  stroke-linecap: round;
  stroke-linejoin: round;
}


/* =========================================================
   TEXT
   ========================================================= */

.reason-body {
  min-width: 0;
}


.reason-body h3 {
  margin:
    0
    0
    var(--space-sm);

  color:
    var(--color-text-primary);

  font-family:
    var(--font-heading);

  font-size:
    clamp(
      18px,
      1.7vw,
      21px
    );

  font-weight: 500;

  line-height: 1.25;

  overflow-wrap: break-word;
}


.reason-body p {
  margin: 0;

  color:
    var(--color-text-secondary);

  font-family:
    var(--font-body);

  font-size:
    14px;

  line-height: 1.75;

  max-width: 360px;
}


/* =========================================================
   LARGE DESKTOP
   ========================================================= */

@media (min-width: 1400px) {

  .why-inner {
    width: min(
      1320px,
      calc(100% - 120px)
    );

    gap: 110px;
  }

  .reason {
    padding-top: 36px;
    padding-bottom: 36px;
  }

}


/* =========================================================
   LAPTOP
   1200px
   ========================================================= */

@media (max-width: 1200px) {

  .why-inner {
    width:
      min(
        1100px,
        calc(100% - 64px)
      );

    gap: 55px;
  }

}


/* =========================================================
   TABLET / SMALL LAPTOP
   ========================================================= */

@media (max-width: 1000px) {

  .why-section {
    padding:
      var(--space-3xl)
      0;
  }


  .why-inner {
    width:
      calc(
        100% - 56px
      );

    grid-template-columns:
      1fr;

    gap:
      var(--space-2xl);

    align-items:
      start;
  }


  .why-content {
    max-width: 650px;
  }


  .why-title {
    font-size:
      clamp(
        38px,
        6vw,
        52px
      );
  }


  .why-intro {
    max-width: 620px;
  }


  .reasons {
    width: 100%;
  }


  .reason {
    padding:
      26px
      24px
      26px
      0;
  }


  .reason:nth-child(even) {
    padding-left: 24px;
  }

}


/* =========================================================
   TABLET
   ========================================================= */

@media (max-width: 768px) {

  .why-section {
    padding:
      var(--space-3xl)
      0;
  }


  .why-inner {
    width:
      calc(
        100% - 40px
      );

    gap:
      var(--space-xl);
  }


  .why-title {
    font-size:
      clamp(
        34px,
        8vw,
        46px
      );

    letter-spacing:
      -1px;
  }


  .why-intro {
    margin:
      var(--space-md)
      0
      var(--space-lg);

    font-size: 14px;
    line-height: 1.75;
  }


  .why-button {
    min-height: 50px;
  }


  .reason {
    gap:
      var(--space-md);

    padding:
      22px
      18px
      22px
      0;
  }


  .reason:nth-child(even) {
    padding-left: 18px;
  }


  .reason-icon {
    width: 44px;
    height: 44px;
  }


  .reason-icon svg {
    width: 20px;
    height: 20px;
  }


  .reason-body h3 {
    font-size: 18px;
  }


  .reason-body p {
    font-size: 13px;
    line-height: 1.7;
  }

}


/* =========================================================
   MOBILE
   IMPORTANT:
   2 REASONS PER ROW
   ========================================================= */

@media (max-width: 560px) {

  .why-section {
    padding:
      var(--space-2xl)
      0;
  }


  .why-inner {
    width:
      calc(
        100% - 28px
      );

    gap:
      var(--space-xl);
  }


  /* Intro */

  .eyebrow {
    margin-bottom:
      var(--space-sm);

    font-size: 10px;

    letter-spacing: 2.5px;
  }


  .why-title {
    font-size:
      clamp(
        32px,
        10vw,
        40px
      );

    line-height: 1.1;
  }


  .why-intro {
    margin:
      var(--space-md)
      0
      var(--space-lg);

    font-size: 13px;
    line-height: 1.7;
  }


  /* Full width CTA */
  .why-button {
    width: 90%;
    min-height: 44px;
    padding: 0 14px;
    font-size: 12px;
  }


  /* =====================================================
     2 COLUMNS ON MOBILE
     ===================================================== */

  .reasons {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    width: 100%;
  }


  .reason {
    gap:
      12px;

    padding:
      18px
      12px
      18px
      0;
  }


  .reason:nth-child(even) {
    padding-left: 12px;

    border-left:
      1px solid
      var(--color-border-dark-soft);
  }


  /* Icon */

  .reason-icon {
    width: 40px;
    height: 40px;
  }


  .reason-icon svg {
    width: 18px;
    height: 18px;
  }


  /* Text */

  .reason-body h3 {
    margin-bottom:
      7px;

    font-size:
      16px;

    line-height:
      1.3;
  }


  .reason-body p {
    font-size:
      12px;

    line-height:
      1.65;
  }

}


/* =========================================================
   VERY SMALL MOBILE
   ========================================================= */

@media (max-width: 380px) {

  .why-inner {
    width:
      calc(
        100% - 22px
      );
  }


  .why-title {
    font-size: 30px;
  }


  .reason {
    gap: 10px;

    padding:
      16px
      9px
      16px
      0;
  }


  .reason:nth-child(even) {
    padding-left: 9px;
  }


  .reason-icon {
    width: 36px;
    height: 36px;
  }


  .reason-icon svg {
    width: 17px;
    height: 17px;
  }


  .reason-body h3 {
    font-size: 14px;
  }


  .reason-body p {
    font-size: 11px;
    line-height: 1.6;
  }

}


/* =========================================================
   REDUCED MOTION
   ========================================================= */

@media (prefers-reduced-motion: reduce) {

  .why-button,
  .why-arrow,
  .reason-icon {
    transition: none;
  }


  .why-button:hover,
  .why-button:hover .why-arrow,
  .reason:hover .reason-icon {
    transform: none;
  }

}

</style>