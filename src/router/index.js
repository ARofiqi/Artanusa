import { createRouter, createWebHistory } from "vue-router";
import Home from "../view/home.vue";

import Login from "../view/login.vue";
import Register from "../view/register.vue";
import Dashboard from "../view/dashboard/index.vue";

import DashboardBeranda from "../view/dashboard/beranda.vue";
import DashboardPerencanaan from "../view/dashboard/perencanaan.vue";
import DashboardRekomendasi from "../view/dashboard/rekomendasi.vue";
import DashboardSimulasi from "../view/dashboard/simulasi.vue";
import DashboardLaporan from "../view/dashboard/laporan.vue";

const routes = [
  {
    path: "/",
    name: "homepage",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    redirect: { name: "dashboard-beranda" },
    children: [
      {
        path: "beranda",
        name: "dashboard-beranda",
        components: {
          "main-dashboard": DashboardBeranda,
        },
      },
      {
        path: "rekomendasi",
        name: "dashboard-rekomendasi",
        components: {
          "main-dashboard": DashboardRekomendasi,
        },
      },
      {
        path: "perencanaan",
        name: "dashboard-perencanaan",
        components: {
          "main-dashboard": DashboardPerencanaan,
        },
      },
      {
        path: "simulasi",
        name: "dashboard-simulasi",
        components: {
          "main-dashboard": DashboardSimulasi,
        },
      },
      {
        path: "laporan",
        name: "dashboard-laporan",
        components: {
          "main-dashboard": DashboardLaporan,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
