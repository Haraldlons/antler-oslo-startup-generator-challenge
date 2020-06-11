FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

# Let's gooo!
EXPOSE 1234
CMD [ "npm", "start" ]
