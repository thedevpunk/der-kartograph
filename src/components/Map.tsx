import React from 'react';
import { EAreaType } from '../models/areaType';
import styles from './Map.module.css';
import { getAreaByType } from '../data/defaults';

interface IProps {
  tiles: EAreaType[];
  markTile: (idx: number) => void;
}

export const Map: React.FC<IProps> = ({ tiles, markTile }) => {
  return (
    <div className={styles.map}>
      {tiles.map((tile, index) => (
        <div
          key={index}
          className={styles.tile}
          onClick={() => markTile(index)}
          style={{backgroundColor: getAreaByType(tile)?.color}}
        >
          {tile !== EAreaType.Empty && <img src={getAreaByType(tile)!.image} />}
        </div>
      ))}
    </div>
  )
}
