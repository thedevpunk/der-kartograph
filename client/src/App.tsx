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
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faNetworkWired, faPlug, faRedo, faTrash, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { Navigation } from './components/Navigation';
import { HostView } from './components/HostView';
import { IGame } from './models/game';
import { GameView } from './components/GameView';

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
  const [areaButtons] = useState<IArea[]>(initializeAreaButtons);
  const [selectedArea, setSelectedArea] = useState<IArea | null>(null);
  const [coins, setCoins] = useState(0);
  const [points, setPoints] = useState<IPoints[][]>(initializePoints);
  const [pointsVisible, setPointsVisible] = useState(false);
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [gameId, setGameId] = useState('');
  const [onlineVisible, setOnlineVisible] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [hostViewVisible, setHostViewVisible] = useState(false);
  const [game, setGame] = useState<IGame | null>(null);

  useEffect(() => {
    const tilesStringFromLocalStorage = localStorage.getItem('tiles');
    tilesStringFromLocalStorage ? setTiles(JSON.parse(tilesStringFromLocalStorage)) : setTiles(initialMap);

    const coinsStringFromLocalStorage = localStorage.getItem('coins');
    coinsStringFromLocalStorage ? setCoins(parseInt(coinsStringFromLocalStorage)) : setCoins(0);

    const pointsStringFromLocalStorage = localStorage.getItem('points');
    pointsStringFromLocalStorage ? setPoints(JSON.parse(pointsStringFromLocalStorage)) : setPoints(initializePoints);
  }, [])

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:5001/game')
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, [])

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(result => {
          console.log('Connected with hub!');

          connection.on('ReceiveGameIsCreated', (game: IGame) => {
            console.log(`the game is created: ${game}`);
            setGame(game);
          })

          connection.on('ReceivePlayerHasJoined', (game: IGame) => {
            console.log(`player joined to game: ${game}`);
            setGame(game);
          })
        })
        .catch(error => {
          console.log('hub conenction error: ', error);
        })
    }

  }, [connection])

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

    if (tilesTemp[idx] === selectedArea.type) {
      if (initialMap[idx] === EAreaType.Ruins) {
        tilesTemp[idx] = EAreaType.Ruins;
      } else {
        tilesTemp[idx] = EAreaType.Empty;
      }
    } else {
      tilesTemp[idx] = selectedArea.type
    }

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

  const handleCreateSession = async () => {
    if (connection && connection.state === HubConnectionState.Connected) {
      await connection.send('CreateGame', 'Andre');
      setIsHost(true);
      setOnlineVisible(false);
      setHostViewVisible(true);
    }
  }

  const handleJoinSession = async () => {
    handleReset();

    if (connection && connection.state === HubConnectionState.Connected) {
      await connection.send('JoinGame', gameId, 'Arnold');
    }
  }

  const handleTogglePoints = () => {
    setPointsVisible(!pointsVisible);
  }

  const handleToggleOnline = () => {
    // isHost ? setHostViewVisible(!hostViewVisible) : setOnlineVisible(!onlineVisible);
    setOnlineVisible(!onlineVisible);
  }

  return (
    <div className={styles.app}>
      <Navigation
        gameId={gameId}
        onlineVisible={onlineVisible}
        setGameId={setGameId}
        handleReset={handleReset}
        handleToggleOnline={handleToggleOnline}
        handleTogglePoints={handleTogglePoints}
        handleCreateSession={handleCreateSession}
        handleJoinSession={handleJoinSession}
      />

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

        <Points
          points={points}
          setPoints={handleSetPoints}
          coins={coins}
          visible={pointsVisible}
        />

        <GameView
          gameId={gameId}
          visible={onlineVisible}
          game={game}
          setGameId={setGameId}
          handleCreateSession={handleCreateSession}
          handleJoinSession={handleJoinSession}
        />
      </div>


    </div>
  )
}

export default App;
