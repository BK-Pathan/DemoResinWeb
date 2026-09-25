<script setup lang="ts">
const values = [
  {
    number: '01',
    title: 'Handcrafted',
    text: 'Every piece is carefully crafted by hand, giving each creation its own character and charm.',
  },
  {
    number: '02',
    title: 'Made for You',
    text: 'From colours to details, we create custom pieces that reflect your personality and memories.',
  },
  {
    number: '03',
    title: 'Premium Finish',
    text: 'We focus on clean details, smooth finishes and lasting quality in every resin creation.',
  },
  {
    number: '04',
    title: 'Thoughtfully Priced',
    text: 'Beautiful handmade art should feel special and accessible, without compromising on quality.',
  },
]

const process = [
  {
    number: '01',
    title: 'Design',
    text: 'We start by understanding your idea, style and the story behind your piece.',
  },
  {
    number: '02',
    title: 'Create',
    text: 'Resin, colours and details are carefully combined to bring the design to life.',
  },
  {
    number: '03',
    title: 'Cure',
    text: 'Each piece is given the time it needs to cure properly and develop its beautiful finish.',
  },
  {
    number: '04',
    title: 'Perfect',
    text: 'The final piece is polished, checked and prepared with care before reaching you.',
  },
]
</script>

<template>
  <main class="about-page">

    <!-- =====================================================
         HERO
         ===================================================== -->
    <section class="about-hero">
      <div class="hero-overlay"></div>

      <div class="hero-content">
        <span class="eyebrow">OUR STORY</span>

        <h1>
          Crafted with Passion,
          <span>Made to Last.</span>
        </h1>

        <p>
          At Royal Resin Studio, we turn memories, moments and ideas
          into beautiful handmade resin pieces designed to be treasured.
        </p>

        <a href="#story" class="hero-link">
          <span>Discover Our Story</span>
          <span class="arrow">↓</span>
        </a>
      </div>
    </section>


    <!-- =====================================================
         STORY
         ===================================================== -->
    <section id="story" class="story-section section-light">
      <div class="section-container story-grid">

        <div class="story-image-wrap">
          <div class="image-frame"></div>

          <img
            src="../assets/about-story.png"
            alt="Handcrafted resin artwork by Royal Resin Studio"
            class="story-image"
            loading="lazy"
          />

          <div class="image-caption">
            <span>ROYAL RESIN STUDIO</span>
            <strong>Made by Hand</strong>
          </div>
        </div>

        <div class="story-content">
          <span class="eyebrow dark-eyebrow">WHO WE ARE</span>

          <h2>
            More Than Resin.
            <span>It's Your Story.</span>
          </h2>

          <p class="lead">
            Royal Resin Studio was created with one simple idea:
            everyday objects can become something truly meaningful.
          </p>

          <p>
            We create handmade resin art that brings together creativity,
            craftsmanship and personal memories. From preserved flowers
            and photographs to jewellery boxes, trays and custom pieces,
            every creation is made with attention to the smallest detail.
          </p>

          <p>
            Our goal is to make beautiful resin art more accessible while
            keeping the quality, care and uniqueness that handmade work deserves.
          </p>

          <div class="signature">
            <span class="signature-line"></span>
            <span>Made with care</span>
          </div>
        </div>

      </div>
    </section>


    <!-- =====================================================
         VALUES
         ===================================================== -->
    <section class="values-section">
      <div class="section-container">

        <div class="section-heading centered">
          <span class="eyebrow">WHY ROYAL RESIN</span>

          <h2>
            Crafted with
            <span>Purpose.</span>
          </h2>

          <p>
            Every piece carries the values that define our studio
            and the way we create.
          </p>
        </div>

        <div class="values-grid">
          <article
            v-for="value in values"
            :key="value.number"
            class="value-card"
          >
            <span class="value-number">
              {{ value.number }}
            </span>

            <div class="value-icon">
              <span></span>
            </div>

            <h3>{{ value.title }}</h3>

            <p>{{ value.text }}</p>
          </article>
        </div>

      </div>
    </section>


    <!-- =====================================================
         CRAFT
         ===================================================== -->
    <section class="craft-section section-light">
      <div class="section-container craft-grid">

        <div class="craft-content">
          <span class="eyebrow dark-eyebrow">THE CRAFT</span>

          <h2>
            From an Idea
            <span>to Something Beautiful.</span>
          </h2>

          <p>
            Resin art takes patience. Every stage matters, from the first
            idea to the final polish. We take the time to create pieces
            that look beautiful and feel personal.
          </p>

          <a href="#process" class="outline-button">
            Explore Our Process
          </a>
        </div>

        <div class="craft-image-wrap">
          <img
            src="../assets/about-craft.png"
            alt="Royal Resin Studio handmade resin crafting"
            class="craft-image"
            loading="lazy"
          />

          <div class="craft-badge">
            <span>HANDMADE</span>
            <strong>WITH CARE</strong>
          </div>
        </div>

      </div>
    </section>


    <!-- =====================================================
         PROCESS
         ===================================================== -->
    <section id="process" class="process-section">
      <div class="section-container">

        <div class="section-heading">
          <span class="eyebrow">OUR PROCESS</span>

          <h2>
            Every Detail
            <span>Matters.</span>
          </h2>

          <p>
            A little patience, a lot of creativity and plenty of care
            go into every piece we make.
          </p>
        </div>

        <div class="process-list">
          <article
            v-for="item in process"
            :key="item.number"
            class="process-item"
          >
            <span class="process-number">
              {{ item.number }}
            </span>

            <div class="process-main">
              <h3>{{ item.title }}</h3>

              <p>
                {{ item.text }}
              </p>
            </div>

            <span class="process-arrow">↗</span>
          </article>
        </div>

      </div>
    </section>


    <!-- =====================================================
         PROMISE
         ===================================================== -->
    <section class="promise-section">
      <div class="promise-inner">

        <div class="promise-image">
          <img
            src="../assets/about-detail.png"
            alt="Detailed handmade resin artwork"
            loading="lazy"
          />
        </div>

        <div class="promise-content">
          <span class="eyebrow">OUR PROMISE</span>

          <h2>
            Pieces Worth
            <span>Keeping.</span>
          </h2>

          <p>
            Whether it's a gift, a keepsake or something created just
            for you, we want every Royal Resin Studio piece to become
            something you are proud to keep.
          </p>

          <p>
            Because the most beautiful things aren't just decorations.
            They hold meaning.
          </p>

          <div class="promise-mark">
            <!-- <span class="mark-line"></span> -->
            <span>Royal Resin Studio</span>
          </div>
        </div>

      </div>
    </section>


    <!-- =====================================================
         CTA
         ===================================================== -->
    <section class="cta-section">
      <div class="section-container cta-content">

        <span class="eyebrow">
          CREATE SOMETHING SPECIAL
        </span>

        <h2>
          Have Something
          <span>Special in Mind?</span>
        </h2>

        <p>
          Let's turn your idea, memory or moment into
          something beautiful and timeless.
        </p>

        <div class="cta-actions">
          <a href="#collection" class="primary-button">
            Explore Collection
          </a>

          <a href="#contact" class="secondary-button">
            Create Your Custom Piece
          </a>
        </div>

      </div>
    </section>

  </main>
