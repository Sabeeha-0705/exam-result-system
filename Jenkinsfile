pipeline {
    agent any

    triggers {
        pollSCM('H/2 * * * *')   // every 2 minutes Git check
    }

    environment {
        PORT = '3000'
        MONGO_URI = 'mongodb://localhost:27017/examdb'
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo 'Cloning repository...'
                checkout scm
            }
        }

        stage('Backend Install & Test') {
            steps {
                dir('backend') {
                    echo 'Installing backend dependencies'
                    bat 'npm install'
                    bat 'node -v'
                    bat 'npm start'
                }
            }
        }

        stage('Docker Build') {
            steps {
                dir('backend') {
                    echo 'Building Docker image'
                   bat 'docker build -t exam-result-app backend'
            }
        }

        stage('Docker Run') {
            steps {
                echo 'Running Docker container'
                bat '''
                docker stop exam-result-container || exit 0
                docker rm exam-result-container || exit 0
                docker run -d -p 3000:3000 ^
                  -e PORT=3000 ^
                  -e MONGO_URI=mongodb://localhost:27017/examdb ^
                  --name exam-result-container exam-result-app
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline Success – App Deployed using Docker!'
        }
        failure {
            echo '❌ Pipeline Failed'
        }
    }
}
