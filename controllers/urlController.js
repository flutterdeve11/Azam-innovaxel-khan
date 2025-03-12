const URL = require('../models/urlModel');
const { nanoid } = require('nanoid');

// Create Short URL
exports.createShortURL = async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    const shortCode = nanoid(6);
    const newURL = await URL.create({ url, shortCode });
    res.status(201).json(newURL);
};

// Retrieve Original URL
exports.getOriginalURL = async (req, res) => {
    const { shortCode } = req.params;
    const urlEntry = await URL.findOne({ shortCode });

    if (!urlEntry) return res.status(404).json({ error: 'Short URL not found' });

    urlEntry.accessCount += 1;
    await urlEntry.save();

    res.json(urlEntry);
};

// Update Short URL
exports.updateShortURL = async (req, res) => {
    const { shortCode } = req.params;
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    const updatedURL = await URL.findOneAndUpdate(
        { shortCode },
        { url, updatedAt: new Date() },
        { new: true }
    );

    if (!updatedURL) return res.status(404).json({ error: 'Short URL not found' });

    res.json(updatedURL);
};

// Delete Short URL
exports.deleteShortURL = async (req, res) => {
    const { shortCode } = req.params;
    const deleted = await URL.findOneAndDelete({ shortCode });

    if (!deleted) return res.status(404).json({ error: 'Short URL not found' });

    res.status(204).send();
};

// Get URL Statistics
exports.getURLStats = async (req, res) => {
    const { shortCode } = req.params;
    const urlEntry = await URL.findOne({ shortCode });

    if (!urlEntry) return res.status(404).json({ error: 'Short URL not found' });

    res.json(urlEntry);
};