</template>


<style scoped>

/* =========================================================
   BASE
   ========================================================= */

.about-page {
  width: 100%;
  overflow-x: hidden;
  background: var(--color-bg-dark);
  color: var(--color-text-primary);
}

.about-page *,
.about-page *::before,
.about-page *::after {
  box-sizing: border-box;
}

.section-container {
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
}

.section-light {
  background: var(--color-bg-light);
  color: var(--color-text-dark);
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--color-accent);
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.22em;
  line-height: 1.4;
  text-transform: uppercase;
}

.eyebrow::before {
  content: "";
  flex: 0 0 auto;
  /* width: 28px;
  height: 1px; */
  background: var(--color-accent);
}

.dark-eyebrow {
  color: var(--color-accent-dark);
}

.dark-eyebrow::before {
  background: var(--color-accent-dark);
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1,
h2,
h3 {
  font-family: var(--font-heading);
}

p {
  font-family: var(--font-body);
}


/* =========================================================
   HERO
   ========================================================= */

.about-hero {
  position: relative;
  min-height: 620px;
  display: flex;
  align-items: center;
  background:
    linear-gradient(
      90deg,
      var(--color-overlay-heavy),
      var(--color-overlay-dark)
    ),
    url("/about-hero.jpg") center / cover no-repeat;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
  padding: var(--space-4xl) 0;
}

.hero-content h1 {
  max-width: 820px;
  margin: var(--space-lg) 0;
  font-size: clamp(48px, 6vw, 86px);
  line-height: 0.98;
  font-weight: 500;
  letter-spacing: -0.035em;
}

.hero-content h1 span,
.story-content h2 span,
.section-heading h2 span,
.craft-content h2 span,
.promise-content h2 span,
.cta-content h2 span {
  display: block;
  color: var(--color-accent);
  font-style: italic;
}

.hero-content p {
  max-width: 570px;
  margin-bottom: var(--space-xl);
  color: var(--color-text-secondary);
  font-size: 16px;
  line-height: 1.8;
}

.hero-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-md);
  color: var(--color-text-primary);
  text-decoration: none;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-link .arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 38px;
  height: 38px;
  border: 1px solid var(--color-border-dark);
  border-radius: 50%;
  color: var(--color-accent);
  transition: transform 0.25s ease;
}

