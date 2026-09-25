```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const submitted = ref(false)

const submitForm = () => {
  submitted.value = true

  setTimeout(() => {
    submitted.value = false
  }, 4000)
}
</script>

<template>
  <main class="contact-page">

    <!-- ==================== HERO ==================== -->
    <section class="contact-hero">
      <div class="hero-content">
        <span class="eyebrow">GET IN TOUCH</span>

        <h1>
          Let's Create
          <span>Something Beautiful.</span>
        </h1>

        <p>
          Have a custom idea, a special memory to preserve, or simply
          want to know more about our creations? We'd love to hear from you.
        </p>
      </div>
    </section>

    <!-- ==================== CONTACT CONTENT ==================== -->
    <section class="contact-section section-light">
      <div class="section-container contact-grid">

        <!-- LEFT -->
        <div class="contact-info">

          <span class="eyebrow dark-eyebrow">CONTACT US</span>

          <h2>
            We'd Love to
            <span>Hear From You.</span>
          </h2>

          <p class="intro">
            Whether you're looking for a ready-made piece or want something
            created especially for you, send us a message and let's bring
            your idea to life.
          </p>

          <div class="details">

            <div class="detail-item">
              <div class="detail-icon">
                <span>✦</span>
              </div>

              <div>
                <small>EMAIL</small>
                <a href="mailto:hello@royalresinstudio.com">
                  hello@royalresinstudio.com
                </a>
              </div>
            </div>

            <div class="detail-item">
              <div class="detail-icon">
                <span>⌕</span>
              </div>

              <div>
                <small>INSTAGRAM</small>
                <a href="#" target="_blank" rel="noopener">
                  @royalresinstudio
                </a>
              </div>
            </div>

            <div class="detail-item">
              <div class="detail-icon">
                <span>◌</span>
              </div>

              <div>
                <small>LOCATION</small>
                <span class="detail-text">
                  Pakistan
                </span>
              </div>
            </div>

          </div>

          <div class="social-note">
            <!-- <span class="note-line"></span> -->

            <p>
              Follow our journey and discover new creations on Instagram.
            </p>
          </div>

        </div>

        <!-- RIGHT FORM -->
        <div class="form-card">

          <div class="form-header">
            <span class="form-label">SEND A MESSAGE</span>

            <h3>
              Tell Us About
              <span>Your Idea.</span>
            </h3>
          </div>

          <form @submit.prevent="submitForm">

            <div class="form-row">
              <div class="field">
                <label for="name">Your Name</label>

                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div class="field">
                <label for="email">Email Address</label>

                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div class="form-row">
              <div class="field">
                <label for="phone">Phone Number</label>

                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  placeholder="Enter your phone number"
                />
              </div>

              <div class="field">
                <label for="subject">I'm Interested In</label>

                <select
                  id="subject"
                  v-model="form.subject"
                  required
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="resin-preservation">
                    Resin Preservation
                  </option>

                  <option value="jewelry-box">
                    Jewelry Box
                  </option>

                  <option value="photo-frame">
                    Resin Photo Frame
                  </option>

                  <option value="pen-holder">
                    Pen Holder
                  </option>

                  <option value="custom-pen">
                    Custom Pen
                  </option>

                  <option value="resin-tray">
                    Resin Tray
                  </option>

                  <option value="serving-tray">
                    Serving Tray
                  </option>

                  <option value="custom">
                    Custom Order
                  </option>
                </select>
              </div>
            </div>

            <div class="field">
              <label for="message">Your Message</label>

              <textarea
                id="message"
                v-model="form.message"
                rows="6"
                placeholder="Tell us about your idea..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              class="submit-button"
            >
              <span>{{ submitted ? 'MESSAGE SENT ✓' : 'SEND MESSAGE' }}</span>
              <span class="submit-arrow">↗</span>
            </button>

            <p
              v-if="submitted"
              class="success-message"
            >
              Thank you! We've received your message and will get back to you soon.
            </p>

          </form>

        </div>

      </div>
    </section>

    <!-- ==================== CUSTOM ORDERS ==================== -->
    <section class="custom-section">
      <div class="section-container custom-grid">

        <div class="custom-content">
          <span class="eyebrow">CUSTOM ORDERS</span>

          <h2>
            Your Idea.
            <span>Our Craft.</span>
          </h2>

          <p>
            Have something unique in mind? From meaningful keepsakes to
            personalised gifts, we can create a piece around your vision.
          </p>

          <a href="/contact" class="custom-button">
            Start Your Custom Order
            <span>↗</span>
          </a>
        </div>

        <div class="custom-decoration">
          <span class="decoration-ring ring-one"></span>
          <span class="decoration-ring ring-two"></span>
          <span class="decoration-ring ring-three"></span>

          <div class="decoration-center">
            <span>R</span>
            <small>ROYAL</small>
          </div>
        </div>

      </div>
    </section>

    <!-- ==================== FINAL CTA ==================== -->
    <section class="final-section">
      <div class="section-container final-content">

        <span class="eyebrow">ROYAL RESIN STUDIO</span>

        <h2>
          Made With Care.
          <span>Made For You.</span>
        </h2>

        <p>
          Every piece has a story. Let yours become something beautiful.
        </p>

      </div>
    </section>

  </main>
</template>

<style scoped>
/* =========================================================
   BASE
   ========================================================= */

.contact-page {
  width: 100%;
  overflow: hidden;
  background: var(--color-bg-dark);
  color: var(--color-text-primary);
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
  text-transform: uppercase;
}

.eyebrow::before {
  content: "";
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


/* =========================================================
   HERO
   ========================================================= */

.contact-hero {
  position: relative;
  min-height: 500px;
  display: flex;
  align-items: center;
  background:
    linear-gradient(
      90deg,
      var(--color-overlay-heavy),
      var(--color-overlay-dark)
    ),
    url("/contact-hero.jpg") center / cover no-repeat;
}

.hero-content {
  position: relative;
  z-index: 1;
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
  padding: var(--space-4xl) 0;
}

.hero-content h1 {
  max-width: 850px;
  margin: var(--space-lg) 0;
  color: var(--color-text-primary);
  font-family: var(--font-heading);
  font-size: clamp(48px, 7vw, 82px);
  font-weight: 500;
  line-height: 0.98;
  letter-spacing: -0.035em;
}

.hero-content h1 span {
  display: block;
  color: var(--color-accent);
  font-style: italic;
}

.hero-content p {
  max-width: 570px;
  margin: 0;
  color: var(--color-text-secondary);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.8;
}


/* =========================================================
   CONTACT SECTION
   ========================================================= */

.contact-section {
  padding: var(--space-4xl) 0;
}

.contact-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: clamp(48px, 8vw, 100px);
  align-items: start;
}

.contact-info {
  padding-top: var(--space-lg);
}

.contact-info h2 {
  margin: var(--space-lg) 0;
  color: var(--color-text-dark);
  font-family: var(--font-heading);
  font-size: clamp(40px, 5vw, 60px);
  font-weight: 500;
  line-height: 1.03;
  letter-spacing: -0.025em;
}

.contact-info h2 span {
  display: block;
  color: var(--color-brand-navy);
  font-style: italic;
}

.intro {
  max-width: 500px;
  margin-bottom: var(--space-2xl);
  color: var(--color-text-dark-secondary);
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.85;
}


/* =========================================================
   CONTACT DETAILS
   ========================================================= */

.details {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.detail-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.detail-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 46px;
  height: 46px;
  border: 1px solid var(--color-border-light);
  border-radius: 50%;
  color: var(--color-accent-dark);
  font-family: var(--font-heading);
  font-size: 17px;
}

.detail-item small {
  display: block;
  margin-bottom: var(--space-xs);
  color: var(--color-text-dark-muted);
  font-family: var(--font-body);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.16em;
}

.detail-item a,
.detail-text {
  color: var(--color-text-dark);
  font-family: var(--font-body);
  font-size: 14px;
  text-decoration: none;
}

.detail-item a:hover {
  color: var(--color-accent-dark);
}

.social-note {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-top: var(--space-3xl);
}

.note-line {
  width: 40px;
  height: 1px;
  flex: 0 0 auto;
  background: var(--color-accent);
}

.social-note p {
  max-width: 300px;
  margin: 0;
  color: var(--color-text-dark-muted);
  font-family: var(--font-heading);
  font-size: 14px;
  font-style: italic;
  line-height: 1.5;
}


/* =========================================================
   FORM CARD
   ========================================================= */

.form-card {
  padding: clamp(28px, 4vw, 48px);
  background: var(--color-surface-light);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}

.form-label {
  color: var(--color-accent-dark);
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.18em;
}

.form-header h3 {
  margin: var(--space-md) 0 var(--space-xl);
  color: var(--color-text-dark);
  font-family: var(--font-heading);
  font-size: 34px;
  font-weight: 500;
  line-height: 1.1;
}

.form-header h3 span {
  color: var(--color-brand-navy);
  font-style: italic;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
}

.field label {
  color: var(--color-text-dark);
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
}

.field input,
.field select,
.field textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  outline: none;
  background: var(--color-bg-off-white);
  color: var(--color-text-dark);
  font-family: var(--font-body);
  font-size: 13px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.field input,
.field select {
  height: 48px;
  padding: 0 var(--space-md);
}

.field textarea {
  min-height: 145px;
  padding: var(--space-md);
  resize: vertical;
  line-height: 1.6;
}

.field input::placeholder,
.field textarea::placeholder {
  color: var(--color-text-dark-muted);
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-gold);
}

.submit-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 52px;
  margin-top: var(--space-sm);
  padding: 0 var(--space-lg);
  border: 0;
  border-radius: var(--radius-md);
  cursor: pointer;
  background: var(--color-button-primary);
  color: var(--color-button-primary-text);
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: background 0.25s ease;
}

.submit-button:hover {
  background: var(--color-button-primary-hover);
}

.submit-arrow {
  font-size: 18px;
}

.success-message {
  margin: var(--space-md) 0 0;
  color: var(--color-brand-navy);
  font-family: var(--font-body);
  font-size: 13px;
  line-height: 1.5;
}


/* =========================================================
   CUSTOM ORDERS
   ========================================================= */

.custom-section {
  padding: var(--space-4xl) 0;
  background: var(--color-bg-primary);
}

.custom-grid {
  display: grid;
  grid-template-columns: 1fr 0.7fr;
  align-items: center;
  gap: var(--space-3xl);
}

.custom-content h2 {
  margin: var(--space-lg) 0;
  color: var(--color-text-primary);
  font-family: var(--font-heading);
  font-size: clamp(44px, 5vw, 64px);
  font-weight: 500;
  line-height: 1;
}

.custom-content h2 span {
  display: block;
  color: var(--color-accent);
  font-style: italic;
}

.custom-content p {
  max-width: 520px;
  margin-bottom: var(--space-xl);
  color: var(--color-text-secondary);
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.85;
}

.custom-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-md);
  min-height: 48px;
  padding: 0 var(--space-lg);
  border: 1px solid var(--color-border-dark);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.25s ease;
}

.custom-button span {
  color: var(--color-accent);
  font-size: 16px;
}

.custom-button:hover {
  background: var(--color-button-primary);
  border-color: var(--color-button-primary);
  color: var(--color-button-primary-text);
}

.custom-button:hover span {
  color: var(--color-button-primary-text);
}


/* =========================================================
   DECORATION
   ========================================================= */

.custom-decoration {
  position: relative;
  width: min(340px, 100%);
  aspect-ratio: 1;
  margin: 0 auto;
}

.decoration-ring {
  position: absolute;
  inset: 10%;
  border: 1px solid var(--color-border-dark);
  border-radius: 50%;
}

.ring-two {
  inset: 20%;
  border-color: var(--color-accent);
}

.ring-three {
  inset: 30%;
  border-color: var(--color-border-dark-soft);
}

.decoration-center {
  position: absolute;
  inset: 38%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border-dark);
  border-radius: 50%;
  background: var(--color-surface-dark);
  box-shadow: var(--shadow-gold);
}

.decoration-center span {
  color: var(--color-accent);
  font-family: var(--font-heading);
  font-size: 42px;
  font-style: italic;
}

.decoration-center small {
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: 7px;
  letter-spacing: 0.2em;
}


/* =========================================================
   FINAL
   ========================================================= */

.final-section {
  padding: var(--space-4xl) 0;
  background: var(--color-bg-dark);
}

.final-content {
  text-align: center;
}

.final-content .eyebrow {
  justify-content: center;
}

.final-content h2 {
  margin: var(--space-lg) auto;
  color: var(--color-text-primary);
  font-family: var(--font-heading);
  font-size: clamp(42px, 6vw, 72px);
  font-weight: 500;
  line-height: 1;
}

.final-content h2 span {
  display: block;
  color: var(--color-accent);
  font-style: italic;
}

.final-content p {
  margin: 0;
  color: var(--color-text-secondary);
  font-family: var(--font-body);
  font-size: 15px;
}


/* =========================================================
   TABLET
   ========================================================= */

@media (max-width: 900px) {
  .section-container,
  .hero-content {
    width: min(100% - 40px, 720px);
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: var(--space-3xl);
  }

  .contact-info {
    max-width: 650px;
  }

  .custom-grid {
    grid-template-columns: 1fr;
  }

  .custom-decoration {
    width: 280px;
  }
}


/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 600px) {
  .section-container,
  .hero-content {
    width: calc(100% - 32px);
  }

  .contact-hero {
    min-height: 470px;
  }

  .hero-content {
    padding: var(--space-3xl) 0;
  }

  .hero-content h1 {
    margin: var(--space-md) 0;
    font-size: clamp(42px, 13vw, 56px);
  }

  .hero-content p {
    font-size: 14px;
    line-height: 1.7;
  }

  .contact-section,
  .custom-section,
  .final-section {
    padding: var(--space-3xl) 0;
  }

  .contact-info h2 {
    font-size: 42px;
  }

  .intro {
    font-size: 14px;
    line-height: 1.75;
  }

  .form-card {
    padding: var(--space-lg);
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .form-header h3 {
    font-size: 30px;
  }

  .field input,
  .field select {
    height: 46px;
  }

  .field textarea {
    min-height: 130px;
  }

  .custom-content h2 {
    font-size: 44px;
  }

  .custom-content p {
    font-size: 14px;
  }

  .custom-button {
    width: 100%;
    justify-content: center;
    box-sizing: border-box;
  }

  .custom-decoration {
    width: 230px;
  }

  .final-content h2 {
    font-size: 44px;
  }

  .final-content p {
    font-size: 14px;
    line-height: 1.7;
  }
}
</style>
```
