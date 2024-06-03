import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import "./App.css";
import Upload from "./components/Upload";
import Slider from "./components/Slider";
import axios from "axios";

function App() {
  const [currentTime, setCurrentTime] = useState("");
  const [data, setData] = useState({});
  const [shape, setShape] = useState([0, 0, 0]);
  const [xSlice, setXSlice] = useState(0);
  const [ySlice, setYSlice] = useState(0);
  const [zSlice, setZSlice] = useState(0);
  const [xySliceData, setXYSliceData] = useState([]);
  const [xzSliceData, setXZSliceData] = useState([]);
  const [yzSliceData, setYZSliceData] = useState([]);

  useEffect(() => {
    fetch("/api/time")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCurrentTime(data.time);
      });
  }, []);

  useEffect(() => {
    if (shape[0] > 0) {
      setXSlice(Math.floor(shape[0] / 2));
      setYSlice(Math.floor(shape[1] / 2));
      setZSlice(Math.floor(shape[2] / 2));
    }
  }, [shape]);

  useEffect(() => {
    if (shape[0] > 0) {
      axios
        .get(`/api/plane/xy/${zSlice}`)
        .then((res) => setXYSliceData(res.data.z));
      axios
        .get(`/api/plane/xz/${ySlice}`)
        .then((res) => setXZSliceData(res.data.z));
      axios
        .get(`/api/plane/yz/${xSlice}`)
        .then((res) => setYZSliceData(res.data.z));
    }
  }, [xSlice, ySlice, zSlice, shape]);

  return (
    <div className="App">
      <p>Current Time: {currentTime}</p>
      <Upload setData={setData} setShape={setShape} />
      <div id="niiPlot" className="p-1">
        {Object.keys(data).length !== 0 ? (
          <Plot data={[data]} layout={{ width: 1024, height: 720 }} />
        ) : null}
      </div>
      {shape[0] > 0 && (
        <div>
          <div>
            <Slider
              label={`X: ${xSlice}`}
              min={0}
              max={shape[0] - 1}
              value={xSlice}
              onChange={(e) => setXSlice(Number(e.target.value))}
            />
          </div>
          <div>
            <Slider
              label={`Y: ${ySlice}`}
              min={0}
              max={shape[1] - 1}
              value={ySlice}
              onChange={(e) => setYSlice(Number(e.target.value))}
            />
          </div>
          <div>
            <Slider
              label={`Z: ${zSlice}`}
              min={0}
              max={shape[2] - 1}
              value={zSlice}
              onChange={(e) => setZSlice(Number(e.target.value))}
            />
          </div>
        </div>
      )}
      <div id="slicePlots" className="p-1">
        <div className="sliceContainer">
          <h3>XY Slice</h3>
          {xySliceData.length > 0 ? (
            <Plot
              data={[{ z: xySliceData, type: "heatmap" }]}
              layout={{ width: 512, height: 512 }}
            />
          ) : null}
        </div>
        <div className="sliceContainer">
          <h3>XZ Slice</h3>
          {xzSliceData.length > 0 ? (
            <Plot
              data={[{ z: xzSliceData, type: "heatmap" }]}
              layout={{ width: 512, height: 512 }}
            />
          ) : null}
        </div>
        <div className="sliceContainer">
          <h3>YZ Slice</h3>
          {yzSliceData.length > 0 ? (
            <Plot
              data={[{ z: yzSliceData, type: "heatmap" }]}
              layout={{ width: 512, height: 512 }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
