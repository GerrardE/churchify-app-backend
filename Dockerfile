ARG PORT=5000

FROM node:12.16.0-alpine AS node

# dev stage
FROM node AS devstage

WORKDIR /app

COPY package*.json ./

RUN yarn install

RUN yarn global add pm2

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

RUN mkdir -p /home/node/app/dist && chown -R node:node /home/node/app 

WORKDIR /home/node/app

RUN yarn global add pm2

COPY package*.json process.yml ./

USER node

# install only production dependencies
RUN yarn install --only=production

COPY --chown=node:node --from=devstage /app/dist ./dist

EXPOSE ${PORT}

# Run the app with PM2
CMD ["pm2-runtime", "./process.yml"]
