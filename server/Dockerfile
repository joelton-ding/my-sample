From node:10.15.3

ADD  . /app
RUN  npm install --global yarn

WORKDIR /app
RUN npm install -g typescript
RUN yarn install
RUN yarn build

CMD [ "npm", "start" ]
