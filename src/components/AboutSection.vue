<script setup>

import { ref, onMounted } from 'vue'

/* =========================================================
   VIDEO
   ========================================================= */

import aboutVideo from '../assets/About.mp4'

const videoSrc = aboutVideo
const posterSrc = null


/* =========================================================
   PLAYBACK
   ========================================================= */

const SLOW_MOTION = 0.5
const videoEl = ref(null)
const isPlaying = ref(false)


/* =========================================================
   DEVICE CHECK
   ========================================================= */

const canHover = () => {
  return window.matchMedia('(hover: hover)').matches
}


/* =========================================================
   PLAY
   ========================================================= */

const play = () => {
  const el = videoEl.value

  if (!el) return

  el.playbackRate = SLOW_MOTION

  el.play()
    .then(() => {
      isPlaying.value = true
    })
    .catch((error) => {
      console.warn('Video could not play:', error)
    })
}


/* =========================================================
   PAUSE
   ========================================================= */

const pause = () => {
  const el = videoEl.value

  if (!el) return

  el.pause()
  isPlaying.value = false
}


/* =========================================================
   HOVER — LAPTOP / DESKTOP ONLY
   ========================================================= */

const onEnter = () => {
  if (canHover()) {
    play()
  }
}


const onLeave = () => {
  if (canHover()) {
    pause()
  }
}


/* =========================================================
   MOBILE AUTO PLAY
   ========================================================= */

onMounted(() => {
  document.title = 'About — Royal Resin Art'

  /*
   * Laptop/Desktop:
   * Video plays only on hover.
   *
   * Mobile/Touch:
   * Video automatically plays and keeps looping.
   */

  if (!canHover()) {
    play()
  }
})

</script>


<template>

  <main class="about-page">

    <section
      id="about"
      class="about-section"
    >

      <div class="about-inner">

        <!-- =====================================================
             LEFT — TEXT
             ===================================================== -->

        <div class="about-copy">

          <p class="eyebrow">
            OUR STORY
          </p>

          <h1>
            Crafting Art
            <span>with Resin</span>
          </h1>

          <p class="about-text">
            At Royal Resin Art, we believe that art has the power to
            transform spaces and emotions. Every piece we create is
            handcrafted with care, creativity, and a passion for detail.
            From vibrant wall art to elegant home décor, our resin
            creations are designed to add a royal touch to your
            everyday life.
          </p>

          <a
            href="/about"
            class="about-cta"
          >

            <span>Learn More</span>

            <svg
              class="cta-arrow"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >

              <path d="M4 12h16M14 6l6 6-6 6" />

            </svg>

          </a>

        </div>


        <!-- =====================================================
             RIGHT — VIDEO
             ===================================================== -->

        <div
          class="about-media"
          tabindex="0"
          role="button"
          :aria-label="isPlaying ? 'Pause video' : 'Play video'"
          @mouseenter="onEnter"
          @mouseleave="onLeave"
          @click="onTap"
          @keydown.enter.prevent="toggle"
          @keydown.space.prevent="toggle"
        >

          <video
            ref="videoEl"
            class="about-video"
            :src="videoSrc"
            :poster="posterSrc || undefined"
            muted
            loop
            playsinline
            preload="metadata"
          ></video>

          <!-- Play button -->
          <!--
          <span
            class="play-badge"
            :class="{ 'is-hidden': isPlaying }"
            aria-hidden="true"
          >

            <svg
              viewBox="0 0 24 24"
            >

              <path d="M8 5.5v13l11-6.5z" />

            </svg>

          </span>
          -->

        </div>

      </div>

    </section>

  </main>

</template>


<style scoped>

/* =========================================================
   PAGE
   ========================================================= */

.about-page {
  width: 100%;
  min-width: 0;

  background: var(--color-bg-dark);
  color: var(--color-text-primary);

  overflow-x: hidden;
}


/* =========================================================
   SECTION
   ========================================================= */

.about-section {
  width: 100%;
  min-height: 100svh;

  display: flex;
  align-items: center;

  box-sizing: border-box;

  padding:
    var(--space-4xl)
    0
    var(--space-3xl);

  scroll-margin-top: 80px;
}


/* =========================================================
   MAIN CONTAINER
   ========================================================= */

.about-inner {
  width: min(
    1240px,
    calc(100% - var(--space-4xl))
  );

  margin: 0 auto;

  display: grid;

  grid-template-columns:
    minmax(0, 0.9fr)
    minmax(0, 1.1fr);

  align-items: center;

  gap: var(--space-3xl);

  box-sizing: border-box;
}


/* =========================================================
   LEFT — TEXT
   ========================================================= */

