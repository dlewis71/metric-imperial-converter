const express = require('express');
const router = express.Router();
const convertHandler = require('../controllers/convertHandler');

router.get('/convert', (req, res) => {
  const input = req.query.input;
  const result = convertHandler.convert(input);

  if (result.error) return res.send(result.error);
  res.json(result);
});

module.exports = router;
