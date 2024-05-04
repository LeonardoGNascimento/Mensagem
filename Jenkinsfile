pipeline{
    agent any

   stages {
        stage('Build Docker Image') {
            agent {
                docker {
                    image 'docker'
                    args '-v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            steps {
                sh 'docker build -t mensagens .'
            }
        }
   }

}