import os
import sys
import time
import threading
from dotenv import load_dotenv
import redis

load_dotenv()

class CacheThread(threading.Thread):
    def __init__(self, client):
        threading.Thread.__init__(self)
        self.client = client #redis.Redis(os.getenv("REDIS_HOST"), 6379, password=os.getenv("REDIS_PASSWORD"), decode_responses=True)
        self.pubsub = self.client.pubsub()
        self.pubsub.psubscribe("__keyevent@0__:expired")
    
    def run(self):
        for msg in self.pubsub.listen():
            print(f"{time.time()} {str(msg['type'])} {str(msg['data'])}", file=sys.stdout, flush=True)
            if msg["type"] != "pmessage": continue
            file_path = os.path.join(os.getenv("UPLOAD_PATH"), msg["data"])
            if os.path.isfile(file_path):
                os.remove(file_path)


class Cache:
    def __init__(self):
        self.client = redis.Redis(os.getenv("REDIS_HOST"), 6379, password=os.getenv("REDIS_PASSWORD"), decode_responses=True)
        self.client.config_set("notify-keyspace-events", "KEA")
        self.expire_time = int(os.getenv("PRESERVE_TIME_MIN")) * 60 # sec
        
        self.cache_thread = CacheThread(self.client)
        self.cache_thread.start()

    def set_file(self, filename):
        self.client.set(filename, "", self.expire_time)

    def reset_file_expiry(self, filename):
        self.client.expire(filename, self.expire_time)

    def check_file(self, filename) -> bool:
        res = self.client.exists(filename)
        return False if res == 0 else True

    def shutdown(self):
        self.cache_thread.join()