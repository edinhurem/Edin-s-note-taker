// Dependenceis 
const { text } = require('express');
const express = require('express');
const res = require('express/lib/response');
const { readFileSync } = require('fs');
const path = require('path');
const db = require('./db/db.json')
const app = express();
const fs = require('fs');

// Port
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//API Routes

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
})
app.get('/api/notes', (req, res) => {
  res.json(db)
})

app.post('/api/notes', (req, res) => {

  const { title, text } = req.body;
  if (title && text) {
    const notes = {
      title,
      text,
      id: randomUUID()
    };

    const response = {
      status: 'success',
      body: notes,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting notes');
  }
});


// HTML ROUTES
app.get('*', (req, res,) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
})

// Listening
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
