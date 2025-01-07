<template>
  <div>
    <!-- Jika target keuangan kosong -->
    <div v-if="targetKeuangan.length === 0" class="text-center text-gray-600">
      <p>Tidak ada target keuangan yang tersedia.</p>
    </div>

    <!-- Jika target keuangan ada -->
    <div v-else>
      <ul class="grid gap-3 grid-cols-3">
        <li v-for="(target, index) in targetKeuangan" :key="index" class="bg-white p-6 shadow-md rounded-lg h-fit">
          <div class="flex justify-end gap-3">
            <button @click="$emit('edit-target', index)" class="text-white font-medium rounded-md transition">✏️</button>
            <button @click="$emit('hapus-target', index)" class="text-white font-medium rounded-md transition">❌</button>
          </div>
          <h3 class="text-xl font-bold">{{ target.namaTarget }}</h3>
          <p class="mt-2 text-gray-600">Jumlah Target: Rp{{ target.jumlahTarget.toLocaleString() }} / {{ target.waktu }} bulan</p>

          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700">Progress:</label>
            <div class="relative pt-1">
              <div class="flex mb-2 items-center justify-between">
                <span class="text-xs font-semibold inline-block py-1 uppercase">Tabungan</span>
                <span class="text-xs font-semibold inline-block py-1 uppercase"> {{ target.progress }}% </span>
              </div>
              <div class="relative w-full bg-gray-200 rounded-full">
                <div
                  class="absolute top-0 left-0 h-2 rounded-full"
                  :style="{
                    width: target.progress + '%',
                    backgroundColor: target.progress === 100 ? '#4caf50' : '#4b89e8',
                  }"
                ></div>
              </div>
            </div>
          </div>

          <button @click="$emit('toggle-details', index)" class="mt-4 bg-primary text-white font-medium px-4 py-2 rounded-md hover:bg-blue-900 transition">
            {{ target.showDetails ? "Hide Details" : "Show Details" }}
          </button>

          <div v-if="target.showDetails">
            <p
              class="mt-1 text-gray-900"
              :class="{
                'text-green-500': target.tabunganSekarang > target.tabunganPrev,
                'text-red-500': target.tabunganSekarang < target.tabunganPrev,
              }"
            >
              Tabungan yang Sudah Disiapkan: Rp{{ target.tabunganSekarang.toLocaleString() }}
            </p>
            <p class="mt-2 text-gray-900">Tabungan Per Bulan: Rp{{ target.tabunganPerBulan.toLocaleString() }}</p>
            <p class="mt-2 text-gray-900">Sisa yang Perlu Ditabung: Rp{{ (target.jumlahTarget - target.tabunganSekarang).toLocaleString() }}</p>
            <p class="mt-1 text-gray-900">
              Status:
              <span :class="target.selesai ? 'text-green-500 font-semibold' : 'text-red-500'">
                {{ target.selesai ? "Selesai" : "Belum Selesai" }}
              </span>
            </p>
          </div>

          <div class="mt-4 space-y-2">
            <label for="tabunganInput" class="block text-sm font-medium text-gray-700">Tambah Tabungan (Rp):</label>
            <div class="flex gap-4">
              <input type="number" :id="'tabunganInput-' + index" v-model.number="target.tabunganTambah" class="px-2 block w-full border-gray-700 border-[1px] rounded-md shadow-sm bg-inherit" placeholder="Masukkan jumlah" />
              <button @click="$emit('perbarui-progress', index)" class="w-full bg-green-500 text-white font-medium py-2 rounded-md hover:bg-green-600 transition flex-1 px-4">➤</button>
            </div>
          </div>
        </li>
      </ul>
      <div class="flex justify-end py-5">
        <button class="text-primary">Lihat Lainnya...</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    targetKeuangan: {
      type: Array,
      required: true,
    },
  },
};
</script>
