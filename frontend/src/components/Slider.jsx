import React from "react";

function Slider({ label, min, max, value, onChange }) {
  return (
    <div className="slider flex justify-center">
      <label>{label}</label>
      <div className="flex justify-center mx-2">
        <p>{ min }</p>
        <input type="range" className="m-auto mx-2 h-2 rounded-lg appearance-none cursor-pointer bg-slate-600" min={min} max={max} value={value} step={1} onChange={onChange} />
        <p>{ max }</p>
      </div>
    </div>
  );
}

export default Slider;