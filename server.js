const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (CSS, JS, images) from root
app.use(express.static(path.join(__dirname)));

// Serve images folder explicitly
app.use('/images', express.static(path.join(__dirname, 'images')));

// All routes serve index.html (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ EcoTrack running at http://localhost:${PORT}`);
});