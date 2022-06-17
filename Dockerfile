FROM node:16.15.1

# Create app directory
WORKDIR /usr/src.app

# Install dependencies
# WIldcard for all packages in package.json and
COPY package*.json ./

RUN npm install

# install dependencies for production
# RUN npm ci --only-production

# Bundle app source
COPY . /usr/src.app/
EXPOSE 8080

CMD ["npm", "src/server.js"]