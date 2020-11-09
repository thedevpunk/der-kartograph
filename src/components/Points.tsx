import React, { useEffect, useState } from 'react';
import { IPoints } from '../models/points';
import { RoundPoints } from './RoundPoints';
import { v4 as uuidv4 } from 'uuid';
import { EPointsType } from '../models/pointsType';
import styles from './Points.module.css';

const initializePoints = (): IPoints[] => {
  return [
    {
      value: 0,
      type: EPointsType.FirstDecree
    },
    {
      value: 0,
      type: EPointsType.SecondDecree
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

  const [pointsRoundOne, setPointsRoundOne] = useState<IPoints[]>(initializePoints);
  const [pointsRoundTwo, setPointsRoundTwo] = useState<IPoints[]>(initializePoints);
  const [pointsRoundThree, setPointsRoundThree] = useState<IPoints[]>(initializePoints);
  const [pointsRoundFour, setPointsRoundFour] = useState<IPoints[]>(initializePoints);
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
      <RoundPoints points={pointsRoundTwo} totalPoints={totalPointsRoundTwo} setPoints={setPointsRoundTwo} />
      <RoundPoints points={pointsRoundThree} totalPoints={totalPointsRoundThree} setPoints={setPointsRoundThree} />
      <RoundPoints points={pointsRoundFour} totalPoints={totalPointsRoundFour} setPoints={setPointsRoundFour} />
      <div className={styles.totalPoints}>
        = {totalPoints}
      </div>
    </div>
  )
}
