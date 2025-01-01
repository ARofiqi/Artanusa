<template>
  <div class="p-8 bg-secondary">
    <div
      class="py-20 px-10 bg-center text-gray-100 rounded-lg flex items-center"
      style="background-image: linear-gradient(245.41deg, rgba(255, 255, 255, 0.4) 23.08%, rgba(31, 67, 133, 0.8) 59.21%), url('../src/assets/banner.png'); background-size: cover; background-position: center"
    >
      <div>
        <h1 class="font-semibold text-2xl">Hai, Ika Santika</h1>
        <p class="font-light">Mari wujudkan rencana <br />keuangan dengan artanusa</p>
        <button class="bg-gray-100 text-primary font-semibold px-3 py-1 mt-2 rounded-full">+ Buat Perencanaan</button>
      </div>
    </div>
    <div class="flex gap-5 my-5">
      <div class="bg-gray-100 p-3 text-primary flex-1 flex flex-col items-center rounded-lg shadow-sm">
        <h3 class="font-bold">Kamu Memiliki</h3>
        <p class="font-semibold">🎯 5 Target</p>
      </div>
      <div class="bg-gray-100 p-3 text-primary flex-1 flex flex-col items-center rounded-lg shadow-sm">
        <h3 class="font-bold">Kamu Memiliki</h3>
        <p class="font-semibold">🎯 5 Target</p>
      </div>
      <div class="bg-gray-100 p-3 text-primary flex-1 flex flex-col items-center rounded-lg shadow-sm">
        <h3 class="font-bold">Kamu Memiliki</h3>
        <p class="font-semibold">🎯 5 Target</p>
      </div>
    </div>
    <div class="py-10">
      <h2 class="font-bold text-primary text-2xl pb-5">Daftar Rencana Menabung</h2>

      <!-- Jika target keuangan kosong -->
      <div v-if="targetKeuangan.length === 0" class="text-center text-gray-600">
        <p>Tidak ada target keuangan yang tersedia.</p>
      </div>

      <!-- Jika target keuangan ada -->
      <div v-else>
        <ul class="grid gap-3 grid-cols-3">
          <li v-for="(target, index) in targetKeuangan" :key="index" class="bg-gray-100 p-6 shadow-md rounded-lg h-fit">
            <div class="flex justify-end gap-3">
              <button @click="editTarget(index)" class="text-white font-medium rounded-md transition">✏️</button>
              <button @click="hapusTarget(index)" class="text-white font-medium rounded-md transition">❌</button>
            </div>
            <h3 class="text-xl font-bold">{{ target.namaTarget }}</h3>
            <p class="mt-2 text-gray-600">Jumlah Target: Rp{{ target.jumlahTarget.toLocaleString() }} / {{ target.waktu }} bulan</p>

            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700">Progress:</label>
              <div class="relative pt-1">
                <div class="flex mb-2 items-center justify-between">
                  <span class="text-xs font-semibold inline-block py-1 uppercase">Tabungan</span>
                  <span class="text-xs font-semibold inline-block py-1 uppercase">{{ target.progress }}%</span>
                </div>
                <div class="relative w-full bg-gray-200 rounded-full">
                  <div class="absolute top-0 left-0 h-2 rounded-full" :style="{ width: target.progress + '%', backgroundColor: target.progress === 100 ? '#4caf50' : '#4b89e8' }"></div>
                </div>
              </div>
            </div>

            <button @click="toggleDetails(index)" class="mt-4 bg-primary text-white font-medium px-4 py-2 rounded-md hover:bg-blue-900 transition">
              {{ target.showDetails ? "Hide Details" : "Show Details" }}
            </button>

            <div v-if="target.showDetails">
              <p class="mt-1 text-gray-900" :class="{ 'text-green-500': target.tabunganSekarang > target.tabunganPrev, 'text-red-500': target.tabunganSekarang < target.tabunganPrev }">
                Tabungan yang Sudah Disiapkan: Rp{{ target.tabunganSekarang.toLocaleString() }}
              </p>
              <p class="mt-2 text-gray-900">Tabungan Per Bulan: Rp{{ target.tabunganPerBulan.toLocaleString() }}</p>
              <p class="mt-2 text-gray-900">Sisa yang Perlu Ditabung: Rp{{ (target.jumlahTarget - target.tabunganSekarang).toLocaleString() }}</p>
              <p class="mt-1 text-gray-900">
                Status: <span :class="target.selesai ? 'text-green-500 font-semibold' : 'text-red-500'">{{ target.selesai ? "Selesai" : "Belum Selesai" }}</span>
              </p>
            </div>

            <div class="mt-4 space-y-2">
              <label for="tabunganInput" class="block text-sm font-medium text-gray-700">Tambah Tabungan (Rp):</label>
              <div class="flex gap-4">
                <input type="number" :id="'tabunganInput-' + index" v-model.number="target.tabunganTambah" class="px-2 block w-full border-gray-700 border-[1px] rounded-md shadow-sm bg-inherit" placeholder="Masukkan jumlah" />
                <button @click="perbaruiProgress(index)" class="w-full bg-green-500 text-white font-medium py-2 rounded-md hover:bg-green-600 transition flex-1 px-4">➤</button>
              </div>
            </div>
          </li>
        </ul>
        <div class="flex justify-end py-5">
          <button class="text-primary">Lihat Lainnya...</button>
        </div>
      </div>
    </div>
    <div>
      <Calendar :events="calendarEvents" />
    </div>
  </div>
</template>

<script>
import Calendar from "../../components/Calendar.vue";

export default {
  components: {
    Calendar,
  },
  data() {
    return {
      targetKeuangan: [
        {
          namaTarget: "Beli Laptop Baru",
          jumlahTarget: 15000000,
          waktu: 12,
          progress: 50,
          tabunganSekarang: 7500000,
          tabunganPrev: 7000000,
          tabunganPerBulan: 1250000,
          tabunganTambah: 0,
          selesai: false,
          showDetails: false,
          deadline: new Date(new Date().setMonth(new Date().getMonth() + 12)),
        },
        {
          namaTarget: "Liburan ke Bali",
          jumlahTarget: 5000000,
          waktu: 6,
          progress: 80,
          tabunganSekarang: 4000000,
          tabunganPrev: 3500000,
          tabunganPerBulan: 833333,
          tabunganTambah: 0,
          selesai: false,
          showDetails: false,
          deadline: new Date(new Date().setMonth(new Date().getMonth() + 6)),
        },
        {
          namaTarget: "Modal Usaha Kecil",
          jumlahTarget: 10000000,
          waktu: 10,
          progress: 100,
          tabunganSekarang: 10000000,
          tabunganPrev: 9500000,
          tabunganPerBulan: 1000000,
          tabunganTambah: 0,
          selesai: true,
          showDetails: false,
          deadline: new Date(new Date().setMonth(new Date().getMonth() + 10)),
        },
      ],
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
  },
  methods: {
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
};
</script>