.hero-link:hover .arrow {
  transform: translateY(4px);
}


/* =========================================================
   STORY
   ========================================================= */

.story-section {
  padding: var(--space-4xl) 0;
}

.story-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  align-items: center;
  gap: clamp(48px, 7vw, 100px);
}

.story-image-wrap {
  position: relative;
  min-width: 0;
  padding: 0 var(--space-lg) var(--space-lg) 0;
}

.image-frame {
  position: absolute;
  inset: var(--space-lg) 0 0 var(--space-lg);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
}

.story-image {
  position: relative;
  display: block;
  width: 100%;
  height: 540px;
  object-fit: cover;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}

.image-caption {
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  min-width: 180px;
  padding: var(--space-md) var(--space-lg);
  background: var(--color-bg-primary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
}

.image-caption span {
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: 9px;
  letter-spacing: 0.16em;
}

.image-caption strong {
  color: var(--color-accent);
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 500;
}

.story-content {
  min-width: 0;
}

.story-content h2,
.craft-content h2,
.promise-content h2 {
  margin: var(--space-lg) 0;
  font-size: clamp(40px, 5vw, 62px);
  line-height: 1.05;
  font-weight: 500;
  letter-spacing: -0.025em;
}

.story-content h2 span {
  color: var(--color-brand-navy);
}

.story-content .lead {
  margin-bottom: var(--space-md);
  color: var(--color-text-dark);
  font-size: 18px;
  line-height: 1.7;
}

.story-content > p:not(.lead) {
  max-width: 570px;
  color: var(--color-text-dark-secondary);
  font-size: 15px;
  line-height: 1.85;
}

.signature {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin-top: var(--space-xl);
  color: var(--color-text-dark-muted);
  font-family: var(--font-heading);
  font-size: 16px;
  font-style: italic;
}

.signature-line {
  width: 50px;
  height: 1px;
  background: var(--color-accent);
}


/* =========================================================
   VALUES
   ========================================================= */

.values-section {
  padding: var(--space-4xl) 0;
  background: var(--color-bg-primary);
}

.section-heading {
  max-width: 650px;
  margin-bottom: var(--space-3xl);
}

.section-heading.centered {
  margin-right: auto;
  margin-left: auto;
  text-align: center;
}

.section-heading.centered .eyebrow {
  justify-content: center;
}

.section-heading h2 {
  margin: var(--space-lg) 0 var(--space-md);
  font-size: clamp(40px, 5vw, 60px);
  line-height: 1;
  font-weight: 500;
}

.section-heading p {
  max-width: 570px;
  color: var(--color-text-secondary);
  font-size: 15px;
  line-height: 1.8;
}

.section-heading.centered p {
  margin-right: auto;
  margin-left: auto;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--color-border-dark);
  border-bottom: 1px solid var(--color-border-dark);
}

