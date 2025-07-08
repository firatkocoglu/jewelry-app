import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const data = require('../data/products.json');
import { calculateJewelryPrice } from './jewelryCalculator.js';

export async function serveProducts(req, res) {
  try {
    // Check if data is available
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid product data');
    }

    // Add price to each product based on popularity and weight
    const products = await Promise.all(
      data.map(async (product) => {
        const { popularityScore, weight } = product;
        product.price = await calculateJewelryPrice(popularityScore, weight);
        return product;
      })
    );

    // Filter based on price and popularityScore fields from query parameters
    const filterKeys = Object.keys(req.query).filter(
      (key) => key === 'price' || key === 'popularity'
    );

    // Get filter keys from query parameters
    const filterValues = Object.values(Object..map((key) => req.query[key]));

    // If filterKeys are not empty, filter the products and return the filtered data
    if (filterValues.length > 0) {
      // Filter products based on the provided filters
      const filteredData = products.filter((product) => {
        return filterKeys.every((key, index) => {
          if (key === 'price') {
            const minPrice = parseFloat(filterValues[index].split('-')[0]);
            const maxPrice = parseFloat(filterValues[index].split('-')[1]);
            return product.price >= minPrice && product.price <= maxPrice;
          }

          if (key === 'popularity') {
            return product.popularityScore >= parseFloat(filterValues[index]);
          }
        });
      });

      res.status(200).json(filteredData);
    } else {
      // If no filters are applied, return all products
      res.status(200).json(products);
    }
  } catch (error) {
    console.error(`Error serving products: ${error.message}`);
    return res.status(500).json({ error: 'Failed to serve products' });
  }
}
