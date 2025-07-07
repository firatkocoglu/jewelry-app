import { Router } from 'express';
import { serveProducts } from '../services/productPriceService.js';

const productRouter = Router();

// This route serves the products data from the productPriceService
// It uses the serveProducts function to handle GET requests to the root path
productRouter.get('/', serveProducts);

export { productRouter };
