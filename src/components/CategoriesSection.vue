<script setup>

const categories = [
  {
    id: 'jewellery',
    title: 'Jewellery',
    description:
      'Unique resin jewellery pieces crafted with beautiful colours and details.',
    image:
      'https://i.pinimg.com/736x/2c/bc/52/2cbc52ca3f3095344d2b2fd831fb2677.jpg'
  },
  {
    id: 'home',
    title: 'Home Décor',
    description:
      'Beautiful resin pieces that bring colour and character to your space.',
    image:
      'https://i.pinimg.com/736x/ad/31/f6/ad31f62ec1cc8c4cbec88b0d65697be7.jpg'
  },
  {
    id: 'trays',
    title: 'Trays & Coasters',
    description:
      'Handcrafted trays and coasters that are as useful as they are beautiful.',
    image:
      'https://i.pinimg.com/736x/b7/a3/dc/b7a3dc21aa9774a0553decc0e4426eb6.jpg'
  },
  // {
  //   id: 'accessories',
  //   title: 'Pens & Accessories',
  //   description:
  //     'Beautiful resin pens, bookmarks, keyrings and useful accessories.',
  //   image:
  //     'https://i.pinimg.com/736x/2e/f1/bd/2ef1bd25f92709acec24a3fddd41ba6c.jpg'
  // },
  {
    id: 'custom',
    title: 'Custom & Keepsakes',
    description:
      'Personalized resin pieces made specially for your memories and occasions.',
    image:
      'https://i.pinimg.com/736x/62/1f/72/621f72b73a0bd76fe25e40a11cb740b0.jpg'
  }
]

</script>


<template>

  <section
    id="categories"
    class="categories-section"
  >

    <div class="categories-inner">

      <!-- =====================================================
           HEADER
           ===================================================== -->

      <div class="categories-header">

        <div class="categories-heading">

          <p class="eyebrow">
            OUR COLLECTIONS
          </p>

          <h2>
            Explore by
            <span>Category</span>
          </h2>

        </div>

        <p class="categories-intro">
          From wall clocks to serving trays, every piece is
          handcrafted, custom, and always unique.
        </p>

      </div>


      <!-- =====================================================
           CATEGORY CARDS
           ===================================================== -->

   <!-- =====================================================
     CATEGORY CARDS
     ===================================================== -->

<ul class="categories-grid">

  <li
    v-for="category in categories"
    :key="category.id"
    class="category-item"
  >

    <div class="category-card">

      <!-- IMAGE -->
      <div class="card-media">

        <img
          v-if="category.image"
          :src="category.image"
          :alt="category.title"
          class="card-image"
          loading="lazy"
        />

        <div
          v-else
          class="card-placeholder"
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

            <path d="m4 18 5-5 4 4 3-3 4 4" />

          </svg>

        </div>

      </div>

      <!-- DARK OVERLAY -->
      <div class="card-overlay"></div>

      <!-- CARD CONTENT -->
      <div class="card-body">

        <h3>
          {{ category.title }}
        </h3>

        <p>
          {{ category.description }}
        </p>

        <span class="card-link">

          Explore

          <svg
            class="card-arrow"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >

            <path d="M4 12h16M14 6l6 6-6 6" />

          </svg>

        </span>

      </div>

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

.categories-section {
  width: 100%;

  padding:
    var(--space-4xl)
    0;

  background:
    var(--color-brand-navy);

  color:
    var(--color-text-primary);

  scroll-margin-top: 80px;

  box-sizing: border-box;

  overflow: hidden;
}


/* =========================================================
   CONTAINER
   ========================================================= */

.categories-inner {
  width:
    min(
      1240px,
      calc(100% - var(--space-4xl))
    );

  margin: 0 auto;

  box-sizing: border-box;
}


/* =========================================================
   HEADER
   ========================================================= */

.categories-header {
  display: flex;

  align-items: flex-end;
  justify-content: space-between;

  gap:
    var(--space-2xl);

  margin-bottom:
    var(--space-2xl);
}


.categories-heading {
  min-width: 0;
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

  font-size: 11px;

  font-weight: 600;

  letter-spacing: 3px;

  line-height: 1.4;
}


.categories-header h2 {
  margin: 0;

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

  font-weight: 500;

  line-height: 1.1;

  letter-spacing: -1.2px;
}


.categories-header h2 span {
  display: block;
}


.categories-intro {
  width: 100%;
  max-width: 340px;

  margin: 0;

  color:
    var(--color-text-secondary);

  font-family:
    var(--font-body);

  font-size: 15px;

  line-height: 1.8;
}


/* =========================================================
   GRID
   ========================================================= */

