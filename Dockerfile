# Select the right version of Node for the application
FROM node:12

# Set our working directory
WORKDIR /usr/src/aeden

# Copy the package.json and package-lock.json to install deps
COPY package*.json ./

# Copy the lerna.json file
COPY lerna.json ./

# Use npm to install deps
RUN npm install

# Install gulp
# Need to install locally and globally, see here: https://stackoverflow.com/questions/46559549/how-to-run-gulp-task-from-dockerfile
RUN npm install -g gulp
RUN npm install gulp

# Copy the app source
COPY . .

# Run the lerna bootstrap process, since for some reason npm doesn't do this automatically in docker
RUN ./node_modules/lerna/cli.js bootstrap

# Run the gulp installer
RUN gulp default

# # Copy the configuration file for the application
COPY ./client/bot/user/user-config-dev.json /usr/src/aeden/bin/client/bot/user/user-config.json

# # # Set our working directory to bin
WORKDIR /usr/src/aeden/bin

# # # Use npm to install deps for the JS project
RUN npm install

# # # Expose the listening port
EXPOSE 3000

# # # Start the NPM app
CMD ["node", "client/aeden.js"]