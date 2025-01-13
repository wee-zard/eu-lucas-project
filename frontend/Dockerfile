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

EXPOSE 3000 80

CMD ["nginx", "-g", "daemon off;"]
