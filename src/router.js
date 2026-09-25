import { createRouter, createWebHistory } from 'vue-router'
import Home from '../src/pages/Home.vue'
import Shop from '../src/pages/Shop.vue'
import About from '../src/pages/About.vue'
// import Gallery from '../pages/Gallery.vue'
import Review from '../src/pages/ReviewForm.vue'
import Contact from '../src/pages/Contact.vue'
import Cart from '../src/pages/Cart.vue'
import Checkout from '../src/pages/Checkout.vue'
import Check from '../src/pages/Check.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/shop', component: Shop },
    { path: '/about', component: About },
    {path:'/review' , component: Review},
    {path:'/Cart' , component : Cart},
    // { path: '/gallery', component: Gallery },
    { path: '/contact', component: Contact },
    {path:'/checkout' , component: Checkout},
    {path:'/check' , component:Check},
    {
  path: '/product/:id',
  name: 'product',
  component: () => import('../src/pages/Productdetaill.vue')
}
  ],
  scrollBehavior: (to) =>
    to.hash ? { el: to.hash, behavior: 'smooth' } : { top: 0 }
})