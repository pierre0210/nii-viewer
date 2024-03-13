import axios from "axios";
import { useState } from "react";
import Plot from "react-plotly.js";

function Upload() {
  const [file, setFile] = useState();
  const [data, setData] = useState({});
  function handleChange(e) {
    setFile(e.target.files[0]);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", file.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post("/api/upload", formData, config).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input id="file" name="file" type="file" accept=".nii,.nii.gz" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
      { Object.keys(data) !== 0 ? <Plot data={[data]} layout={ {width: 1024, height: 720} } /> : null }
    </>
  )
}

export default Upload;