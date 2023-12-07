FROM node:18-buster-slim As Stage1

# Load all the environment variables
ARG ENV_VARIABLES

ARG BUILD_ID
ENV BUILD_ID=$BUILD_ID

LABEL stage=Stage1
LABEL build=$BUILD_ID

ENV NODE_ENV=production \
    PROJECT_HOME=/usr/app/ \
    DEBUG="app:*" \
    BUILD_DEPS="git python openssh-server build-essential"


# More node size for the docker build
ENV NODE_OPTIONS=--max_old_space_size=5120

# create project home
RUN mkdir -p ${PROJECT_HOME}

# switch to working directory
WORKDIR ${PROJECT_HOME}

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ${PROJECT_HOME}

# install deps
RUN apt-get update > /dev/null \
    && apt-get install -y -qq --no-install-recommends ${BUILD_DEPS} ca-certificates \
    vim curl > /dev/null

#npm install
RUN npm i -g npm@9 \
    && npm install --quiet

# copy source code and run the build
COPY . $PROJECT_HOME

# Exporting to the environment before build rather than using .env file
RUN IFS=';'; \
    for item in $ENV_VARIABLES; do \
#    echo $item; \
    export $item; \
    done \
    && npm run build

#RUN npm run build

#Stage 2
#######################################
FROM node:18-buster-slim

ENV NODE_ENV=production \
    PROJECT_HOME=/usr/app/ \
    DEBUG="app:*"

# install deps
RUN apt-get update > /dev/null \
    && apt-get install -y -qq --no-install-recommends ${BUILD_DEPS} ca-certificates \
    vim curl > /dev/null

# create project home
RUN mkdir -p ${PROJECT_HOME}

# Set working directory to nginx resources directory
WORKDIR $PROJECT_HOME

# Copies npm related resources
COPY --from=Stage1 $PROJECT_HOME/node_modules ./node_modules
COPY --from=Stage1 $PROJECT_HOME/public ./public

COPY --from=Stage1 $PROJECT_HOME/package.json ./
COPY --from=Stage1 $PROJECT_HOME/package-lock.json ./

# Copies static resources from builder stage
COPY --from=Stage1 $PROJECT_HOME/.next ./.next
COPY --from=Stage1 $PROJECT_HOME/next.config.js ./
COPY --from=Stage1 $PROJECT_HOME/next-i18next.config.js ./


# Copies pm2 related resources
COPY --from=Stage1 $PROJECT_HOME/process.yml ./

#npm install
RUN npm i -g npm@9 \
    && npm i -g --quiet pm2

#cleanup
RUN apt-get purge -y ${BUILD_DEPS} > /dev/null \
    && rm -rf /var/lib/apt/lists/*


EXPOSE 80 443 8080

# start the application
CMD ["pm2","start","process.yml","--attach"]