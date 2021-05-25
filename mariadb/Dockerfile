FROM docker.io/node:14.16.1
MAINTAINER extra2000 <https://github.com/extra2000>

COPY ./project/package.json /srv/project/package.json
WORKDIR /srv/project
RUN npm install

COPY ./project /srv/project
WORKDIR /srv/project
RUN npm run tsc

CMD node build/main.js
