import React, { useEffect, useRef, useState, useCallback } from "react";
import './NewsList.css';  // 뉴스 리스트와 모달에 대한 CSS 파일을 import합니다.

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [cursorId, setCursorId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
  
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
      setSummary(summary);
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    return (
      <div className="NewsList">
        <h1>News List</h1>
        {news.map((item, index) => (
          <div key={item.id} ref={index === news.length - 1 ? lastNewsElementRef : null} className="news-item">
            <h2>{item.title}</h2>
            <p>{item.content}</p>
            <p>{item.reporter}</p>
            <p>{item.category}</p>
            <p>{item.press}</p>
            <p>{item.platform}</p>
            <button onClick={() => fetchSummary(item.id)}>요약하기</button>
          </div>
        ))}
        <SummaryModal summary={summary} isOpen={isModalOpen} closeModal={closeModal} />
      </div>
    );
};

const SummaryModal = ({ summary, isOpen, closeModal }) => {
  return (
    <div className={`summary-popup ${isOpen ? "open" : ""}`}>
      <div className="summary-content">
        <h2>News Summary</h2>
        <p>{summary}</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default NewsList;
