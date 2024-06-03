import React from "react";

function Slider({ label, min, max, value, onChange }) {
  return (
    <div className="slider flex justify-center">
      <label>{label}</label>
      <div className="flex justify-center mx-2">
        <p>{ min }</p>
        <input type="range" className="mx-2" min={min} max={max} value={value} step={1} onChange={onChange} />
        <p>{ max }</p>
      </div>
    </div>
  );
}

export default Slider;