# frontend/Dockerfile
FROM node:20.11.1

WORKDIR /app

RUN npm install -g @angular/cli

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 4200

ENV NODE_ENV=development

CMD ["ng", "serve", "--host", "0.0.0.0"]
