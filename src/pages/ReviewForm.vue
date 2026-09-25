<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { supabase } from '../supabase'

const name = ref('')
const rating = ref(0)
const review = ref('')

const isSubmitting = ref(false)
const submitted = ref(false)
const errorMessage = ref('')

const reviews = ref([])
const reviewsLoading = ref(true)

const setRating = (value) => {
  rating.value = value
}

const fetchReviews = async () => {
  reviewsLoading.value = true

  const { data, error } = await supabase
    .from('reviews')
    .select('id, name, rating, review, created_at')
    .eq('approved', true)
    .order('created_at', { ascending: false })

  console.log('Reviews data:', data)
  console.log('Reviews error:', error)

  if (error) {
    console.error('Error fetching reviews:', error)
    reviews.value = []
  } else {
    reviews.value = data || []
  }

  reviewsLoading.value = false
}

const submitReview = async () => {
  errorMessage.value = ''
  submitted.value = false

  if (!name.value.trim()) {
    errorMessage.value = 'Please enter your name.'
    return
  }

  if (rating.value === 0) {
    errorMessage.value = 'Please select a rating.'
    return
  }

  if (!review.value.trim()) {
    errorMessage.value = 'Please write your review.'
    return
  }

  if (review.value.trim().length < 10) {
    errorMessage.value =
      'Please write a little more about your experience.'
    return
  }

  isSubmitting.value = true

  const { error } = await supabase
    .from('reviews')
    .insert({
      name: name.value.trim(),
      rating: rating.value,
      review: review.value.trim(),
      approved: false,
    })

  isSubmitting.value = false

  if (error) {
    console.error('Review submission error:', error)
    errorMessage.value =
      'Something went wrong. Please try again.'
    return
  }

  submitted.value = true

  name.value = ''
  rating.value = 0
  review.value = ''
}

let reviewChannel = null

onMounted(async () => {
  await fetchReviews()

  reviewChannel = supabase
    .channel('reviews-realtime')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'reviews',
      },
      () => {
        fetchReviews()
      }
    )
    .subscribe()
})

onUnmounted(() => {
  if (reviewChannel) {
    supabase.removeChannel(reviewChannel)
  }
})
</script>

<template>
  <section class="review-section">
    <div class="review-container">

      <!-- INTRO -->
      <div class="review-intro">
        <span class="eyebrow">SHARE YOUR EXPERIENCE</span>

        <h2>
          We'd Love to Hear
          <span>Your Story.</span>
        </h2>

        <p>
          Your experience means a lot to us. Share your thoughts
          and let others discover the beauty of handmade resin art.
        </p>
      </div>

      <!-- FORM -->
      <form
        class="review-form"
        @submit.prevent="submitReview"
      >
        <!-- NAME -->
        <div class="form-group">
          <label for="review-name">
            Your Name
          </label>

          <input
            id="review-name"
            v-model="name"
            type="text"
            placeholder="Enter your name"
            maxlength="80"
            autocomplete="name"
          />
        </div>

        <!-- RATING -->
        <div class="form-group">
          <label>Your Rating</label>

          <div
            class="stars"
            role="radiogroup"
            aria-label="Choose your rating"
          >
            <button
              v-for="star in 5"
              :key="star"
              type="button"
              class="star"
              :class="{ active: star <= rating }"
              :aria-label="`${star} star${star > 1 ? 's' : ''}`"
              :aria-checked="star === rating"
              role="radio"
              @click="setRating(star)"
            >
              ★
            </button>
          </div>
        </div>

        <!-- REVIEW -->
        <div class="form-group">
          <label for="review-message">
            Your Review
          </label>

          <textarea
            id="review-message"
            v-model="review"
            rows="5"
            placeholder="Tell us about your experience..."
            maxlength="500"
          ></textarea>

          <span class="character-count">
            {{ review.length }}/500
          </span>
        </div>

        <!-- ERROR -->
        <p
          v-if="errorMessage"
          class="message error"
        >
          {{ errorMessage }}
        </p>

        <!-- SUCCESS -->
        <div
          v-if="submitted"
          class="message success"
        >
          <span class="success-icon">✓</span>

          <div>
            <strong>
              Thank you for your review!
            </strong>

            <p>
              Your review has been submitted and will appear
              after approval.
            </p>
          </div>
        </div>

        <!-- SUBMIT -->
        <button
          type="submit"
          class="submit-button"
          :disabled="isSubmitting"
        >
          <span v-if="!isSubmitting">
            Submit Review
          </span>

          <span v-else>
            Submitting...
          </span>
        </button>
      </form>
    </div>

    <!-- APPROVED REVIEWS -->
    <div class="reviews-display">

      <div class="reviews-heading">
        <span class="eyebrow">
          CUSTOMER LOVE
        </span>

        <h2>
          What Our Customers
          <span>Say.</span>
        </h2>

        <p>
          Real experiences from customers who chose
          Royal Resin Studio.
        </p>
      </div>

      <!-- LOADING -->
      <div
        v-if="reviewsLoading"
        class="reviews-loading"
      >
        Loading reviews...
      </div>

      <!-- REVIEWS -->
      <div
        v-else-if="reviews.length"
        class="reviews-grid"
      >
        <article
          v-for="item in reviews"
          :key="item.id"
          class="review-card"
        >
          <!-- STARS -->
          <div class="review-stars">
            <span
              v-for="star in 5"
              :key="star"
              :class="{ filled: star <= item.rating }"
            >
              ★
            </span>
          </div>

          <!-- REVIEW -->
          <p class="review-text">
            “{{ item.review }}”
          </p>

          <!-- CUSTOMER -->
          <div class="review-author">
            <div class="author-avatar">
              {{ item.name.charAt(0).toUpperCase() }}
            </div>

            <div>
              <strong>
                {{ item.name }}
              </strong>

              <span>
                Customer
              </span>
            </div>
          </div>
        </article>
      </div>

      <!-- NO REVIEWS -->
      <div
        v-else
        class="no-reviews"
      >
        <p>
          Be the first to share your experience.
        </p>
      </div>

    </div>
  </section>