.value-card {
  position: relative;
  min-width: 0;
  min-height: 300px;
  padding: var(--space-xl);
  border-right: 1px solid var(--color-border-dark);
}

.value-card:first-child {
  border-left: 1px solid var(--color-border-dark);
}

.value-number {
  color: var(--color-accent);
  font-family: var(--font-body);
  font-size: 11px;
  letter-spacing: 0.15em;
}

.value-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  margin: 40px 0 var(--space-lg);
  border: 1px solid var(--color-border-dark);
  border-radius: 50%;
}

.value-icon span {
  width: 9px;
  height: 9px;
  border: 1px solid var(--color-accent);
  border-radius: 50%;
}

.value-card h3 {
  margin-bottom: var(--space-sm);
  color: var(--color-text-primary);
  font-size: 24px;
  font-weight: 500;
}

.value-card p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 13px;
  line-height: 1.8;
}


/* =========================================================
   CRAFT
   ========================================================= */

.craft-section {
  padding: var(--space-4xl) 0;
}

.craft-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  align-items: center;
  gap: clamp(48px, 7vw, 100px);
}

.craft-content {
  min-width: 0;
}

.craft-content h2 {
  max-width: 600px;
}

.craft-content h2 span {
  color: var(--color-brand-navy);
}

.craft-content > p {
  max-width: 520px;
  color: var(--color-text-dark-secondary);
  font-size: 15px;
  line-height: 1.85;
}

.outline-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  margin-top: var(--space-lg);
  padding: 13px 22px;
  border: 1px solid var(--color-brand-navy);
  border-radius: var(--radius-md);
  color: var(--color-brand-navy);
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.25s ease;
}

.outline-button:hover {
  background: var(--color-button-dark);
  color: var(--color-button-dark-text);
}

.craft-image-wrap {
  position: relative;
  min-width: 0;
}

.craft-image {
  display: block;
  width: 100%;
  height: 560px;
  object-fit: cover;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}

.craft-badge {
  position: absolute;
  right: var(--space-lg);
  bottom: var(--space-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: var(--color-brand-navy);
  box-shadow: var(--shadow-gold);
}

.craft-badge span {
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: 8px;
  letter-spacing: 0.16em;
}

.craft-badge strong {
  margin-top: var(--space-xs);
  color: var(--color-accent);
  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 500;
}


/* =========================================================
   PROCESS
   ========================================================= */

.process-section {
  padding: var(--space-4xl) 0;
  background: var(--color-bg-secondary);
}

.process-list {
  border-top: 1px solid var(--color-border-dark);
}

.process-item {
  display: grid;
  grid-template-columns: 90px minmax(0, 1fr) 40px;
  align-items: center;
  gap: var(--space-xl);
  padding: var(--space-xl) 0;
  border-bottom: 1px solid var(--color-border-dark);
  transition: padding 0.25s ease;
}

.process-item:hover {
  padding-right: var(--space-md);
  padding-left: var(--space-md);
}

.process-number {
  color: var(--color-accent);
  font-family: var(--font-body);
  font-size: 12px;
  letter-spacing: 0.15em;
}

.process-main {
  display: flex;
  align-items: center;
  gap: clamp(30px, 7vw, 100px);
  min-width: 0;
}

.process-main h3 {
  flex: 0 0 150px;
  margin: 0;
  color: var(--color-text-primary);
  font-size: 28px;
  font-weight: 500;
}

.process-main p {
  max-width: 520px;
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 1.75;
}

.process-arrow {
  color: var(--color-accent);
  font-family: var(--font-body);
  font-size: 20px;
}


/* =========================================================
   PROMISE
   ========================================================= */

.promise-section {
  padding: var(--space-4xl) 0;
  background: var(--color-bg-dark);
}

.promise-inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  width: min(1180px, calc(100% - 48px));
  min-height: 520px;
  margin: 0 auto;
}

