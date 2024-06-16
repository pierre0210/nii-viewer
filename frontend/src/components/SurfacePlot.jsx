import Plot from "react-plotly.js";

function SurfacePlot({ data }) {
  console.log(data);
  return (
    <>
      <p className ="mx-auto text-3xl font-bold p-6 pt-14 text-center">Show in 3D Scatter</p>
      <div id="niiPlot" className="flex justify-center w-fit px-5 mx-auto bg-white rounded-xl border-4 shadow-lg">
        <Plot data={[data]} layout={ {width: 1024, height: 720} } />
      </div>
    </>
  );
}

export default SurfacePlot;