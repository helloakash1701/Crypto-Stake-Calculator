import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Coin from "./components/Coin";

function App() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [totalAmount, setTotalAmount] = useState(0); // Total amount in your account
  const [stakedCoins, setStakedCoins] = useState({}); // Object to keep track of staked coins

  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
      (response) => {
        setListOfCoins(response.data.coins);
      }
    );
  }, []);

  useEffect(() => {
    // Calculate the total amount based on the staked coins
    const newTotalAmount = Object.values(stakedCoins).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    setTotalAmount(newTotalAmount);
  }, [stakedCoins]);

  const handleStake = (coinName, price) => {
    // Check if the coin is already staked, if yes, update the staked amount
    // Otherwise, add the coin with the staked amount
    setStakedCoins((prevStakedCoins) => ({
      ...prevStakedCoins,
      [coinName]: (prevStakedCoins[coinName] || 0) + price,
    }));
  };

  const handleUnstake = (coinName, price) => {
    // Check if the coin is staked, if yes, reduce the staked amount
    // Otherwise, do nothing
    if (stakedCoins[coinName]) {
      setStakedCoins((prevStakedCoins) => ({
        ...prevStakedCoins,
        [coinName]: prevStakedCoins[coinName] - price,
      }));
    }
  };

  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });

  return (
    <div className="App">
      
      <div className="cryptoHeader">
        <input
          type="text"
          placeholder="Bitcoin..."
          onChange={(event) => {
            setSearchWord(event.target.value);
          }}
        />
      </div>
      <div className="cryptoDisplay">
        {filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.name}
              name={coin.name}
              icon={coin.icon}
              price={coin.price}
              symbol={coin.symbol}
              onStakeClick={() => handleStake(coin.name, coin.price)}
              onUnstakeClick={() => handleUnstake(coin.name, coin.price)}
            />
          );
        })}
      </div>
      <div className="accountBox">
        <div className="account">
        <h2>Total Amount in Account: {totalAmount}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
