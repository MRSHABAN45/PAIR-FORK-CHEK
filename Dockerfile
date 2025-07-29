# Base image
FROM node:lts-buster

# Set working directory
WORKDIR /app

# Copy only package.json first for better caching
COPY package.json .

# Install dependencies
RUN npm install --omit=dev && npm install -g pm2

# Now copy all other files
COPY . .

# Expose necessary ports
EXPOSE 9090

# Start the application
CMD ["pm2-runtime", "start", "index.js", "--name", "MANU-MD"]
