---
title: "Intro to Docker"
topic: "Computer Science"
path: "into-to-docker"
author: "David Lu"
date: "2024-11-11"
preview: "If you've ever struggled with managing a complex project with different dependencies, then Docker is the tool for you. I've been hearing about Docker a lot recently, and wanted to learn the basics, which is what this article covers. "
---

# Docker Image

<v-divider></v-divider>

A docker image defines all the levels of of the compute platform, including the application, libraries, and underlying operating system. The easiest way to use images is to reference a **Docker Registry**. These are maintained and delivered by groups that write other services. 

> hub.docker.com

Images can have versions too, and these are identified by **Image Tags**. All images have a special tag called "latest" refering to the newest release, which is also the default version you get. 

```shell
docker pull nginx:1.23
docker images
docker run nginx:1.23
docker stop {container_id} or {container_name}
```

If you are developing your own application though, most likely you'll want to save your own image privately. This can be done in a private registry (e.g, AWS's Elastic Container Registry - ECR). Within a registry, you can save your container in a *repository*, which will likely contain many different versions of your image. 


# Dockerfile

<v-divider></v-divider>

A dockerfile is an instruction set for building a docker image. Dockerfiles start from a parent image or "base image". Typically defines some operating system, and some runtime. 

```dockerfile
FROM node:19-alpine

COPY package.json /app/
COPY src /app/

WORKDIR /app

RUN npm install

CMD ["node" "server.js"]
```

In order to run npm install in your base operating system through, it needs access to a few files from your main computer, such as a package.json file. The package.json file includes a section of dependies, which informs `npm install` what to install. This is done using the `COPY` directive in the Docker File. And then before we run anything, we need to set our working directory to the path we've selected (unless we're in the root folder). 

The final line in a Dockerfile is the `CMD` directive. There can only be a single `CMD` in each dockerfile and it basically begins running things. 

An example package.json file:

```json
{
    {
        "name" : "my-app",
        "version": "1.0",
        "dependences": {
            "express": "4.18.2"
        }
    }
}
```

Once your Dockerfile is complete, you need to build it into a docker image. You can add a tag using `-t`. And then finally, you must add the location to save this image. In this example, we are building in the current directory as indicated by a period `.`. 

```shell
docker build -t node-app:1.0 .
```

# Container

<v-divider></v-divider>

A container is just a running image. You can run any image, including any ones that you haven't pulled yet, in which case Docker finds it and pulls it automatically. You can view all running containers by using:

```shell
docker ps
```

Docker automatically generates a name for each container. You can end a container normally by using `ctrl+c`. If you add a `-d` flag, it is detached from your terminal, and you can avoid printing out a bunch of application logs on your screen. 


## Port Binding

Since containers run in a closed Docker network, you must first expose the container to your local network in order to access the applications running within. This is done by adding the following tag when running an image: `-p {local_host}:{application_port}`. A full example might look like:

```shell
docker run -d -p 9000:80 nginx:1.23 
```

The standard is to map the same port number on your local-host as that of the application within.  

# Docker Compose

<v-divider></v-divider>

When you have an application with many different components, you will need a way to coordinate all these different services. This is what Docker Compose does. Compose comes default with most Docker installations. Without Compose, we would have to create a network and connect our apps manually, like this:

```shell
docker network create mongo-network

# Start a Docker Container for the Database
docker run -d -p 21017:21017 --network mongo-network \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=password \
--name mongodb

# Start a Docker Container for the Frontend
docker run -d -p 8081:8081 \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
-e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
-e ME_CONFIG_MONGODB_SERVER=mongodb \
--network mongo-network \
--name mongo-express \
mongo-express
```

This is obviously a lot of work to setup and manage everytime. With Docker Compose, we create a YAML file to inform our architecture. 

```yaml
version: '3.1'          # Version of Docker Compose

services: 
    mongodb:            
        image: mongo:5.6
        ports:         
            - 27017:27017
        environment:    
            - MONGO_CONFIG_MONGODB...
    mongo-express:
    other-services:
```

Docker Compose will actually build containers that you define using a DockerFile. Thus you don't have to build them separately first, you can just add a `build:` subsection under the containers/services that you want to build. This is convenient during development, so you don't have to re-build a new image everytime you modify your code. 

Notice that there is no Docker Network definition step. This is because Docker Compose automatically creates a network. When you're ready to start your containers, you can call it like this:

```shell
docker-compose -f mongo-services.yaml up -d
```

If your containers depend on other containers, and you need to specify a particular startup order, you can add a `depends-on:` field under each container. If you want to take everything down, just use `down` instead of `up`. 

```shell
docker-compose -f mongo-services.yaml down
```

Stopping everything is also pretty easy, you don't need to stop each individual container and network. This is different from taking the entire network and containers down, because it keeps the containers around without deleting their data. 

### Deploying to a Private Registry

If you are working with a broader team, you'll want to maintain a version of everything in a private registry, not just your local machine.

1. Create a new Private Repository
2. Build image using Dockerfile `docker build -t myname/my-app:1.0 .`
3. Get ready to push but first login: `docker login`
4. Push the image `docker push myname/my-app:1.0`

Once your container/image is on the private repo, you should update your YAML file for Docker Compose to pull the image from that repo, instead of building it locally everytime (depending on the stage of work you are in).

```yaml
services:
    my-app:
        image: myname/my-app:1.0
```

### A Note on Kubernetes

If you a running an application that requires 1000's of different containers to be run, Docker Compose falls short. This is where Kubernetes comes it - Kubernetes has advanced features for large scale coordination of containers. 


# References

<v-divider :thickness="5"></v-divider>

* TechWorld with Nina. (2023, February 15). Docker Crash Course for Beginners. YouTube. https://www.youtube.com/watch?v=pg19Z8LL06w&t=174s