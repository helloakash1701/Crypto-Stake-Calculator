import React, { useState } from "react";
import "./Coin.css";

function Coin({ name, icon, price, symbol, onStakeClick, onUnstakeClick }) {
  const [showStakeBox, setShowStakeBox] = useState(false);
  const [showUnstakeBox, setShowUnstakeBox] = useState(false);
  const [stakePercentage, setStakePercentage] = useState(0);
  const [unstakePercentage, setUnstakePercentage] = useState(0);
  const [yourStake, setYourStake] = useState(0);

  const handleStakeClick = () => {
    setShowStakeBox(true);
  };

  const handleUnstakeClick = () => {
    setShowUnstakeBox(true);
  };

  const handleConfirmStake = () => {
    const stakeAmount = (price * stakePercentage) / 100;
    onStakeClick(name, stakeAmount);
    setYourStake(yourStake + stakeAmount);
    setShowStakeBox(false);
  };

  const handleConfirmUnstake = () => {
    const unstakeAmount = (yourStake * unstakePercentage) / 100;
    onUnstakeClick(name, unstakeAmount);
    setYourStake(yourStake - unstakeAmount);
    setShowUnstakeBox(false);
  };

  return (
    <div className="coin">
      <h1> Name: {name}</h1>
      <img src={icon} alt={name} />
      <h3> Price: {price}</h3>
      <h3> Symbol: {symbol}</h3>
      <button className="buttonstake" onClick={handleStakeClick}>
        Stake
      </button>
      <button className="buttonunstake" onClick={handleUnstakeClick}>
        Unstake
      </button>
      <button className="yourstake"> Your Stake: {yourStake.toFixed(2)}%</button>
      {showStakeBox && (
        <div className="stakeBox">
          <input
            type="number"
            placeholder="Enter stake percentage"
            value={stakePercentage}
            onChange={(e) => setStakePercentage(parseFloat(e.target.value))}
          />
          <button className="confirmstate" onClick={handleConfirmStake}>
            Confirm Stake
          </button>
        </div>
      )}
      {showUnstakeBox && (
        <div className="unstakeBox">
          <input
            type="number"
            placeholder="Enter unstake percentage"
            value={unstakePercentage}
            onChange={(e) => setUnstakePercentage(parseFloat(e.target.value))}
          />
          <button className="confirmunstake" onClick={handleConfirmUnstake}>
            Confirm Unstake
          </button>
        </div>
      )}
    </div>
  );
}

export default Coin;
