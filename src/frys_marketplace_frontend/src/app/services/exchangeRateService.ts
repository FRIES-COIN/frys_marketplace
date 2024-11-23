export const get_exchange_rate = async () => {
  try {

    // Fetch BTC to ICP
    const btcResponse = await fetch('https://api.coinbase.com/v2/prices/BTC-ICP/spot')
    const btcdata = await btcResponse.json();
    const btcprice = Number(btcdata.data.amount);

    // Set the fetched prices in state
    return btcprice

  } catch (error) {
    console.error("Error fetching crypto balances in USD:", error);
  }
}; 