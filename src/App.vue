<template>
  <Home/>
</template>

<script>
import { Home } from '@/views/Home.vue'

export default {
  components: {
    Home
  },
  name: "App",
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a.router-link-active {
  border-bottom: 0.1em solid indigo;
}
</style>
