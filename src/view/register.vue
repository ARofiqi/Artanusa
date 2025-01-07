<template>
  <div class="flex justify-center items-center h-lvh bg-gray-100 px-20">
    <img src="../assets/register.png" alt="register" class="w-1/2" data-aos="fade-right" data-aos-delay="50" />
    <form @submit.prevent="handleRegister" class="flex flex-col items-start px-10 py-16 w-1/2 text-gray-900">
      <h1 class="text-5xl font-semibold mb-5" data-aos="fade-left" data-aos-delay="50">ARTANUSA</h1>

      <label for="username" class="mt-2 w-full" data-aos="fade-left" data-aos-delay="100">
        <p class="text-lg">Username</p>
        <input type="text" v-model="username" placeholder="username..." class="border-[1px] rounded-md border-gray-900 px-3 py-2 w-1/2" required />
      </label>

      <label for="email" class="mt-2 w-full" data-aos="fade-left" data-aos-delay="150">
        <p class="text-lg">Email</p>
        <input type="email" v-model="email" placeholder="Email..." class="border-[1px] rounded-md border-gray-900 px-3 py-2 w-1/2" required />
      </label>

      <label for="password" class="mt-2 w-full" data-aos="fade-left" data-aos-delay="200">
        <p class="text-lg">Password</p>
        <input type="password" v-model="password" placeholder="Password..." class="border-[1px] rounded-md border-gray-900 px-3 py-2 w-1/2" required />
      </label>

      <label for="confirmPassword" class="mt-2 w-full" data-aos="fade-left" data-aos-delay="250">
        <p class="text-lg">Confirmasi Password</p>
        <input type="password" v-model="confirmPassword" placeholder="Confirmasi Password..." class="border-[1px] rounded-md border-gray-900 px-3 py-2 w-1/2" required />
      </label>

      <label for="checkbox" class="flex justify-center gap-2" data-aos="fade-left" data-aos-delay="300">
        <input type="checkbox" v-model="agreeToTerms" />
        <p class="text-sm">Saya setuju dengan kebijakan privasi</p>
      </label>

      <div class="flex gap-2" data-aos="fade-left" data-aos-delay="350">
        <button type="submit" class="bg-primary text-gray-100 px-12 py-3 rounded-md mt-5">Register</button>
        <router-link :to="{ name: 'homepage' }" class="border-[1px] border-primary bg-gray-100 text-primary px-12 py-3 rounded-md mt-5">Back</router-link>
      </div>

      <router-link to="/login" class="text-sm italic" data-aos="fade-left" data-aos-delay="400">Sudah punya akun? Langsung masuk aja</router-link>
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
          agreeToTerms: this.agreeToTerms
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
/* Add any necessary styles here */
</style>
