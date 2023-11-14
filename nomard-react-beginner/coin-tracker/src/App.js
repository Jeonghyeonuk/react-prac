import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const [selectPrice, setSelectPrice] = useState(0);
  useEffect(() => {
    const response = fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((result) => {
        setCoins(result);
        setLoading(false);
      });
    return;
  }, []);
  const oninputChange = (e) => {
    setMoney(e.target.value);
  };
  const onSelectChange = (e) => {
    const selectedValue = setSelectPrice(e.target.value);
  };
  return (
    <div className="App">
      <h1>The Coins ! {coins.length}</h1>
      <input
        type="text"
        value={money}
        onChange={oninputChange}
        placeholder="write your balance"
      />
      {money !== 0 && selectPrice !== 0 && (
        <p>You can buy {money / selectPrice}</p>
      )}
      <br />
      <br />
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onSelectChange}>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.quotes.USD.price}>
              {/* {`${coin.name} (${coin.symbol}) : ${coin.quotes.USD.price}`} */}
              {coin.name}({coin.symbol}) : ${coin.quotes.USD.price}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default App;
