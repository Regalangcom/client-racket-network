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
        // Sentry Configuration
        NEXT_PUBLIC_SENTRY_DSN = credentials('sentry-dsn')
        SENTRY_AUTH_TOKEN = credentials('sentry-auth-token')
        SENTRY_ORG = 'galangdotjs'
        SENTRY_PROJECT = 'fe-racket-network'
        
        // Deployment Configuration
        DEPLOY_PATH = '/var/www/html/client-racket-network'
        VPS_HOST = '31.97.222.232'
        REPO_URL = 'https://github.com/Regalangcom/client-racket-network.git'
        
        // Optional: WhatsApp notification
        FOONTE_API_KEY = credentials('FONNTE_TOKEN')
        TARGET_NUMBER = "6282111648584"
    }

    stages {
        stage('Checkout') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'token_github',
                                                  usernameVariable: 'GITHUB_USER',
                                                  passwordVariable: 'GITHUB_TOKEN'
                                                  )]) {
                    script {
                        echo "📥 Checking out code from GitHub..."
                        sh """
                            git remote set-url origin https://\$GITHUB_USER:\$GITHUB_TOKEN@github.com/Regalangcom/client-racket-network.git
                            git fetch origin
                            git reset --hard origin/main
                        """
                        echo "✅ Code checkout completed"
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo "📦 Installing dependencies..."
                    try {
                        sh 'npm ci'
                        echo "✅ Dependencies installed successfully"
                    } catch (err) {
                        error "❌ Dependency installation failed: ${err}"
                    }
                }
            }
        }

        stage('Build Application') {
            steps {
                script {
                    echo "🔨 Building Next.js application..."
                    echo "📍 Sentry will upload source maps during build"
                    try {
                        sh 'npm run build'
                        echo "✅ Build completed successfully"
                        echo "✅ Sentry source maps uploaded"
                    } catch (err) {
                        error "❌ Build failed: ${err}"
                    }
                }
            }
        }

        stage('Sync Build Artifacts to VPS') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'vps-ssh-key',
                                                   keyFileVariable: 'SSH_KEY',
                                                   usernameVariable: 'SSH_USER'
                                                   )]) {
                    script {
                        echo "📦 Syncing build artifacts to VPS..."
                        
                        try {
                            sh """
                                # Test SSH connection
                                ssh -i \$SSH_KEY -o StrictHostKeyChecking=no -o ConnectTimeout=10 \$SSH_USER@\${VPS_HOST} 'echo "SSH connection successful"'
                                
                                # Ensure deploy directory exists
                                ssh -i \$SSH_KEY -o StrictHostKeyChecking=no \$SSH_USER@\${VPS_HOST} 'mkdir -p ${DEPLOY_PATH}'
                                
                                # Sync .next folder (build output) - MOST IMPORTANT
                                echo "Syncing .next folder..."
                                rsync -avz --delete \
                                    -e "ssh -i \$SSH_KEY -o StrictHostKeyChecking=no" \
                                    --exclude 'cache' \
                                    --progress \
                                    .next/ \$SSH_USER@\${VPS_HOST}:${DEPLOY_PATH}/.next/
                                
                                # Sync package files for production dependencies
                                echo "Syncing package files..."
                                rsync -avz \
                                    -e "ssh -i \$SSH_KEY -o StrictHostKeyChecking=no" \
                                    --progress \
                                    package.json package-lock.json \
                                    \$SSH_USER@\${VPS_HOST}:${DEPLOY_PATH}/
                                
                                # Sync public folder (static assets)
                                echo "Syncing public folder..."
                                rsync -avz --delete \
                                    -e "ssh -i \$SSH_KEY -o StrictHostKeyChecking=no" \
                                    --progress \
                                    src/public/ \$SSH_USER@\${VPS_HOST}:${DEPLOY_PATH}/public/
                                
                                # Sync next.config.js (important for standalone mode)
                                echo "Syncing config files..."
                                rsync -avz \
                                    -e "ssh -i \$SSH_KEY -o StrictHostKeyChecking=no" \
                                    next.config.js \
                                    \$SSH_USER@\${VPS_HOST}:${DEPLOY_PATH}/ 2>/dev/null || echo "next.config.js not found, skipping..."
                            """
                            echo "✅ Build artifacts synced successfully"
                        } catch (err) {
                            error "❌ Failed to sync artifacts: ${err}"
                        }
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
                        echo "🚀 Deploying to VPS..."
                        
                        try {
                            sh """
                                ssh -i \$SSH_KEY -o StrictHostKeyChecking=no \$SSH_USER@\${VPS_HOST} << 'ENDSSH'
                                    set -e  # Exit on error
                                    
                                    echo "📂 Navigating to deployment directory..."
                                    cd ${DEPLOY_PATH}
                                    
                                    echo "📦 Installing production dependencies..."
                                    npm ci --production --prefer-offline --no-audit
                                    
                                    echo "📁 Preparing standalone deployment..."
                                    # Copy static files to standalone folder
                                    if [ -d ".next/standalone" ]; then
                                        echo "Copying static assets..."
                                        mkdir -p .next/standalone/.next
                                        cp -r .next/static .next/standalone/.next/static 2>/dev/null || echo "No static folder"
                                        cp -r public .next/standalone/ 2>/dev/null || echo "No public folder"
                                    else
                                        echo "⚠️  Warning: .next/standalone not found, skipping static copy"
                                    fi
                                    
                                    echo "🔄 Restarting application with PM2..."
                                    # Check if PM2 process exists
                                    if pm2 list | grep -q "rn"; then
                                        echo "Restarting existing PM2 process..."
                                        pm2 restart rn
                                    else
                                        echo "Starting new PM2 process..."
                                        pm2 start node --name rn -- .next/standalone/server.js
                                    fi
                                    
                                    # Save PM2 configuration
                                    pm2 save
                                    
                                    echo "✅ Application deployed and running!"
                                    
                                    # Show PM2 status
                                    pm2 list
ENDSSH
                            """
                            echo "✅ Deployment completed successfully! 🏸"
                        } catch (err) {
                            error "❌ Deployment failed: ${err}"
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                echo "=========================================="
                echo "✅ DEPLOYMENT SUCCESSFUL! 🏸"
                echo "=========================================="
                echo "Project: Racket Network"
                echo "Environment: Production"
                echo "VPS: ${VPS_HOST}"
                echo "Sentry: Source maps uploaded"
                echo "=========================================="
                
                // Optional: WhatsApp notification
                // Uncomment jika mau aktifkan notifikasi WA
                /*
                sh """
                    curl -X POST https://api.fonnte.com/send \
                        -H "Authorization: $FOONTE_API_KEY" \
                        -F "target=$TARGET_NUMBER" \
                        -F "message=✅ Deploy Sukses! 🏸\\n\\nProject: Racket Network\\nBranch: main\\nTime: \$(date)"
                """
                */
            }
        }
        
        failure {
            script {
                echo "=========================================="
                echo "❌ DEPLOYMENT FAILED!"
                echo "=========================================="
                echo "Check the console output above for errors"
                echo "=========================================="
                
                // Optional: WhatsApp notification
                /*
                sh """
                    curl -X POST https://api.fonnte.com/send \
                        -H "Authorization: $FOONTE_API_KEY" \
                        -F "target=$TARGET_NUMBER" \
                        -F "message=❌ Deploy Gagal!\\n\\nProject: Racket Network\\nBranch: main\\nTime: \$(date)\\n\\nCheck Jenkins for details."
                """
                */
            }
        }
        
        always {
            script {
                echo "🧹 Cleaning up workspace..."
                // Cleanup build artifacts di Jenkins (optional, untuk save disk space)
                // sh 'rm -rf .next node_modules'
            }
        }
    }
}