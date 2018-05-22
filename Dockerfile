FROM node:10.0
LABEL environment="DEVELOPMENT"
EXPOSE 80
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install --global nodemon
RUN npm install
VOLUME /usr/src/app
CMD ["npm","start"]
