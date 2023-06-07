// NewsSearch.js
import React, { useState } from 'react';
import axios from 'axios';

const NewsSearch = () => {
    const [id, setId] = useState('');
    const [summary, setSummary] = useState('');

    const fetchSummary = async () => {
        const result = await axios.post(`http://localhost:8080/news/${id}`);
        setSummary(result.data.summary);
    };

    return (
        <div>
            <h1>Search News</h1>
            <input value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter news id" />
            <button onClick={fetchSummary}>Summarize</button>
            {summary && <p>{summary}</p>}
        </div>
    );
};

export default NewsSearch;
