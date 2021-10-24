import React from "react";
import imagepng from "../../assets/image.png";
import "./uploadBox.css";

const UploadBox = ({ props, event }) => {
  const fileDrop = (ev) => {
    let file = ev.dataTransfer.files[0];
    ev.preventDefault();
    const previewArea = document.querySelector(".container-drag");
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

  const handleDragOver = (ev) => {
    console.log("Files in drop zone");

    ev.preventDefault();
  };
  const dragLeave = (ev) => {
    ev.preventDefault();
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
          className="container-drag"
          onDrop={(event) => fileDrop(event)}
          onDragOver={(event) => handleDragOver(event)}
          onDragEnter={(event) => dragEnter(event)}
          onDragLeave={(event) => dragLeave(event)}
        >
          <img className="svg" src={imagepng} alt="preview" />
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
