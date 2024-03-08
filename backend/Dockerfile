FROM python:3.9-alpine

WORKDIR /app
COPY . .

RUN pip install Flask

EXPOSE 3001

CMD [ "python3", "main.py" ]
