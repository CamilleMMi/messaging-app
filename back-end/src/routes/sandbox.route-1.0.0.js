const express = require('express');

const router = express.Router();

router.get('/status', (req, res) => {
    res.json({ message: 'ok' });
});

router.get('/status-check', (req, res) => {
    res.json({ message: 'not ok' });
});

module.exports = router;