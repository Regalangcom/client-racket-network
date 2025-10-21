pipeline {
    agent any

    triggers {
        githubPush()
    }

    tools {
        git 'Default'
        nodejs 'dc_node'
    }

    environment {
        DEPLOY_PATH = '/var/www/html/client-racket-network'
        FOONTE_API_KEY = credentials('FONNTE_TOKEN') // simpan token di Jenkins Credentials
        TARGET_NUMBER  = "6282111648584" // lebih dari 1, pisahkan pakai koma
        REPO_URL = 'https://github.com/Regalangcom/client-racket-network.git'
        VPS_HOST = '31.97.222.232'
    }

    stages {
        stage('Checkout') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'token_github',
                                                  usernameVariable: 'GITHUB_USER',
                                                  passwordVariable: 'GITHUB_TOKEN'
                                                  )]) {
                    script {
                        // GITHUB_USER dan GITHUB_TOKEN sudah terisi secara otomatis cok !
                        sh """
                            git remote set-url origin https://\$GITHUB_USER:\$GITHUB_TOKEN@github.com/Regalangcom/client-racket-network.git
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
                                                   usernameVariable: 'SSH_USER'
                                                   )]) {
                    script {
                        sh """
                          ssh -i \$SSH_KEY -o StrictHostKeyChecking=no \$SSH_USER@\${VPS_HOST} '
                                echo "Deploying to VPS..."
                                cd ${DEPLOY_PATH}
                                git pull origin main
                                npm ci
                                npm run build
                                pm2 restart rn || pm2 start node --name rn -- .next/standalone/server.js
                            '
                        """
                    }
                                                   }
            }
        }
    }

    //  post {
    //     success {
    //         sh """
    //           curl -X POST https://api.fonnte.com/send \
    //             -H "Authorization: $FOONTE_API_KEY" \
    //             -F "target=$TARGET_NUMBER" \
    //             -F "message=✅ Deploy Sukses!\\n\\n📌"
    //         """
    //     }
    //     failure {
    //         sh """
    //           curl -X POST https://api.fonnte.com/send \
    //             -H "Authorization: $FOONTE_API_KEY" \
    //             -F "target=$TARGET_NUMBER" \
    //             -F "message=❌ Deploy Gagal!\\n\\n📌"
    //         """
    //     }
    // }
    post {
    success {
        echo "✅ Deploy Sukses!"
    }
    failure {
        echo "❌ Deploy Gagal!"
    }
}

}
