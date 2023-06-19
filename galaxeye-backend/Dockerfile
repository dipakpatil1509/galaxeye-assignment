FROM node:16-alpine
# Set the working directory to /galaxeye
WORKDIR /galaxeye
# copy package.json into the container at /
COPY package*.json ./
# install dependencies
RUN npm install -D typescript
RUN npm install --force 
# Copy the current directory contents into the container at /
COPY . .
# Make port 5000 available to the world outside this container
EXPOSE 5000
# Run the app when the container launches
CMD ["npm", "start"]