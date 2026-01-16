pipeline {
    agent any

    triggers {
        pollSCM('H/2 * * * *')
    }

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/Sabeeha-0705/exam-result-system.git'
            }
        }

        stage('Setup Node') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Backend Build Check') {
            steps {
                dir('backend') {
                    bat 'node -v'
                }
            }
        }
    }
}
