# 🏆 AMIR ONLINE - Premium E-Commerce Platform

A fully functional, enterprise-grade e-commerce solution featuring a complete admin dashboard for managing products, pricing, currencies, and store configurations.

## ✨ Features

### 🛍️ Customer Features
- **Product Catalog** - Browse all products with detailed information
- **Category Browsing** - Filter products by category
- **Product Details** - View specifications, images, and features
- **Shopping Cart** - Add/remove products (coming soon)
- **Responsive Design** - Works on all devices
- **Currency Display** - Dynamic currency support

### 👨‍💼 Admin Dashboard
- **Product Management**
  - Create, read, update, delete products
  - Bulk image uploads (up to 5 images per product)
  - Set product features
  - Manage inventory/stock levels
  
- **Store Settings**
  - Change store name and description
  - **Currency Management** - Change currency code, symbol, and exchange rates
  - **Bulk Price Updates** - Update all product prices by percentage
  - Contact information management
  - Shipping and tax configuration
  - Brand color customization
  - Social media links

- **Category Management** - Create and organize product categories
- **Inventory Reports** - Monitor low stock and out-of-stock items
- **Dashboard Statistics** - Track total products, categories, and active items

## 🏗️ Project Structure

```
amir-online/
├── server.js                 # Express server entry point
├── package.json             # Backend dependencies
├── .env.example             # Environment configuration template
│
├── models/
│   ├── Product.js           # Product model
│   ├── Category.js          # Category model
│   └── Settings.js          # Store settings model
│
├── routes/
│   ├── products.js          # Product CRUD endpoints
│   ├── categories.js        # Category endpoints
│   ├── settings.js          # Settings endpoints
│   └── admin.js             # Admin endpoints
│
└── uploads/                 # Product images directory
```

## 🚀 Installation & Setup

### Backend Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your MongoDB URI:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/amir-online
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   STORE_CURRENCY=USD
   STORE_CURRENCY_SYMBOL=$
   ```

3. **Start MongoDB**
   ```bash
   mongod
   ```

4. **Start Backend Server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

## 📝 API Endpoints

### Products
- `GET /api/products` - Get all active products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Settings
- `GET /api/settings` - Get store settings
- `PUT /api/settings` - Update store settings
- `PATCH /api/settings/currency` - Update currency
- `PATCH /api/settings/prices` - Bulk update prices

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/products` - All products
- `GET /api/admin/inventory` - Inventory report
- `POST /api/admin/bulk-price-update` - Update prices by percentage

## 💰 Currency & Pricing Management

### Change Currency
Update via API:
```bash
PATCH /api/settings/currency
{
  "currency": "EUR",
  "currencySymbol": "€",
  "currencyRate": 0.92
}
```

### Update Prices
```bash
POST /api/admin/bulk-price-update
{
  "percentage": 10
}
```
Positive value = increase, negative value = decrease

## 🎨 Branding

The platform uses the AMIR brand:
- **Primary Color**: Dark Red (#8B0000)
- **Secondary Color**: Gold (#FFD700)
- **Font**: Professional and bold
- **Logo & Avatar**: Your custom images

## 📦 Image Upload

- Supports PNG, JPG, GIF, WebP
- Up to 5 images per product
- Stored in `/uploads/products`
- First image marked as main

## 🔐 Security Notes

- Store JWT_SECRET safely in `.env`
- Use environment variables for sensitive data
- Implement authentication middleware for admin routes
- Validate all inputs on backend
- Use HTTPS in production

## 🗄️ Database Models

### Product
```javascript
{
  name, description, price, currency,
  category, sku, stock,
  images: [{ url, alt, isMain }],
  features: [String],
  ratings, isActive, createdAt, updatedAt
}
```

### Category
```javascript
{
  name, slug, description,
  icon, image, isActive, createdAt
}
```

### Settings
```javascript
{
  storeName, storeDescription,
  currency, currencySymbol, currencyRate,
  shippingCost, freeShippingThreshold, taxRate,
  contact: { email, phone, address },
  social: { facebook, instagram, twitter, whatsapp },
  brandColors: { primary, secondary, accent },
  updatedAt
}
```

## 🚧 Next Steps

1. **Frontend**: Install Next.js client in `/client` directory
2. **Add Sample Data**: Create initial products and categories
3. **Customize**: Update branding and settings
4. **Deploy**: Push to production server

## 📄 License

MIT License - feel free to use for your projects!

---

**Website**: www.amironlineshopping.com  
**Built with**: Node.js, Express, MongoDB, Multer

🎉 **Your Amir Online E-Commerce Platform is Ready!**