const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const Product = require('../models/Product');

// Get store settings
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update store settings (Admin)
router.put('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }

    Object.assign(settings, req.body);
    settings.updatedAt = new Date();

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update currency
router.patch('/currency', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = new Settings();

    settings.currency = req.body.currency;
    settings.currencySymbol = req.body.currencySymbol;
    settings.currencyRate = req.body.currencyRate || 1;
    settings.updatedAt = new Date();

    const updated = await settings.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update prices globally
router.patch('/prices', async (req, res) => {
  try {
    const { multiplier } = req.body;
    if (!multiplier || multiplier <= 0) {
      return res.status(400).json({ message: 'Invalid multiplier' });
    }

    await Product.updateMany({}, [
      { $set: { price: { $multiply: ['$price', multiplier] } } }
    ]);

    res.json({ message: `All prices updated with multiplier: ${multiplier}` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;