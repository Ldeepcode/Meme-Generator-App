import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MemeList.css";

const MemeList = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => setMemes(data.data.memes));
  }, []);

  return (
    <div className="meme-grid">
      {memes.map((meme) => (
        <div key={meme.id} className="meme-item">
          <Link to={`/edit/${meme.id}`}>
            <img src={meme.url} alt={meme.name} className="meme-image" />
          </Link>
          <Link to={`/edit/${meme.id}`} className="edit-button">
            Edit
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MemeList;
