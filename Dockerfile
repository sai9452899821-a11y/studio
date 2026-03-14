# Sanity Studio — runs the dev server inside Docker
FROM node:20-alpine

WORKDIR /app

# Install dependencies
# Using npm install (not npm ci) — no package-lock.json required
COPY package.json ./
RUN npm install --silent

# Copy studio source
COPY . .

# Expose studio port
EXPOSE 3333

# Start Studio bound to 0.0.0.0 so Docker can expose the port
CMD ["npm", "run", "start"]
