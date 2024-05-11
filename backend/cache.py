import os
from dotenv import load_dotenv
import redis

load_dotenv()

class Cache:
    def __init__(self):
        self.client = redis.Redis("localhost", 6379, password=os.getenv("REDIS_PASSWORD"), decode_responses=True)
        self.expire_time = 10 * 60 # sec
        self.pubsub = self.client.pubsub()
        self.pubsub.psubscribe(**{"__keyevent@0__:expired": self.delete_file})
        self.pubsub.run_in_thread(sleep_time=0.01)

    def set_file(self, filename):
        self.client.set(filename, "", self.expire_time)

    def check_file(self, filename) -> bool:
        res = self.client.exists(filename)
        return False if res == 0 else True
    
    def delete_file(self, filename):
        file_path = os.path.join(os.getenv("UPLOAD_PATH"), filename)
        if os.path.exists(file_path):
            os.remove(file_path)