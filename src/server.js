// server.js

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all origins

// Endpoint to handle appending data to the JSON file
app.post('/appendData', (req, res) => {
  const newData = req.body;

  // Read existing data from JSON file
  fs.readFile('data.json', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    let existingData = [];

    // Check if data is not empty
    if (data.length > 0) {
      try {
        existingData = JSON.parse(data);
      } catch (parseError) {
        console.error('Error parsing JSON data:', parseError);
        return res.status(500).json({ error: 'Error parsing JSON data' });
      }
    }

    // Append new data to existing data
    existingData.push(newData);

    // Write updated data back to JSON file
    fs.writeFile('data.json', JSON.stringify(existingData, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json({ message: 'Data appended successfully' });
    });
  });
});

app.get('/getData', (req, res) => {
    // Read data from data.json file
    fs.readFile('data.json', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      // Parse JSON data and send it as response
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    });
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
