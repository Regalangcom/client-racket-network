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
        VPS_HOST = '31.97.222.232'
    }

    stages {
        stage('Checkout') {
            steps {
                // Menggunakan kredensial GitHub dengan safely menggunakan withCredentials
                withCredentials([usernamePassword(credentialsId: '1232c8da-3e75-4d43-ab30-4bd694a053df', 
                                                  usernameVariable: 'GITHUB_USER', 
                                                  passwordVariable: 'GITHUB_TOKEN')]) {
                    script {
                        // GITHUB_USER dan GITHUB_TOKEN sudah terisi secara otomatis
                        sh """
                            git remote set-url origin https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/Regalangcom/client-racket-network.git
                            git fetch origin
                            git reset --hard origin/main
                        """
                    }
                }
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
                withCredentials([sshUserPrivateKey(credentialsId: 'vps-ssh-key', 
                                                   keyFileVariable: 'SSH_KEY', 
                                                   usernameVariable: 'SSH_USER')]) {
                    script {
                        // Menggunakan SSH key dengan aman
                        sh """
                            ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no ${SSH_USER}@${VPS_HOST} '
                                echo "Deploying to VPS..."
                                cd ${DEPLOY_PATH}
                                git pull origin main
                                npm ci
                                npm run build
                                pm2 restart rn || pm2 start npm --name rn -- start
                            '
                        """
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
