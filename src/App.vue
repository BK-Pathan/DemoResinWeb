<script setup>
import Footer from '../src/components/Footer.vue';
import Navbar from '../src/components/Navbar.vue'
// import HeroSection from './components/HeroSection.vue'
import Home from '../src/pages/Home.vue';
import Shop from '../src/pages/Shop.vue';
import CartDrawer from '../src/pages/Cart.vue'

</script>

<template>
  <div class="app">
    <Navbar />
  <RouterView />
   <CartDrawer />
  </div>
  <Footer/>
</template>


<style>
body{
  padding:0;
  margin:0;
  box-sizing: border-box;
}
</style>