FROM node:20-bookworm-slim

COPY package.json /myapp/
WORKDIR /myapp
RUN npm install

COPY scripts /myapp/scripts
COPY public /myapp/public
COPY src /myapp/src
COPY index.html /myapp/
COPY vite.config.js /myapp/
COPY photos-src /myapp/photos-src

RUN node scripts/extract-headings.js
RUN node scripts/extract-frontmatter.js
RUN node scripts/build-images.js

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
