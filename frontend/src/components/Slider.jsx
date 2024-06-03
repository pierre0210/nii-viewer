import React from "react";

function Slider({ label, min, max, value, onChange }) {
  return (
    <div className="slider">
      <label>{label}: {value}</label>
      <input type="range" min={min} max={max} value={value} onChange={onChange} />
    </div>
  );
}

export default Slider;