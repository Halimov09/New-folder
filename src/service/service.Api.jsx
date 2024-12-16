import axios from 'axios';

const API_BASE_URL = 'https://v6.exchangerate-api.com/v6';
const API_KEY = '4302a634dcbb0334e307c2ea'; // O'zingizning API kalitingizni yozing

/**
 * Valyuta kurslarini olish
 * @param {string} baseCurrency - Asosiy valyuta (default: 'USD').
 * @returns {object} conversion_rates - Valyuta kurslarining ro'yxati.
 * @throws {Error} Agar API chaqiruvda xatolik bo'lsa.
 */
export const getExchangeRates = async (baseCurrency = 'USD') => {
  try {
    const endpoint = `${API_BASE_URL}/${API_KEY}/latest/${baseCurrency}`;
    const response = await axios.get(endpoint);

    // API javobini tekshirish
    if (response.status === 200) {
      return response.data.conversion_rates; // Kurslar ro‘yxatini qaytaradi
    } else {
      throw new Error(`Failed to fetch exchange rates: ${response.status}`);
    }
  } catch (error) {
    console.error('Error occurred while fetching exchange rates:', error.message);
    throw error;
  }
};
