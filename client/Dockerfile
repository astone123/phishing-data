# Base image
FROM node:9.6.1

# Create and set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy current directory to working directory
COPY . /usr/src/app/

# Install dependencies
RUN npm install

# Run app
CMD ["npm", "start"]