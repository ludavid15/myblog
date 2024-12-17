# Stage 1: Build VuePress content
FROM node:20 AS vuepress-builder

WORKDIR /myapp/vuepress
COPY vuepress/package.json ./
RUN npm install

COPY vuepress/ ./
RUN npx vuepress build .

# Stage 2: Build Main Application
FROM node:20 AS vue-builder

WORKDIR /myapp
COPY package.json ./
RUN npm install

COPY public /myapp/public
COPY src /myapp/src

COPY --from=vuepress-builder /myapp/vuepress/.vuepress/dist ./public/blog
RUN npm run build

CMD ["npm", "run", "serve"]