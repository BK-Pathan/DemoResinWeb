<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import ShopSection from '../components/AllProducts.vue'
import { supabase } from '../supabase.ts'

interface Review {
  id: number
  name: string
  rating: number
  review: string
  approved: boolean
  created_at: string
}

const reviews = ref<Review[]>([])
const reviewsLoading = ref(true)

const fetchReviews = async () => {
  const { data, error } = await supabase
    .from('reviews')
    .select('id, name, rating, review, approved, created_at')
    .eq('approved', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching reviews:', error)
    reviews.value = []
  } else {
    reviews.value = data ?? []
  }

  reviewsLoading.value = false
}

let reviewChannel: ReturnType<typeof supabase.channel> | null = null

onMounted(async () => {
  document.title = 'Royal Resin Studio'

let meta = document.querySelector(
  'meta[name="description"]'
) as HTMLMetaElement | null

if (!meta) {
  meta = document.createElement('meta')
  meta.name = 'description'
  document.head.appendChild(meta)
}

meta.content =
  'Browse all handcrafted resin products from Royal Resin Art: wall clocks, jewellery, trays, coasters, pens, frames and more.'
  // Fetch approved reviews
  await fetchReviews()

  // Realtime reviews
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
  <main>
    <ShopSection is-page />

    <!-- Customer Reviews -->
    <section class="reviews-section">
      <div class="reviews-container">

        <div class="reviews-heading">
          <span class="eyebrow">CUSTOMER LOVE</span>

          <h2>
            What Our Customers
            <span>Say.</span>
          </h2>

          <p>
            Real experiences from customers who chose Royal Resin Art.
          </p>
        </div>

        <!-- Loading -->
        <div v-if="reviewsLoading" class="reviews-loading">
          Loading reviews...
        </div>

        <!-- Reviews -->
        <div
          v-else-if="reviews.length"
          class="reviews-grid"
        >
          <article
            v-for="item in reviews"
            :key="item.id"
            class="review-card"
          >
            <div class="review-stars">
              <span
                v-for="star in 5"
                :key="star"
                :class="{ filled: star <= item.rating }"
              >
                ★
              </span>
            </div>

            <p class="review-text">
              “{{ item.review }}”
            </p>

            <div class="review-author">
              <div class="author-avatar">
                {{ item.name.charAt(0).toUpperCase() }}
              </div>

              <div>
                <strong>{{ item.name }}</strong>
                <span>Customer</span>
              </div>
            </div>
          </article>
        </div>

        <!-- No reviews -->
        <div v-else class="no-reviews">
          <p>Be the first to share your experience.</p>
        </div>

      </div>
    </section>
  </main>
</template>

<style scoped>
.reviews-section {
  padding: var(--space-4xl) var(--space-lg);
  background: var(--color-brand-navy-deep);
}

.reviews-container {
  width: min(1200px, 100%);
  margin: 0 auto;
}

.reviews-heading {
  max-width: 650px;
  margin: 0 auto var(--space-3xl);
  text-align: center;
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

.reviews-heading h2 {
  margin: 0;

  font-family: var(--font-heading);
  font-size: clamp(36px, 5vw, 56px);
  line-height: 1.1;
  font-weight: 500;

  color: var( --color-brand-gold-dark);
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

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.review-card {
  padding: var(--space-xl);

  background: var(--color-bg-secondary);

  border: 1px solid var(--color-text-muted);
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
  color: var(--color-brand-gold-dark);
}

.review-text {
  margin: 0 0 var(--space-xl);

  font-family: var(--font-heading);
  font-size: 18px;
  line-height: 1.65;
  font-style: italic;

  color: var(--color-brand-gold-dark);
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
  color: var(--color-accent-dark);

  font-family: var(--font-heading);
  font-size: 17px;
}

.review-author strong {
  display: block;

  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;

  color: var(--color-accent-dark);
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
  padding: var(--space-2xl);

  text-align: center;

  font-family: var(--font-body);
  font-size: 14px;

  color: var(--color-text-dark-secondary);
}

@media (max-width: 900px) {
  .reviews-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .reviews-section {
    padding: var(--space-3xl) var(--space-md);
  }

  .reviews-grid {
    grid-template-columns: 1fr;
  }

  .review-card {
    padding: var(--space-lg);
  }
}
</style>