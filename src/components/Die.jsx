import React from "react";

function Die({ id, value, isHeld, hold }) {
  return (
    <button
      className={isHeld ? "dieButton isHeld" : "dieButton"}
      onClick={() => {
        hold(id);
      }}
    >
      {value}
    </button>
  );
}

export default Die;
