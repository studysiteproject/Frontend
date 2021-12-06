FROM node

RUN npm install -g serve

RUN mkdir ./build
COPY ./build ./build