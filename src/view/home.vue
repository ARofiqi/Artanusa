<template>
  <div>
    <Navbar />
    <Homepage />
    <Footer />
  </div>
</template>

<script>
import Homepage from "../components/homepage.vue";
import Navbar from "../components/navbar.vue";
import Footer from "../components/footer.vue";

export default {
  components: {
    Navbar,
    Footer,
    Homepage
  },
};
</script>

<style scoped></style>
