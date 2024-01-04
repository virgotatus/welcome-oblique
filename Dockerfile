FROM node:18.19.0-buster-slim

WORKDIR /app
COPY package*.json ./

USER root
RUN chmod +rw .
RUN npm install
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]