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
      <p>Current Time: {currentTime}</p>
      <Upload setData={setData} />
      <div id="niiPlot" className="p-1">
        { Object.keys(data).length !== 0 ? <Plot data={[data]} layout={ {width: 1024, height: 720} } /> : null }
      </div>
    </div>
  );
}

export default App;
