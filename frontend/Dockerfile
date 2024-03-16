FROM node:18-alpine as builder

WORKDIR /app
COPY public/ ./public
COPY src/ ./src
COPY index.html .
COPY vite.config.js .
COPY package.json yarn.lock ./

RUN yarn install
RUN yarn build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
