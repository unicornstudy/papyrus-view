// Main.js
import React, { useState } from 'react';

const Main = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div>
            <h1>Welcome to News App</h1>
            {isLoggedIn ? (
                <button onClick={() => setIsLoggedIn(false)}>Logout</button>
            ) : (
                <button onClick={() => setIsLoggedIn(true)}>Login</button>
            )}
        </div>
    );
};

export default Main;
