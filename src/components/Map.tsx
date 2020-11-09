import React from 'react';
import { ITile } from '../models/tile';
import styles from './Map.module.css';

interface IProps {
  tiles: ITile[][];
  markTile: (id: string) => void;
}

export const Map: React.FC<IProps> = ({ tiles, markTile }) => {
  return (
    <div className={styles.map}>
      {tiles.map(row => (
        <div key={row.map(e => e.id).join('-')} className={styles.row}>
          {row.map(tile => (
            <div
              key={tile.id}
              className={styles.tile}
              style={{ backgroundColor: tile.area.color }}
              onClick={() => markTile(tile.id)}
            >
              {tile.area.name !== 'empty' && <img src={tile.area.image} />}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
