[![Build Status](https://travis-ci.org/telemark/tfk-distribusjon-svarut.svg?branch=master)](https://travis-ci.org/telemark/tfk-distribusjon-svarut)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# tfk-distribusjon-svarut

[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/tfk-distribusjon-svarut.svg)](https://greenkeeper.io/)
Sends documents to SvarUT

## Config

docker.env

```bash
TFK_DISTRIBUSJON_SVARUT_ERROR_DIRECTORY_PATH=test/data/errors
TFK_DISTRIBUSJON_SVARUT_DONE_DIRECTORY_PATH=test/data/done
TFK_DISTRIBUSJON_SVARUT_JOB_DIRECTORY_PATH=test/data/jobs
TFK_DISTRIBUSJON_SVARUT_RETRY_DIRECTORY_PATH=test/data/retries
TFK_DISTRIBUSJON_SVARUT_JWT_KEY=Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go
TFK_DISTRIBUSJON_SVARUT_CALLBACK_STATUS_MESSAGE=Sendt via SvarUt
TFK_DISTRIBUSJON_SVARUT_SVARUT_URL=test.svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV4
TFK_DISTRIBUSJON_SVARUT_SVARUT_USERNAME=MrSmith
TFK_DISTRIBUSJON_SVARUT_SVARUT_PASSWORD=MrSmithsPassword
TFK_DISTRIBUSJON_SVARUT_SVARUT_KONTERINGSKODE=1111,
TFK_DISTRIBUSJON_SVARUT_SVARUT_AVGIVENDE_SYSTEM=MinElev
```

## Docker

Build

```bash
$ docker build -t tfk-distribusjon-svarut .
```

### Usage

```bash
$ docker run --env-file=docker.env --volume=/test/data:/src/test/data --rm tfk-distribusjon-svarut
```

or from pre-built image

```bash
$ docker run --env-file=docker.env --volume=/test/data:/src/test/data --rm telemark/tfk-distribusjon-svarut
```

- This will start a container. 
- Check for jobs in the job directory. 
- Send documents through SvarUt. 
- Move the job to the done directory. 
- Stop the container and remove it.

## License
[MIT](LICENSE)

![alt text](https://robots.kebabstudios.party/tfk-distribusjon-svarut.png "Robohash image of tfk-distribusjon-svarut")