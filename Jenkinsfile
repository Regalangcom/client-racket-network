pipeline {
    agent any

     triggers {
        githubPush() // Trigger otomatis saat push
        //  pollSCM('H/15 * * * *') // Polling cadangan
    }
    
    
    tools {
        nodejs "dc_node"  // Nama Node di Jenkins
    }
    
    environment {
        DEPLOY_PATH = '/var/www/html/client-racket-network'
        REPO_URL = 'https://github.com/Regalangcom/client-racket-network.git'
        // Gunakan credentials ID dari Jenkins
        VPS_CREDENTIALS = credentials('vps-ssh-key')
        VPS_HOST = '31.97.222.232'
        VPS_USERNAME = 'root'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                    url: "${REPO_URL}"
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Deploy to VPS') {
            steps {
                // Deploy menggunakan SSH
                sshagent(['vps-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${VPS_USERNAME}@${VPS_HOST} << EOF
                        cd ${DEPLOY_PATH}
                        git pull origin main
                        npm ci
                        npm run build
                        pm2 restart rn || pm2 start npm --name "rn" -- start
EOF
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
            mail to: 'your-email@example.com',
                 subject: 'Deployment Failed',
                 body: 'Deployment process failed. Check Jenkins logs.'
        }
    }
}