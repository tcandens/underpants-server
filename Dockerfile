FROM node

WORKDIR /usr/src/app

RUN npm install --global yarn@latest

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
