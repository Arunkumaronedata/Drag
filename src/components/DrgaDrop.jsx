import React, { useRef, useState, useEffect } from "react";
import "./DragDrop.css";

const DragDrop = () => {
  const divRef = useRef(null);
  const [resizing, setResizing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startLeft, setStartLeft] = useState(0);
  const [startTop, setStartTop] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const [startHeight, setStartHeight] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (resizing) {
        const offsetX = e.clientX - startX;
        const offsetY = e.clientY - startY;

        const div = divRef.current;
        const newWidth = startWidth + offsetX;
        const newHeight = startHeight + offsetY;

        div.style.width = `${newWidth}px`;
        div.style.height = `${newHeight}px`;
      }
      if (dragging) {
        const offsetX = e.clientX - startX;
        const offsetY = e.clientY - startY;

        const div = divRef.current;
        const newLeft = startLeft + offsetX;
        const newTop = startTop + offsetY;

        div.style.left = `${newLeft}px`;
        div.style.top = `${newTop}px`;
      }
    };

    const handleMouseUp = () => {
      setResizing(false);
      setDragging(false);
    };

    if (resizing || dragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizing, dragging, startX, startY, startLeft, startTop, startWidth, startHeight]);

  const handleMouseDown = (e) => {
    const target = e.target;

    if (target.classList.contains("resize-handle")) {
      setResizing(true);
      setStartX(e.clientX);
      setStartY(e.clientY);
      setStartWidth(divRef.current.clientWidth);
      setStartHeight(divRef.current.clientHeight);
    } else {
      setDragging(true);
      setStartX(e.clientX);
      setStartY(e.clientY);
      const div = divRef.current;
      setStartLeft(div.offsetLeft);
      setStartTop(div.offsetTop);
    }
  };

  return (
    <div className="App" style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <div
        className="resizable-div"
        ref={divRef}
        onMouseDown={handleMouseDown}
        style={{
          wordBreak: 'break-all',
          cursor: 'text',
          border: '1px solid black',
          width: '100px',
          height: '100px',
          whiteSpace: 'pre-wrap',
          fontSize: '20px',
          overflow: 'hidden',
          lineHeight: '30px',
          userSelect: 'text', // Add userSelect property
        }}
      >
        <div className="flex-item" contentEditable={true} style={{ overflow: "hidden", maxHeight: "100%", maxWidth: "100%" }}>
          Hello World
        </div>
        <div className="flex-item" contentEditable={true} style={{ overflow: "hidden", maxHeight: "100%", maxWidth: "100%", marginTop: '100px', alignItems: 'center' }}>
          Register Here
        </div>
        <div className="resize-handle top" />
        <div className="resize-handle right" />
        <div className="resize-handle bottom" />
        <div className="resize-handle left" />
      </div>
    </div>
  );
};

export default DragDrop;