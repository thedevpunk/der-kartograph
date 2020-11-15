import React, { useEffect, useState } from 'react';
import { areasData, map as initialMap } from './data/defaults';
import { IArea } from './models/area';
import { ITile } from './models/tile';
import styles from './App.module.css';
import { AreaSelection } from './components/AreaSelection';
import { Map } from './components/Map';
import { CoinStrip } from './components/CoinStrip';
import { Points } from './components/Points';
import { EAreaType } from './models/areaType';

function App() {
  const initializeAreaButtons = (): IArea[] => {
    return areasData.filter(e => e.name !== 'empty' && e.name !== 'mountains' && e.name !== 'ruins' && e.name !== 'valley');
  }

  const [tiles, setTiles] = useState<EAreaType[]>(initialMap);
  const [areaButtons, setAreaButtons] = useState<IArea[]>(initializeAreaButtons);
  const [selectedArea, setSelectedArea] = useState<IArea | null>(null);
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    const tilesStringFromLocalStorage = localStorage.getItem('tiles');
    tilesStringFromLocalStorage ? setTiles(JSON.parse(tilesStringFromLocalStorage)) : setTiles(initialMap);

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

  const handleMarkTile = (idx: number) => {

    if(!selectedArea) {
      return;
    }

    const tilesTemp = [...tiles];
    tilesTemp[idx] = tilesTemp[idx] == selectedArea.type ? EAreaType.Empty : selectedArea.type;

    setTiles([...tilesTemp]);
  }

  return (
    <div className={styles.app}>

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