.categories-grid {
  display: grid;

  grid-template-columns:
    repeat(4, minmax(0, 1fr));

  gap:
    var(--space-lg);

  width: 100%;

  margin: 0;
  padding: 0;

  list-style: none;

  box-sizing: border-box;
}


/* =========================================================
   CARD ITEM
   ========================================================= */

.category-item {
  min-width: 0;
}


/* =========================================================
   CARD
   ========================================================= */

.category-card {
  position: relative;

  display: block;

  width: 100%;

  aspect-ratio: 3 / 4;

  overflow: hidden;

  border:
    1px solid
    var(--color-border-dark-soft);

  border-radius:
    var(--radius-lg);

  color:
    var(--color-text-primary);

  text-decoration: none;

  background:
    var(--color-surface-dark);

  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  box-sizing: border-box;
}


.category-card:hover {
  border-color:
    var(--color-border-dark);

  box-shadow:
    var(--shadow-card);
}


.category-card:focus-visible {
  outline:
    2px solid
    var(--color-accent-light);

  outline-offset: 3px;
}


/* =========================================================
   IMAGE
   ========================================================= */

.card-media {
  position: absolute;

  inset: 0;

  width: 100%;
  height: 100%;
}


.card-image {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;

  transition:
    transform 0.6s ease;
}


.category-card:hover .card-image {
  transform:
    scale(1.05);
}


/* =========================================================
   PLACEHOLDER
   ========================================================= */

.card-placeholder {
  width: 100%;
  height: 100%;

  display: grid;

  place-items: center;

  padding-bottom:
    var(--space-4xl);

  background:
    linear-gradient(
      145deg,
      var(--color-surface-dark) 0%,
      var(--color-brand-navy-light) 100%
    );

  box-sizing: border-box;
}


.card-placeholder svg {
  width: 40px;
  height: 40px;

  fill: none;

  stroke:
    var(--color-icon-primary);

  stroke-width: 1.3;

  stroke-linecap: round;

  stroke-linejoin: round;

  opacity: 0.6;
}


/* =========================================================
   OVERLAY
   ========================================================= */

.card-overlay {
  position: absolute;

  inset: 0;

  background:
    linear-gradient(
      0deg,
      var(--color-overlay-heavy) 0%,
      var(--color-overlay-dark) 32%,
      transparent 62%
    );

  pointer-events: none;
}


/* =========================================================
   CARD CONTENT
   ========================================================= */

.card-body {
  position: absolute;

  left: 0;
  right: 0;
  bottom: 0;

  padding:
    var(--space-lg);

  box-sizing: border-box;
}


.card-body h3 {
  margin: 0;

  color:
    var(--color-text-primary);

  font-family:
    var(--font-heading);

  font-size:
    clamp(
      20px,
      1.8vw,
      24px
    );

  font-weight: 500;

  line-height: 1.2;

  overflow-wrap: break-word;
}


.card-body p {
  margin:
    var(--space-sm)
    0
    var(--space-md);

  color:
    var(--color-text-secondary);

  font-family:
    var(--font-body);

  font-size:
    13px;

  line-height: 1.6;
}


.card-link {
  display: inline-flex;

  align-items: center;

  gap:
    var(--space-sm);

  color:
    var(--color-accent);

  font-family:
    var(--font-body);

  font-size: 12px;

  font-weight: 600;

  line-height: 1;

  transition:
    color 0.3s ease;
}


.card-arrow {
  width: 14px;
  height: 14px;

  flex: 0 0 auto;

  fill: none;

  stroke: currentColor;

  stroke-width: 2;

  stroke-linecap: round;

  stroke-linejoin: round;

  transition:
    transform 0.3s ease;
}


.category-card:hover .card-link {
  color:
    var(--color-accent-light);
}


.category-card:hover .card-arrow {
  transform:
    translateX(4px);
}


/* =========================================================
   LARGE LAPTOP
   ========================================================= */

@media (max-width: 1200px) {

  .categories-inner {
    width:
      calc(100% - var(--space-3xl));
  }

  .categories-grid {
    gap:
      var(--space-md);
  }

  .card-body {
    padding:
      var(--space-md);
  }

}


/* =========================================================
   TABLET
   2 CARDS PER ROW
   ========================================================= */

@media (max-width: 1000px) {

  .categories-section {
    padding:
      var(--space-3xl)
      0;
  }

  .categories-inner {
    width:
      calc(100% - var(--space-2xl));
  }

  .categories-header {
    align-items: flex-start;

    flex-direction: column;

    gap:
      var(--space-lg);

    margin-bottom:
      var(--space-xl);
  }

  .categories-intro {
    max-width: 600px;

    font-size: 14px;
  }

  .categories-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    gap:
      var(--space-lg);
  }

  .category-card {
    aspect-ratio:
      4 / 5;
  }

}


