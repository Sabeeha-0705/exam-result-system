pipeline {
    agent any

    options {
        timestamps()          // console output clear-aa irukum
    }

    triggers {
        pollSCM('H/2 * * * *')   // every 2 minutes Git check
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
                    bat 'node -v'
                    bat 'npm install'
                }
            }
        }

        // 🔍 SONARQUBE ANALYSIS STAGE
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {   // 👈 Manage Jenkins → System-la add pannina name
                    bat '''
                    sonar-scanner ^
                      -Dsonar.projectKey=exam-result-system ^
                      -Dsonar.projectName=Exam Result System ^
                      -Dsonar.sources=backend,frontend ^
                      -Dsonar.host.url=http://localhost:9000
                    '''
                }
            }
        }

        stage('Docker Build') {
            steps {
                dir('backend') {
                    bat 'docker build -t exam-result-app .'
                }
            }
        }

        stage('Docker Run') {
            steps {
                withCredentials([
                    string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI')
                ]) {
                    bat '''
                    docker stop exam-result-container || exit 0
                    docker rm exam-result-container || exit 0

                    docker run -d -p 5000:5000 ^
                      -e MONGO_URI=%MONGO_URI% ^
                      -e PORT=5000 ^
                      --name exam-result-container exam-result-app
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline Success – SonarQube + Docker Deployment Completed!'
        }
        failure {
            echo '❌ Pipeline Failed – Check Console Output'
        }
    }
}
