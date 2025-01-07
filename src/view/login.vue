<template>
  <div class="flex justify-center items-center h-lvh bg-gray-100 px-20">
    <img src="../assets/login.png" alt="login" class="w-1/2" data-aos="fade-right" data-aos-delay="50" />
    <form @submit.prevent="handleLogin" class="flex flex-col items-start px-10 py-16 w-1/2 text-gray-900">
      <h1 class="text-5xl font-semibold mb-5" data-aos="fade-left" data-aos-delay="50">ARTANUSA</h1>

      <label for="email" class="w-full" data-aos="fade-left" data-aos-delay="100">
        <p>Email</p>
        <input type="email" v-model="email" placeholder="Email..." class="border-[1px] rounded-md border-gray-900 px-3 py-2 w-1/2" required />
      </label>

      <label for="password" class="mt-5 w-full" data-aos="fade-left" data-aos-delay="150">
        <p>Password</p>
        <input type="password" v-model="password" placeholder="Password..." class="border-[1px] rounded-md border-gray-900 px-3 py-2 w-1/2" required />
      </label>

      <label for="checkbox" class="flex justify-center gap-2" data-aos="fade-left" data-aos-delay="200">
        <input type="checkbox" v-model="keepLoggedIn" />
        <p>Buat saya tetap masuk</p>
      </label>

      <div class="flex gap-2">
        <button type="submit" class="bg-primary text-gray-100 px-12 py-3 rounded-md mt-5" data-aos="fade-left" data-aos-delay="250">Login</button>
        <router-link :to="{ name: 'homepage' }" class="border-[1px] border-primary bg-gray-100 text-primary px-12 py-3 rounded-md mt-5" data-aos="fade-left" data-aos-delay="300">Back</router-link>
      </div>

      <router-link to="/register" class="text-sm italic" data-aos="fade-left" data-aos-delay="350">Belum punya akun? Daftar dulu</router-link>
    </form>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axiosInstance from "../axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      keepLoggedIn: false,
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axiosInstance.post("/users/login", {
          email: this.email,
          password: this.password,
        });

        const { token } = response.data;
        if (this.keepLoggedIn) {
          localStorage.setItem("authToken", token);
        } else {
          sessionStorage.setItem("authToken", token);
        }

        Swal.fire({
          title: "Login Successful!",
          text: `Welcome back, ${response.data.username}!`,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          this.$router.push({ name: "dashboard" });
        });
      } catch (error) {
        Swal.fire({
          title: "Login Failed",
          text: error.response?.data?.message || "Invalid email or password!",
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
