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
      <div class="bg-white p-3 text-primary flex-1 flex flex-col items-center rounded-lg shadow-sm">
        <h3 class="font-bold">Kamu Memiliki</h3>
        <p class="font-semibold">🎯 5 Target</p>
      </div>
      <div class="bg-white p-3 text-primary flex-1 flex flex-col items-center rounded-lg shadow-sm">
        <h3 class="font-bold">Kamu Memiliki</h3>
        <p class="font-semibold">🎯 5 Target</p>
      </div>
      <div class="bg-white p-3 text-primary flex-1 flex flex-col items-center rounded-lg shadow-sm">
        <h3 class="font-bold">Kamu Memiliki</h3>
        <p class="font-semibold">🎯 5 Target</p>
      </div>
    </div>
    <div class="py-10">
      <h2 class="font-bold text-primary text-2xl pb-5">Daftar Rencana Menabung</h2>
      <TargetKeuanganList :targetKeuangan="targetKeuangan" @toggle-details="toggleDetails" @perbarui-progress="perbaruiProgress" @hapus-target="hapusTarget" @edit-target="editTarget" />
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
import Calendar from "../../components/Calendar.vue";
import TargetKeuanganList from "../../components/TargetKeuanganList.vue";
import BudgetSimulation from "../../components/BudgetSimulation.vue";

export default {
  components: {
    Calendar,
    TargetKeuanganList,
    BudgetSimulation,
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
