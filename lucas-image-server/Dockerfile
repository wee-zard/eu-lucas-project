FROM node:18-alpine

WORKDIR /app

COPY ./package.json .
COPY ./tsconfig.json .
COPY ./src/ .

# Install the dependencies
RUN npm install

# Build the application only, but do not run it yet.
RUN npm run build

CMD ["node", "build/index.js"]
