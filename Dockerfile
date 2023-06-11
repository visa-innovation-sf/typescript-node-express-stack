# ==== BUILD STAGE =====
FROM node:19-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN nom run build

# ==== RUN STAGE =====
FROM node:19-alpine
WORKDIR /app
COPY --from=builder /app/build build
COPY package.json .
ENV NODE_ENV production
CMD ["npm", "run", "start"]
