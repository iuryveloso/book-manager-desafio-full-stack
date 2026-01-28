# 📘 Book Manager Full Stack Challenge

## Overview

This project is a full-stack application designed to manage books, featuring both a backend and a frontend. It utilizes modern technologies and tools to provide a seamless user experience.

## Technologies Used

### Backend

- **Node.js**: JavaScript runtime for building scalable network applications.
- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeScript**: A superset of JavaScript that compiles to plain JavaScript, providing static typing.
- **Prisma**: An ORM (Object-Relational Mapping) tool for Node.js and TypeScript that simplifies database access.
- **PostgreSQL**: A powerful, open-source relational database system.
- **Docker**: A platform for developing, shipping, and running applications in containers.

### Frontend

- **Next.js**: A React framework for building server-side rendered applications.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: Used in the frontend for type safety and better development experience.
- **TailwindCSS**: A utility-first CSS framework for rapidly building custom user interfaces.

## Main Features

- User authentication and authorization.
- CRUD operations for managing books.
- Responsive design for mobile and desktop views.
- Dockerized environment for easy setup and deployment.

## Installation Instructions

1. **Clone the repository**:

   ```bash
   git clone git@github.com:iuryveloso/book-manager-desafio-full-stack.git
   cd book-manager-desafio-full-stack
   ```

2. **Set up environment variables**:
   - Copy the `.env.example` files to `.env` in both the `backend` and `frontend` directories and fill in the required values.

3. **Install dependencies**:
   This step is only necessary if you aren't using Docker for the next one.
   - For the backend:

   ```bash
   cd backend
   npm install
   npx prisma generate
   ```

   - For the frontend:

   ```bash
   cd frontend
   npm install
   ```

4. **Run the application**:
   **For Development**
   - Using Docker:

   ```bash
   docker compose --file docker-compose-develop.yaml up -d
   ```

   - Or run the backend and frontend separately:

   ```bash
   cd backend
   npm run start:dev
   cd ../frontend
   npm run dev
   ```

   **For Production**
   - Using Docker:

   ```bash
   docker compose --file docker-compose-production.yaml up -d
   ```

   - Or run the backend and frontend separately:

   ```bash
   cd backend
   npm run build
   npm run start:prod
   cd ../frontend
   npm run start
   ```

5. **Access the application**:
   - Open your browser and navigate to `http://localhost:3000` for the frontend.

---

For more information, please refer to the individual README files in the `backend` and `frontend` directories.
