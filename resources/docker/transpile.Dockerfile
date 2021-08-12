FROM node:lts-fermium
WORKDIR /var/base
RUN npm i -g browserify
ENTRYPOINT browserify src/formula.js -o dist/bundle.js -s formula