FROM nginx:alpine
LABEL Name=webpage-placeholder Version=0.0.1
COPY deploy /usr/share/nginx/html
