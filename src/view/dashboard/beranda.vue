<template>
  <div class="p-8 bg-secondary">
    <div
      class="py-20 px-10 bg-center text-gray-100 rounded-lg flex items-center"
      style="background-image: linear-gradient(245.41deg, rgba(255, 255, 255, 0.4) 23.08%, rgba(31, 67, 133, 0.8) 59.21%), url('../src/assets/banner.png'); background-size: cover; background-position: center"
    >
      <div>
        <h1 class="font-semibold text-2xl">Hai, {{ username }}</h1>
        <p class="font-light">Mari wujudkan rencana <br />keuangan dengan artanusa</p>
        <button class="bg-gray-100 text-primary font-semibold px-3 py-1 mt-2 rounded-full" @click="goToPlanning">+ Buat Perencanaan</button>
      </div>
    </div>
    <div class="flex gap-5 my-5">
      <div class="bg-white p-3 text-primary flex-1 flex flex-col items-center rounded-lg shadow-sm">
        <h3 class="font-bold">Kamu Memiliki</h3>
        <p class="font-semibold">🎯 {{ targetKeuangan.length }} Target</p>
      </div>
      <div class="bg-white p-3 text-primary flex-1 flex flex-col items-center rounded-lg shadow-sm">
        <h3 class="font-bold">Total Tabungan</h3>
        <p class="font-semibold">💰 Rp{{ totalTabungan.toLocaleString() }}</p>
      </div>
      <div class="bg-white p-3 text-primary flex-1 flex flex-col items-center rounded-lg shadow-sm">
        <h3 class="font-bold">Target Selesai</h3>
        <p class="font-semibold">✅ {{ targetSelesai }} Target</p>
      </div>
    </div>
    <div class="py-10">
      <h2 class="font-bold text-primary text-2xl pb-5">Target dengan Progres Terbesar</h2>
      <TargetKeuanganList :targetKeuangan="targetKeuangan" @toggle-details="toggleDetails" @perbarui-progress="perbaruiProgress" @hapus-target="hapusTarget" @edit-target="editTarget" />
      <div class="flex justify-end py-5">
        <button class="text-primary">Lihat Lainnya...</button>
      </div>
    </div>
    <div class="flex">
      <div class="w-1/2">
        <h2 class="mb-5 text-3xl font-bold text-primary">Calender</h2>
        <Calendar :events="calendarEvents" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../axios";
import Calendar from "../../components/Calendar.vue";
import TargetKeuanganList from "../../components/TargetKeuanganList.vue";

export default {
  components: {
    Calendar,
    TargetKeuanganList,
  },
  data() {
    return {
      targetKeuangan: [],
      username: "",
    };
  },
  computed: {
    calendarEvents() {
      return this.targetKeuangan.map((target) => ({
        title: `Pengingat: ${target.namaTarget}`,
        date: target.deadline.toISOString().split("T")[0],
        description: `Target menabung untuk ${target.namaTarget} sebesar Rp${target.jumlahTarget.toLocaleString()} dengan sisa ${Math.max(target.jumlahTarget - target.tabunganSekarang, 0).toLocaleString()}.`,
      }));
    },
    totalTabungan() {
      return this.targetKeuangan.reduce((sum, target) => sum + target.tabunganSekarang, 0);
    },
    targetSelesai() {
      return this.targetKeuangan.filter((target) => target.selesai).length;
    },
  },
  methods: {
    goToPlanning() {
      this.$router.push("/dashboard/perencanaan");
    },
    async fetchUser() {
      try {
        const token = sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
        if (!token) {
          console.error("Token tidak ditemukan");
          return;
        }

        const response = await axios.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.username) {
          this.username = response.data.username;
        } else {
          console.error("Gagal mengambil data pengguna");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    },
    async fetchTargets() {
      try {
        const token = sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
        const response = await axios.get("/target", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const allTargets = response.data.data.map((target) => {
          const jumlahTarget = parseFloat(target.total_goal);
          const tabunganSekarang = parseFloat(target.current_amount || 0);
          const waktu = parseInt(target.saving_duration);

          return {
            id: target.goal_id,
            namaTarget: target.goal_name,
            jumlahTarget,
            waktu,
            progress: Math.floor((tabunganSekarang / jumlahTarget) * 100),
            tabunganSekarang,
            tabunganPrev: tabunganSekarang,
            tabunganPerBulan: waktu > 0 ? Math.ceil(jumlahTarget / waktu) : 0,
            tabunganTambah: 0,
            selesai: target.status === 1,
            showDetails: false,
            deadline: new Date(new Date().setMonth(new Date().getMonth() + waktu)),
          };
        });

        this.targetKeuangan = allTargets.sort((a, b) => b.progress - a.progress).slice(0, 3);
      } catch (error) {
        console.error("Error fetching targets:", error);
      }
    },
    toggleDetails(index) {
      this.targetKeuangan[index].showDetails = !this.targetKeuangan[index].showDetails;
    },
    perbaruiProgress(index) {
      const target = this.targetKeuangan[index];
      target.tabunganSekarang += target.tabunganTambah;
      target.progress = Math.min((target.tabunganSekarang / target.jumlahTarget) * 100, 100);
      target.selesai = target.tabunganSekarang >= target.jumlahTarget;
      target.tabunganTambah = 0;
    },
    hapusTarget(index) {
      this.targetKeuangan.splice(index, 1);
    },
    editTarget(index) {
      alert(`Edit fitur belum diimplementasikan untuk target ${this.targetKeuangan[index].namaTarget}`);
    },
  },
  mounted() {
    this.fetchTargets();
    this.fetchUser();
  },
};
</script>
