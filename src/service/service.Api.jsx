import axios from 'axios';

const API_BASE_URL = 'https://v6.exchangerate-api.com/v6';
const API_KEY = '4302a634dcbb0334e307c2ea'; // Bu yerda o'zingizning API kalitingizni yozing

// Valyuta kurslarini olish
export const getExchangeRates = async (baseCurrency = 'USD') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${API_KEY}/latest/${baseCurrency}`);
    return response.data.conversion_rates; // Kurslar ro‘yxatini qaytaradi
  } catch (error) {
    console.error("Error occured fixed", error)
    throw error;
  }
};
