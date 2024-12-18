FROM node:18

WORKDIR /app

COPY ./backend ./backend

COPY ./frontend ./frontend

WORKDIR /app/backend
RUN npm install

WORKDIR /app/frontend
RUN npm install

WORKDIR /app

EXPOSE 3000

CMD ["node","./backend/server.js"]
