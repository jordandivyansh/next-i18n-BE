const express = require('express');
const fs = require('fs');
const path = require('path');

const port = 3001;
const jsonPath = path.join(__dirname, 'data');

function messageJsonFor(locale) {
  const filepath = path.join(jsonPath, `${locale}.json`);
  const contents = fs.readFileSync(filepath, 'utf8');
  const json = JSON.parse(contents);
  return json;
}

const app = express();

app.get('/', (req, res) => {
  res.redirect('/en');
});

app.get('/en', (req, res) => {
  res.json(messageJsonFor('en'));
});

app.get('/es', (req, res) => {
  res.json(messageJsonFor('es'));
});

app.get('/:locale(en|es)/:slug', (req, res) => {
  const all = messageJsonFor(req.params.locale);

  const actualData = all.find((entry) => entry.slug === req.params.slug);

  if (!actualData) {
    return res.status(404).json({ message: 'Not Found' });
  }

  return res.json(actualData);
});

app.listen(port, () => {
  console.log(`i18n JSON app listening on port ${port}`);
});
