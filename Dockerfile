# ==== BUILD STAGE =====
FROM node:19-alpine AS builder
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

# ==== RUN STAGE =====
FROM node:19-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/build build
COPY package.json .
ENV NODE_ENV production
CMD ["npm", "run", "serve"]
