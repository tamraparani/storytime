# Build stage
FROM node:current-slim AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all source files to the container
COPY . .

# Build the React application
RUN npm run build

# Production stage
FROM node:current-slim

# Set working directory
WORKDIR /app

# Install serve globally to serve static files
RUN npm install -g serve

# Install react-markdown for Blog template
RUN npm install react-markdown

# Copy the build artifacts from the build stage
COPY --from=build /app/build ./build

# Set environment variable for port
ENV PORT=8080

# Expose the port that the app runs on
EXPOSE 8080

# Command to run the application
CMD ["serve", "-s", "build", "-l", "8080"]
