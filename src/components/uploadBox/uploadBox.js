import React from "react";

import "./uploadBox.css";

const UploadBox = (props) => {
  //   const handleDrop = (ev) => {
  //     console.log("File dropped");

  //     ev.preventDefault();
  //     if (ev.dataTransfer.items) {
  //       for (var i = 0; i < ev.dataTransfer.items.length; i++) {
  //         if (ev.dataTransfer.items[i].kind === "file") {
  //           var file = ev.dataTransfer.items[i].getAsFile();
  //           console.log("... file[" + i + "].name = " + file.name);
  //           // TODO : SHOW UPLOADED PICTURE
  //         }
  //       }
  //     } else {
  //       // Use DataTransfer interface to access the file(s)
  //       for (var j = 0; j < ev.dataTransfer.files.length; j++) {
  //         console.log(
  //           "... file[" + j + "].name = " + ev.dataTransfer.files[j].name
  //         );
  //       }
  //     }
  //   };

  const fileDrop = (ev) => {
    ev.preventDefault();
    console.log(ev.dataTransfer.files);
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
    <div
      className="container-drag"
      onDrop={(event) => fileDrop(event)}
      onDragOver={(event) => handleDragOver(event)}
      onDragEnter={(event) => dragEnter(event)}
      onDragLeave={(event) => dragLeave(event)}
    >
      {/* <div className="container-text">
        Drag one or more photos into this zone.
      </div> */}
    </div>
  );
};

export default UploadBox;
