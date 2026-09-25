```vue
<script setup>
import { ref, reactive, computed } from 'vue'
import contactVideo from '../assets/Contact.mp4'

/* =========================================================
   CONTACT DETAILS (fill these in)

   whatsapp  -> number with country code, e.g. '923001234567'
   email     -> e.g. 'hello@royalresinart.com'
   instagram -> handle or full URL, e.g. 'royalresinart'
   location  -> e.g. 'Multan, Pakistan'

   Empty values are not rendered.
   ========================================================= */

const contactInfo = {
  whatsapp: '',
  email: '',
  instagram: '',
  location: ''
}

/* =========================================================
   SELECT OPTIONS
   ========================================================= */

const interests = [
  'General enquiry',
  'Custom order',
  'Wall Clock',
  'Quran Rehal',
  'Resin Earrings',
  'Resin Jhumka',
  'Resin Locket',
  'Resin Ring',
  'Resin Coasters',
  'Resin Pen',
  'Heart Frame',
  'Trinkets Tray',
  'Resin Bookmark',
  'Nikkah Tray',
  'Resin Keyrings',
  'Customized Pen',
  'Resin Tray',
  'Resin Preservation',
  'Jewellery Box',
  'Photo Frame',
  'Pen Holder',
  'Serving Tray'
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
    href: whatsappNumber
      ? `https://wa.me/${whatsappNumber}`
      : '',
    external: true,
    icon: [
      'M4 20l1.3-4.2A8 8 0 1 1 8.4 19z',
      'M9.5 9c.3 2.4 2.6 4.7 5 5l1.2-1.3-1.9-1-.9.7c-.8-.4-1.5-1.1-1.9-1.9l.7-.9-1-1.9z'
    ]
  },
  {
    id: 'email',
    label: 'Email',
    value: contactInfo.email,
    href: contactInfo.email
      ? `mailto:${contactInfo.email}`
      : '',
    external: false,
    icon: [
      'M3 6h18v12H3z',
      'm3 7 9 6 9-6'
    ]
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: instagramHandle
      ? `@${instagramHandle}`
      : '',
    href: instagramHandle
      ? `https://instagram.com/${instagramHandle}`
      : '',
    external: true,
    icon: [
      'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z',
      'M12 8a4 4 0 1 0 0 8 4 4 0 0 0-0-8z',
      'M17.2 6.8h.01'
    ]
  },
  {
    id: 'location',
    label: 'Location',
    value: contactInfo.location,
    href: contactInfo.location
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          contactInfo.location
        )}`
      : '',
    external: true,
    icon: [
      'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.800 12 21 12 21z',
      'M12 7.500a2.500 2.500 0 1 0 0 5 2.500 2.500 0 0 0 0-5z'
    ]
  }
].filter((row) => row.value)

const hasWhatsapp = Boolean(whatsappNumber)

/* =========================================================
   FORM STATE
   ========================================================= */

const form = reactive({
  name: '',
  email: '',
  phone: '',
  interest: interests[0],
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  message: ''
})

const nameField = ref(null)
const emailField = ref(null)
const messageField = ref(null)

const isSending = ref(false)
const isSent = ref(false)
const submitError = ref('')

/* =========================================================
   VALIDATION
   ========================================================= */

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validate = () => {
  errors.name = form.name.trim()
    ? ''
    : 'Please enter your name.'

  if (!form.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!emailPattern.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  } else {
    errors.email = ''
  }

  errors.message = form.message.trim()
    ? ''
    : 'Please write a short message.'

  if (errors.name) return nameField.value
  if (errors.email) return emailField.value
  if (errors.message) return messageField.value

  return null
}

/* =========================================================
   WHATSAPP (pre-filled message from the form)
   ========================================================= */

const whatsappFormLink = computed(() => {
  if (!hasWhatsapp) return ''

  const lines = [
    'Hello Royal Resin Art!',
    form.name.trim()
      ? `Name: ${form.name.trim()}`
      : '',
    `Interested in: ${form.interest}`,
    form.message.trim()
      ? `Message: ${form.message.trim()}`
      : ''
  ].filter(Boolean)

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    lines.join('\n')
  )}`
})

