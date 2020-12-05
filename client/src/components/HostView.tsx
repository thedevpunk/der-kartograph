import React from 'react';
import styles from './HostView.module.css';

interface IProps {
    visible: boolean;
}

export const HostView: React.FC<IProps> = ({ visible }) => {
    return (
        <div className={`${styles.hostView} ${visible ? styles.hostViewVisible : ''}`}>
            
        </div>
    )
}