.about-copy {
  width: 100%;
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


.about-copy h1 {
  margin: 0;

  color:
    var(--color-text-primary);

  font-family:
    var(--font-heading);

  font-size:
    clamp(
      40px,
      4.6vw,
      64px
    );

  font-weight: 500;

  line-height: 1.1;

  letter-spacing: -1.5px;

  overflow-wrap: break-word;
}


.about-copy h1 span {
  display: block;
}


.about-text {
  width: 100%;
  max-width: 520px;

  margin:
    var(--space-lg)
    0
    var(--space-xl);

  color:
    var(--color-text-secondary);

  font-family:
    var(--font-body);

  font-size: 15px;

  line-height: 1.8;
}


/* =========================================================
   CTA
   ========================================================= */

.about-cta {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  gap: var(--space-md);

  min-height: 48px;

  padding:
    0
    var(--space-lg);

  background:
    var(--color-button-primary);

  color:
    var(--color-button-primary-text);

  border-radius:
    var(--radius-sm);

  font-family:
    var(--font-body);

  font-size: 13px;
  font-weight: 600;

  text-decoration: none;

  box-shadow:
    var(--shadow-gold);

  transition:
    transform 0.3s ease,
    background 0.3s ease;

  box-sizing: border-box;
}


.about-cta:hover {
  transform:
    translateY(-2px);

  background:
    var(--color-button-primary-hover);
}


.about-cta:focus-visible {
  outline:
    2px solid
    var(--color-accent-light);

  outline-offset: 3px;
}


.cta-arrow {
  width: 16px;
  height: 16px;

  flex: 0 0 auto;

  fill: none;

  stroke: currentColor;

  stroke-width: 2;

  stroke-linecap: round;
  stroke-linejoin: round;

  transition:
    transform 0.3s ease;
}


.about-cta:hover .cta-arrow {
  transform:
    translateX(4px);
}


/* =========================================================
   VIDEO
   ========================================================= */

.about-media {
  position: relative;

  width: 100%;
  min-width: 0;

  min-height: 420px;

  aspect-ratio: 16 / 10;

  overflow: hidden;

  border-radius:
    var(--radius-lg);

  box-shadow:
    var(--shadow-card);

  cursor: pointer;

  background:
    var(--color-surface-dark);

  box-sizing: border-box;
}


.about-media:focus-visible {
  outline:
    2px solid
    var(--color-accent-light);

  outline-offset: 3px;
}


.about-video {
  position: absolute;

  inset: 0;

  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
}


/* =========================================================
   PLAY BADGE
   ========================================================= */

.play-badge {
  position: absolute;

  top: 50%;
  left: 50%;

  width: 56px;
  height: 56px;

  display: grid;

  place-items: center;

  background:
    var(--color-overlay-dark);

  border:
    1px solid
    var(--color-border-dark);

  border-radius: 50%;

  transform:
    translate(-50%, -50%);

  pointer-events: none;

  transition:
    opacity 0.3s ease;
}


.play-badge.is-hidden {
  opacity: 0;
}


.play-badge svg {
  width: 22px;
  height: 22px;

  margin-left: 2px;

  fill:
    var(--color-icon-primary);
}


/* =========================================================
   LARGE LAPTOP
   ========================================================= */

@media (max-width: 1200px) {

  .about-inner {
    width:
      calc(100% - var(--space-3xl));

    gap:
      var(--space-2xl);
  }

  .about-media {
    min-height: 380px;
  }

}


/* =========================================================
   TABLET LANDSCAPE
   ========================================================= */

@media (max-width: 1000px) {

  .about-section {
    padding:
      var(--space-4xl)
      0
      var(--space-3xl);
  }

  .about-inner {
    width:
      calc(100% - var(--space-2xl));

    grid-template-columns:
      minmax(0, 1fr)
      minmax(0, 1fr);

    gap:
      var(--space-2xl);
  }

  .about-copy h1 {
    font-size:
      clamp(
        38px,
        5vw,
        54px
      );
  }

  .about-text {
    font-size: 14px;
    line-height: 1.75;
  }

  .about-media {
    min-height: 330px;
  }

}


/* =========================================================
   TABLET PORTRAIT
   ========================================================= */

@media (max-width: 850px) {

  .about-section {
    min-height: auto;

    padding:
      calc(var(--space-4xl) + 20px)
      0
      var(--space-3xl);
  }

  .about-inner {
    width:
      calc(100% - var(--space-2xl));

    grid-template-columns: 1fr;

    gap:
      var(--space-3xl);
  }

  .about-copy {
    max-width: 700px;
  }

  .about-copy h1 {
    font-size:
      clamp(
        42px,
        7vw,
        58px
      );
  }

  .about-text {
    max-width: 650px;
    font-size: 15px;
  }

  .about-media {
    width: 100%;
    min-height: 0;

    aspect-ratio: 16 / 9;
  }

}


/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 768px) {

  .about-section {
    width: 100%;

    min-height: auto;

    align-items: flex-start;

    padding:
      calc(var(--space-3xl) + 30px)
      0
      var(--space-3xl);
  }

  .about-inner {
    width:
      calc(100% - var(--space-2xl));

    margin: 0 auto;

    grid-template-columns: 1fr;

    gap:
      var(--space-2xl);
  }

  .eyebrow {
    margin-bottom:
      var(--space-sm);

    font-size: 10px;

    letter-spacing: 2.5px;
  }

  .about-copy h1 {
    font-size:
      clamp(
        38px,
        10vw,
        52px
      );

    line-height: 1.08;

    letter-spacing: -1px;
  }

  .about-text {
    max-width: none;

    margin:
      var(--space-lg)
      0
      var(--space-xl);

    font-size: 14px;

    line-height: 1.75;
  }

  .about-cta {
    min-height: 46px;

    padding:
      0
      var(--space-lg);

    font-size: 12px;
  }

  .about-media {
    width: 100%;

    min-height: 0;

    aspect-ratio: 16 / 9;

    border-radius:
      var(--radius-lg);
  }

}


