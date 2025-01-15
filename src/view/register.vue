<template>
  <div class="flex flex-col lg:flex-row justify-center items-center h-screen bg-gray-100 px-6 lg:px-20">
    <img src="../assets/register.png" alt="register" class="w-full lg:w-1/2 mb-6 lg:mb-0 lg:mr-10" />
    <form @submit.prevent="handleRegister" class="flex flex-col items-start px-6 py-8 lg:px-10 lg:py-16 w-full lg:w-1/2 bg-white rounded-lg shadow-md">
      <h1 class="text-3xl lg:text-5xl font-semibold mb-5">ARTANUSA</h1>

      <label for="username" class="mt-2 w-full">
        <p class="text-lg">Username</p>
        <input type="text" v-model="username" placeholder="username..." class="border-[1px] rounded-md border-gray-500 px-3 py-2 w-full" required />
      </label>

      <label for="email" class="mt-2 w-full">
        <p class="text-lg">Email</p>
        <input type="email" v-model="email" placeholder="Email..." class="border-[1px] rounded-md border-gray-500 px-3 py-2 w-full" required />
      </label>

      <label for="password" class="mt-2 w-full">
        <p class="text-lg">Password</p>
        <input type="password" v-model="password" placeholder="Password..." class="border-[1px] rounded-md border-gray-500 px-3 py-2 w-full" required />
      </label>

      <label for="confirmPassword" class="mt-2 w-full">
        <p class="text-lg">Confirmasi Password</p>
        <input type="password" v-model="confirmPassword" placeholder="Confirmasi Password..." class="border-[1px] rounded-md border-gray-500 px-3 py-2 w-full" required />
      </label>

      <label for="checkbox" class="flex items-center gap-2 mt-4">
        <input type="checkbox" v-model="agreeToTerms" />
        <p class="text-sm">Saya setuju dengan kebijakan privasi</p>
      </label>

      <div class="flex lg:flex-row gap-3 mt-5">
        <button type="submit" class="bg-primary text-gray-100 px-8 py-3 rounded-md w-full lg:w-auto hover:opacity-75">Register</button>
        <router-link :to="{ name: 'homepage' }" class="border-[1px] border-primary bg-gray-100 text-primary px-8 py-3 rounded-md w-full lg:w-auto hover:opacity-75"> Back </router-link>
      </div>

      <router-link to="/login" class="text-sm italic mt-5"> Sudah punya akun? Langsung masuk aja </router-link>
    </form>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axiosInstance from "../axios";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    };
  },
  methods: {
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        Swal.fire({
          title: "Error!",
          text: "Passwords do not match!",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      if (!this.agreeToTerms) {
        Swal.fire({
          title: "Error!",
          text: "You must agree to the privacy policy!",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      try {
        const response = await axiosInstance.post("/users/register", {
          username: this.username,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
          agreeToTerms: this.agreeToTerms,
        });

        Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          this.$router.push({ name: "login" });
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.message || "Registration failed!",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
  },
};
</script>

<style scoped>
/* Tambahkan gaya tambahan jika diperlukan */
</style>
