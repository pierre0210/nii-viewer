import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import "./App.css";
import Upload from "./components/Upload";
import SurfacePlot from "./components/SurfacePlot";
import SlicePlot from "./components/SlicePlot";
import axios from "axios";
import Histogram from "./components/Histogram";

function App() {
  const [data, setData] = useState({});
  const [shape, setShape] = useState([0, 0, 0]);
  const [hist, setHist] = useState([]);
  const [edges, setEdges] = useState([]);

  const [xSlice, setXSlice] = useState(0);
  const [ySlice, setYSlice] = useState(0);
  const [zSlice, setZSlice] = useState(0);

  const [xySliceData, setXYSliceData] = useState([]);
  const [xzSliceData, setXZSliceData] = useState([]);
  const [yzSliceData, setYZSliceData] = useState([]);

  useEffect(() => {
    if (shape[0] > 0) {
      setXSlice(Math.floor(shape[0] / 2));
      setYSlice(Math.floor(shape[1] / 2));
      setZSlice(Math.floor(shape[2] / 2));
    }
  }, [shape]);

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      axios
        .get("/api/hist")
        .then((res) => {
          console.log(res.data);
          setHist(res.data.hist);
          setEdges(res.data.edges);
        })
    }
  }, [data]);

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      axios
        .get(`/api/plane/xy/${zSlice}`)
        .then((res) => setXYSliceData(res.data.z));
    }
  }, [zSlice]);

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      axios
        .get(`/api/plane/xz/${ySlice}`)
        .then((res) => setXZSliceData(res.data.z));
    }
  }, [ySlice]);

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      axios
        .get(`/api/plane/yz/${xSlice}`)
        .then((res) => setYZSliceData(res.data.z));
    }
  }, [xSlice]);

  return (
    <div className="App bg-gray-100">
      <div className={`flex ${Object.keys(data).length !== 0 ? "" : "h-screen"}`}>
        <div className={`p-6 w-fit h-fit ${Object.keys(data).length !== 0 ? "mx-auto mt-10" : "m-auto"} bg-white rounded-xl shadow-lg flex items-center space-x-4 border-2`}>
          <img className="object-cover h-20 w-20 rounded-full" src="/icon.jpg"></img>
          <h2 className="mx-auto text-3xl font-bold">NIfTI Viewer</h2>
          <div className="mx-auto w-fit p-6 flex rounded-xl">
            <Upload setData={setData} setShape={setShape} />
          </div>
        </div>
      </div>
      {
        Object.keys(data).length !== 0 ? (
        <>
        <SurfacePlot data={data} />
        <SlicePlot 
          xSlice={xSlice} setXSlice={setXSlice}
          ySlice={ySlice} setYSlice={setYSlice}
          zSlice={zSlice} setZSlice={setZSlice}
          xySliceData={xySliceData}
          yzSliceData={yzSliceData}
          xzSliceData={xzSliceData}
          shape={shape}
        />
        <Histogram hist={hist} edges={edges} />
        </>) : null
      }
      
    </div>
  );
}

export default App;
