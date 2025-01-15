<template>
  <div class="bg-primary py-5 md:py-2 px-10 flex justify-between items-center w-full fixed z-10">
    <h1 class="text-gray-100 font-bold text-2xl">Artanusa</h1>

    <button @click="toggleMenu" class="text-gray-100 md:hidden focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <nav
      :class="[isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95', 'absolute top-16 left-0 w-full bg-primary z-10 transition-all duration-300 ease-in-out transform md:static md:w-auto md:flex md:gap-2 md:opacity-100 md:scale-100']"
    >
      <ul class="flex flex-col md:flex-row md:items-center gap-2 p-5">
        <li><a class="block text-gray-100 hover:bg-blue-900 px-4 py-2 rounded-lg transition-all w-full" href="#home">Home</a></li>
        <li><a class="block text-gray-100 hover:bg-blue-900 px-4 py-2 rounded-lg transition-all w-full" href="#fitur">Fitur</a></li>
        <li><a class="block text-gray-100 hover:bg-blue-900 px-4 py-2 rounded-lg transition-all w-full" href="#team">Team</a></li>
        <li><a class="block text-gray-100 hover:bg-blue-900 px-4 py-2 rounded-lg transition-all w-full" href="#about">About</a></li>
        <li><a class="block text-gray-100 hover:bg-blue-900 px-4 py-2 rounded-lg transition-all w-full" href="#footer">Contact Us</a></li>
        <li class="flex md:hidden text-gray-100 hover:bg-blue-900 px-4 py-2 rounded-lg transition-all">
          <div class="flex gap-2">
            <router-link class="text-primary bg-gray-100 font-semibold px-3 py-1 rounded-sm border-2 border-gray-100 hover:opacity-70" to="/login">Login</router-link>
            <router-link class="text-gray-100 bg-primary font-semibold px-3 py-1 rounded-sm border-[1px] border-gray-100 hover:opacity-70" to="/register">Register</router-link>
          </div>
        </li>
      </ul>
    </nav>

    <div class="hidden md:flex gap-2">
      <router-link class="text-primary bg-gray-100 font-semibold px-3 py-1 rounded-sm border-2 border-gray-100 hover:opacity-70" to="/login">Login</router-link>
      <router-link class="text-gray-100 bg-primary font-semibold px-3 py-1 rounded-sm border-[1px] border-gray-100 hover:opacity-70" to="/register">Register</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style>
/* Optional: Add any custom styling if needed */
</style>
