// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import TimeZones from './views/TimeZones.vue';
import About from './views/About.vue';  // Import About.vue

const routes = [
  { path: '/', component: Home },
  { path: '/timezones', component: TimeZones },
  { path: '/about', component: About }, // Add route for About page
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
