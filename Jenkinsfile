pipeline {
    agent any

    triggers {
        pollSCM('H/2 * * * *')
    }

    environment {
        PORT = '5000'
        MONGO_URI = credentials('MONGO_URI')
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo 'Cloning repository...'
                checkout scm
            }
        }

        stage('Backend Install') {
            steps {
                dir('backend') {
                    echo 'Installing backend dependencies'
                    bat 'node -v'
                    bat 'npm install'
                }
            }
        }

        stage('Docker Build') {
            steps {
                dir('backend') {
                    echo 'Building Docker image'
                    bat 'docker build -t exam-result-app .'
                }
            }
        }

        stage('Docker Run') {
            steps {
                echo 'Running Docker container'
                bat '''
                docker stop exam-result-container || exit 0
                docker rm exam-result-container || exit 0

                docker run -d -p 5000:5000 ^
                  -e PORT=5000 ^
                  -e MONGO_URI=%MONGO_URI% ^
                  --name exam-result-container exam-result-app
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline Success – Docker + MongoDB Atlas Connected!'
        }
        failure {
            echo '❌ Pipeline Failed – Check Console Output'
        }
    }
}
