pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'farzanapasha/jwt-auth-api'
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup Node.js') {
            steps {
                script {
                    def nodeVersion = '22'
                    sh "nvm install ${nodeVersion} && nvm use ${nodeVersion}"
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test -- --forceExit'
            }
        }
        
        stage('Set up Docker Buildx') {
            steps {
                sh 'docker buildx create --use'
            }
        }
        
        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${env.GIT_COMMIT} ."
            }
        }
        
        stage('Push Docker Image') {
            when {
                branch 'main'
            }
            steps {
                sh "docker push ${DOCKER_IMAGE}:${env.GIT_COMMIT}"
            }
        }
    }
}

