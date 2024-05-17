from scipy.ndimage.morphology import binary_dilation
import nibabel as nib
import numpy as np

def nii2arr(filename: str):
    nii_arr = np.array(nib.load(filename).dataobj)
    if nii_arr.ndim != 3:
        return "wrong dimension", None
    
    return None, nii_arr

def get_surface(filename: str):
    err, arr = nii2arr(filename)
    if err:
        return err, None

    binary_arr = np.copy(arr)
    binary_arr[binary_arr > 0] = 1
    kernel = np.zeros((3, 3, 3), dtype=int)
    kernel[1, :, :] = 1; kernel[:, 1, :] = 1; kernel[:, :, 1] = 1
    mask = binary_dilation(binary_arr == 0, kernel)
    pos = np.argwhere((binary_arr & mask) > 0)
    val = arr[pos.T[0], pos.T[1], pos.T[2]]

    data = {
        "x": pos.T[0].tolist(),
        "y": pos.T[1].tolist(),
        "z": pos.T[2].tolist(),
        "val": val.tolist(),
        "min": int(np.min(val)),
        "mid": round(np.mean(val)),
        "max": int(np.max(val)),
        "shape": arr.shape
    }
    
    return None, data

def get_slice(filename: str, side: str, slice: int):
    axis_map = {
        "xy": 2,
        "xz": 1,
        "yz": 0
    }
    if side not in ("xy", "xz", "yz"):
        return "plane not exist.", None
    axis = axis_map[side]

    err, arr = nii2arr(filename)
    if err:
        return err, None
    elif arr.shape[axis] <= slice or slice < 0:
        return "index out of range.", None
    
    index = [slice(None)] * 3
    index[axis] = slice

    data = {
        "z": arr[tuple(index)]
    }

    return data
