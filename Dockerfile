FROM node:14-alpine

RUN apk add --no-cache curl

WORKDIR /opt/app

COPY package.json yarn.lock /opt/app/
RUN yarn install --frozen-lockfile

COPY . /opt/app

# yarn install --production will remove dev modules from the image
RUN yarn build && \
	yarn install --silent --frozen-lockfile --production --offline

FROM node:14-alpine

WORKDIR /opt/app

COPY --from=0 /opt/app/dist /opt/app/dist/
COPY --from=0 /opt/app/node_modules /opt/app/node_modules/
COPY --from=0 /opt/app/public /opt/app/public/
COPY --from=0 /opt/app/package.json /opt/app/package.json

EXPOSE 3000

CMD [ "yarn", "start" ]
