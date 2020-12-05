import React from 'react'
import styles from './Navigation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faNetworkWired, faPlug, faRedo, faTrophy } from '@fortawesome/free-solid-svg-icons';

interface IProps {
    gameId: string;
    onlineVisible: boolean;
    setGameId: (gameId: string) => void;
    handleReset: () => void;
    handleToggleOnline: () => void;
    handleTogglePoints: () => void;
    handleCreateSession: () => void;
    handleJoinSession: () => void;
}

export const Navigation: React.FC<IProps> = ({
    gameId,
    onlineVisible,
    setGameId,
    handleReset,
    handleToggleOnline,
    handleTogglePoints,
    handleCreateSession,
    handleJoinSession
}) => {

    return (
        <>
            <div className={styles.main}>
                <button className={styles.btn} onClick={handleReset}><FontAwesomeIcon icon={faRedo} /> RESET</button>
                <button className={styles.btn} onClick={handleToggleOnline}><FontAwesomeIcon icon={faGlobe} /> ONLINE</button>
                <button className={`${styles.btn} ${styles.btnPoints}`} onClick={handleTogglePoints}><FontAwesomeIcon icon={faTrophy} /> POINTS</button>
            </div>
            <div className={`${styles.online} ${onlineVisible ? styles.onlineVisible : ''}`}>
                <button className={styles.btn} onClick={handleCreateSession}><FontAwesomeIcon icon={faNetworkWired} /> HOST</button>
                <div className={styles.join}>
                    <input value={gameId} onChange={(event) => setGameId(event.currentTarget.value)} />
                    <button className={styles.btn} onClick={handleJoinSession}><FontAwesomeIcon icon={faPlug} /> JOIN</button>
                </div>
            </div>
        </>
    )
}
