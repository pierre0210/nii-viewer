# NIFTI File Viewer

## Usage

Environment variable file `backend/.env`
```
REDIS_HOST=redis-db
REDIS_PASSWORD=YOUR-PASSWORD
UPLOAD_PATH=/tmp
PRESERVE_TIME_MIN=10
```

Environment variable file `frontend/.env`
```
BACKEND_URL=http://BACKEND-URL
```

For development
```
docker compose -f docker-compose-dev.yml up
```

For deployment
```
docker compose up
```
