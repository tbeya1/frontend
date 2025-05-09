<template>
    <div class="about">
      <h1>About This Project</h1>
      <p>This is my final project for the web, designed to provide real-time world time information.</p>
      <p>The app fetches current time data for various locations and displays it in an easy-to-read format.</p>
  
      <h3>Technologies Used:</h3>
      <ul>
        <li>Frontend: Vue 3, Vue Router, Vite</li>
        <li>Backend: Node.js, Express</li>
        <li>Styling: CSS Flexbox, Grid Layout</li>
      </ul>
  
      <h3>Features:</h3>
      <ul>
        <li>Responsive design for desktop and mobile</li>
        <li>Dynamic time updates from API</li>
        <li>Interactive navigation</li>
      </ul>
  
      <p>Check out the <a href="https://github.com/your-github-link" target="_blank">GitHub repository</a> for more!</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'About'
  };
  </script>
  
  <style scoped>
  .about {
    padding: 20px;
    background-color: #f4f4f4;
    color: #333;
  }
  
  h1 {
    font-size: 2em;
    margin-bottom: 20px;
  }
  
  ul {
    list-style-type: disc;
    margin-left: 20px;
  }
  
  a {
    color: #003366;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  