/* =========================================================
   SUBMIT
   ========================================================= */

const sendMessage = async () => {
  isSending.value = true
  submitError.value = ''

  try {
    /* ---------------------------------------------------
       ADD YOUR ENDPOINT HERE

       Example:

       const response = await fetch('https://formspree.io/f/YOUR_ID', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           Accept: 'application/json'
         },
         body: JSON.stringify({
           name: form.name,
           email: form.email,
           phone: form.phone,
           interest: form.interest,
           message: form.message
         })
       })

       if (!response.ok) {
         throw new Error('Request failed')
       }
       --------------------------------------------------- */

    // Temporary simulation only.
    // Replace this with your real endpoint.
    await new Promise((resolve) => setTimeout(resolve, 800))

    isSent.value = true
  } catch (error) {
    submitError.value =
      'Something went wrong. Please try again' +
      (hasWhatsapp
        ? ' or message us on WhatsApp.'
        : '.')
  } finally {
    isSending.value = false
  }
}

const onSubmit = async () => {
  if (isSending.value) return

  const firstInvalid = validate()

  if (firstInvalid) {
    firstInvalid.focus()
    return
  }

  await sendMessage()
}

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.phone = ''
  form.interest = interests[0]
  form.message = ''

  errors.name = ''
  errors.email = ''
  errors.message = ''

  submitError.value = ''
  isSent.value = false
}
</script>

