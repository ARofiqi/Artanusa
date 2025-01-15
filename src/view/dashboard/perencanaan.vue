<template>
  <div class="bg-secondary">
    <div class="p-6">
      <div class="flex justify-between mb-5">
        <h1 class="text-3xl font-bold text-center mb-6 text-primary">Perencanaan Target Keuangan</h1>
        <div class="flex mb-4">
          <button @click="showPopup = true" class="bg-primary text-white font-medium px-4 py-2 rounded-md hover:opacity-70 transition">+ Tambah Target Perencanaan</button>
        </div>
      </div>

      <div v-if="showPopup" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 class="text-xl font-bold mb-4">{{ isEditing ? "Edit Target Keuangan" : "Tambah Target Keuangan" }}</h2>
          <form @submit.prevent="isEditing ? simpanEditTarget() : tambahTarget()">
            <div class="mb-4">
              <label for="namaTarget" class="block text-sm font-medium text-gray-700">Nama Target:</label>
              <input type="text" id="namaTarget" v-model="form.namaTarget" class="mt-1 block w-full border-gray-300 p-2 rounded-sm shadow-sm focus:ring-primary focus:border-primary" placeholder="Masukkan nama target" required />
            </div>
            <div class="mb-4">
              <label for="jumlahTarget" class="block text-sm font-medium text-gray-700">Jumlah Target (Rp):</label>
              <input
                type="number"
                id="jumlahTarget"
                v-model.number="form.jumlahTarget"
                class="mt-1 block w-full border-gray-300 p-2 rounded-sm shadow-sm focus:ring-primary focus:border-primary"
                placeholder="Masukkan jumlah target"
                required
              />
            </div>
            <div class="mb-4">
              <label for="waktu" class="block text-sm font-medium text-gray-700">Waktu (Bulan):</label>
              <input type="number" id="waktu" v-model.number="form.waktu" class="mt-1 block w-full border-gray-300 p-2 rounded-sm shadow-sm focus:ring-primary focus:border-primary" placeholder="Masukkan waktu (bulan)" required />
            </div>
            <div class="flex justify-between">
              <button type="submit" class="bg-primary text-white font-medium px-4 py-2 rounded-md hover:bg-blue-600 transition">
                {{ isEditing ? "Simpan Perubahan" : "Tambahkan" }}
              </button>
              <button type="button" @click="showPopup = false" class="bg-gray-300 text-black font-medium px-4 py-2 rounded-md hover:bg-gray-400 transition">Batal</button>
            </div>
          </form>
        </div>
      </div>

      <div v-if="showConfirmPopup" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 class="text-xl font-bold mb-4">Konfirmasi Penghapusan</h2>
          <p>Apakah Anda yakin ingin menghapus target ini?</p>
          <div class="flex justify-between mt-6">
            <button @click="hapusTarget(deleteIndex)" class="bg-red-600 text-white font-medium px-4 py-2 rounded-md hover:bg-red-700 transition">Hapus</button>
            <button @click="batalHapus" class="bg-gray-300 text-black font-medium px-4 py-2 rounded-md hover:bg-gray-400 transition">Batal</button>
          </div>
        </div>
      </div>

      <TargetKeuanganList :targetKeuangan="targetKeuangan" @toggle-details="toggleDetails" @perbarui-progress="perbaruiProgress" @hapus-target="konfirmasiHapusTarget" @edit-target="editTarget" />
    </div>
  </div>
</template>

<script>
import axios from "../../axios";
import TargetKeuanganList from "../../components/TargetKeuanganList.vue";

