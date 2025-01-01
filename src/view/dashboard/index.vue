<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <router-view name="main-dashboard" class="flex-1"></router-view>
    <div class="bg-primary text-white py-5 flex justify-center">
      <p>© 2024 ArtaNusa. All rights reserved.</p>
    </div>
  </div>
</template>

<script>
import Navbar from "../../components/navBarDashboard.vue";

export default {
  components: {
    Navbar,
  },
};
</script>
