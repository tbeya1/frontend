<template>
  <div id="app">
    <!-- Navigation -->
    <nav>
      <div class="content-wrapper">
        <ul class="nav-links" :class="{ 'show': menuOpen }">
          <!-- Use router-link for navigation -->
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/timezones">Time Zones</router-link></li>
          <li><router-link to="/About">About</router-link></li>
        </ul>
        <button class="hamburger" @click="toggleMenu">☰</button>
      </div>
    </nav>

    <!-- Header Section -->
    <header>
      <div class="content-wrapper">
        <h1>World Time Information</h1>
        <button @click="getTime" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          {{ loading ? 'Fetching...' : 'Fetch New Time' }}
        </button>
      </div>
    </header>

    <!-- Main Section -->
    <main>
      <router-view></router-view>
      <div class="content-wrapper">
        <section class="time-grid">
          <article class="container" v-for="item in time_info" :key="item._id">
            <h3 class="timezone">{{ item.timezone }}</h3>
            <p><strong>Datetime:</strong> <span>{{ item.datetime }}</span></p>
            <p><strong>UTC Offset:</strong> <span>{{ item.utc_offset }}</span></p>
            <p><strong>Abbreviation:</strong> <span>{{ item.abbreviation }}</span></p>
            <p><strong>Day of the Week:</strong> <span>{{ item.day_of_week }}</span></p>
            <p><strong>Day of the Year:</strong> <span>{{ item.day_of_year }}</span></p>
            <p><strong>Unix Time:</strong> <span>{{ item.unixtime }}</span></p>
            <p><strong>UTC DateTime:</strong> <span>{{ item.utc_datetime }}</span></p>
          </article>
        </section>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="time_info.length === 0" class="no-data-message">No time data available.</p>
      </div>
    </main>

    <!-- Footer -->
    <footer>
      <div class="content-wrapper">
        <p>&copy; 2025 World Time App</p>
      </div>
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
    async getTime() {
      this.loading = true;
      this.errorMessage = "";
      try {
        //const response = await fetch("http://localhost:9999/fetch-time");

        //const response = await fetch("https://finalweb-6lny.onrender.com/fetch-time");
        // Fetch time data from the backend URL defined in the environment variable
        const response = await fetch(`${process.env.VUE_APP_BACKEND_URL}/fetch-time`);

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
        //const res = await fetch("http://localhost:9999/time_info");
        
        //const response = await fetch("https://finalweb-6lny.onrender.com/time_info");
        // Fetch time information from the backend URL defined in the environment variable
        const response = await fetch(`${process.env.VUE_APP_BACKEND_URL}/time_info`);
        
        if (!response.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        console.log("Data fetched successfully:", data); // Log the fetched data
        this.time_info = data;
      } catch (error) {
        this.errorMessage = `Failed to load time data! ${error.message}`;
        console.error("Error fetching time data:", error);
      }
    },
  },

  mounted() {
    this.loadTime();
  },
};
</script>

<style scoped>
/* Base Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  width: 100%;
  font-family: 'Montserrat', sans-serif;
  background-color: #fafafa;
  color: #333;
}

/* App Container */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Content Wrapper */
.content-wrapper {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px;
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

.nav-links a,
.nav-links router-link {
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
    display: block; /* Show hamburger button on mobile */
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

  .nav-links a,
  .nav-links router-link {
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

/* Main */
main {
  flex-grow: 1;
  background-color: #f4f4f4;
  padding: 30px 0;
}

/* Grid Layout */
.time-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  padding: 20px;
}

/* Time Card */
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

/* Error Message */
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

/* Footer */
footer {
  background-color: #003366;
  color: white;
  text-align: center;
  padding: 20px 0;
  font-size: 1em;
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
