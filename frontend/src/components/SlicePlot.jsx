import Slider from "./Slider"
import Plot from "react-plotly.js"

function SlicePlot({ xSlice, setXSlice, ySlice, setYSlice, zSlice, setZSlice, xySliceData, yzSliceData, xzSliceData, shape }) {
  return (
    <div className="mx-auto">
      <p className ="text-3xl font-bold pt-14 pb-5 text-center">Slice View</p>
      <div className="mx-auto w-fit h-fit px-16 pt-5 bg-white rounded-xl shadow-lg">
        <div>
          <div id="slicePlots" className="p-1 grid grid-cols-2">
            <div className="sliceContainer">
              <div className="flex justify-center">
                <p className="font-bold text-lg my-3">XY Slice</p>
              </div>
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
                    layout={{ width: 480, height: 480, xaxis: { scaleanchor: "y", scaleratio: 1 } }}
                  />
                </div>
              </div>
            </div>
            <div className="sliceContainer">
              <div className="flex justify-center">
                <p className="font-bold text-lg my-3">XZ Slice</p>
              </div>
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
                    layout={{ width: 480, height: 480, xaxis: { scaleanchor: "y", scaleratio: 1 } }}
                  />
                </div>
              </div>
            </div>
            <div className="sliceContainer col-span-2">
              <div className="flex justify-center">
                <p className="font-bold text-lg my-3">YZ Slice</p>
              </div>
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
                    layout={{ width: 480, height: 480, xaxis: { scaleanchor: "y", scaleratio: 1 } }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SlicePlot