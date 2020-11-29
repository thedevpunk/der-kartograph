import React, { useEffect, useState } from 'react';
import { areasData, map as initialMap } from './data/defaults';
import { IArea } from './models/area';
import styles from './App.module.css';
import { AreaSelection } from './components/AreaSelection';
import { Map } from './components/Map';
import { CoinStrip } from './components/CoinStrip';
import { Points } from './components/Points';
import { EAreaType } from './models/areaType';
import { IPoints } from './models/points';
import { EPointsType } from './models/pointsType';

function App() {
  const initializeAreaButtons = (): IArea[] => {
    return areasData.filter(e => e.name !== 'empty' && e.name !== 'mountains' && e.name !== 'ruins' && e.name !== 'valley');
  }

  const initializePoints = (): IPoints[][] => {
    return [
      [
        {
          value: 0,
          type: EPointsType.DecreeA
        },
        {
          value: 0,
          type: EPointsType.DecreeB
        },
        {
          value: 0,
          type: EPointsType.Coins
        },
        {
          value: 0,
          type: EPointsType.Monsters
        }
      ],
      [
        {
          value: 0,
          type: EPointsType.DecreeB
        },
        {
          value: 0,
          type: EPointsType.DecreeC
        },
        {
          value: 0,
          type: EPointsType.Coins
        },
        {
          value: 0,
          type: EPointsType.Monsters
        }
      ],
      [
        {
          value: 0,
          type: EPointsType.DecreeC
        },
        {
          value: 0,
          type: EPointsType.DecreeD
        },
        {
          value: 0,
          type: EPointsType.Coins
        },
        {
          value: 0,
          type: EPointsType.Monsters
        }
      ],
      [
        {
          value: 0,
          type: EPointsType.DecreeD
        },
        {
          value: 0,
          type: EPointsType.DecreeA
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

    ]
  }

  const [tiles, setTiles] = useState<EAreaType[]>(initialMap);
  const [areaButtons, setAreaButtons] = useState<IArea[]>(initializeAreaButtons);
  const [selectedArea, setSelectedArea] = useState<IArea | null>(null);
  const [coins, setCoins] = useState(0);
  const [points, setPoints] = useState<IPoints[][]>(initializePoints);
  const [pointsVisible, setPointsVisible] = useState(false);

  useEffect(() => {
    const tilesStringFromLocalStorage = localStorage.getItem('tiles');
    tilesStringFromLocalStorage ? setTiles(JSON.parse(tilesStringFromLocalStorage)) : setTiles(initialMap);

    const coinsStringFromLocalStorage = localStorage.getItem('coins');
    coinsStringFromLocalStorage ? setCoins(parseInt(coinsStringFromLocalStorage)) : setCoins(0);

    const pointsStringFromLocalStorage = localStorage.getItem('points');
    pointsStringFromLocalStorage ? setPoints(JSON.parse(pointsStringFromLocalStorage)) : setPoints(initializePoints);
  }, [])

  useEffect(() => {
    localStorage.setItem('tiles', JSON.stringify(tiles));
  }, [tiles])

  useEffect(() => {
    localStorage.setItem('points', JSON.stringify(points));
  }, [points])

  useEffect(() => {
    localStorage.setItem('coins', coins.toString());
  }, [coins])

  const handleSetCoins = (value: number) => {
    setCoins(value);
  }

  const handleMarkTile = (idx: number) => {

    if (!selectedArea || tiles[idx] === EAreaType.Mountains) {
      return;
    }

    const tilesTemp = [...tiles];
    tilesTemp[idx] = tilesTemp[idx] == selectedArea.type ? EAreaType.Empty : selectedArea.type;

    setTiles([...tilesTemp]);
  }

  const handleSetPoints = (round: number, pointsInRound: IPoints[]) => {
    const newPoints = points.map((roundPoints, index) => {
      if (index === round - 1) {
        return pointsInRound;
      }
      return roundPoints;
    });

    setPoints(newPoints);
  }

  const handleReset = () => {
    localStorage.clear();
    setTiles(initialMap);
    setCoins(0);
    setPoints(initializePoints);
  }

  const handleTogglePoints = () => {
    setPointsVisible(!pointsVisible);
  }

  return (
    <div className={styles.app}>

      <div className={styles.navigation}>
        <button className={styles.btn} onClick={handleReset}>reset</button>
        <button className={`${styles.btn} ${styles.btnPoints}`} onClick={handleTogglePoints}>points</button>
      </div>

      <AreaSelection
        areas={areaButtons}
        selectedArea={selectedArea}
        selectArea={setSelectedArea}
      />

      <Map
        tiles={tiles}
        markTile={handleMarkTile}
      />

      <CoinStrip
        coins={coins}
        setCoins={handleSetCoins}
      />

      <Points points={points} setPoints={handleSetPoints} coins={coins} visible={pointsVisible} />

    </div>
  )
}

export default App;
