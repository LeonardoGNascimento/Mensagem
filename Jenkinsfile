pipeline{
    agent any

   stages {
        stage('Build api_mensagem') {
            steps {
                sh 'docker build -t api_mensagem ./api_mensagem'
            }
        }
   }

}