import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import "./App.css";
import Upload from "./components/Upload";

function App() {
  const [currentTime, setCurrentTime] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("/api/time").then(res => res.json()).then(data => {
      console.log(data);
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <div className = "mt-4 p-6 max-w-96 mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 border-2">
        <img className="object-cover h-20 w-20 rounded-full" src="/public/icon.jpg"></img>
        <h2 className = "m-auto text-3xl font-bold">Cancer in Brain</h2>
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
        <Upload setData={setData}/>
      </div>
      <p className ="m-auto text-3xl font-bold p-6 text-center">Show in 3D Scatter</p>
      <div id="niiPlot" className="ml-auto bg-white rounded-xl border-4 shadow-lg">
        { Object.keys(data).length !== 0 ? <Plot data={[data]} layout={ {width: 1024, height: 720} } /> : null }
      </div>
      
      <p className ="m-auto text-3xl font-bold p-6 text-center">Show in Slides</p>
      <div className="ml-auto bg-white rounded-xl border-4 shadow-lg">
        <div className="p-60">
          <p className ="text-center">Heat Map</p>
        </div>
      </div>
      
      <p className ="m-auto text-3xl font-bold p-6 text-center">Show in Histogram</p>
      <div className="ml-auto bg-white rounded-xl border-4 shadow-lg">
        <div className="p-60">
          <p className ="text-center">Histogram</p>
        </div>
      </div>
    </div>
  );
}

export default App;
