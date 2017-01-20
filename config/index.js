'use strict'

process.env.SVARUT_USERNAME = '0800_telemark_test'
process.env.SVARUT_PASSWORD = 'f4e8cdf8-bc63-474a-8a85-fa97bf60edc4'

module.exports = {
  DONE_DIRECTORY_PATH: process.env.TFK_DISTRIBUSJON_SVARUT_DONE_DIRECTORY_PATH || 'test/data/done',
  ERROR_DIRECTORY_PATH: process.env.TFK_DISTRIBUSJON_SVARUT_ERROR_DIRECTORY_PATH || 'test/data/errors',
  JOB_DIRECTORY_PATH: process.env.TFK_DISTRIBUSJON_SVARUT_JOB_DIRECTORY_PATH || 'test/data/jobs',
  RETRY_DIRECTORY_PATH: process.env.TFK_DISTRIBUSJON_SVARUT_RETRY_DIRECTORY_PATH || 'test/data/retries',
  JWT_KEY: process.env.TFK_DISTRIBUSJON_SVARUT_JWT_KEY || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go',
  CALLBACK_STATUS_MESSAGE: process.env.TFK_DISTRIBUSJON_SVARUT_CALLBACK_STATUS_MESSAGE || 'Sendt via SvarUt',
  SVARUT_URL: process.env.TFK_DISTRIBUSJON_SVARUT_SVARUT_URL || 'test.svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV4',
  SVARUT_USERNAME: process.env.TFK_DISTRIBUSJON_SVARUT_SVARUT_USERNAME || 'MrSmith',
  SVARUT_PASSWORD: process.env.TFK_DISTRIBUSJON_SVARUT_SVARUT_PASSWORD || 'MrSmithsPassword',
  SVARUT_KONTERINGSKODE: process.env.TFK_DISTRIBUSJON_SVARUT_SVARUT_KONTERINGSKODE || '1111',
  SVARUT_AVGIVENDE_SYSTEM: process.env.TFK_DISTRIBUSJON_SVARUT_SVARUT_AVGIVENDE_SYSTEM || 'MinElev'
}
