pipeline {
    agent any
    
    environment {
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
        EB_APPLICATION_NAME = 'idream-beanstalk-dev'
        EB_ENVIRONMENT_NAME = 'idream-beanstalk-nodejs-env-dev'
        S3_BUCKET = 'idream-s3-api-artifacts-dev'
        REGION = 'us-east-1'
    }
    
    stages {
        stage('Install Node.js and npm') {
            steps {
                // Install Node.js and npm if not already installed
                sh '''
                if ! type "node" > /dev/null; then
                    echo "Installing Node.js and npm"
                    curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
                    sudo apt-get install -y nodejs
                else
                    echo "Node.js and npm are already installed"
                fi
                '''
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }
        
        stage('Package') {
            steps {
                sh '''
                zip -r eb-deploy.zip . -x node_modules\\* -x .git\\* -x Jenkinsfile
                '''
            }
        }
        
        stage('Upload to S3') {
            steps {
                sh '''
                aws s3 cp eb-deploy.zip s3://${S3_BUCKET}/eb-deploy.zip --region ${REGION}
                '''
            }
        }
        
        stage('Deploy to Elastic Beanstalk') {
            steps {
                sh '''
                aws elasticbeanstalk create-application-version --application-name ${EB_APPLICATION_NAME} --version-label ${BUILD_ID} --source-bundle S3Bucket=${S3_BUCKET},S3Key=eb-deploy.zip --region ${REGION}
                aws elasticbeanstalk update-environment --environment-name ${EB_ENVIRONMENT_NAME} --version-label ${BUILD_ID} --region ${REGION}
                '''
            }
        }
    }
    
    post {
        success {
            echo 'Deployment succeeded!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}