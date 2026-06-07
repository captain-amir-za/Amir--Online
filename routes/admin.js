const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');
const Settings = require('../models/Settings');

// Dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    const activeProducts = await Product.countDocuments({ isActive: true });
    const settings = await Settings.findOne();

    res.json({
      totalProducts,
      totalCategories,
      activeProducts,
      currency: settings?.currency || 'USD',
      currencySymbol: settings?.currencySymbol || '$'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all products (Admin view)
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Bulk update prices
router.post('/bulk-price-update', async (req, res) => {
  try {
    const { percentage } = req.body;
    
    if (!percentage || percentage < -99 || percentage > 1000) {
      return res.status(400).json({ message: 'Invalid percentage' });
    }

    const multiplier = 1 + (percentage / 100);
    
    const result = await Product.updateMany(
      {},
      [{ $set: { price: { $multiply: ['$price', multiplier] } } }]
    );

    res.json({
      message: `Updated ${result.modifiedCount} products`,
      percentage: percentage,
      multiplier: multiplier
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get inventory report
router.get('/inventory', async (req, res) => {
  try {
    const products = await Product.find().select('name sku stock price');
    const lowStock = products.filter(p => p.stock < 10);
    const outOfStock = products.filter(p => p.stock === 0);

    res.json({
      total: products.length,
      lowStock: lowStock.length,
      outOfStock: outOfStock.length,
      items: {
        lowStockItems: lowStock,
        outOfStockItems: outOfStock
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;