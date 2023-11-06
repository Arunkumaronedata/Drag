import React, { useRef, useState, useEffect } from "react";
import "./DragDrop.css";

const DragDrop = () => {
  const divRef = useRef(null);
  const parentRef = useRef(null);
  const [resizing, setResizing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startLeft, setStartLeft] = useState(0);
  const [startTop, setStartTop] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const [startHeight, setStartHeight] = useState(0);
  const [showHandles, setShowHandles] = useState(false);
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        const offsetX = e.clientX - startX;
        const offsetY = e.clientY - startY;
  
        const div = divRef.current;
        let newLeft = startLeft + offsetX;
        let newTop = startTop + offsetY;
  
        if (newLeft < 0) {
          newLeft = 0;
        }
        if (newTop < 0) {
          newTop = 0;
        }
  
        div.style.left = `${newLeft}px`;
        div.style.top = `${newTop}px`;
      }
  
      if (resizing) {
        const offsetX = e.clientX - startX;
        const offsetY = e.clientY - startY;
  
        const div = divRef.current;
        let newWidth = startWidth + offsetX;
        let newHeight = startHeight + offsetY;
  
        if (newWidth < 100) {
          newWidth = 100;
        }
        if (newHeight < 100) {
          newHeight = 100;
        }
  
        div.style.width = `${newWidth}px`;
        div.style.height = `${newHeight}px`;
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
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (divRef.current && !divRef.current.contains(e.target)) {
        setShowHandles(false);
        setDragging(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleMouseDown = (e) => {
    const target = e.target;
    const isResizeHandle = target.classList.contains("resize-handle");

    if (isResizeHandle) {
      setResizing(true);
      setDragging(false);
      setStartX(e.clientX);
      setStartY(e.clientY);
      setStartWidth(divRef.current.clientWidth);
      setStartHeight(divRef.current.clientHeight);
    } else {
      setDragging(true);
      setResizing(false);
      setStartX(e.clientX);
      setStartY(e.clientY);
      const div = divRef.current;
      setStartLeft(div.offsetLeft);
      setStartTop(div.offsetTop);
    }
  };



  const handleHideShow = () => {
    setShowHandles(!showHandles);
  };

  // const addResizableBox = () => {
  //   setBoxes([...boxes, <DragDrop key={boxes.length} />]);
  // };

  return (
    <div
      className="App"
      onClick={handleHideShow}
      style={{ width: "100vw", height: "10vh", position: "relative" }}
    >
      <div
        className="resizable-parent"
        ref={parentRef}
        style={{ position: "relative", width: "100%", height: "5%" }}
      >
        <div
          className="resizable-div"
          ref={divRef}
          onMouseDown={handleMouseDown}
          style={{
            wordBreak: "break-all",
            cursor: "text",
            border: "1px solid black",
            width: "100px",
            height: "100px",
            whiteSpace: "pre-wrap",
            fontSize: "20px",
            overflow: "hidden",
            lineHeight: "30px",
            userSelect: "text",
            position: "absolute",
            left: '0px'
          }}
        >
          <div
            className="flex-item"
            contentEditable={true}
            style={{
              overflow: "hidden",
              maxHeight: "100%",
              maxWidth: "100%",
            }}
          >
            Hello World
          </div>
          <div
            className="flex-item"
            contentEditable={true}
            style={{
              overflow: "hidden",
              maxHeight: "100%",
              maxWidth: "100%",
              marginTop: "100px",
              alignItems: "center",
            }}
          >
            Register Here
          </div>
          {showHandles && (
            <>
              <div className="resize-handle top" />
              <div className="resize-handle right" />
              <div className="resize-handle bottom" />
              <div className="resize-handle left" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DragDrop;
