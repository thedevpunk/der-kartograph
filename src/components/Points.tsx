import React from 'react';
import { IPoints } from '../models/points';
import { RoundPoints } from './RoundPoints';
import styles from './Points.module.css';
interface IProps {
  points: IPoints[][];
  setPoints: (round: number, points: IPoints[]) => void;
  coins: number;
}

export const Points: React.FC<IProps> = ({ points, setPoints, coins }) => {

  const sumPoints = (): number => {
    const sum = points.reduce((a,b) => {
      return a + b.reduce((a,b, idx) => {
        if (idx === 3) {
          return a - b.value;
        }
        return a + b.value;
      }, 0);
    }, 0);
    return sum;
  }

  const totalPoints = sumPoints();

  return (
    <div className={styles.points}>
      <RoundPoints round={1} points={points[0]} setPoints={setPoints} />
      <div className={styles.plus}>+</div>
      <RoundPoints round={2} points={points[1]} setPoints={setPoints} />
      <div className={styles.plus}>+</div>
      <RoundPoints round={3} points={points[2]} setPoints={setPoints} />
      <div className={styles.plus}>+</div>
      <RoundPoints round={4} points={points[3]} setPoints={setPoints} />
      <div className={styles.equal}>=</div>
      <div className={styles.totalPoints}>
        <p>
          {totalPoints}
        </p>
      </div>
    </div>
  )
}
