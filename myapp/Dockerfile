FROM node:19-alpine

COPY package.json /myapp/

WORKDIR /myapp

RUN npm install -g @vue/cli
RUN npm install

COPY scripts /myapp/scripts
COPY public /myapp/public
COPY src /myapp/src

RUN node scripts/process-markdown.js
RUN node scripts/extract-meta.js
RUN node scripts/create-directory.js

EXPOSE 8080

CMD ["npm", "run", "serve"]