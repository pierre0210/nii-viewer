from scipy.ndimage.morphology import binary_dilation
import nibabel as nib
import numpy as np

def get_surface(arr: np.ndarray) -> np.ndarray:
    binary_arr = np.copy(arr)
    binary_arr[binary_arr > 0] = 1
    kernel = np.zeros((3, 3, 3), dtype=int)
    kernel[1, :, :] = 1; kernel[:, 1, :] = 1; kernel[:, :, 1] = 1
    mask = binary_dilation(binary_arr == 0, kernel)
    surface_pos = np.argwhere((binary_arr & mask) > 0)
    surface_val = arr[surface_pos.T[0], surface_pos.T[1], surface_pos.T[2]]
    
    return surface_pos, surface_val

def nii2arr(filename: str):
    nii_arr = np.array(nib.load(filename).dataobj)
    # pos = np.argwhere(nii_arr > 0)
    pos, val = get_surface(nii_arr)
    print(pos.shape)
    #val = nii_arr[pos]
    data = {
        "mode": "markers",
        "type": "scatter3d",
        "x": pos.T[0].tolist(),
        "y": pos.T[1].tolist(),
        "z": pos.T[2].tolist(),
        "marker": {
            "size": 2,
            "showscale": True,
            "cmax": int(np.max(val)),
            "cmid": round(np.mean(val)),
            "cmin": int(np.min(val)),
            "color": val.tolist(),
            "colorscale": "Picnic"
        },
    }
    return data