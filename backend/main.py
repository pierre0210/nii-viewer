import sys
import os
import time
import uuid
from flask import Flask, request, Response, jsonify
from dotenv import load_dotenv

import nii
from cache import Cache

load_dotenv()
cache = Cache()

DEBUG = False
if len(sys.argv) > 1:
    if sys.argv[1].lower() == "debug":
        DEBUG = True

ALLOWED_EXTENSIONS = ("nii", "nii.gz")
app = Flask(__name__)
app.config["UPLOAD_PATH"] = os.getenv("UPLOAD_PATH")
app.config['MAX_CONTENT_LENGTH'] = 24 * 1024 * 1024

def allowed_extensions(filename: str):
    return "." in filename and filename.rsplit(".", 1)[1] in ALLOWED_EXTENSIONS

@app.route("/api/time", methods = ["GET"])
def get_time():
    return {"time": time.ctime(time.time())}

@app.route("/api/upload", methods = ["POST"])
def upload():
    if "file" not in request.files:
        return Response("no file part.", status = 400, mimetype = "text/plain")
    file = request.files["file"]
    if file.filename == "":
        return Response("no file.", status = 400, mimetype = "text/plain")
    if not allowed_extensions(file.filename):
        return Response("not allowed file extension.", status = 400, mimetype = "text/plain")
    savename = f"{str(uuid.uuid4())}.{file.filename.rsplit('.', 1)[1]}"
    savepath = os.path.join(app.config["UPLOAD_PATH"], savename)
    file.save(savepath)
    data = nii.nii2arr(savepath)
    print(savename, file=sys.stdout, flush=True)
    cache.set_file(savename)
    return jsonify(data)

if __name__ == "__main__":
    app.run(host = "0.0.0.0", port = 3001, debug = DEBUG)
