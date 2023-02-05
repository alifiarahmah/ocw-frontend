FROM node:lts-slim

COPY . /app
WORKDIR /app

RUN yarn install --production
RUN yarn build

STOPSIGNAL SIGKILL
ENTRYPOINT [ "yarn", "start" ]
