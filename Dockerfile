# Base image for the backend
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy everything into the container
COPY . .

# Install backend dependencies
RUN cd backend && npm install

# Install frontend dependencies and build it
RUN cd frontend && npm install && npm run build

# Expose backend port
EXPOSE 8080

# Start the backend server
CMD ["npm", "--prefix", "backend", "start"]