<template>
  <section
    id="contact"
    class="contact-section"
    aria-labelledby="contact-title"
  >
    <div class="contact-inner">

      <!-- =====================================================
           LEFT: INFO
           ===================================================== -->

      <div class="contact-info">

        <p class="eyebrow">
          CONTACT
        </p>

        <h2
          id="contact-title"
          class="contact-title"
        >
          Let's Create

          <span>
            Something Unique
          </span>
        </h2>

        <p class="contact-intro">
          Ask about a product, request a custom design, or place an order.
          Send us a message and we'll get back to you soon.
        </p>

        <!-- =====================================================
             LANDSCAPE VIDEO
             ===================================================== -->

        <div class="contact-video">
          <video
            :src="contactVideo"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
            aria-label="Royal Resin Art showcase video"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        <ul
          v-if="contactRows.length"
          class="contact-rows"
        >
          <li
            v-for="row in contactRows"
            :key="row.id"
            class="contact-row"
          >
            <span
              class="contact-icon"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24">
                <path
                  v-for="(d, index) in row.icon"
                  :key="index"
                  :d="d"
                />
              </svg>
            </span>

            <div class="contact-row-text">
              <span class="contact-label">
                {{ row.label }}
              </span>

              <a
                :href="row.href"
                class="contact-value"
                :target="row.external ? '_blank' : null"
                :rel="row.external ? 'noopener noreferrer' : null"
              >
                {{ row.value }}
              </a>
            </div>
          </li>
        </ul>

        <a
          v-if="hasWhatsapp"
          :href="`https://wa.me/${whatsappNumber}`"
          class="button-secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 19z" />
            <path d="M9.5 9c.3 2.4 2.6 4.7 5 5l1.2-1.3-1.9-1-.9.7c-.8-.4-1.5-1.1-1.9-1.9l.7-.9-1-1.9z" />
          </svg>

          Chat on WhatsApp
        </a>

      </div>

      <!-- =====================================================
           RIGHT: FORM PANEL
           ===================================================== -->

      <div class="form-panel">

        <!-- SUCCESS STATE -->

        <div
          v-if="isSent"
          class="form-success"
          role="status"
        >
          <span
            class="success-icon"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24">
              <path d="M5 12.500l4.500 4.500L19 7.500" />
            </svg>
          </span>

          <h3>
            Thank you
          </h3>

          <p>
            Thank you, we'll get back to you soon.
          </p>

          <button
            type="button"
            class="button-secondary"
            @click="resetForm"
          >
            Send another message
          </button>
        </div>

        <!-- FORM -->

        <form
          v-else
          class="contact-form"
          novalidate
          @submit.prevent="onSubmit"
        >

          <div class="field-row">

            <!-- NAME -->

            <div class="field">
              <label for="contact-name">
                Name
                <span
                  class="required"
                  aria-hidden="true"
                >*</span>
              </label>

              <input
                id="contact-name"
                ref="nameField"
                v-model="form.name"
                type="text"
                name="name"
                autocomplete="name"
                placeholder="Your name"
                required
                :class="{ 'has-error': errors.name }"
                :aria-invalid="errors.name ? 'true' : 'false'"
                :aria-describedby="
                  errors.name
                    ? 'contact-name-error'
                    : null
                "
              />

              <p
                v-if="errors.name"
                id="contact-name-error"
                class="field-error"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 4 2.500 20h19z" />
                  <path d="M12 10v4M12 17h.01" />
                </svg>

                {{ errors.name }}
              </p>
            </div>

            <!-- EMAIL -->

            <div class="field">
              <label for="contact-email">
                Email
                <span
                  class="required"
                  aria-hidden="true"
                >*</span>
              </label>

              <input
                id="contact-email"
                ref="emailField"
                v-model="form.email"
                type="email"
                name="email"
                autocomplete="email"
                inputmode="email"
                placeholder="you@example.com"
                required
                :class="{ 'has-error': errors.email }"
                :aria-invalid="errors.email ? 'true' : 'false'"
                :aria-describedby="
                  errors.email
                    ? 'contact-email-error'
                    : null
                "
              />

              <p
                v-if="errors.email"
                id="contact-email-error"
                class="field-error"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 4 2.500 20h19z" />
                  <path d="M12 10v4M12 17h.01" />
                </svg>

                {{ errors.email }}
              </p>
            </div>

          </div>

          <!-- PHONE -->

          <div class="field">
            <label for="contact-phone">
              Phone / WhatsApp
              <span class="optional">(optional)</span>
            </label>

            <input
              id="contact-phone"
              v-model="form.phone"
              type="tel"
              name="phone"
              autocomplete="tel"
              inputmode="tel"
              placeholder="+92 300 1234567"
            />
          </div>

          <!-- INTEREST -->

          <div class="field">
            <label for="contact-interest">
              I'm interested in
            </label>

            <div class="select-wrap">
              <select
                id="contact-interest"
                v-model="form.interest"
                name="interest"
              >
                <option
                  v-for="option in interests"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>

              <svg
                class="select-chevron"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>

          <!-- MESSAGE -->

          <div class="field">
            <label for="contact-message">
              Message
              <span
                class="required"
                aria-hidden="true"
              >*</span>
            </label>

            <textarea
              id="contact-message"
              ref="messageField"
              v-model="form.message"
              name="message"
              rows="5"
              placeholder="Tell us what you have in mind: sizes, colours, names or designs."
              required
              :class="{ 'has-error': errors.message }"
              :aria-invalid="errors.message ? 'true' : 'false'"
              :aria-describedby="
                errors.message
                  ? 'contact-message-error'
                  : null
              "
            ></textarea>

            <p
              v-if="errors.message"
              id="contact-message-error"
              class="field-error"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 4 2.500 20h19z" />
                <path d="M12 10v4M12 17h.01" />
              </svg>

              {{ errors.message }}
            </p>
          </div>

          <!-- SUBMIT ERROR -->

          <p
            v-if="submitError"
            class="field-error submit-error"
            role="alert"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 4 2.500 20h19z" />
              <path d="M12 10v4M12 17h.01" />
            </svg>

            {{ submitError }}
          </p>

          <!-- ACTIONS -->

          <button
            type="submit"
            class="button-primary"
            :disabled="isSending"
            :aria-busy="isSending"
          >
            <span
              v-if="isSending"
              class="spinner"
              aria-hidden="true"
            ></span>

            {{ isSending ? 'Sending...' : 'Send Message' }}
          </button>

          <a
            v-if="hasWhatsapp"
            :href="whatsappFormLink"
            class="whatsapp-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Or send this on WhatsApp
          </a>

          <p class="form-note">
            <span aria-hidden="true">*</span>
            Required fields
          </p>

        </form>

      </div>

    </div>
  </section>
