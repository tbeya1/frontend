<template>
  <div id="app">
    <!-- Navigation -->
    <nav>
      <div class="content-wrapper">
        <ul class="nav-links" :class="{ 'show': menuOpen }">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/timezones">Time Zones</router-link></li>
          <li><router-link to="/about">About</router-link></li>
        </ul>
        <button class="hamburger" @click="toggleMenu">☰</button>
      </div>
    </nav>

    <!-- Header -->
    <header>
      <div class="content-wrapper">
        <h1>World Time Information</h1>
        <button @click="getTime" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          {{ loading ? 'Fetching...' : 'Fetch New Time' }}
        </button>
      </div>
    </header>

    <!-- Main -->
    <main>
      <div class="content-wrapper">
        <section class="time-grid">
          <article class="container" v-for="item in time_info" :key="item._id">
            <h3 class="timezone">{{ item.timezone }}</h3>
            <p><strong>Datetime:</strong> {{ formatDate(item.datetime) }}</p>
            <p><strong>UTC Offset:</strong> {{ item.utc_offset }}</p>
            <p><strong>Abbreviation:</strong> {{ item.abbreviation }}</p>
            <p><strong>Day of the Week:</strong> {{ item.day_of_week }}</p>
            <p><strong>Day of the Year:</strong> {{ item.day_of_year }}</p>
            <p><strong>Unix Time:</strong> {{ item.unixtime }}</p>
            <p><strong>UTC Datetime:</strong> {{ formatDate(item.utc_datetime) }}</p>
          </article>
        </section>

        <!-- Error & No Data Messages -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="!loading && time_info.length === 0" class="no-data-message">No time data available.</p>
        
        <router-view /> <!-- Dynamically loads the content of other views -->
      </div>
    </main>

    <!-- Footer -->
    <footer>

    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time_info: [],
      loading: false,
      errorMessage: "",
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleString();
    },
    async getTime() {
      this.loading = true;
      this.errorMessage = "";
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/fetch-time`);
        if (!response.ok) throw new Error("Failed to fetch new time!");
        await this.loadTime();
      } catch (error) {
        this.errorMessage = "Failed to fetch new time data!";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async loadTime() {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/time_info`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        this.time_info = data;
      } catch (error) {
        this.errorMessage = `Failed to load time data! ${error.message}`;
        console.error("Error fetching time data:", error);
      }
    },
  },
  mounted() {
    console.log("Backend URL:", import.meta.env.VITE_APP_BACKEND_URL);
    this.loadTime();
  },
};
</script>

<style scoped>
/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  font-family: 'Montserrat', sans-serif;
  background-color: #fafafa;
  color: #333;
  height: 100%;
}

/* App Layout */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Navigation */
nav {
  background-color: #002855;
  color: white;
  padding: 15px 0;
}

.nav-links {
  display: flex;
  list-style: none;
  justify-content: center;
  gap: 30px;
}

.nav-links a {
  color: white;
  font-weight: bold;
  text-decoration: none;
}

.hamburger {
  display: none;
  font-size: 30px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

@media (max-width: 768px) {
  .hamburger {
    display: block;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    background-color: #003366;
    position: absolute;
    top: 60px;
    right: 0;
    width: 100%;
  }

  .nav-links.show {
    display: flex;
  }

  .nav-links a {
    padding: 10px;
    text-align: center;
  }
}

/* Header */
header {
  background-color: #003366;
  color: white;
  text-align: center;
  padding: 30px 0;
}

header h1 {
  font-size: 2.5em;
  margin-bottom: 15px;
}

header button {
  background-color: #28a745;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

header button:disabled {
  background-color: #ccc;
}

header button:hover:enabled {
  background-color: #218838;
}

/* Main Content */
main {
  flex-grow: 1;
  background-color: #f4f4f4;
  padding: 30px 0;
}

/* Time Grid */
.time-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  padding: 20px;
}

/* Time Card Styling */
.container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.container:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.container h3 {
  color: #003366;
  margin-bottom: 10px;
}

.container p {
  margin: 6px 0;
  font-size: 1.05em;
}

/* Footer */
footer {
  background-color: #003366;
  color: white;
  text-align: center;
  padding: 20px 0;
}

/* Error & Loading States */
.error-message {
  color: #b30000;
  background: #ffe6e6;
  border-left: 5px solid #b30000;
  padding: 10px;
  border-radius: 4px;
  margin-top: 20px;
}

.no-data-message {
  color: #888;
  font-size: 1.2em;
  margin-top: 20px;
}

/* Spinner */
.spinner {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #28a745;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin-right: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
