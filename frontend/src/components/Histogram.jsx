import Plot from "react-plotly.js"

function Histogram({ hist, edges }) {
  console.log(hist)
  return (
    <div className="pb-14">
      <p className ="m-auto text-3xl font-bold p-6 text-center">Histogram</p>
      <div className="mx-auto w-fit h-fit bg-white rounded-xl border-4 shadow-lg">
        <div className="px-3">
          <Plot
            data={[{ x: edges.slice(1, -1), y: hist.slice(1), type: "scatter", mode: "lines" }]}
            layout={{ width: 1024, height: 480, xaxis: { title: "pixel strength" }, yaxis: { title: "count" } }}
          />
        </div>
      </div>
    </div>
  );
}

export default Histogram;
