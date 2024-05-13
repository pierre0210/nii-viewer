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
    if nii_arr.ndim != 3:
        return None
    # pos = np.argwhere(nii_arr > 0)
    pos, val = get_surface(nii_arr)
    #val = nii_arr[pos]
    data = {
        "x": pos.T[0].tolist(),
        "y": pos.T[1].tolist(),
        "z": pos.T[2].tolist(),
        "val": val.tolist(),
        "min": int(np.min(val)),
        "mid": round(np.mean(val)),
        "max": int(np.max(val))
    }
    return data
