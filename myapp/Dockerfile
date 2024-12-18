FROM node:19-alpine

COPY package.json /myapp/
WORKDIR /myapp
RUN npm install

COPY scripts /myapp/scripts
COPY public /myapp/public
COPY src /myapp/src
COPY index.html /myapp/
COPY vite.config.js /myapp/

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]