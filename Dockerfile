# Use an official Node.js runtime as the base image
FROM node:latest

#====================================================================================
# Create directory for the project
# I follow a conventions where /home/<domain name>/<project name>
# Note: You can modify it to your own choice. I like it in this way.
#====================================================================================
RUN mkdir -vp /razzak/node/app

# Set the working directory in the container
WORKDIR /razzak/node/app
# Copy  code into the container at /razzak/node/app
COPY ./app /razzak/node/app
# Set a volume mount point within the container

VOLUME /razzak/node/app


# Install application dependencies
RUN npm install

# Copy the rest of your application code into the container
#COPY . .

# Expose a port for your application to listen on (replace 3000 with your application's port)
EXPOSE 3000

# Define the command to run your application (replace "npm start" with your actual start command)
CMD ["node", "src/service.js"]

# docker build -t greatraj .
# docker run --name api -p 3000:3000/tcp -d greatraj
#  docker logs -f api