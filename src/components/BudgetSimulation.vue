<template>
  <div class="max-w-xl mx-auto font-sans">
    <h1 class="text-2xl font-bold text-primary mb-4">Simulasi Perencanaan Uang</h1>

    <div class="mb-4">
      <label for="income" class="block text-sm text-gray-900 font-medium">Pendapatan Bulanan:</label>
      <div class="flex gap-3">
        <input type="number" id="income" v-model.number="income" placeholder="Masukkan pendapatan..." class="w-full p-2 border border-gray-300 rounded mt-2" />
        <button @click="calculateBudget" class="mt-2 px-4 py-2 bg-primary text-white rounded cursor-pointer hover:opacity-70" :disabled="income <= 0">Hitung</button>
      </div>
    </div>

    <div v-if="showResults" class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Hasil Pembagian</h2>
      <table class="w-full table-auto border-collapse mb-4">
        <thead>
          <tr>
            <th class="px-4 py-2 border-b text-left">Kategori</th>
            <th class="px-4 py-2 border-b text-left">Persentase</th>
            <th class="px-4 py-2 border-b text-left">Jumlah (Rp)</th>
            <th class="px-4 py-2 border-b text-left">Visualisasi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.name" class="hover:bg-gray-100">
            <td class="px-4 py-2 border-b">{{ category.name }}</td>
            <td class="px-4 py-2 border-b">
              <div class="flex items-center justify-between">
                <button @click="adjustPercentage(category, -5)" class="px-2 py-1 bg-gray-300 text-black rounded">-</button>
                <span>{{ category.percentage }}%</span>
                <button @click="adjustPercentage(category, 5)" class="px-2 py-1 bg-gray-300 text-black rounded">+</button>
              </div>
            </td>
            <td class="px-4 py-2 border-b">{{ ((income * category.percentage) / 100).toLocaleString() }}</td>
            <td class="px-4 py-2 border-b">
              <svg width="50" height="50" viewBox="0 0 50 50" class="transform rotate-90" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="20" stroke="#e6e6e6" stroke-width="4" fill="none" />
                <circle cx="25" cy="25" r="20" stroke="#4CAF50" stroke-width="4" fill="none" :stroke-dasharray="circumference" :stroke-dashoffset="circumference - (circumference * category.percentage) / 100" transform="rotate(-90 25 25)" />
              </svg>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="text-lg font-semibold"><strong>Sisa Uang:</strong> Rp{{ remainingAmount.toLocaleString() }}</div>

      <!-- Rekomendasi Tips -->
      <div v-if="recommendation" class="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500">
        <h3 class="font-semibold">Tips Mengalokasikan Dana:</h3>
        <p>{{ recommendation }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BudgetSimulation",
  data() {
    return {
      income: 0,
      categories: [
        { name: "Kebutuhan Primer", percentage: 50 },
        { name: "Kebutuhan Sekunder", percentage: 30 },
        { name: "Tabungan/Investasi", percentage: 20 },
      ],
      showResults: false,
      remainingAmount: 0,
      radius: 20, // Radius of the circle for the SVG
      recommendation: "", // Untuk menyimpan pesan rekomendasi
    };
  },
  computed: {
    // Circumference of the circle (used for stroke-dasharray)
    circumference() {
      return 2 * Math.PI * this.radius;
    },
  },
  methods: {
    calculateBudget() {
      const totalPercentage = this.categories.reduce((sum, category) => sum + category.percentage, 0);

      if (totalPercentage > 100) {
        alert("Total persentase tidak boleh lebih dari 100%.");
        return;
      }

      const allocatedAmount = this.categories.reduce((sum, category) => sum + (this.income * category.percentage) / 100, 0);
      this.remainingAmount = this.income - allocatedAmount;
      this.showResults = true;

      // Tentukan rekomendasi
      this.setRecommendation();
    },

    setRecommendation() {
      let recommendationMessage = "";

      // Rekomendasi jika persentase tabungan/investasi terlalu rendah
      const savingsCategory = this.categories.find((category) => category.name === "Tabungan/Investasi");
      if (savingsCategory.percentage < 20) {
        recommendationMessage += "Cobalah untuk meningkatkan persentase alokasi untuk Tabungan/Investasi agar dapat mencapai tujuan finansial jangka panjang. ";
      }

      // Rekomendasi untuk pengalokasian Kebutuhan Sekunder
      const secondaryNeedsCategory = this.categories.find((category) => category.name === "Kebutuhan Sekunder");
      if (secondaryNeedsCategory.percentage > 35) {
        recommendationMessage += "Pertimbangkan untuk mengurangi alokasi untuk Kebutuhan Sekunder agar lebih banyak dana tersedia untuk kebutuhan primer atau tabungan. ";
      }

      // Rekomendasi untuk Kebutuhan Primer
      const primaryNeedsCategory = this.categories.find((category) => category.name === "Kebutuhan Primer");
      if (primaryNeedsCategory.percentage < 50) {
        recommendationMessage += "Pastikan alokasi untuk Kebutuhan Primer mencukupi kebutuhan dasar Anda. ";
      }

      // Setel pesan rekomendasi
      this.recommendation = recommendationMessage || "Pembagian dana Anda sudah cukup seimbang!";
    },

    adjustPercentage(category, change) {
      // Hitung total persentase yang ada sebelum perubahan
      const currentTotalPercentage = this.categories.reduce((sum, cat) => sum + (cat === category ? category.percentage + change : cat.percentage), 0);

      // Pastikan total persentase tidak lebih dari 100%
      if (currentTotalPercentage <= 100) {
        // Mengubah persentase kategori
        category.percentage += change;

        // Pastikan persentase tidak kurang dari 0 atau lebih dari 100
        if (category.percentage < 0) category.percentage = 0;
        if (category.percentage > 100) category.percentage = 100;

        // Menghitung ulang sisa uang dan alokasi anggaran
        this.calculateBudget();
      }
    },
  },
};
</script>

<style scoped>
/* Optional: Additional styles can be added here for better appearance */
svg {
  display: block;
  margin: auto;
}
</style>
