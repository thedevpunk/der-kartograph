import React, { useEffect } from 'react';
import { IGame } from '../models/game';
import styles from './HostView.module.css';

interface IProps {
    visible: boolean;
    game: IGame | null;
}

export const HostView: React.FC<IProps> = ({ visible, game }) => {

    return (
        <div className={`${styles.hostView} ${visible ? styles.hostViewVisible : ''}`}>

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
                    </>
                )
                : (
                    <p>Noch kein Spiel erstellt...</p>
                )
            }

        </div>
    )
}
