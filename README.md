# User API

This is a Node.js-based User API that provides authentication and user management functionalities.

## Features
- User authentication using JWT
- Secure password hashing with bcrypt
- RESTful API structure
- Docker containerization
- CI/CD workflow with GitHub Actions

## Prerequisites
- Node.js (v22 recommended)
- Docker (for containerization)
- MySQL database

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/user-api.git
   cd user-api
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add:
   ```env
   JWT_SECRET=your_jwt_secret
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password
   DB_NAME=userdb
   ```

4. Run database migrations (if applicable).

## Running the API

### Development
```sh
npm start
```

### Running with Docker
```sh
docker build -t user-api .
docker run -p 8000:8000 --env-file .env user-api
```

## API Endpoints

### User Authentication
- **POST /api/login** - Authenticate a user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

## CI/CD Workflow

This project includes a GitHub Actions workflow to build and test the API on each push:
- **Builds Docker Image** on `feature/**` branches
- **Runs tests** before merging to `main`

## License
MIT License

