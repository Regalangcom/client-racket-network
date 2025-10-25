```
   <div className="text-center w-full flex flex-col absolute md:relative items-center justify-center">
          <span className="text-xs sm:text-base mt-7  md:mt-0 tracking-tight">
            {label}
          </span>
        </div>
```

/_ Mobile kecil (HP jadul / layar kecil) _/
@media (max-width: 320px) { ... }

/_ Mobile normal (HP modern) _/
@media (max-width: 480px) { ... }

/_ Phablet & mobile besar _/
@media (max-width: 600px) { ... }

/_ Tablet portrait _/
@media (max-width: 768px) { ... }

/_ Tablet landscape / small laptop _/
@media (max-width: 992px) { ... }

/_ Laptop standar _/
@media (max-width: 1200px) { ... }

/_ Desktop besar / layar 2K _/
@media (max-width: 1400px) { ... }

/_ Ultra wide (opsional) _/
@media (min-width: 1600px) { ... }

MacBook Air 13" → 1440 x 900 (viewport default sekitar 1280px lebar)

MacBook Pro 13" → 2560 x 1600 (viewport default sekitar 1280px)

MacBook Pro 14" → 3024 x 1964 (viewport default sekitar 1512px)

MacBook Pro 16" → 3456 x 2234 (viewport default sekitar 1728px)

```
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
        NEXT_PUBLIC_SENTRY_DSN = credentials('sentry-dsn')
        SENTRY_AUTH_TOKEN = credentials('sentry-auth-token')
        SENTRY_ORG = 'galangdotjs'
        SENTRY_PROJECT = 'rn-racket-network'
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
                                echo "Copying static files for standalone deployment..."
                                cp -r .next/static .next/standalone/.next/static
                                cp -r src/public .next/standalone/public
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


```

```

```
