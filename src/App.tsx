import React, { useEffect, useState } from 'react';
import './App.css';
import { areasData, tilesData } from './data/defaults';
import { IArea } from './models/area';
import { ITile } from './models/tile';
import styles from './App.module.css';
import { AreaSelection } from './components/AreaSelection';
import { Map } from './components/Map';
import { CoinStrip } from './components/CoinStrip';
import { Points } from './components/Points';

function App() {
  const initializeAreaButtons = (): IArea[] => {
    return areasData.filter(e => e.name !== 'empty' && e.name !== 'mountains' && e.name !== 'ruins' && e.name !== 'valley');
  }

  const [tiles, setTiles] = useState<ITile[][]>(tilesData);
  const [areaButtons, setAreaButtons] = useState<IArea[]>(initializeAreaButtons);
  const [selectedArea, setSelectedArea] = useState<IArea | null>(null);
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    const tilesStringFromLocalStorage = localStorage.getItem('tiles');
    tilesStringFromLocalStorage ? setTiles(JSON.parse(tilesStringFromLocalStorage)) : setTiles(tilesData);

    const coinsStringFromLocalStorage = localStorage.getItem('coins');
    coinsStringFromLocalStorage ? setCoins(parseInt(coinsStringFromLocalStorage)) : setCoins(0);
  }, [])

  useEffect(() => {
    localStorage.setItem('tiles', JSON.stringify(tiles));
  }, [tiles])

  const handleSetCoins = (value: number) => {
    localStorage.setItem('coins', value.toString());
    setCoins(value);
  }

  const handleMarkTile = (id: string) => {

    const tilesTemp = [...tiles];

    for (let i = 0; i < tilesTemp.length; i++) {
      const rowTemp = tilesTemp[i];

      for (let j = 0; j < rowTemp.length; j++) {
        const tileTemp = rowTemp[j];

        if (tileTemp.id === id) {
          if (tileTemp.area.name === 'mountains' || tileTemp.area.name === 'valley') {
            return;
          }

          const tileIndex = rowTemp.indexOf(tileTemp);
          const areaToApply = selectedArea && selectedArea.type != tileTemp.area.type ? selectedArea : areasData.find(e => e.name === 'empty')!;
          rowTemp[tileIndex] = { ...tileTemp, area: areaToApply };
          break;
        }
      }
    }
    setTiles([...tilesTemp]);
  }

  return (
    <div className={styles.main}>

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

      <Points coins={coins} />

    </div>
  )
}

export default App;
