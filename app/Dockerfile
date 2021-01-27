FROM node:current-alpine

# Move into app folder
WORKDIR /app

# Install app dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install && npm audit fix --force

# Bundle app source
COPY . .

CMD ["npm", "run", "start"]
