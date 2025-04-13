# Fetching the latest nginx image
FROM nginx:stable-alpine AS prod

# Removes default configurations
RUN rm -rf /usr/share/nginx/html/*

# Copying built assets from builder
COPY ./build /usr/share/nginx/html

WORKDIR /app

# Expose port 80 for the NGINX server
EXPOSE 80

# Command to start NGINX when the container is run
CMD ["nginx", "-g", "daemon off;"]
