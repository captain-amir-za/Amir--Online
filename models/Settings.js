const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  storeName: {
    type: String,
    default: 'Amir Online'
  },
  storeDescription: String,
  logo: String,
  favicon: String,
  currency: {
    type: String,
    default: 'USD'
  },
  currencySymbol: {
    type: String,
    default: '$'
  },
  currencyRate: {
    type: Number,
    default: 1
  },
  shippingCost: {
    type: Number,
    default: 0
  },
  freeShippingThreshold: {
    type: Number,
    default: 0
  },
  taxRate: {
    type: Number,
    default: 0
  },
  contact: {
    email: String,
    phone: String,
    address: String
  },
  social: {
    facebook: String,
    instagram: String,
    twitter: String,
    whatsapp: String
  },
  brandColors: {
    primary: {
      type: String,
      default: '#8B0000'
    },
    secondary: {
      type: String,
      default: '#FFD700'
    },
    accent: {
      type: String,
      default: '#FFFFFF'
    }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Settings', settingsSchema);