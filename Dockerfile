# Use a base image with Node.js to build the React app
FROM node:14-slim as builder

# Set working directory
WORKDIR /app/frontend

# Copy package.json and package-lock.json to install dependencies
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY frontend/ ./

# Build the React app
RUN npm run build

# Use a separate stage for the backend
FROM node:14-slim

# Set working directory
WORKDIR /app/backend

# Copy the built frontend files from the previous stage to the backend directory
COPY --from=builder /app/frontend/build /app/backend/build

# Copy package.json and package-lock.json to install dependencies
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend source code
COPY backend/ ./

# Expose the port your backend app runs on
EXPOSE 8080

# Command to run the backend node.js app
CMD ["node", "index.js"]
