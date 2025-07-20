ARG PORT=5000

FROM node:12.16.1-alpine AS node

# dev stage
FROM node AS devstage

WORKDIR /home/dev/app

COPY yarn.lock .yarnrc package.json ./

RUN yarn install

RUN yarn add pm2

COPY . .

RUN yarn run build

# Open desired port
EXPOSE ${PORT}

# Run development server
CMD ["pm2-runtime", "./process.yml"]

# build stage

FROM node AS buildstage

# Set node environment to production
ENV NODE_ENV production

# Update the system
RUN apk --no-cache -U upgrade

RUN mkdir -p /home/prod/app/dist && chown -R node:node /home/prod/app

WORKDIR /home/prod/app

RUN yarn add pm2

COPY yarn.lock .yarnrc package*.json process.yml ./

USER node

# install only production dependencies
RUN yarn install --only=production

RUN yarn add pm2

COPY . .

RUN yarn run build

EXPOSE ${PORT}

# Run the app with PM2
CMD ["pm2-runtime", "./process.yml"]
