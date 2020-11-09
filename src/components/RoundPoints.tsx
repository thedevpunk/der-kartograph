import React, { useEffect, useState } from 'react';
import { IPoints } from '../models/points';
import { IRoundPoints } from '../models/roundPoints';
import styles from './RoundPoints.module.css';

interface IProps {
  points: IPoints[];
  totalPoints: number;
  setPoints: (points: IPoints[]) => void;
}

export const RoundPoints: React.FC<IProps> = ({ points: initialPoints, totalPoints, setPoints: setInitialPoints }) => {
  const [points, setPoints] = useState<IPoints[]>(initialPoints);

  useEffect(() => {
    setPoints(initialPoints);
  }, [initialPoints])

  const handlePointOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name: type, value } = event.currentTarget;
    console.log(type, value);
    if (isNaN(+value)) {
      console.log('value is NaN');
      value = '0';
    }

    console.log(+value);

    const newPoints = points.map(point => {
      if (point.type === parseInt(type)) {
        return {
          ...point,
          value: +value
        }
      }
      return point;
    });

    // setPoints(newPoints);
    setInitialPoints(newPoints);
  }

  return (
    <div className={styles.roundPoints}>
      <div className={styles.sectionPoints}>
        {points.map(point => (
          <div key={point.type} className={styles.cell}>
            <input name={point.type.toString()} value={point.value === 0 ? '' : point.value} onChange={handlePointOnChange} />
          </div>
        ))}
      </div>
        <div className={styles.totalPoints}>{totalPoints}</div>


      {/* <div className={styles.row}>
        <div className={styles.cell}>
          <input />
        </div>
        <div className={styles.cell}>

        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.cell}>

        </div>
        <div className={styles.cell}>

        </div>
      </div> */}
    </div>
  )
}