import React from 'react';
import styles from './CoinStrip.module.css';

interface IProps {
  coins: number;
  setCoins: (quantity: number) => void;
}

export const CoinStrip: React.FC<IProps> = ({ coins, setCoins }) => {
  const maxCoins = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    <div className={styles.coinStrip}>
      {maxCoins.map(coin => (
        <div
          key={coin}
          className={`${styles.coin} ${coin <= coins ? styles.selected : ''}`}
          onClick={() => coins === coin ? setCoins(coins - 1) : setCoins(coin)}
        >
          {coin <= coins
            ? (
              <img src="x.svg" />
            )
            : (
              <img src="coin.svg" />
            )}
        </div>
      ))}
    </div>
  )
}
