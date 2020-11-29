import React from 'react';
import { IArea } from '../models/area';
import styles from './AreaSelection.module.css';

interface IProps {
  areas: IArea[];
  selectedArea: IArea | null;
  selectArea: (area: IArea) => void;
}

export const AreaSelection: React.FC<IProps> = ({ areas, selectedArea, selectArea }) => {
  return (
    <div className={styles.areaSelection}>
      {areas.map(area => (
        <button
          key={area.type}
          className={`${styles.areaButton} ${selectedArea && selectedArea.type === area.type ? styles.areaButtonSelected : ''}`}
          style={{ backgroundColor: area.color }}
          onClick={() => selectArea(area)}
        >
          <img src={area.image} />
        </button>
      ))}
    </div>
  )
}
