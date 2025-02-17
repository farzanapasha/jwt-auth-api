# Advanced Containers Assignment

## Overview
This project demonstrates a containerized web application using Docker and Docker Compose. It includes a Node.js API server, a MySQL database, and an Nginx reverse proxy for load balancing. The setup ensures scalability, security, and persistent data storage.

## Project Structure
```
📂 USER-API
 ├── 📜 server.js          # Node.js application
 ├── 📜 docker-compose.yml # Docker Compose configuration
 ├── 📜 Dockerfile         # Dockerfile for the web application
 ├── 📜 nginx.conf         # Nginx configuration for load balancing
 ├── 📜 .env.sample        # Example environment variables file
 ├── 📜 README.md          # Project documentation
```

## Prerequisites
- Docker & Docker Compose installed
- Node.js & MySQL installed

## Setup Instructions

### Step 1: Clone the Repository
```sh
git clone <repo-url>
cd project-root
```

### Step 2: Create an `.env` File
Create a `.env` file in the project root and configure environment variables:
```ini
MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_DATABASE=your_database_name
MYSQL_USER=your_db_user
MYSQL_PASSWORD=your_db_password
NODE_ENV=production
NODE_USER=node
```

### Step 3: Build and Start the Containers
```sh
docker-compose up --build -d
```

### Step 4: Verify Running Containers
```sh
docker ps
```

## API Endpoints
| Method | Endpoint       | Description         |
|--------|--------------|---------------------|
| POST   | `/user`      | Create a new user  |
| GET    | `/user/{id}` | Retrieve user data |

### Example API Call
```sh
curl -X POST -H "Content-Type: application/json" -d '{"first_name": "John", "last_name": "Doe"}' http://localhost/api/user
```

## Docker Compose Configuration

### `docker-compose.yml`
```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.3.0
    container_name: db 
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
    command: --character-set-server=utf8mb4 --collation-server=utf8mb4_general_ci
    volumes:
      - mysql:/var/lib/mysql
    networks:
      - nodejs-mysql
  
  app:
    image: node:20.11.0-alpine
    user: ${NODE_USER}
    working_dir: /home/node/app
    environment:
      - NODE_ENV=${NODE_ENV}
    command: "yarn start"
    deploy:
      replicas: 3
    volumes:
      - ./:/home/node/app
    depends_on:
      - mysql
    networks:
      - nodejs-mysql
  
  nginx:
    image: nginx:latest
    container_name: nginx
    restart: always
    depends_on:
      - app
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    networks:
      - nodejs-mysql

volumes:
  mysql:

networks:
  nodejs-mysql:
    driver: bridge
```

## Security Best Practices
- Uses minimal `alpine` images for the application.
- Runs containers as non-root users.
- Uses environment variables for secrets instead of hardcoding.
- Ensures the database container has authentication enabled.
- Restricts network access between services to minimize exposure.

## Stopping the Containers
```sh
docker-compose down
```

## Cleanup (Remove Volumes)
```sh
docker-compose down -v
```

## Contributors
- [Your Name]

## License
This project is licensed under the MIT License.
