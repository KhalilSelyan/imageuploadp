import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [draggedOver, setDraggedOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const onDragOver = (e) => {
    e.preventDefault();
  };
  const onDragEnter = (e) => {
    e.preventDefault();
    setDraggedOver(true);
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    setDraggedOver(false);
  };
  const onDrop = (e) => {
    e.preventDefault();

    const imageType = ["image/jpeg", "image/png"];
    if (
      e.dataTransfer.files[0]["type"] &&
      imageType.includes(e.dataTransfer.files[0]["type"])
    ) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const onClickUpload = () => {
    document.getElementById("file").click();
  };

  const onClickClear = () => {
    setFile(null);
  };

  const onClickSubmit = () => {
    setSubmitted(true);
    submitImage();
  };

  const submitImage = async () => {
    setIsLoading(true);
    let body = new FormData();
    body.set("key", process.env.REACT_APP_IMGBB);
    body.append("image", file);
    const res = await axios({
      method: "post",
      url: "https://api.imgbb.com/1/upload",
      data: body,
    });

    setImageUrl(res.data.data.display_url);
    setIsLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(imageUrl);
    // alert("Link copied to clipboard");
  };

  return (
    <>
      {!submitted ? (
        <>
          <div className="upload-box">
            <div id="upload-container">
              <span id="title">Upload your image</span>
              <span id="subtitle">File should be Jpeg,Png....</span>
              <div
                id="drag-box"
                className={`${draggedOver || file ? "solid" : ""}`}
                onDrop={onDrop}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
              >
                {file ? (
                  <img
                    id="uploaded-img"
                    src={URL.createObjectURL(file)}
                    alt="uploaded"
                  />
                ) : (
                  <>
                    <img src="/image.svg" alt="preview" />
                    <span id="dragtext">Drag & Drop your image here</span>
                  </>
                )}
              </div>
              <span id="or">Or</span>
              <input
                type="file"
                id="file"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
              {file ? (
                <div>
                  <button id="clear" className="button" onClick={onClickClear}>
                    Clear
                  </button>
                  <button
                    id="submit"
                    className="button"
                    onClick={onClickSubmit}
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <button className="button" onClick={onClickUpload}>
                  Choose a file
                </button>
              )}
            </div>
          </div>
        </>
      ) : isLoading ? (
        <>
          <div id="loading-bar">
            Loading...
            <div className="container">
              <div className="progress2 progress-moved">
                <div className="progress-bar2"></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="upload-box">
          <img id="check" src="/check.png" alt="check" />
          <span>Uploaded Successfully</span>
          <img id="submitted-img" src={imageUrl} alt="uploaded" />
          <div id="link-url">
            <span id="linktext">{imageUrl}</span>
            <button className="button" onClick={copyToClipboard}>
              Copy URL
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
