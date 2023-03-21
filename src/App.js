import React, { useState } from "react";
import Xarrow from "react-xarrows";

export default function App() {
  const [mode, setMode] = useState("waiting");
  const [arrows, setArrows] = useState([]);

  console.log("arrows", arrows);

  const handleButtonClick = (e) => {
    if (mode === "waiting") {
      setMode("drawing");

      const newArrow = {
        id: arrows.length,
        start: e.target.id,
        end: null
      };
      setArrows([...arrows, newArrow]);
    } else if (mode === "drawing") {
      // get the last arrow from the array
      const lastArrow = arrows[arrows.length - 1];
      // check if the button clicked is not the same as the start button
      if (lastArrow.start !== e.target.id) {
        // check if the arrow is pointing in the correct direction
        if (
          e.target.classList.contains("btn-target") &&
          document
            .getElementById(lastArrow.start)
            .classList.contains("btn-origin")
        ) {
          setMode("waiting");

          // update the last arrow with the end
          lastArrow.end = e.target.id;
          // drop the last arrow from the array
          const newArrows = arrows.slice(0, arrows.length - 1);

          // add the updated arrow to the array
          setArrows([...newArrows, lastArrow]);
        }
      }
    }
  };

  return (
    <div
      className="container-fluid"
      style={mode === "drawing" ? { cursor: "grab" } : {}}
    >
      <h2 className="text-center">Matching pairs</h2>

      <div className="row m-5">
        <div className="col-6">
          <button
            onClick={handleButtonClick}
            className="btn btn-pair btn-origin"
            id="1"
          >
            1
          </button>
        </div>
        <div className="col-6">
          <div
            onClick={handleButtonClick}
            id="2"
            className={
              mode === "drawing"
                ? "btn btn-target btn-pair blob"
                : "btn btn-target btn-pair"
            }
          >
            2
          </div>
        </div>
      </div>
      <div className="row m-5">
        <div className="col-6">
          <button
            onClick={handleButtonClick}
            className="btn btn-pair btn-origin"
            id="3"
          >
            3
          </button>
        </div>
        <div className="col-6">
          <div
            onClick={handleButtonClick}
            id="4"
            className={
              mode === "drawing"
                ? "btn btn-target btn-pair blob"
                : "btn btn-target btn-pair"
            }
          >
            4
          </div>
        </div>
      </div>
      {arrows.map(
        (arrow) =>
          arrow.start &&
          arrow.end && (
            <Xarrow
              key={arrow.id}
              start={arrow.start}
              end={arrow.end}
              strokeWidth={3}
              path="smooth"
              animateDrawing={0.1}
            />
          )
      )}
    </div>
  );
}
