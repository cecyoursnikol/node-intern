const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;


const storage = multer.diskStorage({
    destination: 'uploads/',  
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);  
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },  
}).single('myImage');  

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.send(`Error: ${err}`);
        }
        if (!req.file) {
            return res.send('Error: No File Selected!');
        }
        res.send(`File Uploaded: ${req.file.filename}`);
    });
});

// Serve HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
