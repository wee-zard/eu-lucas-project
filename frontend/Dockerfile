# frontend/Dockerfile
FROM node:18-alpine AS builder

# Declaring env
ENV NODE_ENV=production

RUN apk add --update nodejs npm

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY ./package.json /app
RUN npm install
RUN npm install -g @craco/craco
RUN npm install --save buffer

# Copying all the files in our project
COPY . .

# Building our application
RUN npm run build

# Fetching the latest nginx image
FROM nginx:stable-alpine

# Copying our nginx.conf
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copying built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

# We need to make sure not to run the container as a non root user
# for better security
WORKDIR /app
RUN chown -R nginx:nginx /app && chmod -R 755 /app && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

USER nginx

# Expose port 80 for the NGINX server
EXPOSE 80

# Command to start NGINX when the container is run
CMD ["nginx", "-g", "daemon off;"]
