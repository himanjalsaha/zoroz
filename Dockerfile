# Builder stage
FROM node:18-alpine as builder
WORKDIR /my-space

# Copy package files and install all dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps 
# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Runner stage (for production)
FROM node:18-alpine as runner
WORKDIR /my-space

# Copy only necessary files from the builder stage
COPY package.json package-lock.json ./
RUN npm install  --legacy-peer-deps 

# Copy the built files from the builder stage
COPY --from=builder /my-space/public ./public
COPY --from=builder /my-space/.next/standalone ./
COPY --from=builder /my-space/.next/static ./.next/static

# Expose the port that the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
