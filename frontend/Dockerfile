# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the rest of the application source code from the current directory to the working directory
COPY . .

# Expose the port the app runs in
EXPOSE 3000

# Define environment variable
# ENV REACT_APP_API_URI http://backend:3001

# Run npm start when the container launches
CMD ["npm", "start"]