</template>

<style scoped>

/* =========================================================
   SECTION
   ========================================================= */

.contact-section {
  padding:
    var(--space-4xl)
    0;

  background:
    var(--color-bg-dark);

  color:
    var(--color-text-primary);

  scroll-margin-top:
    80px;
}

.contact-inner {
  width:
    min(
      1240px,
      calc(100% - var(--space-4xl))
    );
  margin:
    0 auto;
  display:
    grid;
  grid-template-columns:
    minmax(0, 1fr)
    minmax(0, 1fr);
  align-items:
    start;
  gap:
    var(--space-3xl);
}

/* =========================================================
   LEFT: INFO
   ========================================================= */

.eyebrow {
  margin:
    0
    0
    var(--space-md);

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
}

.contact-title {
  margin:
    0;

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

  font-weight:
    500;

  line-height:
    1.1;

  letter-spacing:
    -1.2px;
}

.contact-title span {
  display:
    block;
}

.contact-intro {
  max-width:
    440px;

  margin:
    var(--space-lg)
    0
    var(--space-xl);

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
   LANDSCAPE VIDEO
   ========================================================= */

.contact-video {
  width:
    100%;
  max-width:
    none;
  aspect-ratio:
    16 / 9;
  margin:
    0 0 var(--space-xl);
  overflow:
    hidden;
  border:
    1px solid var(--color-border-dark-soft);
  border-radius:
    var(--radius-lg);
  background:
    var(--color-bg-dark);
  box-shadow:
    var(--shadow-card);
}

.contact-video video {
  display:
    block;

  width:
    100%;

  height:
    100%;

  object-fit:
    cover;
}

/* =========================================================
   CONTACT ROWS
   ========================================================= */

.contact-rows {
  display:
    grid;

  gap:
    var(--space-lg);

  margin:
    0
    0
    var(--space-xl);

  padding:
    0;

  list-style:
    none;
}

.contact-row {
  display:
    flex;

  align-items:
    center;

  gap:
    var(--space-md);
}

.contact-icon {
  flex-shrink:
    0;

  width:
    48px;

  height:
    48px;

  display:
    grid;

  place-items:
    center;

  border:
    1px solid
    var(--color-border-dark);

  border-radius:
    50%;

  color:
    var(--color-icon-primary);
}

.contact-icon svg {
  width:
    20px;

  height:
    20px;

  fill:
    none;

  stroke:
    currentColor;

  stroke-width:
    1.3;

  stroke-linecap:
    round;

  stroke-linejoin:
    round;
}

.contact-row-text {
  display:
    flex;

  flex-direction:
    column;

  gap:
    var(--space-xs);

  min-width:
    0;
}

.contact-label {
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

.contact-value {
  color:
    var(--color-text-primary);

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

.contact-value:hover {
  color:
    var(--color-accent-light);
}

.contact-value:focus-visible {
  outline:
    2px solid
    var(--color-accent-light);

  outline-offset:
    3px;

  border-radius:
    var(--radius-sm);
}

/* =========================================================
   BUTTONS
   ========================================================= */

.button-primary,
.button-secondary {
  display:
    inline-flex;

  align-items:
    center;

  justify-content:
    center;

  gap:
    var(--space-sm);

  min-height:
    48px;

  padding:
    0
    var(--space-lg);

  border-radius:
    var(--radius-sm);

  font-family:
    var(--font-body);

  font-size:
    13px;

  font-weight:
    600;

  letter-spacing:
    0.5px;

  text-decoration:
    none;

  cursor:
    pointer;

  transition:
    transform 0.3s ease,
    background 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
}

.button-primary {
  background:
    var(--color-button-primary);

  border:
    1px solid
    var(--color-button-primary);

  box-shadow:
    var(--shadow-gold);

  color:
    var(--color-button-primary-text);
}

.button-primary:hover:not(:disabled) {
  background:
    var(--color-button-primary-hover);

  border-color:
    var(--color-button-primary-hover);

  transform:
    translateY(-2px);
}

.button-primary:disabled {
  cursor:
    progress;

  background:
    var(--color-accent-dark);

  border-color:
    var(--color-accent-dark);
}

.button-secondary {
  background:
    transparent;

  border:
    1px solid
    var(--color-border-dark);

  color:
    var(--color-accent);
}

.button-secondary:hover {
  border-color:
    var(--color-accent);
}

.button-secondary svg {
  width:
    18px;

  height:
    18px;

  fill:
    none;

  stroke:
    currentColor;

  stroke-width:
    1.6;

  stroke-linecap:
    round;

  stroke-linejoin:
    round;
}

.button-primary:focus-visible,
.button-secondary:focus-visible {
  outline:
    2px solid
    var(--color-accent-light);

  outline-offset:
    3px;
}

/* =========================================================
   SPINNER
   ========================================================= */

.spinner {
  width:
    16px;

  height:
    16px;

  border:
    2px solid
    currentColor;

  border-top-color:
    transparent;

  border-radius:
    50%;

  animation:
    spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform:
      rotate(360deg);
  }
}

/* =========================================================
   FORM PANEL
   ========================================================= */

.form-panel {
  width: 100%;
  box-sizing: border-box;
  padding:
    var(--space-xl);
  background:
    var(--color-surface-dark);
  border:
    1px solid var(--color-border-dark-soft);
  border-radius:
    var(--radius-lg);
  box-shadow:
    var(--shadow-card);
}
.contact-form {
  display: grid;
  gap: var(--space-mid);
}

.field-row {
  display: grid;
  grid-template-columns:
    repeat(2, minmax(0, 1fr));
  gap: var(--space-sm);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  min-width: 0;
}

.field label {
  color:
    var(--color-text-primary);

  font-family:
    var(--font-body);

  font-size:
    13px;

  font-weight:
    500;
}

/* =========================================================
   INPUTS
   ========================================================= */

.required {
  margin-left:
    var(--space-xs);

  color:
    var(--color-accent);
}

.optional {
  margin-left:
    var(--space-xs);

  color:
    var(--color-text-muted);

  font-weight:
    400;
}

.field input,
.field select,
.field textarea {
  width:
    100%;

  min-height:
    48px;

  padding:
    0
    var(--space-md);

  background:
    var(--color-bg-dark);

  border:
    1px solid
    var(--color-border-dark-soft);

  border-radius:
    var(--radius-md);

  color:
    var(--color-text-primary);

  font-family:
    var(--font-body);

  font-size:
    15px;

  box-sizing:
    border-box;

  transition:
    border-color 0.3s ease;
}

.field textarea {
  min-height:
    140px;

  padding:
    var(--space-md);

  line-height:
    1.6;

  resize:
    vertical;
}

.field input::placeholder,
.field textarea::placeholder {
  color:
    var(--color-text-muted);
}

.field input:focus-visible,
.field select:focus-visible,
.field textarea:focus-visible {
  border-color:
    var(--color-accent);

  outline:
    2px solid
    var(--color-accent-light);

  outline-offset:
    2px;
}

.field input.has-error,
.field textarea.has-error {
  border-color:
    var(--color-accent);
}

/* =========================================================
   SELECT
   ========================================================= */

.select-wrap {
  position:
    relative;
}

.field select {
  appearance:
    none;

  -webkit-appearance:
    none;

  padding-right:
    var(--space-2xl);

  cursor:
    pointer;
}

.select-chevron {
  position:
    absolute;

  top:
    50%;

  right:
    var(--space-md);

  width:
    18px;

  height:
    18px;

  fill:
    none;

  stroke:
    var(--color-accent);

  stroke-width:
    1.6;

  stroke-linecap:
    round;

  stroke-linejoin:
    round;

  transform:
    translateY(-50%);

  pointer-events:
    none;
}

/* =========================================================
   ERRORS
   ========================================================= */

.field-error {
  display:
    flex;

  align-items:
    center;

  gap:
    var(--space-sm);

  margin:
    0;

  color:
    var(--color-accent-light);

  font-family:
    var(--font-body);

  font-size:
    13px;

  line-height:
    1.5;
}

.field-error svg {
  flex-shrink:
    0;

  width:
    16px;

  height:
    16px;

  fill:
    none;

  stroke:
    currentColor;

  stroke-width:
    1.6;

  stroke-linecap:
    round;

  stroke-linejoin:
    round;
}

.submit-error {
  padding:
    var(--space-md);

  border:
    1px solid
    var(--color-accent);

  border-radius:
    var(--radius-md);
}

/* =========================================================
   SUBMIT AREA
   ========================================================= */

.contact-form .button-primary {
  width:
    100%;
}

.whatsapp-link {
  justify-self:
    center;

  color:
    var(--color-accent);

  font-family:
    var(--font-body);

  font-size:
    13px;

  text-decoration:
    underline;

  text-underline-offset:
    4px;

  transition:
    color 0.3s ease;
}

.whatsapp-link:hover {
  color:
    var(--color-accent-light);
}

.whatsapp-link:focus-visible {
  outline:
    2px solid
    var(--color-accent-light);

  outline-offset:
    4px;

  border-radius:
    var(--radius-sm);
}

.form-note {
  margin:
    0;

  color:
    var(--color-text-muted);

  font-family:
    var(--font-body);

  font-size:
    12px;

  text-align:
    center;
}

/* =========================================================
   SUCCESS STATE
   ========================================================= */

.form-success {
  display:
    flex;

  flex-direction:
    column;

  align-items:
    center;

  gap:
    var(--space-md);

  padding:
    var(--space-2xl)
    var(--space-md);

  text-align:
    center;
}

.success-icon {
  width:
    64px;

  height:
    64px;

  display:
    grid;

  place-items:
    center;

  border:
    1px solid
    var(--color-border-dark);

  border-radius:
    50%;

  color:
    var(--color-icon-primary);
}

.success-icon svg {
  width:
    28px;

  height:
    28px;

  fill:
    none;

  stroke:
    currentColor;

  stroke-width:
    1.6;

  stroke-linecap:
    round;

  stroke-linejoin:
    round;
}

.form-success h3 {
  margin:
    0;

  color:
    var(--color-text-primary);

  font-family:
    var(--font-heading);

  font-size:
    28px;

  font-weight:
    500;

  line-height:
    1.2;
}

.form-success p {
  margin:
    0
    0
    var(--space-md);

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
   TABLET
   ========================================================= */

@media (max-width: 1000px) {
  .contact-inner {
    grid-template-columns:
      minmax(0, 1fr);

    gap:
      var(--space-2xl);
  }

  .contact-intro {
    max-width:
      560px;
  }

  .contact-video {
    max-width:
      680px;
  }
}

/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 768px) {
  .contact-section {
    padding:
      var(--space-3xl)
      0;
  }

  .contact-inner {
    width:
      calc(
        100% - var(--space-2xl)
      );

    gap:
      var(--space-xl);
  }

  .contact-video {
    max-width:
      none;
  }
}

/* =========================================================
   SMALL MOBILE
   ========================================================= */

@media (max-width: 560px) {
  .form-panel {
    padding:
      var(--space-lg)
      var(--space-md);
  }

  .field-row {
    grid-template-columns:
      minmax(0, 1fr);
  }

  .contact-info .button-secondary {
    width:
      100%;
  }

  .contact-video {
    border-radius:
      var(--radius-md);
  }
}

/* =========================================================
   REDUCED MOTION
   ========================================================= */

@media (prefers-reduced-motion: reduce) {
  .contact-value,
  .button-primary,
  .button-secondary,
  .field input,
  .field select,
  .field textarea,
  .whatsapp-link {
    transition:
      none;
  }

  .button-primary:hover:not(:disabled) {
    transform:
      none;
  }

  .spinner {
    animation:
      none;
  }
}

</style>
```
