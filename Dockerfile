# syntax=docker/dockerfile:1
# Cinny built from Git (default: the dev branch) with extra colour themes.
# The stages mirror upstream's Dockerfile; only the add-on steps are added.

## Builder
FROM node:24-alpine AS builder
ARG CINNY_REF=dev
# BuildKit checks the remote ref on every build: a new commit on CINNY_REF
# invalidates the cache, an unchanged ref reuses it.
ADD https://github.com/cinnyapp/cinny.git#${CINNY_REF} /src
WORKDIR /src
RUN npm ci

COPY themes/ /src/src/
COPY patch-cinny.mjs /tmp/patch-cinny.mjs
RUN node /tmp/patch-cinny.mjs /src

# Local feature patches (e.g. own bubbles on the right). --fuzz=0: if upstream
# moved the code, the build stops here instead of patching the wrong place.
COPY patches/ /tmp/patches/
RUN apk add --no-cache patch \
  && for p in /tmp/patches/*.patch; do \
       echo "applying $p" && patch -p1 --forward --fuzz=0 --no-backup-if-mismatch < "$p" || exit 1; \
     done

ENV NODE_OPTIONS=--max_old_space_size=4096
RUN npm run build

## App
FROM nginx:alpine
COPY --from=builder /src/dist /app
COPY --from=builder /src/docker-nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html \
  && ln -s /app /usr/share/nginx/html
