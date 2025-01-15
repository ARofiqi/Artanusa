<template>
  <div class="flex flex-col lg:flex-row justify-center items-center h-screen bg-gray-100 px-6 lg:px-20">
    <img src="../assets/login.png" alt="login" class="w-full lg:w-1/2 mb-6 lg:mb-0 lg:mr-10" data-aos="fade-right" data-aos-delay="50" />
    <form @submit.prevent="handleLogin" class="flex flex-col items-start px-6 py-8 lg:px-10 lg:py-16 w-full lg:w-1/2 bg-white rounded-lg shadow-md">
      <h1 class="text-3xl lg:text-5xl font-semibold mb-5" data-aos="fade-left" data-aos-delay="50">ARTANUSA</h1>

      <label for="email" class="w-full" data-aos="fade-left" data-aos-delay="100">
        <p>Email</p>
        <input type="email" v-model="email" placeholder="Email..." class="border-[1px] rounded-md border-gray-400 px-3 py-2 w-full" required />
      </label>

      <label for="password" class="mt-5 w-full" data-aos="fade-left" data-aos-delay="150">
        <p>Password</p>
        <input type="password" v-model="password" placeholder="Password..." class="border-[1px] rounded-md border-gray-400 px-3 py-2 w-full" required />
      </label>

      <label for="checkbox" class="flex items-center gap-2 mt-5" data-aos="fade-left" data-aos-delay="200">
        <input type="checkbox" v-model="keepLoggedIn" />
        <p>Buat saya tetap masuk</p>
      </label>

      <div class="flex lg:flex-row gap-3 mt-5">
        <button type="submit" class="bg-primary text-gray-100 px-8 py-3 rounded-md w-full lg:w-auto" data-aos="fade-left" data-aos-delay="250">Login</button>
        <router-link :to="{ name: 'homepage' }" class="border-[1px] border-primary bg-gray-100 text-primary px-8 py-3 rounded-md w-full lg:w-auto" data-aos="fade-left" data-aos-delay="300"> Back </router-link>
      </div>

      <router-link to="/register" class="text-sm italic mt-5" data-aos="fade-left" data-aos-delay="350"> Belum punya akun? Daftar dulu </router-link>
    </form>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axiosInstance from "../axios"

export default {
  data() {
    return {
      email: "",
      password: "",
      keepLoggedIn: false,
    };
  },
  created() {
    this.checkToken();
  },
  methods: {
    async checkToken() {
      let token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
      if (!token) {
        return;
      }

      if (token) {
        Swal.fire({
          title: "Login Otomatis",
          text: "Anda telah login sebelumnya!",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "bg-green-500 text-white px-8 py-3 rounded-md",
          },
        }).then(() => {
          this.$router.push({ name: "dashboard" });
        });
      }
    },
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
          title: "Berhasil Login",
          text: `Selamat Datang, ${response.data.user.username}!`,
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "bg-green-500 text-white px-8 py-3 rounded-md",
          },
        }).then(() => {
          this.$router.push({ name: "dashboard" });
        });
      } catch (error) {
        Swal.fire({
          title: "Login Failed",
          text: error.response?.data?.message || "Invalid email or password!",
          icon: "error",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "bg-red-500 text-white px-8 py-3 rounded-md",
          },
        });
      }
    },
  },
};
</script>

<style scoped>
/* Tambahkan gaya tambahan jika diperlukan */
</style>
