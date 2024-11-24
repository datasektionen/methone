FROM docker.io/node:22-alpine3.20 AS build
WORKDIR /app

ENV NODE_OPTIONS=--openssl-legacy-provider

COPY package.json package-lock.json ./
RUN sed -i '/prepare/d' package.json

COPY example/package.json example/package-lock.json ./example/

RUN npm ci && cd example && npm ci

COPY babel.config.js babel.config.es.js ./
COPY src src
COPY example/bar example/bar
COPY example/public example/public
COPY example/src example/src

RUN npm run build && cd example && npm run build

FROM docker.io/busybox:1-musl
WORKDIR /app

COPY --from=build /app/example/build /app

CMD ["httpd", "-fp3000"]
