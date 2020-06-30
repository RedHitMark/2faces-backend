FROM node:latest
# FROM openjdk:latest

WORKDIR /app

# Install app dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install && npm audit fix

# Bundle app source
COPY . .

# API port
EXPOSE 9999

# socker master port
EXPOSE 6969
# socket slave ports
EXPOSE 52000-52500
# socket slave ports
EXPOSE 60000-60100
CMD ["npm", "run", "start"]
