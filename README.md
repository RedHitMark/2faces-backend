# 2Faces - Backend
This is the backend application to manage 2Faces malware

## Installation
You can install this backend using Docker container or using node.js locally

### Run with Docker
Prerequisites:
* Install Docker on your machine
* Install docker-compose

Clone the repository
```
git clone https://github.com/RedHitMark/2faces-backend.git
```
Move in the folder of the repository
```
cd 2faces-backend
```
Create a .env file based on this template
```
DOCKER_RUNNING=1
MONGO_USER=2facesAdmin
MONGO_PASSWORD=2facesPassword
MONGO_DATABASE=2facesdb
MONGO_PORT=27017
HOSTNAME=localhost
SERVER_PORT=9999
SOCKET_MAIN_PORT=6969
SOCKET_CODE_SENDER=52000
SOCKET_CODE_SENDER1=52500
SOCKET_COLLECTOR=60000
SOCKET_COLLECTOR1=60050
```
Run with docker-compose
```
sudo docker-compose up --build -d
```

### Run with NPM
Prerequisites:
* Install node.js on your machine
* Install npm on your machine
* Setup a mongodb server
* Import mongodb dump (check mongo folder)

Clone the repository
```
git clone https://github.com/RedHitMark/2faces-backend.git
```
Move in the folder of the repository
```
cd 2faces-backend
```
Move in the app folder
```
cd app
```
Install dependencies
```
npm install && npm audit fix -- force
```
Launch server
```
npm start
```

### API endpoints available
Endpoint | Method | Description
------------ | ------------ | -------------
/web | GET | Landing page of 2Faces
/api/v.1.0/payloads | GET| Returns all available payloads
/api/v.1.0/payloads?payload_id=% | GET| Returns payload with given payload_id
/api/v.1.0/payloads | POST | Creates new payload 
/api/v.1.0/payloads?payload_id=% | PUT | Edits payload with given payload_id
/api/v.1.0/payloads?payload_id=% | DELETE | Deletes payload with given payload_id
/api/v.1.0/attacks | GET | Returns all attack's results
/api/v.1.0/attacks?attack_id=% | GET | Returns attack's result with given attack_id
/api/v.1.0/attacks?attack_id=% | DELETE | Deletes attack's result with given attack_id
/api/v.1.0/healthcheck | GET | Checks if the server is running
/api/v.1.0/devices | GET | Returns all Android devices connected
/api/v.1.0/devices | POST | Sends payload with given payload_id to device at given port 

