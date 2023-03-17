FROM node:19

WORKDIR /node_app
COPY package.json ./
COPY package-lock.json ./
RUN npm cache clean --force
RUN npm install
RUN chmod -R 777 ./node_modules

WORKDIR /node_app/app
USER node
COPY  . .

# EXPOSE 3002
# CMD ["npm", "run", "dev"]