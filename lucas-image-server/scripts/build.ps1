# Running the Docker Desktop (if it's already running than the script will skip this step)
docker desktop start

# Remove previous docker image (if it's does not exists, than the script will skip this step)
docker rmi -f udvattila99/lucas-image-server:latest

# Build the new docker image while not taking into account the previous builds
docker build --no-cache -t udvattila99/lucas-image-server:latest ..

# Push the latest created image to the docker hub repository
docker push udvattila99/lucas-image-server:latest

# Stopping the Docker Desktop
#docker desktop stop
