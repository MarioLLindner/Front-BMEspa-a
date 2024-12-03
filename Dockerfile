FROM node:20-alpine3.19

# Creo directorio de trabajo en el docker
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

#instalo en nest (es una instalacion global que va en la maquina y no en el proyecto)
RUN npm install

# copio todo lo del directorio en el que estoy al directorio actual del docker
COPY . .

ENV NODE_OPTIONS=--max_old_space_size=4096

#buildeo la aplicacion que copie
RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

#comando para iniciar aplicación
#CMD ["npm", "run", "preview"]

CMD node ./dist/server/entry.mjs