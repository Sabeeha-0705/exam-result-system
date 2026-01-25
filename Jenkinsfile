pipeline {
    agent any

    options {
        timestamps()
    }

    triggers {
        pollSCM('H/2 * * * *')   // every 2 minutes
    }

    environment {
        IMAGE_NAME = "exam-result-app"
        IMAGE_TAG  = "latest"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo '📥 Cloning repository...'
                checkout scm
            }
        }

        stage('Backend Install') {
            steps {
                dir('backend') {
                    bat 'node -v'
                    bat 'npm install'
                }
            }
        }

        // 🔍 SONARQUBE
        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner'
                    withSonarQubeEnv('SonarQube') {
                        bat """
                        "${scannerHome}\\bin\\sonar-scanner.bat" ^
                          -Dsonar.projectKey=exam-result-system ^
                          -Dsonar.projectName="Exam Result System" ^
                          -Dsonar.sources=backend,frontend
                        """
                    }
                }
            }
        }

        // 🐳 DOCKER BUILD
        stage('Docker Build') {
            steps {
                dir('backend') {
                    bat "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        // ☸️ KUBERNETES DEPLOY
        stage('Deploy to Kubernetes') {
            steps {
                echo '🚀 Deploying to Kubernetes...'
                bat '''
                kubectl apply -f k8s/backend/deployment.yaml
                kubectl apply -f k8s/backend/service.yaml
                '''
            }
        }
    }

    post {
        success {
            echo '✅ CI/CD Success – SonarQube + Docker + Kubernetes Deployment Completed!'
        }
        failure {
            echo '❌ Pipeline Failed – Check logs'
        }
    }
} 