FROM node:18.19.0-apline

WORKDIR /app
COPY package*.json ./

USER root
RUN chmod +rw .
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]