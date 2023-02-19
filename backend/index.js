const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json());

app.get('/specifications', (req, res) => {
  fs.readFile('./mock-specifications.json', (err, data) => {
    if (err) {
      return res.status(500).send();
    }
    return res.status(200).send(JSON.parse(data));
  });
});

app.put('/specifications', (req, res) => {
    fs.writeFile('./mock-specifications.json', JSON.stringify(req.body), (err) => {
        if (err) {
            return res.status(500).send();
        }
        return res.status(200).send();
    });
});

app.get('/materials', (req, res) => {
    fs.readFile('./mock-materials.json', (err, data) => {
        if (err) {
            return res.status(500).send();
        }
        return res.status(200).send(JSON.parse(data));
    });
});

app.put('/materials', (req, res) => {
    fs.writeFile('./mock-materials.json', JSON.stringify(req.body), (err) => {
        if (err) {
            return res.status(500).send();
        }
        return res.status(200).send();
    });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server listening on port 3000');
});