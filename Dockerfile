# Setting the base to nodejs 8.6.0
FROM node:8.12.0-alpine@sha256:8c652f3fe51d4f04287883d5cf7193ee39df67e431747a4a87d21c682a4a1d77

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
