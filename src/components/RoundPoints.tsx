import React from 'react';
import { IPoints } from '../models/points';
import { EPointsType } from '../models/pointsType';
import styles from './RoundPoints.module.css';

interface IProps {
  round: number;
  points: IPoints[];
  setPoints: (round: number, points: IPoints[]) => void;
}

export const RoundPoints: React.FC<IProps> = ({ round, points, setPoints }) => {

  const handlePointOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name: pointsType, value } = event.currentTarget;

    if (isNaN(+value) || value === '') {
      console.log('value is NaN');
      value = '0';
    }

    const newPoints = points.map(point => {
      if (parseInt(pointsType) === point.type) {
        return {
          ...point,
          value: +value
        }
      }
      return point;
    })

    setPoints(round, newPoints);
  }

  const sumPoints = (): number => {
    return points.reduce((a, b, idx) => {
      if (idx === 3) {
        return a - b.value;
      }
      return a + b.value;
    }, 0);
  }

  const totalPoints = sumPoints();

  const getImageSource = (type: EPointsType): string => {
    switch (type) {
      case EPointsType.DecreeA:
        return 'url("/lettera.svg")';
      case EPointsType.DecreeB:
        return 'url("/letterb.svg")';
      case EPointsType.DecreeC:
        return 'url("/letterc.svg")';
      case EPointsType.DecreeD:
        return 'url("/letterd.svg")';
      case EPointsType.Coins:
        return 'url("/coin.svg")';
      case EPointsType.Monsters:
        return 'url("/monster2.svg")';
      default:
        return '';
    }
  }

  return (
    <div className={styles.roundPoints}>
      <div className={styles.sectionPoints}>
        {points.map(point => (
          <div
            key={point.type}
            className={styles.cell}
            style={{ backgroundImage: getImageSource(point.type) }}
          >
            <input
              name={point.type.toString()}
              value={point.value === 0 ? '' : point.value}
              onChange={handlePointOnChange}
            />
          </div>
        ))}
      </div>
      <div className={styles.totalPoints}>{totalPoints}</div>
    </div>
  )
}