/* =========================================================
   SMALL MOBILE
   ========================================================= */

@media (max-width: 520px) {

  .about-section {
    padding:
      calc(var(--space-3xl) + 20px)
      0
      var(--space-2xl);
  }

  .about-inner {
    width:
      calc(100% - 32px);

    gap:
      var(--space-xl);
  }

  .about-copy h1 {
    font-size:
      clamp(
        34px,
        10.5vw,
        46px
      );

    letter-spacing: -0.8px;
  }

  .about-text {
    margin:
      var(--space-md)
      0
      var(--space-lg);

    font-size: 13.5px;

    line-height: 1.7;
  }

  .about-cta {
    min-height: 44px;

    padding:
      0
      var(--space-md);

    gap: var(--space-sm);

    font-size: 12px;
  }

  .cta-arrow {
    width: 15px;
    height: 15px;
  }

  .about-media {
    aspect-ratio: 4 / 3;
  }

}


/* =========================================================
   VERY SMALL MOBILE
   ========================================================= */

@media (max-width: 380px) {

  .about-section {
    padding:
      calc(var(--space-2xl) + 20px)
      0
      var(--space-2xl);
  }

  .about-inner {
    width:
      calc(100% - 24px);

    gap:
      var(--space-lg);
  }

  .eyebrow {
    font-size: 9px;
    letter-spacing: 2px;
  }

  .about-copy h1 {
    font-size:
      clamp(
        31px,
        10.5vw,
        40px
      );

    line-height: 1.1;
  }

  .about-text {
    font-size: 13px;
    line-height: 1.65;
  }

  .about-cta {
    width: auto;
    max-width: 100%;

    min-height: 42px;

    font-size: 11px;
  }

  .about-media {
    aspect-ratio: 4 / 3;

    border-radius:
      var(--radius-md);
  }

}


/* =========================================================
   ULTRA SMALL MOBILE
   ========================================================= */

@media (max-width: 320px) {

  .about-inner {
    width:
      calc(100% - 20px);
  }

  .about-copy h1 {
    font-size: 30px;
  }

  .about-text {
    font-size: 12.5px;
  }

  .about-cta {
    min-height: 40px;

    padding:
      0
      13px;

    font-size: 10.5px;
  }

  .about-media {
    aspect-ratio: 1 / 1;
  }

}


/* =========================================================
   LANDSCAPE MOBILE
   ========================================================= */

@media (
  max-width: 768px
) and (
  orientation: landscape
) {

  .about-section {
    padding:
      calc(var(--space-2xl) + 20px)
      0
      var(--space-2xl);
  }

  .about-inner {
    grid-template-columns:
      minmax(0, 1fr)
      minmax(0, 1fr);

    align-items: center;

    gap:
      var(--space-xl);
  }

  .about-copy h1 {
    font-size:
      clamp(
        30px,
        6vw,
        42px
      );
  }

  .about-text {
    font-size: 12px;
    line-height: 1.6;
  }

  .about-media {
    aspect-ratio: 16 / 10;
  }

}


/* =========================================================
   REDUCED MOTION
   ========================================================= */

@media (prefers-reduced-motion: reduce) {

  .about-cta,
  .cta-arrow,
  .play-badge {
    transition: none;
  }

}

</style>