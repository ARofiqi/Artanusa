<template>
  <div class="flex bg-secondary">
    <div class="p-6">
      <h1 class="text-3xl font-bold text-center mb-6">Perencanaan Target Keuangan</h1>

      <form @submit.prevent="tambahTarget" class="bg-white p-6 shadow-md rounded-sm mb-8">
        <div class="mb-4">
          <label for="namaTarget" class="block text-sm font-medium text-gray-700">Nama Target:</label>
          <input type="text" id="namaTarget" v-model="form.namaTarget" class="mt-1 block w-full border-gray-300 p-2 rounded-sm shadow-sm focus:ring-primary focus:border-primary" placeholder="Masukkan nama target" required />
        </div>
        <div class="mb-4">
          <label for="jumlahTarget" class="block text-sm font-medium text-gray-700">Jumlah Target (Rp):</label>
          <input type="number" id="jumlahTarget" v-model.number="form.jumlahTarget" class="mt-1 block w-full border-gray-300 p-2 rounded-sm shadow-sm focus:ring-primary focus:border-primary" placeholder="Masukkan jumlah target" required />
        </div>
        <div class="mb-4">
          <label for="waktu" class="block text-sm font-medium text-gray-700">Waktu (Bulan):</label>
          <input type="number" id="waktu" v-model.number="form.waktu" class="mt-1 block w-full border-gray-300 p-2 rounded-sm shadow-sm focus:ring-primary focus:border-primary" placeholder="Masukkan waktu (bulan)" required />
        </div>
        <button type="submit" class="w-full bg-primary text-white font-medium py-2 p-2 rounded-sm hover:bg-blue-600 transition">Tambahkan Target</button>
      </form>
    </div>
    <div class="p-6 flex flex-col justify-center align-middle w-full">
      <div v-if="targetKeuangan.length > 0" class="space-y-4">
        <h2 class="text-2xl font-semibold mb-4">Daftar Target</h2>
        <ul class="space-y-4">
          <li v-for="(target, index) in targetKeuangan" :key="index" class="bg-white p-6 shadow-md rounded-lg">
            <h3 class="text-xl font-bold">{{ target.namaTarget }}</h3>
            <p class="mt-2 text-gray-600">Jumlah Target: Rp{{ target.jumlahTarget.toLocaleString() }} / {{ target.waktu }} bulan</p>

            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700">Progress:</label>
              <div class="relative pt-1">
                <div class="flex mb-2 items-center justify-between">
                  <span class="text-xs font-semibold inline-block py-1 uppercase">Tabungan</span>
                  <span class="text-xs font-semibold inline-block py-1 uppercase">{{ target.progress }}%</span>
                </div>
                <div class="flex mb-2">
                  <div class="relative w-full">
                    <div class="flex mb-2 text-xs font-semibold inline-block py-1 uppercase">
                      <div class="flex w-full bg-gray-200 rounded-full">
                        <div
                          class="flex text-center text-xs font-semibold inline-block py-1 uppercase leading-relaxed"
                          :style="{
                            width: target.progress + '%',
                            backgroundColor: target.progress === 100 ? '#4caf50' : '#4b89e8',
                            height: '8px',
                            borderRadius: '5px',
                          }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p class="mt-1 text-gray-600" :class="{ 'text-green-500': target.tabunganSekarang > target.tabunganPrev, 'text-red-500': target.tabunganSekarang < target.tabunganPrev }">
              Tabungan yang Sudah Disiapkan: Rp{{ target.tabunganSekarang.toLocaleString() }}
            </p>

            <p class="mt-2 text-gray-600">Tabungan Per Bulan: Rp{{ target.tabunganPerBulan.toLocaleString() }}</p>
            <p class="mt-2 text-gray-600">Sisa yang Perlu Ditabung: Rp{{ (target.jumlahTarget - target.tabunganSekarang).toLocaleString() }}</p>
            <p class="mt-1 text-gray-600">
              Status: <span :class="target.selesai ? 'text-green-500 font-semibold' : 'text-red-500'">{{ target.selesai ? "Selesai" : "Belum Selesai" }}</span>
            </p>

            <div class="mt-4 space-y-2">
              <label for="tabunganInput" class="block text-sm font-medium text-gray-700">Tambah Tabungan (Rp):</label>
              <input
                type="number"
                :id="'tabunganInput-' + index"
                v-model.number="target.tabunganTambah"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan jumlah"
              />
              <button @click="perbaruiProgress(index)" class="w-full bg-green-500 text-white font-medium py-2 rounded-md hover:bg-green-600 transition">Perbarui Progress</button>
            </div>
            <div class="mt-4 flex justify-between">
              <button @click="hapusTarget(index)" class="bg-red-500 text-white font-medium px-4 py-2 rounded-md hover:bg-red-600 transition">Hapus</button>
              <button @click="editTarget(index)" class="bg-yellow-500 text-white font-medium px-4 py-2 rounded-md hover:bg-yellow-600 transition">Edit</button>
            </div>
          </li>
        </ul>
      </div>
      <div v-else class="text-center text-gray-500">
        <p>Belum ada target keuangan. Tambahkan sekarang!</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        namaTarget: "",
        jumlahTarget: 0,
        waktu: 0,
      },
      targetKeuangan: [],
    };
  },
  methods: {
    tambahTarget() {
      if (this.form.jumlahTarget > 0 && this.form.waktu > 0) {
        const tabunganPerBulan = this.form.jumlahTarget / this.form.waktu;
        this.targetKeuangan.push({
          ...this.form,
          tabunganPerBulan: Math.ceil(tabunganPerBulan),
          tabunganSekarang: 0,
          tabunganTambah: 0, // Menambahkan properti tabunganTambah
          progress: 0,
          selesai: false,
          tabunganPrev: 0, // Menyimpan nilai sebelumnya untuk animasi
        });
        this.resetForm();
      } else {
        alert("Jumlah target dan waktu harus lebih besar dari 0!");
      }
    },
    perbaruiProgress(index) {
      const target = this.targetKeuangan[index];
      if (target.tabunganTambah > 0) {
        target.tabunganPrev = target.tabunganSekarang; // Menyimpan nilai sebelumnya untuk animasi
        target.tabunganSekarang += target.tabunganTambah; // Tambahkan jumlah tabungan yang baru
        target.progress = Math.min(Math.ceil((target.tabunganSekarang / target.jumlahTarget) * 100), 100);
        target.selesai = target.progress === 100;
        target.tabunganTambah = 0; // Reset input tabungan setelah ditambahkan
        this.$forceUpdate();
      } else {
        alert("Masukkan jumlah tabungan yang valid!");
      }
    },
    editTarget(index) {
      const target = this.targetKeuangan[index];
      this.form = {
        namaTarget: target.namaTarget,
        jumlahTarget: target.jumlahTarget,
        waktu: target.waktu,
      };
      this.targetKeuangan.splice(index, 1);
    },

    add() {},

    hapusTarget(index) {
      this.targetKeuangan.splice(index, 1);
    },
    resetForm() {
      this.form = {
        namaTarget: "",
        jumlahTarget: 0,
        waktu: 0,
      };
    },
  },
};
</script>

<style>
/* Tidak ada custom style tambahan karena menggunakan Tailwind CSS */
</style>
