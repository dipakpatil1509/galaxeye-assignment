FROM node:16-alpine
# Set the working directory to /galaxeye
RUN npm install -g create-react-app

WORKDIR /galaxeye
# copy package.json into the container at /galaxeye
COPY package*.json ./
# install dependencies
RUN npm install -D typescript
RUN npm install --force 
# Copy the current directory contents into the container at /galaxeye-frontend
COPY . .
# Make port 3000 available to the world outside this container
EXPOSE 3000
# Run the app when the container launches
CMD ["npm", "start"]
