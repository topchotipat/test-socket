FROM registry.dev.sendit.asia/node:10.1.0
LABEL MAINTAINER Watchrapong Agsonchu watchrapong_ags@sendit.asia

COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /var/source && cp -a /tmp/node_modules /var/source

RUN cp -a /tmp/node_modules /var/source

COPY . /var/source
WORKDIR /var/source
EXPOSE 80 443
ENTRYPOINT ["npm", "start"]
