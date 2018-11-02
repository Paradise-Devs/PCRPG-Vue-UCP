FROM alpine:latest

# fetch dependencies
RUN apk add -qU nodejs-current npm git python make

# set workdir
WORKDIR /server/web-frontend

# pulling node_modules
COPY ./package*.json ./
RUN npm install

# get actual code
COPY . .

EXPOSE 443 80

CMD [ "npm", "run", "dev" ]