export default {
  components: {
    TargetKeuanganList,
  },
  data() {
    return {
      showPopup: false,
      showConfirmPopup: false,
      isEditing: false,
      editIndex: null,
      deleteIndex: null,
      form: {
        namaTarget: "",
        jumlahTarget: 0,
        waktu: 0,
      },
      targetKeuangan: [],
    };
  },
  methods: {
    konfirmasiHapusTarget(index) {
      this.deleteIndex = index;
      this.showConfirmPopup = true;
    },
    batalHapus() {
      this.showConfirmPopup = false;
      this.deleteIndex = null;
    },
    async hapusTarget(index) {
      try {
        const target = this.targetKeuangan[index];
        const token = this.getAuthToken();
        await axios.delete(`/target/${target.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.targetKeuangan.splice(index, 1);
      } catch (error) {
        console.error("Error deleting target:", error);
      } finally {
        this.batalHapus();
      }
    },
    editTarget(index) {
      const target = this.targetKeuangan[index];
      this.editIndex = index;
      this.isEditing = true;
      this.showPopup = true;

      this.form = {
        namaTarget: target.namaTarget,
        jumlahTarget: target.jumlahTarget,
        waktu: target.waktu,
      };
    },
    async simpanEditTarget() {
      try {
        const token = this.getAuthToken();
        const target = this.targetKeuangan[this.editIndex];

        await axios.put(
          `/target/${target.id}`,
          {
            goal_name: this.form.namaTarget,
            total_goal: this.form.jumlahTarget.toString(),
            saving_duration: this.form.waktu,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        this.targetKeuangan[this.editIndex] = {
          ...target,
          namaTarget: this.form.namaTarget,
          jumlahTarget: this.form.jumlahTarget,
          waktu: this.form.waktu,
          tabunganPerBulan: this.form.waktu > 0 ? Math.ceil(this.form.jumlahTarget / this.form.waktu) : 0,
          deadline: new Date(new Date().setMonth(new Date().getMonth() + this.form.waktu)),
        };

        this.resetForm();
        this.isEditing = false;
        this.showPopup = false;
      } catch (error) {
        console.error("Error updating target:", error);
      }
    },
    resetForm() {
      this.form = {
        namaTarget: "",
        jumlahTarget: 0,
        waktu: 0,
      };
      this.editIndex = null;
      this.isEditing = false;
    },
    toggleDetails(index) {
      this.targetKeuangan[index].showDetails = !this.targetKeuangan[index].showDetails;
    },
    getAuthToken() {
      return sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
    },
    async fetchTargets() {
      try {
        const token = this.getAuthToken();
        const response = await axios.get("/target", {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.targetKeuangan = response.data.data.map((target) => {
          const jumlahTarget = parseFloat(target.total_goal);
          const tabunganSekarang = target.current_amount ? parseFloat(target.current_amount) : 0;
          const waktu = parseInt(target.saving_duration);

          return {
            id: target.goal_id,
            namaTarget: target.goal_name,
            jumlahTarget,
            waktu,
            progress: tabunganSekarang ? Math.floor((tabunganSekarang / jumlahTarget) * 100) : 0,
            tabunganSekarang,
            tabunganPrev: tabunganSekarang, // Nilai awal sama dengan jumlah sekarang
            tabunganPerBulan: waktu > 0 ? Math.ceil(jumlahTarget / waktu) : 0,
            tabunganTambah: 0,
            selesai: target.status === 1,
            showDetails: false,
            deadline: new Date(new Date().setMonth(new Date().getMonth() + waktu)),
          };
        });
      } catch (error) {
        console.error("Error fetching targets:", error);
      }
    },
    async tambahTarget() {
      try {
        const token = this.getAuthToken();
        const response = await axios.post(
          "/target",
          {
            goal_name: this.form.namaTarget,
            total_goal: this.form.jumlahTarget.toString(),
            saving_duration: this.form.waktu,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const jumlahTarget = this.form.jumlahTarget;
        const waktu = this.form.waktu;

        this.targetKeuangan.push({
          id: response.data.data.goal_id,
          namaTarget: this.form.namaTarget,
          jumlahTarget,
          waktu,
          tabunganSekarang: 0,
          progress: 0,
          selesai: false,
          tabunganPrev: 0,
          tabunganPerBulan: waktu > 0 ? Math.ceil(jumlahTarget / waktu) : 0,
          tabunganTambah: 0,
          showDetails: false,
          deadline: new Date(new Date().setMonth(new Date().getMonth() + waktu)),
        });

        this.resetForm();
        this.showPopup = false;
      } catch (error) {
        console.error("Error adding target:", error);
      }
    },
    async hapusTarget(index) {
      try {
        const target = this.targetKeuangan[index];
        const token = this.getAuthToken();
        await axios.delete(`/target/${target.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.targetKeuangan.splice(index, 1);
      } catch (error) {
        console.error("Error deleting target:", error);
      }
    },
    async perbaruiProgress(index) {
      try {
        const target = this.targetKeuangan[index];
        const token = this.getAuthToken();

        target.tabunganPrev = target.tabunganSekarang;

        target.tabunganSekarang += target.tabunganTambah;
        target.progress = Math.floor((target.tabunganSekarang / target.jumlahTarget) * 100);
        target.selesai = target.progress >= 100;

        await axios.put(
          `/target/${target.id}`,
          {
            goal_name: target.namaTarget,
            total_goal: target.jumlahTarget.toString(),
            saving_duration: target.waktu,
            current_amount: target.tabunganSekarang.toString(),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        target.tabunganTambah = 0;
      } catch (error) {
        console.error("Error updating progress:", error);

        const target = this.targetKeuangan[index];
        target.tabunganSekarang = target.tabunganPrev;
        target.progress = Math.floor((target.tabunganSekarang / target.jumlahTarget) * 100);
        target.selesai = target.progress >= 100;
      }
    },
    resetForm() {
      this.form = {
        namaTarget: "",
        jumlahTarget: 0,
        waktu: 0,
      };
    },
  },
  mounted() {
    this.fetchTargets();
  },
};
</script>
