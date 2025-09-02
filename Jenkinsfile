pipeline {
    agent any

    triggers {
        githubPush()
    }
    
    tools {
        git 'Default'  
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
                        sh '''
                            echo "Deploying to VPS..."
                            ssh -o StrictHostKeyChecking=no $VPS_USERNAME@$VPS_HOST "
                                echo 'Current directory: $(pwd)'
                                cd $DEPLOY_PATH
                                git pull origin main 
                                npm install
                                npm run build
                                pm2 restart rn || pm2 start npm --name rn -- start
                            "
                        '''
                    }
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
        }
    }
}