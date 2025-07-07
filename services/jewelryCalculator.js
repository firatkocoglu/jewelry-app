import { getGramGoldPrice } from './goldPriceService.js'; // Import the gold price service

export async function calculateJewelryPrice(popularityScore, weight) {
  try {
    // Validate inputs
    if (popularityScore == null || weight == null) {
      throw new Error(
        'Popularity and weight are required to calculate the jewelry price'
      );
    }

    // Check if inputs are numbers
    if (typeof popularityScore !== 'number' || typeof weight !== 'number') {
      throw new Error('Popularity and weight must be numbers');
    }

    // Fetch the current gold price in grams
    const gramGoldPrice = await getGramGoldPrice();

    // Calculate the jewelry price based on popularity and weight
    const jewelryPrice = (popularityScore + 1) * weight * gramGoldPrice;

    return Number(jewelryPrice.toFixed(2));
  } catch (error) {
    console.error(`Error calculating jewelry price: ${error.message}`);
    throw new Error('Failed to calculate the jewelry price'); // Re-throw the error for further handling
  }
}
