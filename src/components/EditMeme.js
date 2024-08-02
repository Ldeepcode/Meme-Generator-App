import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import "./EditMeme.css";

const EditMeme = () => {
  const { id } = useParams();
  const [meme, setMeme] = useState(null);
  const [texts, setTexts] = useState([]);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => {
        const selectedMeme = data.data.memes.find((m) => m.id === id);
        setMeme(selectedMeme);
      });
  }, [id]);

  const addText = () => {
    setTexts([...texts, { text: textInput, x: 0, y: 0 }]);
    setTextInput("");
  };

  const saveMeme = () => {
    const container = document.querySelector("#meme-container");
    html2canvas(container, { useCORS: true }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg");
      link.download = "meme.jpg";
      link.click();
    });
  };

  return (
    <div>
      {meme && (
        <div>
          <div id="meme-container" className="meme-container">
            <img src={meme.url} alt={meme.name} className="meme-image" />
            {texts.map((text, index) => (
              <Draggable key={index}>
                <div className="draggable-text">{text.text}</div>
              </Draggable>
            ))}
          </div>
          <div className="controls">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter text"
            />
            <button className="add-text-button" onClick={addText}>
              Add Text
            </button>
            <button className="save-meme-button" onClick={saveMeme}>
              Save Meme
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditMeme;
