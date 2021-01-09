import { faNetworkWired, faPlug } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { IGame } from '../models/game';
import styles from './GameView.module.css';

interface IProps {
    gameId: string;
    visible: boolean;
    game: IGame | null;
    setGameId: (gameId: string) => void;
    handleCreateSession: () => void;
    handleJoinSession: () => void;
}

export const GameView: React.FC<IProps> = ({ 
    gameId, 
    visible, 
    game, 
    setGameId, 
    handleCreateSession, 
    handleJoinSession
}) => {

    return (
        <div className={`${styles.gameView} ${visible ? styles.visible : ''}`}>

            {game
                ? (
                    <>
                        <div className={styles.gameInfo}>
                            <h2>Game-ID: {game && game.id}</h2>
                        </div>

                        <div className={styles.playerList}>
                            {game.players.map(player => (
                                <div key={player.id}>
                                    {player.id}
                                    {player.connectionId}
                                </div>
                            ))}
                        </div>

                        <div>
                            <h2>Aktuelle Karte</h2>
                            <p>{game.currentCard}</p>
                            <img className={styles.card} src={`cards/${game.currentCard}.png`} />
                            <p>Es wurden bereits <strong>{game.playedCards.length}</strong> Karten gespielt.</p>
                        </div>
                    </>
                )
                : (
                    <>
                        <p>Noch kein Spiel erstellt...</p>

                        {/* <div className={`${styles.online} ${visible ? styles.visible : ''}`}> */}
                            <button className={styles.btn} onClick={handleCreateSession}><FontAwesomeIcon icon={faNetworkWired} /> HOST</button>
                            <div className={styles.join}>
                                <input value={gameId} onChange={(event) => setGameId(event.currentTarget.value)} />
                                <button className={styles.btn} onClick={handleJoinSession}><FontAwesomeIcon icon={faPlug} /> JOIN</button>
                            </div>
                        {/* </div> */}
                    </>
                )
            }

        </div>
    )
}