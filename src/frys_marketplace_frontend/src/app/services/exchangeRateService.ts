export const get_exchange_rate = async () => {
  try {
    const response = await fetch('https://api.example.com/exchange-rate');
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rate');
    }
    const data = await response.json();
    return data.rate;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    throw error;
  }
};
