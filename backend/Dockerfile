# Step 1: Base image
FROM node:18

# Step 2: Working directory inside container
WORKDIR /app

# Step 3: Copy package files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy rest of the code
COPY . .

# Step 6: Expose port
EXPOSE 3000

# Step 7: Start server
CMD ["npm", "start"]
