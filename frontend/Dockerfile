# Use an official Node runtime as a parent image
FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy the rest of the application source code from the current directory to the working directory
COPY . .

# Expose the port the app runs in
EXPOSE 3000

# Define environment variable
# ENV REACT_APP_API_URI http://backend:3001

# Run npm start when the container launches
CMD ["npm", "start"]
