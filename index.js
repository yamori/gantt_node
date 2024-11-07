const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve the HTML file
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to serve CSV data
app.get('/data', (req, res) => {
   const results = [];
   fs.createReadStream('data.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
         res.json(results);
      });
});

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
