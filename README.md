# 2Faces - backend

## Installation
You can install this backend using Docker container or using Node.js locally

### Run with Docker
Prerequisites:
* Install docker on your machine
* Install docker compose

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
MONGO_USER=2facesAdmin
MONGO_PASSWORD=2facesPassword
MONGO_DATABASE=2facesdb
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

Clone the repository
```
git clone https://github.com/RedHitMark/2faces-backend.git
```
Move in the folder of the repository
```
cd 2faces-backend
```
Install dependencies
```
npm install && npm audit fix
```
Launch server
```
npm start
```

### API available
Endpoint | Method | Description
------------ | ------------ | -------------
/api/v.1.0/devices | GET | Content from cell 2
/api/v.1.0/devices | POST | Content from cell 2
/api/v.1.0/payloads | GET| Content in the second column
/api/v.1.0/payloads | POST | Content in the second column
/api/v.1.0/payloads | PUT | Content in the second column
/api/v.1.0/payloads | DELETE | Content in the second column
/api/v.1.0/attacks | GET | Content in the second column
/api/v.1.0/attacks | POST | Content in the second column
/api/v.1.0/attacks | DELETE | Content in the second column
