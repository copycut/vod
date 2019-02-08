FROM node:10-alpine

ARG build_number=dev
ENV BUILD_NUMBER=${build_number}
ENV RUN_ENV=dev

RUN apk --no-cache add curl git

COPY . /opt
RUN cd /opt && \
    npm install && \
    npm run test:lint && \
    npm run test:type-check && \
    npm run build && \
    npm cache clear --force

WORKDIR /opt
CMD [ "npm", "run", "start" ]
