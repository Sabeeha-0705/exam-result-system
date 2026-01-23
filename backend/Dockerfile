# Step 1: Base image
FROM node:18

# Step 2: Working directory
WORKDIR /app

# Step 3: Copy package files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy remaining source code
COPY . .

# Step 6: Expose correct port
EXPOSE 5000

# Step 7: Start server
CMD ["npm", "start"]
