import Plot from "react-plotly.js";

function SurfacePlot({ data }) {
  console.log(data);
  return (
    <div className="block">
      <p className ="mx-auto text-3xl font-bold pt-14 pb-5 text-center">3D View</p>
      <div id="niiPlot" className="flex justify-center w-fit px-3 mx-auto bg-white rounded-xl shadow-lg">
        <Plot data={[data]} layout={ {width: 1024, height: 720} } />
      </div>
    </div>
  );
}

export default SurfacePlot;