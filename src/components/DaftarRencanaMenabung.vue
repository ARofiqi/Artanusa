<template>
  <div>
    <ul class="grid gap-3 grid-cols-3">
      <li v-for="(target, index) in targetKeuangan" :key="index" class="bg-white p-6 shadow-md rounded-lg h-fit">
        <h3 class="text-xl font-bold">{{ target.namaTarget }}</h3>
        <p class="mt-2 text-gray-600">Jumlah Target: Rp{{ target.jumlahTarget.toLocaleString() }} / {{ target.waktu }} bulan</p>

        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700">Progress:</label>
          <div class="relative pt-1">
            <div class="flex mb-2 items-center justify-between">
              <span class="text-xs font-semibold inline-block py-1 uppercase">Tabungan</span>
              <span class="text-xs font-semibold inline-block py-1 uppercase"> {{ target.progress }}% </span>
            </div>
            <div class="flex mb-2">
              <div class="relative w-full">
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

        <button @click="toggleDetails(index)" class="mt-4 bg-blue-500 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-600 transition">
          {{ target.showDetails ? "Hide Details" : "Show Details" }}
        </button>

        <div v-if="target.showDetails">
          <p
            class="mt-1 text-gray-600"
            :class="{
              'text-green-500': target.tabunganSekarang > target.tabunganPrev,
              'text-red-500': target.tabunganSekarang < target.tabunganPrev,
            }"
          >
            Tabungan yang Sudah Disiapkan: Rp{{ target.tabunganSekarang.toLocaleString() }}
          </p>

          <p class="mt-2 text-gray-600">Tabungan Per Bulan: Rp{{ target.tabunganPerBulan.toLocaleString() }}</p>
          <p class="mt-2 text-gray-600">Sisa yang Perlu Ditabung: Rp{{ (target.jumlahTarget - target.tabunganSekarang).toLocaleString() }}</p>
          <p class="mt-1 text-gray-600">
            Status:
            <span :class="target.selesai ? 'text-green-500 font-semibold' : 'text-red-500'">{{ target.selesai ? "Selesai" : "Belum Selesai" }}</span>
          </p>
        </div>

        <div class="mt-4 space-y-2">
          <label for="tabunganInput" class="block text-sm font-medium text-gray-700">Tambah Tabungan (Rp):</label>
          <div class="flex gap-4">
            <input type="number" :id="'tabunganInput-' + index" v-model.number="target.tabunganTambah" class="px-2 mt-1 block w-full border-gray-700 border-[1px] rounded-md shadow-sm" placeholder="Masukkan jumlah" />
            <button @click="perbaruiProgress(index)" class="w-full bg-green-500 text-white font-medium py-2 rounded-md hover:bg-green-600 transition">Perbarui Progress</button>
          </div>
        </div>
        <div class="mt-4 flex justify-between">
          <button @click="hapusTarget(index)" class="bg-red-500 text-white font-medium px-4 py-2 rounded-md hover:bg-red-600 transition">Hapus</button>
          <button @click="editTarget(index)" class="bg-yellow-500 text-white font-medium px-4 py-2 rounded-md hover:bg-yellow-600 transition">Edit</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["targetKeuangan"],
  methods: {
    toggleDetails(index) {
      this.$emit("toggleDetails", index);
    },
    perbaruiProgress(index) {
      this.$emit("perbaruiProgress", index);
    },
    hapusTarget(index) {
      this.$emit("hapusTarget", index);
    },
    editTarget(index) {
      this.$emit("editTarget", index);
    },
  },
};
</script>