</template>

<style scoped>
.review-section {
  width: 100%;
  box-sizing: border-box;
  padding: var(--space-4xl) var(--space-lg);
  background: var(--color-brand-navy-deep);
  overflow-x: hidden;
}

.review-container {
  width: min(1100px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: var(--space-4xl);
  align-items: start;
  box-sizing: border-box;
}

/* INTRO */

.review-intro {
  padding-top: var(--space-lg);
  
}

.eyebrow {
  display: inline-block;
  margin-bottom: var(--space-md);

  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.18em;

  color: var(--color-accent);
}

.review-intro h2 {
  margin: 0;

  font-family: var(--font-heading);
  font-size: clamp(36px, 4vw, 56px);
  line-height: 1.08;
  font-weight: 500;

  color:var(--color-brand-gold-dark);
}

.review-intro h2 span {
  display: block;
  color: var(--color-accent-dark);
}

.review-intro p {
  max-width: 440px;
  margin: var(--space-lg) 0 0;

  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.8;

  color: var(--color-text-dark-secondary);
}

/* FORM */

.review-form {
  position: relative;
  width: 100%;
  box-sizing: border-box;

  padding: var(--space-2xl);

  background: var(--color-brand-navy-light);

  /* border: 1px solid var(--color-border-light); */
  border-radius: var(--radius-lg);

  box-shadow: var(--shadow-card);
}

.form-group {
  position: relative;
  margin-bottom: var(--space-lg);
}

.form-group label {
  display: block;
  margin-bottom: var(--space-sm);

  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;

 color:var(--color-brand-gold-dark);
}

input,
textarea {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  padding: 14px 16px;

  font-family: var(--font-body);
  font-size: 14px;

  color: var(--color-text-dark);
  background: var(--color-brand-navy-light);

  border: 1px solid var(--color-text-muted);
  border-radius: var(--radius-md);

  outline: none;

  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

input {
  height: 50px;
}

textarea {
  min-height: 135px;
  resize: vertical;
}

input::placeholder,
textarea::placeholder {
  color: var(--color-text-dark-muted);
}

input:focus,
textarea:focus {
  border-color: var(--color-accent);

  box-shadow:
    0 0 0 3px rgba(212, 166, 74, 0.10);
}

/* STARS */

.stars {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.star {
  padding: 0;

  background: transparent;
  border: 0;

  font-size: 29px;
  line-height: 1;

  color: var(--color-border-light);

  cursor: pointer;

  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.star:hover,
.star.active {
  color: var(--color-accent);
}

.star:hover {
  transform: translateY(-2px);
}

/* CHARACTER COUNT */

.character-count {
  display: block;
  margin-top: var(--space-xs);

  text-align: right;

  font-family: var(--font-body);
  font-size: 11px;

  color: var(--color-text-dark-muted);
}

/* MESSAGES */

.message {
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);

  margin-bottom: var(--space-lg);
  padding: var(--space-md);

  border-radius: var(--radius-md);

  font-family: var(--font-body);
  font-size: 13px;
  line-height: 1.5;

  box-sizing: border-box;
}

.message.error {
  color: var(--color-text-dark);
  background: var(--color-surface-light-soft);
  border: 1px solid var(--color-border-light);
}

.message.success {
  color: var(--color-text-dark);
  background: var(--color-surface-light-soft);
  border: 1px solid var(--color-border-light);
}

.message.success p {
  margin: 3px 0 0;
  color: var(--color-text-dark-secondary);
}

.success-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 22px;
  height: 22px;
  flex-shrink: 0;

  border-radius: 50%;

  background: var(--color-accent);
  color: var(--color-button-primary-text);

  font-size: 13px;
  font-weight: 700;
}

/* BUTTON */

.submit-button {
  width: 100%;
  height: 52px;

  border: 0;
  border-radius: var(--radius-md);

  background: var(--color-button-primary);
  color: var(--color-button-primary-text);

  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;

  cursor: pointer;

  transition:
    background 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.submit-button:hover:not(:disabled) {
  background: var(--color-button-primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-gold);
}

.submit-button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

/* REVIEWS DISPLAY */

.reviews-display {
  width: min(1200px, 100%);
  margin: var(--space-4xl) auto 0;
  box-sizing: border-box;
}

.reviews-heading {
  max-width: 650px;
  margin: 0 auto var(--space-3xl);

  text-align: center;
}

.reviews-heading h2 {
  margin: 0;

  font-family: var(--font-heading);
  font-size: clamp(36px, 5vw, 56px);
  line-height: 1.1;
  font-weight: 500;

 color:var(--color-brand-gold-dark);
}

.reviews-heading h2 span {
  display: block;
  color: var(--color-accent-dark);
}

.reviews-heading p {
  margin: var(--space-lg) auto 0;

  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.7;

  color: var(--color-text-dark-secondary);
}

/* REVIEWS GRID */

.reviews-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-lg);
  box-sizing: border-box;
}

.review-card {
  min-width: 0;
  box-sizing: border-box;

  padding: var(--space-xl);

  background: var(--color-brand-navy-light);

  /* border: 1px solid var(--color-border-light); */
  border-radius: var(--radius-lg);

  box-shadow: var(--shadow-soft);
}

.review-stars {
  display: flex;
  gap: 3px;
  margin-bottom: var(--space-md);

  font-size: 17px;
}

.review-stars span {
  color: var(--color-brand-gold-dark);
}

.review-stars span.filled {
  color: var(--color-accent);
}

.review-text {
  margin: 0 0 var(--space-xl);

  font-family: var(--font-heading);
  font-size: 18px;
  line-height: 1.65;
  font-style: italic;

  color: var(--color-brand-gold-dark);

  overflow-wrap: anywhere;
  word-break: break-word;
}

.review-author {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.author-avatar {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;
  flex-shrink: 0;

  border-radius: 50%;

  background: var(--color-brand-navy);
  color: var(--color-brand-gold-light) !important;

  font-family: var(--font-heading);
  font-size: 17px;
}

.review-author strong {
  display: block;

  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;

  color: var(--color-brand-gold-light) !important;

  overflow-wrap: anywhere;
}

.review-author span {
  display: block;
  margin-top: 2px;

  font-family: var(--font-body);
  font-size: 11px;

  color: var(--color-text-dark-muted);
}

.reviews-loading,
.no-reviews {
  width: 100%;
  box-sizing: border-box;

  padding: var(--space-2xl);

  text-align: center;

  font-family: var(--font-body);
  font-size: 14px;

  color: var(--color-text-dark-secondary);
}

/* TABLET */

@media (max-width: 850px) {
  .review-container {
    grid-template-columns: 1fr;
    gap: var(--space-2xl);
  }

  .review-intro {
    padding-top: 0;
  }

  .review-intro p {
    max-width: 600px;
  }

  .reviews-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* MOBILE */

@media (max-width: 600px) {
  .review-section {
    padding: var(--space-3xl) var(--space-md);
  }

  .review-container {
    width: 100%;
    gap: var(--space-xl);
  }

  .review-intro h2 {
    font-size: 38px;
  }

  .review-form {
    padding: var(--space-lg);
  }

  .star {
    font-size: 27px;
  }

  .reviews-display {
    margin-top: var(--space-3xl);
  }

  .reviews-heading {
    margin-bottom: var(--space-2xl);
  }

  .reviews-grid {
    grid-template-columns: 1fr;
  }

  .review-card {
    padding: var(--space-lg);
  }
}
</style>