FROM node:8

WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

EXPOSE 9000
CMD [ "npm", "start" ]