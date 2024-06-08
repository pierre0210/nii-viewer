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
    axios
      .get(`/api/plane/xy/${zSlice}`)
      .then((res) => setXYSliceData(res.data.z));
  }, [zSlice]);

  useEffect(() => {
    axios
      .get(`/api/plane/xz/${ySlice}`)
      .then((res) => setXZSliceData(res.data.z));
  }, [ySlice]);

  useEffect(() => {
    axios
      .get(`/api/plane/yz/${xSlice}`)
      .then((res) => setYZSliceData(res.data.z));
  }, [xSlice])

  return (
    <div className="App">
      <div className = "mt-4 p-6 max-w-96 mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 border-2">
        <img className="object-cover h-20 w-20 rounded-full" src="/public/icon.jpg"></img>
        <h2 className = "mx-auto text-3xl font-bold">NIfTI Viewer</h2>
      </div>
      <br></br>
      <div className ="border-b-4"></div>
      <div className="flex p-6">
        <div className ="ml-auto bg-blue-300 rounded-xl border-2">
          <p className = "text-xl text-white font-bold p-2">Current Time: </p>
        </div>
        <p className = "text-xl text-black pl-3 mr-auto pt-3">{currentTime}</p>
      </div>
      
      <div className="p-6 flex ml-auto bg-blue-200 rounded-xl">
        <Upload setData={setData} setShape={setShape} />
      </div>
      {
        Object.keys(data).length !== 0 ? (
        <><p className ="mx-auto text-3xl font-bold p-6 text-center">Show in 3D Scatter</p>
        <div id="niiPlot" className="flex justify-center w-fit px-5 mx-auto bg-white rounded-xl border-4 shadow-lg">
          <Plot data={[data]} layout={ {width: 1024, height: 720} } />
        </div>
        
        <p className ="mx-auto text-3xl font-bold p-6 text-center">Show in Slides</p>
        <div className="mx-auto w-fit h-fit bg-white rounded-xl border-4 shadow-lg">
          <div className="p-60">
            <p className ="text-center">Heat Map</p>
            <div id="slicePlots" className="p-1 flex">
              <div className="sliceContainer">
                <h3>XY Slice</h3>
                <div className="flex justify-center">
                  <div>
                    <Slider
                      label={`Z: ${zSlice}`}
                      min={0}
                      max={shape[2] - 1}
                      value={zSlice}
                      onChange={(e) => setZSlice(Number(e.target.value))}
                    />
                    <Plot
                      data={[{ z: xySliceData, type: "heatmap" }]}
                      layout={{ width: 512, height: 512 }}
                    />
                  </div>
                </div>
              </div>
              <div className="sliceContainer">
                <h3>XZ Slice</h3>
                <div className="flex justify-center">
                  <div className="block">
                    <Slider
                      label={`Y: ${ySlice}`}
                      min={0}
                      max={shape[1] - 1}
                      value={ySlice}
                      onChange={(e) => setYSlice(Number(e.target.value))}
                    />
                    <Plot
                      data={[{ z: xzSliceData, type: "heatmap" }]}
                      layout={{ width: 512, height: 512 }}
                    />
                  </div>
                </div>
              </div>
              <div className="sliceContainer">
                <h3>YZ Slice</h3>
                <div className="flex justify-center">
                  <div className="block">
                    <Slider
                      label={`X: ${xSlice}`}
                      min={0}
                      max={shape[0] - 1}
                      value={xSlice}
                      onChange={(e) => setXSlice(Number(e.target.value))}
                    />
                    <Plot
                      data={[{ z: yzSliceData, type: "heatmap" }]}
                      layout={{ width: 512, height: 512 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <p className ="m-auto text-3xl font-bold p-6 text-center">Show in Histogram</p>
        <div className="ml-auto bg-white rounded-xl border-4 shadow-lg">
          <div className="p-60">
            <p className ="text-center">Histogram</p>
          </div>
        </div></>) : null
      }
      
    </div>
  );
}

export default App;
