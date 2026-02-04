FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Create data directory for SQLite
RUN mkdir -p /data

ENV DB_PATH=/data/tasks.db
ENV PORT=3001

EXPOSE 3001

CMD ["npm", "start"]
