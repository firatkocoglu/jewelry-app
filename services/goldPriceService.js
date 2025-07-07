import axios from 'axios';

const API_URL = 'https://api.gold-api.com/price/XAU'; // This api endpoint provides the gold price in ounces

export async function getGramGoldPrice() {
  try {
    const response = await axios.get(API_URL);

    // Ensure the response contains the expected data
    if (!response.data.price) {
      throw new Error('Invalid response from gold price API');
    }

    // Extract the price from the response
    const { price } = response.data;

    // Convert the price from ounces to grams
    const priceInGrams = convertToGram(price); // Convert the price from ounces to grams

    return Number(priceInGrams.toFixed(2)); // Return the price rounded to 2 decimal places
  } catch (error) {
    console.error(`Error fetching gold price: ${error.message}`);
    throw new Error('Failed to fetch gold price');
  }
}

// Converts the price from ounces to grams
function convertToGram(priceInOunces) {
  // Validate the input is a number
  if (typeof priceInOunces !== 'number' || isNaN(priceInOunces)) {
    throw new Error('Invalid price format');
  }

  const ouncesToGrams = 31.1035; // 1 ounce = 31.1035 grams
  return priceInOunces / ouncesToGrams;
}
