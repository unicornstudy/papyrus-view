// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './MainTemp.js';
import NewsList from './NewsListTemp.js';
import NewsSearch from './NewsSearch';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/news" element={<NewsList />} />
                <Route path="/search" element={<NewsSearch />} />
                <Route path="/" element={<Main />} />
            </Routes>
        </Router>
    );
};

export default App;
