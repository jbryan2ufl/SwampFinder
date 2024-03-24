const http = require('http');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app=express();
app.use(bodyParser.json());

const ImportData = require('./ImportData');

const Building = require('./Building');

if (!Building.buildingContainer) {
    ImportData.loadBuildings();
    ImportData.loadClassRooms();
}

// Apply CORS middleware
app.use(cors());

// API endpoint to retrieve data
app.get('/api/data', (req, res) => {
    const data = Building.buildingContainer;
    console.log(data);
    res.status(200).json({ data });
});

// API endpoint to get building info
app.post('/api/getBuildingInfo', (req, res) => {
    const buildingName = req.body.params.buildingId;
    const data = Building.buildingContainer;
    const result = data.find(item => item.name === buildingName);
    res.status(200).send(result);
});

// Handle 404 Not Found
app.use((req, res) => {
    res.status(404).send('Not Found');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});