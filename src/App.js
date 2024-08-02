import React from "react";
import { Routes, Route } from "react-router-dom";
import MemeList from "./components/MemeList";
import EditMeme from "./components/EditMeme";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MemeList />} />
        <Route path="/edit/:id" element={<EditMeme />} />
      </Routes>
    </div>
  );
}

export default App;
