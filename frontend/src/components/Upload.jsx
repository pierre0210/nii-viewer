import axios from "axios";
import { useState } from "react";

function Upload(props) {
  const [file, setFile] = useState();

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleSubmit(e) {
    if (!file) return;
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
      props.setData({
        mode: "markers",
        type: "scatter3d",
        x: res.data["x"],
        y: res.data["y"],
        z: res.data["z"],
        marker: {
          size: 2,
          showscale: true,
          cmax: res.data["max"],
          cmid: res.data["mid"],
          cmin: res.data["min"],
          color: res.data["val"],
          colorscale: "Picnic"
        }
      });
      props.setShape(res.data["shape"]);
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          id="file" 
          name="file" 
          type="file" 
          accept=".nii,.nii.gz" 
          onChange={handleChange}
          className="rounded-xl border-blue-900 border-4 bg-blue-900 text-white cursor-pointer file:rounded-md file:border file:border-blue-900 file:h-100 file:p-1 file:px-2 file:bg-blue-300 file:text-white" 
        />
        <button type="submit" className = "bg-blue-900 text-white rounded-xl p-2 px-4 mx-4">Upload</button>
      </form>
    </>
  );
}

export default Upload;