import React, { useEffect, useRef, useState, useCallback } from "react";

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [cursorId, setCursorId] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const lastNewsElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                fetchNews();
            }
        });
        if (node) observer.current.observe(node);
    }, [loading]);

    const observer = useRef();
  
    const fetchNews = useCallback(async () => {
        setLoading(true);
        const response = await fetch(
          cursorId
            ? `http://localhost:8080/api/news?cursorId=${cursorId}&limit=10`
            : `http://localhost:8080/api/news?limit=10`
        );
        const data = await response.json();
        if (!data || data.length === 0) {
          setCursorId(null);
        } else {
          setCursorId(data[data.length - 1].id);
          setNews((prevNews) => [...prevNews, ...data]);
        }
        setLoading(false);
    }, [cursorId]);
  
    useEffect(() => {
        fetchNews();
    }, []);
  
    const fetchSummary = async (id) => {
      const response = await fetch(`http://localhost:8080/api/news/${id}`, {
        method: 'POST'
      });
      const summary = await response.text();
      alert(summary);
    };

    return (
      <div>
        <h1>News List</h1>
        {news.map((item, index) => (
          <div key={item.id} ref={index === news.length - 1 ? lastNewsElementRef : null}>
            <h2>{item.title}</h2>
            <p>{item.content.length > 15 ? item.content.slice(0, 15) + '...' : item.content}</p>
            <p>{item.reporter}</p>
            <p>{item.category}</p>
            <p>{item.press}</p>
            <p>{item.platform}</p>
            <button onClick={() => fetchSummary(item.id)}>요약하기</button>
          </div>
        ))}
      </div>
    );
  };

  export default NewsList;
