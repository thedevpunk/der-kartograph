import React, { useEffect, useState } from 'react';
import { IPoints } from '../models/points';
import { RoundPoints } from './RoundPoints';
import { v4 as uuidv4 } from 'uuid';
import { EPointsType } from '../models/pointsType';
import styles from './Points.module.css';

const initializePoints = (firstDecree: EPointsType, secondDecree: EPointsType): IPoints[] => {
  return [
    {
      value: 0,
      type: firstDecree
    },
    {
      value: 0,
      type: secondDecree
    },
    {
      value: 0,
      type: EPointsType.Coins
    },
    {
      value: 0,
      type: EPointsType.Monsters
    }
  ]
}

const calculateTotalPoints = (points: IPoints[]): number => {
  return points.reduce((prev, cur, idx) => {
    if (idx === 3) {
      return prev - cur.value;
    }
    return prev + cur.value;
  }, 0);
}

interface IProps {
  coins: number;
}

export const Points: React.FC<IProps> = ({ coins }) => {

  const [pointsRoundOne, setPointsRoundOne] = useState<IPoints[]>(initializePoints(EPointsType.DecreeA, EPointsType.DecreeB));
  const [pointsRoundTwo, setPointsRoundTwo] = useState<IPoints[]>(initializePoints(EPointsType.DecreeB, EPointsType.DecreeC));
  const [pointsRoundThree, setPointsRoundThree] = useState<IPoints[]>(initializePoints(EPointsType.DecreeC, EPointsType.DecreeD));
  const [pointsRoundFour, setPointsRoundFour] = useState<IPoints[]>(initializePoints(EPointsType.DecreeD, EPointsType.DecreeA));
  const [totalPointsRoundOne, setTotalPointsRoundOne] = useState(0);
  const [totalPointsRoundTwo, setTotalPointsRoundTwo] = useState(0);
  const [totalPointsRoundThree, setTotalPointsRoundThree] = useState(0);
  const [totalPointsRoundFour, setTotalPointsRoundFour] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const pointsStringFromLocalStorage = localStorage.getItem('points');

    if (pointsStringFromLocalStorage) {
      const [one, two, three, four] = JSON.parse(pointsStringFromLocalStorage);
      setPointsRoundOne(one);
      setPointsRoundTwo(two);
      setPointsRoundThree(three);
      setPointsRoundFour(four);
    } else {

    }
  }, [])

  useEffect(() => {
    setTotalPointsRoundOne(calculateTotalPoints(pointsRoundOne));
  }, [pointsRoundOne])

  useEffect(() => {
    setTotalPointsRoundTwo(calculateTotalPoints(pointsRoundTwo));
  }, [pointsRoundTwo])

  useEffect(() => {
    setTotalPointsRoundThree(calculateTotalPoints(pointsRoundThree));
  }, [pointsRoundThree])

  useEffect(() => {
    setTotalPointsRoundFour(calculateTotalPoints(pointsRoundFour));
  }, [pointsRoundFour])

  useEffect(() => {
    setTotalPoints(totalPointsRoundOne + totalPointsRoundTwo + totalPointsRoundThree + totalPointsRoundFour);
    localStorage.setItem('points', JSON.stringify([pointsRoundOne, pointsRoundTwo, pointsRoundThree, pointsRoundFour]));
  }, [totalPointsRoundOne, totalPointsRoundTwo, totalPointsRoundThree, totalPointsRoundFour])

  return (
    <div className={styles.points}>
      <RoundPoints points={pointsRoundOne} totalPoints={totalPointsRoundOne} setPoints={setPointsRoundOne} />
      <p>+</p>
      <RoundPoints points={pointsRoundTwo} totalPoints={totalPointsRoundTwo} setPoints={setPointsRoundTwo} />
      <p>+</p>
      <RoundPoints points={pointsRoundThree} totalPoints={totalPointsRoundThree} setPoints={setPointsRoundThree} />
      <p>+</p>
      <RoundPoints points={pointsRoundFour} totalPoints={totalPointsRoundFour} setPoints={setPointsRoundFour} />
      <div className={styles.equal}>
        =
      </div>
      <div className={styles.totalPoints}>
        <p>
          {totalPoints}
        </p>
      </div>
    </div>
  )
}