.promise-image {
  min-width: 0;
  overflow: hidden;
  border-radius: var(--radius-lg) 0 0 var(--radius-lg);
}

.promise-image img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 520px;
  object-fit: cover;
}

.promise-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  padding: clamp(32px, 6vw, 80px);
  background: var(--color-surface-dark);
  border: 1px solid var(--color-border-dark);
  border-left: 0;
  border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
}

.promise-content h2 {
  margin-bottom: var(--space-lg);
}

.promise-content p {
  max-width: 470px;
  color: var(--color-text-secondary);
  font-size: 15px;
  line-height: 1.85;
}

.promise-mark {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin-top: var(--space-lg);
  color: var(--color-accent);
  font-family: var(--font-heading);
  font-size: 17px;
  font-style: italic;
}

.mark-line {
  width: 40px;
  height: 1px;
  background: var(--color-accent);
}


/* =========================================================
   CTA
   ========================================================= */

.cta-section {
  padding: var(--space-4xl) 0;
  background: var(--color-bg-light);
  color: var(--color-text-dark);
}

.cta-content {
  text-align: center;
}

.cta-content .eyebrow {
  justify-content: center;
  color: var(--color-accent-dark);
}

.cta-content .eyebrow::before {
  background: var(--color-accent-dark);
}

.cta-content h2 {
  margin: var(--space-lg) auto var(--space-md);
  font-size: clamp(44px, 6vw, 72px);
  line-height: 1;
  font-weight: 500;
}

.cta-content h2 span {
  color: var(--color-brand-navy);
}

.cta-content p {
  max-width: 540px;
  margin: 0 auto;
  color: var(--color-text-dark-secondary);
  font-size: 15px;
  line-height: 1.8;
}

.cta-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin-top: var(--space-xl);
}

.primary-button,
.secondary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 22px;
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.25s ease;
}

.primary-button {
  background: var(--color-button-primary);
  color: var(--color-button-primary-text);
}

.primary-button:hover {
  background: var(--color-button-primary-hover);
}

.secondary-button {
  border: 1px solid var(--color-brand-navy);
  color: var(--color-brand-navy);
}

.secondary-button:hover {
  background: var(--color-button-dark);
  color: var(--color-button-dark-text);
}


/* =========================================================
   LARGE DESKTOP
   ========================================================= */

@media (min-width: 1440px) {
  .section-container,
  .hero-content {
    width: min(1280px, calc(100% - 80px));
  }

  .promise-inner {
    width: min(1280px, calc(100% - 80px));
  }

  .hero-content h1 {
    font-size: clamp(70px, 5.5vw, 92px);
  }

  .story-grid,
  .craft-grid {
    gap: 90px;
  }
}


/* =========================================================
   TABLET / SMALL LAPTOP
   ========================================================= */

@media (max-width: 1100px) {
  .story-grid,
  .craft-grid {
    gap: 48px;
  }

  .story-image {
    height: 500px;
  }

  .craft-image {
    height: 500px;
  }

  .process-main {
    gap: 40px;
  }
}


/* =========================================================
   TABLET
   ========================================================= */

@media (max-width: 900px) {

  .section-container {
    width: min(100% - 40px, 720px);
  }

  .about-hero {
    min-height: 560px;
  }

  .hero-content {
    width: min(100% - 40px, 720px);
  }

  .hero-content h1 {
    max-width: 680px;
    font-size: clamp(46px, 8vw, 68px);
  }

  .story-grid,
  .craft-grid {
    grid-template-columns: 1fr;
    gap: var(--space-3xl);
  }

  .story-image-wrap {
    width: min(100%, 620px);
  }

  .story-image {
    height: 500px;
  }

  .story-content {
    max-width: 680px;
  }

  .values-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .value-card:nth-child(2) {
    border-right: 0;
  }

  .value-card:nth-child(3),
  .value-card:nth-child(4) {
    border-top: 1px solid var(--color-border-dark);
  }

  .craft-image-wrap {
    width: 100%;
  }

  .craft-image {
    height: 480px;
  }

  .promise-inner {
    width: min(100% - 40px, 720px);
    grid-template-columns: 1fr;
  }

  .promise-image,
  .promise-image img {
    min-height: 420px;
    height: 420px;
  }

  .promise-image {
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  }

  .promise-content {
    padding: var(--space-3xl);
    border-left: 1px solid var(--color-border-dark);
    border-top: 0;
    border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  }

  .process-item {
    grid-template-columns: 70px minmax(0, 1fr) 30px;
    gap: var(--space-lg);
  }

  .process-main {
    gap: 32px;
  }

  .process-main h3 {
    flex-basis: 120px;
  }
}


