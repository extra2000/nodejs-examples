FROM docker.io/node:14.16.1
MAINTAINER extra2000 <https://github.com/extra2000>

COPY ./project /srv/project
WORKDIR /srv/project
RUN npm install
ENTRYPOINT npm run webservice
