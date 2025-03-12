const express = require('express');
const {
    createShortURL,
    getOriginalURL,
    updateShortURL,
    deleteShortURL,
    getURLStats
} = require('../controllers/urlController');

const router = express.Router();

router.post('/', createShortURL);
router.get('/:shortCode', getOriginalURL);
router.put('/:shortCode', updateShortURL);
router.delete('/:shortCode', deleteShortURL);
router.get('/:shortCode/stats', getURLStats);

module.exports = router;
