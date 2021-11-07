import { React, useState } from "react";
import imagepng from "../../assets/image.png";
import "./uploadBox.css";

const UploadBox = ({ props, event }) => {
  const previewArea = document.querySelector(".container-drag");
  const [file, setFile] = useState(null);

  const handleImageChange = () => {
    if (file) {
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
    }
  };

  const fileDrop = (ev) => {
    ev.preventDefault();
    setFile(ev.dataTransfer.files[0]);
    handleImageChange();
  };

  const [draggedOver, setDraggedOver] = useState(false);
  const handleDragOver = (ev) => {
    ev.preventDefault();
    setDraggedOver(true);
  };
  const dragLeave = (ev) => {
    ev.preventDefault();
    setDraggedOver(false);
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
          className={`container-drag ${draggedOver ? "active" : ""}`}
          onDrop={(event) => fileDrop(event)}
          onDragOver={(event) => handleDragOver(event)}
          onDragEnter={(event) => dragEnter(event)}
          onDragLeave={(event) => dragLeave(event)}
        >
          <img className="blankimage" src={imagepng} alt="preview" />
          <div className="container-text">Drag & Drop your image here</div>
        </div>
        <form className="form">
          <input
            type="button"
            id="get_file"
            value="Upload Image"
            onClick={() => {
              document.getElementById("myFile").click();
            }}
          />
          <input
            type="file"
            id="myFile"
            name="filename"
            onInput={(event) => {
              console.log(event);
              setFile(event.target.files[0]);
              handleImageChange();
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default UploadBox;
