# Stage 1 — builder
FROM node:18-alpine 
WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

EXPOSE 3000

# Start the Next.js production server
CMD ["npm", "start"]
