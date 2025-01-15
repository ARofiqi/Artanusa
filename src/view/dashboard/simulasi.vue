<template>
  <div class="bg-secondary">
    <div v-if="savedSimulations.length > 0" class="p-5 bg-secondary">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Daftar Simulasi yang Disimpan</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(simulation, index) in savedSimulations" :key="index" class="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <div class="mb-4">
            <h3 class="text-lg font-semibold text-gray-700">{{ index + 1 }}. {{ simulation.name }}</h3>
            <p class="text-sm text-gray-500">Pendapatan: Rp{{ simulation.income ? simulation.income.toLocaleString() : 0 }}</p>
          </div>
          <div class="mb-4">
            <ul class="space-y-2">
              <li v-for="category in simulation.categories" :key="category.name" class="flex justify-between text-gray-600 text-sm">
                <span>{{ category.name }}</span>
                <span> {{ category.percentage }}% (Rp{{ ((simulation.income * category.percentage) / 100).toLocaleString() }}) </span>
              </li>
            </ul>
          </div>
          <div class="mt-2">
            <p class="text-gray-700 font-medium"><strong>Sisa Uang:</strong> Rp{{ simulation.remainingAmount ? simulation.remainingAmount.toLocaleString() : 0 }}</p>
          </div>
          <button @click="deleteSimulation(simulation.simulation_id)" class="mt-4 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition">Hapus Simulasi</button>
        </div>
      </div>
    </div>
    <div class="font-sans bg-secondary flex flex-col p-5">
      <div>
        <h1 class="text-2xl font-bold text-primary mb-4">Simulasi Perencanaan Uang</h1>
        <div class="mb-4">
          <label for="income" class="block text-sm text-gray-900 font-medium">Masukan Pendapatan Bulanan:</label>
          <div class="flex gap-3">
            <input type="number" id="income" v-model.number="income" placeholder="Masukkan pendapatan..." class="w-full p-2 border border-gray-300 rounded mt-2" />
            <button @click="calculateBudget" class="mt-2 px-4 py-2 bg-primary text-white rounded cursor-pointer hover:opacity-70" :disabled="income <= 0">Hitung</button>
          </div>
        </div>
      </div>
      <div v-if="showResults" class="flex gap-5 py-5 text-primary flex-col">
        <div>
          <h2 class="text-xl font-semibold mb-4">Hasil Pembagian</h2>
          <table class="w-full table-auto border-collapse border border-gray-300 mb-4 shadow-lg rounded-lg bg-white">
            <thead class="bg-gray-200">
              <tr>
                <th class="px-4 py-2 border-b border-gray-300 text-left font-semibold text-gray-700">Kategori</th>
                <th class="px-4 py-2 border-b border-gray-300 text-left font-semibold text-gray-700">Persentase</th>
                <th class="px-4 py-2 border-b border-gray-300 text-left font-semibold text-gray-700">Jumlah (Rp)</th>
                <th class="px-4 py-2 border-b border-gray-300 text-left font-semibold text-gray-700">Visualisasi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="category in categories" :key="category.name" class="hover:bg-gray-50 transition-colors">
                <td class="px-4 py-2 border-b border-gray-300 text-gray-700">{{ category.name }}</td>
                <td class="px-4 py-2 border-b border-gray-300">
                  <div class="flex items-center">
                    <button @click="adjustPercentage(category, -5)" class="px-2 py-1 bg-red-400 text-white rounded shadow hover:bg-red-500 transition">-</button>
                    <span class="mx-2 font-medium text-gray-700">{{ category.percentage }}%</span>
                    <button @click="adjustPercentage(category, 5)" class="px-2 py-1 bg-green-400 text-white rounded shadow hover:bg-green-500 transition">+</button>
                  </div>
                </td>
                <td class="px-4 py-2 border-b border-gray-300 text-gray-700">{{ ((income * category.percentage) / 100).toLocaleString() }}</td>
                <td class="px-4 py-2 border-b border-gray-300">
                  <svg width="50" height="50" viewBox="0 0 50 50" class="transform rotate-90 mx-auto" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="20" stroke="#e6e6e6" stroke-width="4" fill="none" />
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      stroke="#4CAF50"
                      stroke-width="4"
                      fill="none"
                      :stroke-dasharray="circumference"
                      :stroke-dashoffset="circumference - (circumference * category.percentage) / 100"
                      transform="rotate(-90 25 25)"
                    />
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-lg font-semibold mt-2"><strong>Sisa Uang:</strong> Rp{{ remainingAmount.toLocaleString() }}</div>
          <button @click="saveSimulation" class="mt-4 px-6 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition cursor-pointer">Simpan Simulasi</button>
        </div>
        <div>
          <div v-if="recommendation" class="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500">
            <h3 class="font-semibold">Tips Mengalokasikan Dana:</h3>
            <p>{{ recommendation }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "../../axios";

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
      showResults: true,
      remainingAmount: 0,
      radius: 20,
      recommendation: "",
      savedSimulations: [],
    };
  },
  computed: {
    circumference() {
      return 2 * Math.PI * this.radius;
    },
  },
  methods: {
    getAuthHeaders() {
      const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
      return {
        Authorization: `Bearer ${token}`,
      };
    },
    async fetchDataSimulation() {
      try {
        const headers = this.getAuthHeaders();
        const response = await axios.get("/simulations", { headers });
        this.savedSimulations = response.data.data;
        console.log(response.data.data);
        console.log(this.savedSimulations);
      } catch (error) {
        console.error("Error fetching saved simulations:", error);
      }
    },
    async saveSimulation() {
      try {
        const headers = this.getAuthHeaders();
        const simulationData = {
          income: this.income,
          primary_expense: (this.income * this.categories[0].percentage) / 100,
          secondary_expense: (this.income * this.categories[1].percentage) / 100,
          tertiary_expense: (this.income * this.categories[2].percentage) / 100,
        };

        const response = await axios.post("/simulations", simulationData, { headers });

        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: `Simulasi "${response.data.name}" berhasil disimpan!`,
          timer: 2000,
          showConfirmButton: false,
        });

        this.savedSimulations.push(response.data);
      } catch (error) {
        console.error("Error while saving simulation:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Terjadi kesalahan saat menyimpan simulasi.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    },
    async deleteSimulation(simulationId) {
      try {
        const headers = this.getAuthHeaders();
        const response = await axios.delete(`/simulations/${simulationId}`, { headers });

        if (response.status === 200) {
          this.savedSimulations = this.savedSimulations.filter((sim) => sim.id !== simulationId);

          Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: "Simulasi berhasil dihapus!",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal!",
            text: "Terjadi kesalahan saat menghapus simulasi.",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        console.error("Error while deleting simulation:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Terjadi kesalahan saat menghapus simulasi.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    },
    calculateBudget() {
      const totalPercentage = this.categories.reduce((sum, category) => sum + category.percentage, 0);

      if (totalPercentage > 100) {
        alert("Total persentase tidak boleh lebih dari 100%.");
        return;
      }

      const allocatedAmount = this.categories.reduce((sum, category) => sum + (this.income * category.percentage) / 100, 0);
      this.remainingAmount = this.income - allocatedAmount;
      this.showResults = true;

      this.setRecommendation();
    },
    setRecommendation() {
      let recommendationMessage = "";

      const savingsCategory = this.categories.find((category) => category.name === "Tabungan/Investasi");
      if (savingsCategory.percentage < 20) {
        recommendationMessage += "Cobalah untuk meningkatkan persentase alokasi untuk Tabungan/Investasi agar dapat mencapai tujuan finansial jangka panjang. ";
      }

      const secondaryNeedsCategory = this.categories.find((category) => category.name === "Kebutuhan Sekunder");
      if (secondaryNeedsCategory.percentage > 35) {
        recommendationMessage += "Pertimbangkan untuk mengurangi alokasi untuk Kebutuhan Sekunder agar lebih banyak dana tersedia untuk kebutuhan primer atau tabungan. ";
      }

      const primaryNeedsCategory = this.categories.find((category) => category.name === "Kebutuhan Primer");
      if (primaryNeedsCategory.percentage < 50) {
        recommendationMessage += "Pastikan alokasi untuk Kebutuhan Primer mencukupi kebutuhan dasar Anda. ";
      }

      this.recommendation = recommendationMessage || "Pembagian dana Anda sudah cukup seimbang!";
    },
    adjustPercentage(category, change) {
      const currentTotalPercentage = this.categories.reduce((sum, cat) => sum + (cat === category ? category.percentage + change : cat.percentage), 0);

      if (currentTotalPercentage <= 100) {
        category.percentage += change;

        if (category.percentage < 0) category.percentage = 0;
        if (category.percentage > 100) category.percentage = 100;

        this.calculateBudget();
      }
    },
  },
  mounted() {
    // this.fetchDataSimulation();
  },
};
</script>

<style scoped>
svg {
  display: block;
  margin: auto;
}
</style>