import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    fetch("/api/time").then(res => res.json()).then(data => {
      console.log(data);
      setCurrentTime(data.time);
    });
  }, []);
  return (
    <div className="App">
      <p>Current Time: { currentTime }</p>
    </div>
  );
}

export default App;
