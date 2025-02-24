# JWT Auth API

This is a Node.js-based API project that provides jwt authentication and user management functionalities.

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
   git clone https://github.com/farzanapasha/jwt-auth-api.git
   cd jwt-auth-api
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add:
   ```env
   JWT_SECRET=user_jwt_secret
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password
   DB_NAME=apidb
   ```

4. Run database migrations (if applicable).

## Running the API

### Development
```sh
npm start
```

### Running with Docker
```sh
docker build -t jwt-auth-api .
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

# Jenkinsfile Configuration and Execution

## Prerequisites:
- Jenkins installed and running.
- A Git repository with Jenkinsfile.

## Steps to Configure and Run Jenkinsfile:

### 1. **Install Jenkins**
   - Ensure Jenkins is installed and running.
   - Open Jenkins on web browser: `http://localhost:8080/`.

### 2. **Set Up Jenkins Job**
   - Go to Jenkins Dashboard.
   - Click on `New Item`.
   - Select `Pipeline` and provide a job name.
   - Click `OK`.

### 3. **Configure the Pipeline Job**
   - In the job configuration screen:
     - Scroll down to `Pipeline` section.
     - Under `Definition`, select `Pipeline script from SCM`.
     - Choose `Git` as the SCM.
     - Enter git repository URL.
     - Specify the branch you want to use.
     - In `Script Path`, enter the path to the Jenkinsfile.

### 4. **Create Jenkinsfile**
   - In Git repository, create a file named `Jenkinsfile`.

### 5. **Commit Jenkinsfile**
   - Commit and push the `Jenkinsfile` to the Git repository.

### 6. **Run the Jenkins Job**
   - Go back to Jenkins and click on the job we created.
   - Click `Build Now` to start the pipeline execution.
   - Jenkins will fetch the `Jenkinsfile`, execute the stages, and display the results.

### 7. **Monitor the Build**
   - View the console output to track the pipeline execution.
   - Check for any errors and adjust the `Jenkinsfile` if necessary.

## License
MIT License