/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 600px) {

  .section-container {
    width: calc(100% - 32px);
  }

  .about-hero {
    min-height: 520px;
    background-position: center;
  }

  .hero-content {
    width: calc(100% - 32px);
    padding: var(--space-3xl) 0;
  }

  .hero-content h1 {
    margin: var(--space-md) 0;
    font-size: clamp(40px, 12.5vw, 58px);
    line-height: 1;
  }

  .hero-content p {
    max-width: 100%;
    margin-bottom: var(--space-lg);
    font-size: 14px;
    line-height: 1.7;
  }

  .hero-link {
    font-size: 11px;
    gap: var(--space-sm);
  }

  .hero-link .arrow {
    width: 34px;
    height: 34px;
  }

  .story-section,
  .values-section,
  .craft-section,
  .process-section,
  .promise-section,
  .cta-section {
    padding: var(--space-3xl) 0;
  }

  /* ================= STORY ================= */

  .story-grid {
    gap: var(--space-2xl);
  }

  .story-image-wrap {
    width: 100%;
    padding: 0 var(--space-sm) var(--space-sm) 0;
  }

  .story-image {
    height: 390px;
  }

  .image-frame {
    inset: var(--space-sm) 0 0 var(--space-sm);
  }

  .image-caption {
    right: -4px;
    min-width: 150px;
    padding: var(--space-sm) var(--space-md);
  }

  .image-caption span {
    font-size: 8px;
  }

  .image-caption strong {
    font-size: 15px;
  }

  .story-content h2,
  .craft-content h2,
  .promise-content h2 {
    margin: var(--space-md) 0;
    font-size: clamp(36px, 10vw, 44px);
    line-height: 1.05;
  }

  .story-content .lead {
    font-size: 16px;
    line-height: 1.7;
  }

  .story-content > p:not(.lead),
  .craft-content > p,
  .promise-content p {
    font-size: 14px;
    line-height: 1.75;
  }

  .signature {
    margin-top: var(--space-lg);
  }


  /* ================= VALUES ================= */

  .section-heading {
    margin-bottom: var(--space-2xl);
  }

  .section-heading h2 {
    font-size: clamp(38px, 10vw, 46px);
  }

  .section-heading p {
    font-size: 14px;
  }

  /*
    MOBILE:
    2 VALUE CARDS PER ROW
  */
  .values-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .value-card,
  .value-card:first-child,
  .value-card:nth-child(2),
  .value-card:nth-child(3),
  .value-card:nth-child(4) {
    min-height: 250px;
    padding: var(--space-md);
    border-top: 0;
    border-right: 1px solid var(--color-border-dark);
    border-left: 0;
    border-bottom: 1px solid var(--color-border-dark);
  }

  .value-card:nth-child(2n) {
    border-right: 0;
  }

  .value-card:nth-child(1),
  .value-card:nth-child(2) {
    border-top: 0;
  }

  .value-card:nth-child(3),
  .value-card:nth-child(4) {
    border-top: 0;
  }

  .value-card:nth-child(3),
  .value-card:nth-child(4) {
    border-bottom: 0;
  }

  .value-card:first-child {
    border-left: 1px solid var(--color-border-dark);
  }

  .value-card:nth-child(3) {
    border-left: 1px solid var(--color-border-dark);
  }

  .value-number {
    font-size: 10px;
  }

  .value-icon {
    width: 40px;
    height: 40px;
    margin: 24px 0 var(--space-md);
  }

  .value-icon span {
    width: 8px;
    height: 8px;
  }

  .value-card h3 {
    margin-bottom: var(--space-sm);
    font-size: 19px;
    line-height: 1.2;
  }

  .value-card p {
    font-size: 12px;
    line-height: 1.65;
  }


  /* ================= CRAFT ================= */

  .craft-grid {
    gap: var(--space-2xl);
  }

  .outline-button {
    width: auto;
    min-height: 44px;
    padding: 0 18px;
    font-size: 11px;
  }

  .craft-image {
    height: 390px;
  }

  .craft-badge {
    right: var(--space-sm);
    bottom: var(--space-sm);
    width: 95px;
    height: 95px;
  }

  .craft-badge span {
    font-size: 7px;
  }

  .craft-badge strong {
    font-size: 13px;
  }


  /* ================= PROCESS ================= */

  .process-item {
    grid-template-columns: 38px minmax(0, 1fr) 22px;
    gap: var(--space-sm);
    padding: var(--space-lg) 0;
  }

  .process-item:hover {
    padding-right: 0;
    padding-left: 0;
  }

  .process-number {
    font-size: 10px;
  }

  .process-main {
    display: block;
    min-width: 0;
  }

  .process-main h3 {
    min-width: 0;
    margin-bottom: var(--space-sm);
    font-size: 23px;
  }

  .process-main p {
    max-width: none;
    font-size: 13px;
    line-height: 1.7;
  }

  .process-arrow {
    font-size: 16px;
  }


  /* ================= PROMISE ================= */

  .promise-inner {
    width: calc(100% - 32px);
  }

  .promise-image,
  .promise-image img {
    height: 330px;
    min-height: 330px;
  }

  .promise-content {
    padding: var(--space-xl);
  }

  .promise-mark {
    font-size: 15px;
  }


  /* ================= CTA ================= */

  .cta-content h2 {
    font-size: clamp(38px, 11vw, 48px);
  }

  .cta-content p {
    font-size: 14px;
  }

  .cta-actions {
    flex-direction: column;
    width: 100%;
    gap: var(--space-sm);
  }

  .primary-button,
  .secondary-button {
    width: 100%;
    min-height: 46px;
  }
}


