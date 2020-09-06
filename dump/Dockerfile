FROM mongo

ARG MONGO_USER
ARG MONGO_PASSWORD
ARG MONGO_DATABASE

COPY dump.json /dump.json

CMD mongoimport --host mongo --username ${MONGO_USER} --password ${MONGO_PASSWORD} --authenticationMechanism SCRAM-SHA-1 --authenticationDatabase admin --db ${MONGO_DATABASE} --collection payloads --type json --file /dump.json --jsonArray