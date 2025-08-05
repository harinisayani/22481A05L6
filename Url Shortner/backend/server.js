const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
const urlDb = {}; 

function generated() {
  return Math.random().toString(36).substring(2, 8);
}

app.post('/shortener', (req, res) => {
  const { originalurl } = req.body;
  if (!originalurl) return res.status(400).json({ error: 'URL is required' });


  let code = generated();
  while (urlDb[code]) {
    code = generated();
  }
  urlDb[code] = originalurl;

  res.json({ shorturl: `http://localhost:${PORT}/r/${code}` });
});

app.get('/r/:code', (req, res) => {
  const code = req.params.code;
  const originalurl = urlDb[code];
  if (originalurl) {
    return res.redirect(originalurl);
  }
  res.status(404).send('URL not found');
});

app.listen(PORT, () => {
  console.log(`running on http://localhost:${PORT}`);
});


