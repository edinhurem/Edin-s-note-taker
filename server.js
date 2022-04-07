const { text } = require('express');
const express = require('express');
const res = require('express/lib/response');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
var uuid = require('uuid-random');
const req = require('express/lib/request');
const { json } = require('express/lib/response');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
})
app.get('/api/notes', (req, res) => {
  fs.readFile("db/db.json","utf8",(err,data)=>res.json(JSON.parse(data)));


  //GET /api/notes` should read the `db.json` file and return all saved notes as JSON.


});


app.post('/api/notes', (req, res) => {

  const { title, text } = req.body;
  if (title && text) {
    const notes = {
      title,
      text,
      id: uuid()
    };
    fs.readFile('./db/db.json', "utf8", function (err, data) {

      const text = JSON.parse(data)
      text.push(notes);

      fs.writeFile(`./db/db.json`,JSON.stringify(text), (err) =>
        err
          ? console.error(err)
          : console.log(
            'new note has been written to JSON file'
          )
      );
    })

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


//API ROUTE//

app.get('*', (req, res,) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
})
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
