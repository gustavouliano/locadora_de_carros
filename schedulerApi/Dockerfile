FROM node:20-alpine AS production

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "run", "start"]