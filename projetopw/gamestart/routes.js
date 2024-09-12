const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Home Page');
});

router.get('/about', (req, res) => {
  res.send('About Page');
});

router.get('/jog.html', (req, res) => {
  res.send('Home Page');
});

module.exports = router;