/* =========================================================
   MOBILE
   STILL 2 CARDS PER ROW
   ========================================================= */

@media (max-width: 768px) {

  .categories-section {
    padding:
      var(--space-3xl)
      0;
  }

  .categories-inner {
    width:
      calc(100% - 32px);
  }

  .categories-header {
    gap:
      var(--space-md);

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

  .categories-header h2 {
    font-size:
      clamp(
        34px,
        9vw,
        48px
      );

    letter-spacing:
      -0.8px;
  }

  .categories-intro {
    max-width:
      100%;

    font-size:
      13.5px;

    line-height:
      1.7;
  }

  /*
    IMPORTANT:
    Mobile par bhi 2 cards ek line mein
  */

  .categories-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    gap:
      12px;
  }

  .category-card {
    aspect-ratio:
      3 / 4;

    border-radius:
      var(--radius-md);
  }

  .card-body {
    padding:
      12px;
  }

  .card-body h3 {
    font-size:
      clamp(
        17px,
        4vw,
        21px
      );

    line-height:
      1.15;
  }

  .card-body p {
    margin:
      6px
      0
      9px;

    font-size:
      11px;

    line-height:
      1.45;

    /*
      Keep card height controlled
    */
    display:
      -webkit-box;

    -webkit-line-clamp:
      2;

    -webkit-box-orient:
      vertical;

    overflow:
      hidden;
  }

  .card-link {
    gap:
      5px;

    font-size:
      10px;
  }

  .card-arrow {
    width:
      12px;

    height:
      12px;
  }

}


/* =========================================================
   SMALL MOBILE
   2 CARDS PER ROW
   ========================================================= */

@media (max-width: 520px) {

  .categories-section {
    padding:
      var(--space-2xl)
      0;
  }

  .categories-inner {
    width:
      calc(100% - 24px);
  }

  .categories-header {
    margin-bottom:
      var(--space-lg);
  }

  .eyebrow {
    font-size:
      9px;

    letter-spacing:
      2px;
  }

  .categories-header h2 {
    font-size:
      clamp(
        30px,
        9vw,
        42px
      );
  }

  .categories-intro {
    font-size:
      12.5px;

    line-height:
      1.65;
  }

  .categories-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    gap:
      10px;
  }

  .category-card {
    aspect-ratio:
      3 / 4;

    border-radius:
      var(--radius-md);
  }

  .card-body {
    padding:
      10px;
  }

  .card-body h3 {
    font-size:
      clamp(
        15px,
        4.2vw,
        19px
      );
  }

  .card-body p {
    font-size:
      10px;

    line-height:
      1.4;

    margin:
      5px
      0
      7px;

    -webkit-line-clamp:
      2;
  }

  .card-link {
    font-size:
      9px;
  }

  .card-arrow {
    width:
      11px;

    height:
      11px;
  }

}


/* =========================================================
   VERY SMALL MOBILE
   STILL 2 CARDS PER ROW
   ========================================================= */

@media (max-width: 380px) {

  .categories-inner {
    width:
      calc(100% - 20px);
  }

  .categories-grid {
    gap:
      8px;
  }

  .category-card {
    aspect-ratio:
      3 / 4;
  }

  .card-body {
    padding:
      8px;
  }

  .card-body h3 {
    font-size:
      14px;
  }

  .card-body p {
    font-size:
      9px;

    line-height:
      1.35;

    margin:
      4px
      0
      6px;
  }

  .card-link {
    font-size:
      8.5px;
  }

  .card-arrow {
    width:
      10px;

    height:
      10px;
  }

}


/* =========================================================
   ULTRA SMALL
   ========================================================= */

@media (max-width: 320px) {

  .categories-inner {
    width:
      calc(100% - 16px);
  }

  .categories-grid {
    gap:
      7px;
  }

  .categories-header h2 {
    font-size:
      29px;
  }

  .categories-intro {
    font-size:
      11.5px;
  }

  .card-body {
    padding:
      7px;
  }

  .card-body h3 {
    font-size:
      13px;
  }

  .card-body p {
    font-size:
      8.5px;
  }

  .card-link {
    font-size:
      8px;
  }

}


/* =========================================================
   REDUCED MOTION
   ========================================================= */

@media (prefers-reduced-motion: reduce) {

  .category-card,
  .card-image,
  .card-link,
  .card-arrow {
    transition: none;
  }

  .category-card:hover .card-image {
    transform: none;
  }

}

</style>