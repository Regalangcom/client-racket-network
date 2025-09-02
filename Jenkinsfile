pipeline {
    agent any

    triggers {
        githubPush()
    }
    
    tools {
        nodejs "dc_node"
    }
    
    environment {
        DEPLOY_PATH = '/var/www/html/client-racket-network'
        REPO_URL = 'https://github.com/Regalangcom/client-racket-network.git'
        GITHUB_CREDENTIALS = credentials('1232c8da-3e75-4d43-ab30-4bd694a053df')
        VPS_CREDENTIALS = credentials('vps-ssh-key')
        VPS_HOST = '31.97.222.232'
        VPS_USERNAME = 'root'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git credentialsId: '1232c8da-3e75-4d43-ab30-4bd694a053df', 
                    branch: 'main', 
                    url: "${REPO_URL}"
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    try {
                        sh 'npm ci'
                    } catch (err) {
                        error "Dependency installation failed: ${err}"
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                script {
                    try {
                        sh 'npm run build'
                    } catch (err) {
                        error "Build failed: ${err}"
                    }
                }
            }
        }
        
        stage('Deploy to VPS') {
            steps {
                sshagent(['vps-ssh-key']) {
                    script {
                        try {
                            sh """
                                ssh -o StrictHostKeyChecking=no ${VPS_USERNAME}@${VPS_HOST} << EOF
                                cd ${DEPLOY_PATH}
                                git pull origin main
                                npm ci
                                npm run build
                                pm2 restart rn || pm2 start npm --name "rn" -- start
EOF
                            """
                        } catch (err) {
                            error "VPS Deployment failed: ${err}"
                        }
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'Deployment successful!'
            // Optional: Tambahkan notifikasi sukses
            mail to: 'galangmiftah03@gmail.com',
                 subject: 'Deployment Successful',
                 body: "Deployment for ${env.JOB_NAME} completed successfully.\nBuild Number: ${env.BUILD_NUMBER}"
        }
        failure {
            // Tambahkan body pada mail
            mail to: 'galangmiftah03@gmail.com',
                 subject: 'Deployment Failed',
                 body: "Deployment for ${env.JOB_NAME} failed.\nBuild Number: ${env.BUILD_NUMBER}\nCheck Jenkins logs for details."
        }
    }
}