/* =========================================================
   VERY SMALL MOBILE
   ========================================================= */

@media (max-width: 380px) {

  .section-container {
    width: calc(100% - 24px);
  }

  .hero-content {
    width: calc(100% - 24px);
  }

  .about-hero {
    min-height: 500px;
  }

  .hero-content h1 {
    font-size: 39px;
  }

  .eyebrow {
    font-size: 9px;
    letter-spacing: 0.18em;
  }

  .eyebrow::before {
    width: 22px;
  }

  .story-image {
    height: 340px;
  }

  /*
    Still 2 cards per row on very small screens.
  */
  .value-card {
    min-height: 235px;
    padding: var(--space-sm);
  }

  .value-card h3 {
    font-size: 17px;
  }

  .value-card p {
    font-size: 11px;
  }

  .value-icon {
    width: 36px;
    height: 36px;
    margin: 20px 0 var(--space-sm);
  }

  .process-item {
    grid-template-columns: 32px minmax(0, 1fr) 18px;
  }

  .process-main h3 {
    font-size: 21px;
  }

  .process-main p {
    font-size: 12px;
  }

  .craft-image {
    height: 340px;
  }

  .promise-image,
  .promise-image img {
    height: 290px;
    min-height: 290px;
  }

  .promise-content {
    padding: var(--space-lg);
  }
}


/* =========================================================
   LANDSCAPE MOBILE
   ========================================================= */

@media (max-width: 900px) and (orientation: landscape) {
  .about-hero {
    min-height: 560px;
  }

  .hero-content {
    padding-top: var(--space-2xl);
    padding-bottom: var(--space-2xl);
  }
}


/* =========================================================
   REDUCED MOTION
   ========================================================= */

@media (prefers-reduced-motion: reduce) {
  .hero-link .arrow,
  .outline-button,
  .primary-button,
  .secondary-button,
  .process-item {
    transition: none;
  }
}

</style>