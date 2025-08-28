# Build stage
FROM node:22-alpine3.22 

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm ci

COPY . .

CMD  ["npm","run", "dev"]
# RUN npm install

# COPY . .

# # Build the app
# RUN npm run build

# # Production stage
# FROM nginx:alpine

# # Copy nginx configuration
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Copy built files from builder stage
# COPY --from=builder /app/dist /usr/share/nginx/html

# # Expose port
# EXPOSE 80

# # Start nginx
# CMD ["nginx", "-g", "daemon off;"] 