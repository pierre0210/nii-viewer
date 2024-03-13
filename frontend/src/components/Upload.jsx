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
      props.setData(res.data);
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input id="file" name="file" type="file" accept=".nii,.nii.gz" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </>
  )
}

export default Upload;