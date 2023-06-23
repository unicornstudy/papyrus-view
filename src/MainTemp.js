// Main.js
import React, { useState } from 'react';
import styles from './Main.module.css';

const Main = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className={styles.container}>
            <h1>📰 Papyrus</h1>
            {!isLoggedIn ? (
                <div className={styles.buttonContainer}>
                    <button className={styles.google} onClick={() => setIsLoggedIn(true)}>구글로 로그인</button>
                    <button className={styles.naver} onClick={() => setIsLoggedIn(true)}>네이버로 로그인</button>
                </div>
            ) : (
                <button onClick={() => setIsLoggedIn(false)}>Logout</button>
            )}
        </div>
    );
};

export default Main;
