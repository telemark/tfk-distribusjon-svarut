###########################################################
#
# Dockerfile for tfk-distribusjon-svarut
#
###########################################################

# Setting the base to nodejs 4.6.2
FROM mhart/alpine-node:4.6.2

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

# Env variables
ENV TFK_DISTRIBUSJON_SVARUT_DONE_DIRECTORY_PATH test/data/done
ENV TFK_DISTRIBUSJON_SVARUT_ERROR_DIRECTORY_PATH test/data/errors
ENV TFK_DISTRIBUSJON_SVARUT_JOB_DIRECTORY_PATH test/data/jobs
ENV TFK_DISTRIBUSJON_SVARUT_JWT_KEY Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go
ENV TFK_DISTRIBUSJON_SVARUT_CALLBACK_STATUS_MESSAGE Sendt via SvarUt
ENV TFK_DISTRIBUSJON_SVARUT_SVARUT_URL test.svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV4
ENV TFK_DISTRIBUSJON_SVARUT_SVARUT_USERNAME MrSmith
ENV TFK_DISTRIBUSJON_SVARUT_SVARUT_PASSWORD MrSmithsPassword
ENV TFK_DISTRIBUSJON_SVARUT_SVARUT_KONTERINGSKODE 1111
ENV TFK_DISTRIBUSJON_SVARUT_SVARUT_AVGIVENDE_SYSTEM MinElev

# Startup
ENTRYPOINT node example.js