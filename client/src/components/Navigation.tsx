import React from 'react';
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
           <div className={styles.navigation}>
                <button className={styles.link} onClick={handleReset}><FontAwesomeIcon icon={faRedo} /></button>
                <button className={styles.link} onClick={handleToggleOnline}><FontAwesomeIcon icon={faGlobe} /></button>
                <button className={`${styles.link} ${styles.btnPoints}`} onClick={handleTogglePoints}><FontAwesomeIcon icon={faTrophy} /></button>
            </div>


            {/* <div className={styles.main}>
                <button className={styles.link} onClick={handleReset}><FontAwesomeIcon icon={faRedo} /></button>
                <button className={styles.link} onClick={handleToggleOnline}><FontAwesomeIcon icon={faGlobe} /></button>
                <button className={`${styles.link} ${styles.btnPoints}`} onClick={handleTogglePoints}><FontAwesomeIcon icon={faTrophy} /></button>
            </div>
            <div className={`${styles.online} ${onlineVisible ? styles.onlineVisible : ''}`}>
                <button className={styles.btn} onClick={handleCreateSession}><FontAwesomeIcon icon={faNetworkWired} /> HOST</button>
                <div className={styles.join}>
                    <input value={gameId} onChange={(event) => setGameId(event.currentTarget.value)} />
                    <button className={styles.btn} onClick={handleJoinSession}><FontAwesomeIcon icon={faPlug} /> JOIN</button>
                </div>
            </div> */}
        </>
    )
}
