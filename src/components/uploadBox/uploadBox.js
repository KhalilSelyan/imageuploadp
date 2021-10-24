import { React, useState } from "react";
import imagepng from "../../assets/image.png";
import "./uploadBox.css";

const UploadBox = ({ props, event }) => {
  const previewArea = document.querySelector(".container-drag");
  const fileDrop = (ev) => {
    let file = ev.dataTransfer.files[0];
    ev.preventDefault();
    const fileType = file.type;
    const validExtensions = ["image/png", "image/jpeg"];
    if (validExtensions.includes(fileType)) {
      let fileReader = new FileReader();
      fileReader.onload = () => {
        let fileURL = fileReader.result;
        let imgTag = `<img src="${fileURL}" alt="preview">`;
        previewArea.innerHTML = imgTag;
      };
      fileReader.readAsDataURL(file);
    } else {
      alert("This is not an image File!");
    }
  };

  const [draggedOver, setDraggedOver] = useState(false);
  const handleDragOver = (ev) => {
    ev.preventDefault();
    setDraggedOver(true);
  };
  const [draggedOut, setDraggedOut] = useState(false);
  const dragLeave = (ev) => {
    ev.preventDefault();
    setDraggedOut(true);
  };

  const dragEnter = (ev) => {
    ev.preventDefault();
  };
  return (
    <div className="container">
      <span className="title">Upload your image</span>
      <span className="subtitle">File should be Jpeg,Png,Jpg</span>
      <div>
        <div
          className={`container-drag ${draggedOver ? "active" : ""} ${
            draggedOut ? "" : ""
          } `}
          onDrop={(event) => fileDrop(event)}
          onDragOver={(event) => handleDragOver(event)}
          onDragEnter={(event) => dragEnter(event)}
          onDragLeave={(event) => dragLeave(event)}
        >
          <img className="blankimage" src={imagepng} alt="preview" />
          <div className="container-text">Drag & Drop your image here</div>
        </div>
        <form>
          <input type="file" id="myFile" name="filename" />
          <button type="file submit" />
        </form>
      </div>
    </div>
  );
};

export default UploadBox;
