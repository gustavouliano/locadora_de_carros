#Production stage
FROM node:20-alpine AS production

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "start"]