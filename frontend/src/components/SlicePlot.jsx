import Slider from "./Slider"
import Plot from "react-plotly.js"

function SlicePlot({ xSlice, setXSlice, ySlice, setYSlice, zSlice, setZSlice, xySliceData, yzSliceData, xzSliceData, shape }) {
  return (
    <>
      <p className ="mx-auto text-3xl font-bold p-6 pt-14 text-center">Show in Slices</p>
      <div className="mx-auto w-fit h-fit bg-white rounded-xl border-4 shadow-lg">
        <div className="p-10">
          <div id="slicePlots" className="p-1 flex">
            <div className="sliceContainer">
              <h3>XY Slice</h3>
              <div className="flex justify-center">
                <div>
                  <Slider
                    label={`Z: ${zSlice}`}
                    min={0}
                    max={shape[2] - 1}
                    value={zSlice}
                    onChange={(e) => setZSlice(Number(e.target.value))}
                  />
                  <Plot
                    data={[{ z: xySliceData, type: "heatmap" }]}
                    layout={{ width: 512, height: 512, xaxis: { scaleanchor: "y", scaleratio: 1 } }}
                  />
                </div>
              </div>
            </div>
            <div className="sliceContainer">
              <h3>XZ Slice</h3>
              <div className="flex justify-center">
                <div className="block">
                  <Slider
                    label={`Y: ${ySlice}`}
                    min={0}
                    max={shape[1] - 1}
                    value={ySlice}
                    onChange={(e) => setYSlice(Number(e.target.value))}
                  />
                  <Plot
                    data={[{ z: xzSliceData, type: "heatmap" }]}
                    layout={{ width: 512, height: 512, xaxis: { scaleanchor: "y", scaleratio: 1 } }}
                  />
                </div>
              </div>
            </div>
            <div className="sliceContainer">
              <h3>YZ Slice</h3>
              <div className="flex justify-center">
                <div className="block">
                  <Slider
                    label={`X: ${xSlice}`}
                    min={0}
                    max={shape[0] - 1}
                    value={xSlice}
                    onChange={(e) => setXSlice(Number(e.target.value))}
                  />
                  <Plot
                    data={[{ z: yzSliceData, type: "heatmap" }]}
                    layout={{ width: 512, height: 512, xaxis: { scaleanchor: "y", scaleratio: 1 } }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SlicePlot