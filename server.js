const { text } = require('express');
const express = require('express');
const res = require('express/lib/response');
const { readFileSync } = require('fs');
const path = require('path');
const db = require('./db/db.json')
const app = express();
const PORT = process.env.PORT || 3001;
var uuid = require('uuid-random');


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
})
app.get('/api/notes', (req, res) => {
  res.json(db)
})

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

app.post('/api/notes', (req, res) => {

  const { title, text } = req.body;
  if (title && text) {
    const notes = {
      title,
      text,
      id: uuid()
    };

    const response = {
      status: 'success',
      body: notes,
    };

    console.log(response);
    res.status(201).json(resposne);
  } else {
    res.status(500).json('Error in posting notes');
  }
});

app.delete('/:id', (req, res) => res.json('DELETE route'));


app.get('*', (req, res,) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
})
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
