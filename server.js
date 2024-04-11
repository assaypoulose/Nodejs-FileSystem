const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');
const path = require('path');

const filesDirectory = path.join(__dirname, 'files');

// Create the 'files' directory if it doesn't exist
if (!fs.existsSync(filesDirectory)) {
    fs.mkdirSync(filesDirectory);
}

// Endpoint to create a text file with the current timestamp
app.post('/create-file', (req, res) => {
    const timestamp = new Date().toISOString();
    const fileName = `${timestamp.replace(/:/g, '-')}.txt`;
    const filePath = path.join(filesDirectory, fileName);

    fs.writeFile(filePath, timestamp, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error writing file');
        } else {
            res.status(201).send(`File created: ${filePath}`);
        }
    });
});

// Endpoint to retrieve all text files in the specified folder
app.get('/files', (req, res) => {
    fs.readdir(filesDirectory, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading files');
        } else {
            res.status(200).json(files);
        }
    });
});

app.get('/',(req, res)=>{
    res.status(200).send('Welcome to my Node File System')
})

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
});
