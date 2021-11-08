import "./App.css";
import { useState, useRef } from "react";

function App() {
  return (
    <div id="upload-box">
      <div id="upload-container">
        <span id="title">Upload your image</span>
        <span id="subtitle">File should be Jpeg,Png....</span>
        <div id="drag-box">
          <img src="/image.svg" alt="preview" />
          <span id="dragtext">Drag & Drop your image here</span>
        </div>
        <span id="or">Or</span>
        <input type="file" id="file" accept="image/png, image/jpeg" />
        <button className="button">Choose a file</button>
      </div>
    </div>
  );
}

export default App;
