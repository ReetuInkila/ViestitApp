# This Dockerfile sets up a Node.js environment using the slim version of the node 14 image as the base.
# It installs dependencies, builds the application, and exposes port 3000 for incoming connections.

# Use the slim version of the node 14 image as the base
FROM node:14-slim

# Create a directory for the application and set it as the working directory
RUN mkdir -p usr/src/app
WORKDIR /usr/src/app

# Copy the application code into the container
COPY . .

# Install serve globally to serve static files
RUN npm install -g serve

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Expose port 3000 to allow incoming connections
EXPOSE 3000

# Command to start the server using serve
CMD ["serve", "-s", "-l", "3000", "./build"]
