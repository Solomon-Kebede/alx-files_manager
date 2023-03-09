const express = require('express');
import getStatus from '../controllers/AppController.js';
import getStats from '../controllers/AppController.js';

const router = express.Router();

router.get('/status', (req, res) => {
  res.send(getStatus());
});

router.get('/stats', (req, res) => {
  res.send(getStats());
});

module.exports = router;
