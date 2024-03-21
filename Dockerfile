# define base image
FROM node:20-alpine

# set working directory
WORKDIR /app

# copy package.json
COPY package.json .

# install dependencies
RUN npm install

# copy the rest of the files
COPY . .

# build the app
RUN npm run build

# open up specific port for the app
EXPOSE 5173

# run preview command once the container spins up
CMD [ "npm", "run", "dev" ]
