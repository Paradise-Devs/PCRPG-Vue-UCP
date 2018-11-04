FROM alpine:latest AS intermediate

WORKDIR /build

# fetch dependencies
RUN apk add -qU nodejs-current npm git python make

# pulling node_modules
COPY . .
RUN npm install && npm run build

FROM nginx:1.15.5-alpine

# set workdir
WORKDIR /server

# get actual code
COPY --from=intermediate /build/dist /usr/share/nginx/html
EXPOSE 80
