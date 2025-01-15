<template>
  <div class="max-w-lg p-4 bg-white shadow-md rounded-lg">
    <div class="flex justify-between items-center mb-4">
      <button @click="previousMonth" class="text-gray-500 hover:text-gray-700">◀️</button>
      <h2 class="text-lg font-bold text-gray-800">{{ currentMonthName }} {{ currentYear }}</h2>
      <button @click="nextMonth" class="text-gray-500 hover:text-gray-700">▶️</button>
    </div>
    <div class="grid grid-cols-7 text-center text-gray-600 font-medium mb-2">
      <div v-for="day in daysOfWeek" :key="day" class="py-1">
        {{ day }}
      </div>
    </div>
    <div class="grid grid-cols-7 gap-1">
      <div
        v-for="(cell, index) in calendarCells"
        :key="index"
        class="relative p-2 h-16 flex flex-col justify-start items-center border rounded-lg"
        :class="{
          'bg-blue-100 border-blue-300': cell.hasEvent,
          'border-gray-200': !cell.hasEvent,
        }"
        @click="showEventDetails(cell)"
      >
        <span class="text-sm font-semibold text-gray-700">
          {{ cell.date ? cell.date.getDate() : "" }}
        </span>
        <div v-if="cell.hasEvent" class="absolute bottom-1 left-1 right-1 bg-blue-500 text-white text-xs rounded p-1">
          {{ cell.events[0].title }}
        </div>
      </div>
    </div>

    <div v-if="selectedEvent" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 class="text-xl font-bold">{{ selectedEvent.title }}</h3>
        <p class="mt-2 text-gray-700">{{ selectedEvent.description }}</p>
        <p class="mt-2 text-gray-600">Date: {{ selectedEvent.date }}</p>
        <button @click="closeEventDetails" class="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    events: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    const today = new Date();
    return {
      currentMonth: today.getMonth(),
      currentYear: today.getFullYear(),
      daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      selectedEvent: null, // Store selected event details
    };
  },
  computed: {
    currentMonthName() {
      return new Date(this.currentYear, this.currentMonth).toLocaleString("en-US", {
        month: "long",
      });
    },
    calendarCells() {
      const startOfMonth = new Date(this.currentYear, this.currentMonth, 1);
      const endOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
      const startDay = startOfMonth.getDay();
      const daysInMonth = endOfMonth.getDate();

      const cells = [];
      for (let i = 0; i < startDay; i++) {
        cells.push({ date: null, hasEvent: false, events: [] });
      }
      for (let date = 1; date <= daysInMonth; date++) {
        const currentDate = new Date(this.currentYear, this.currentMonth, date);
        const eventMatches = this.events.filter((event) => new Date(event.date).toDateString() === currentDate.toDateString());
        cells.push({
          date: currentDate,
          hasEvent: eventMatches.length > 0,
          events: eventMatches,
        });
      }
      return cells;
    },
  },
  methods: {
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    },
    previousMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    },
    showEventDetails(cell) {
      if (cell.events.length > 0) {
        this.selectedEvent = cell.events[0];
      }
    },
    closeEventDetails() {
      this.selectedEvent = null;
    },
  },
};
</script>

<style scoped>
/* Tailwind sudah menangani styling, no custom CSS needed */
</style>
