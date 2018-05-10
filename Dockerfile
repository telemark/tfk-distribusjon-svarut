# Setting the base to nodejs 8.6.0
FROM node:8.6.0-alpine@sha256:453aec0e8efa7d47b32f80cb096a6cb9418a9b3689e010d29575930961550c46

# Maintainer
MAINTAINER Geir Gåsodden

#### Begin setup ####

# Installs git
RUN apk add --update --no-cache git

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Startup
ENTRYPOINT node example.js
