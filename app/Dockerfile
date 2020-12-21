FROM node:latest

# Move into app folder
WORKDIR /app

# Install app dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install && npm audit fix --force

# ENV VAR
ARG SERVER_PORT
ARG SOCKET_MAIN_PORT
ARG SERVER_PORT

# API port
EXPOSE ${SERVER_PORT}

# socker main port
EXPOSE ${SOCKET_MAIN_PORT}

# socket slave ports
#EXPOSE 52000-52500
# socket slave ports
#EXPOSE 60000-60100


# Bundle app source
COPY . .

CMD ["npm", "run", "start"]
