# Text to Speech app

## 🚀 Descrição

O objetivo deste projeto é criar uma página HTML capaz de capturar uma frase qualquer inserida pelo usuário e transformar essa frase em um audio em mp3 via AWS polly, integrando com vários serviços AWS

## 📺 Aplicação em funcionamento
[Frontend](https://s3.amazonaws.com/text-to-speech-equipe5-sprint6/index.html) <br>
[Backend](https://sjcz8s68n4.execute-api.us-east-1.amazonaws.com/) <br>
### Preview:
![preview](/assets/s6-preview.gif)

## Arquitetura na AWS
![Arquitetura](/assets/arch-aws.png)
## Desenvolvimento e funcionamento

  Foi desenvolvida uma aplicação com o framework `serverless`, com 3 funções que foram implementadas no `AWS Lambda`.
  Para conversão de texto em áudio, foi utilizado `AWS Polly`. `AWS S3` e `AWS DynamoDB` foram utilizados para persistir as entradas do usuário e os conteúdos de mídia criados.

- ## Rota 1 → Get /

- Resposta a ser entregue:

```json
  {
    "message": "Go Serverless v3.0! Your function executed successfully!",
    "input": {
        ...(event)
      }
  }
```

- ## Rota 2 → Get /v1

- Resposta a ser entregue:

```json
{
  "message": "TTS api version 1."
}
```
 - ## Rota 3 → Get /v2

- Resposta a ser entregue:

```json
{
  "message": "TTS api version 2."
}
```


- ## Rota 4 → /v1/tts:
  A função Lambda recebe uma frase do Usuário, convorte para um áudio e armazena as informações em um Bucket S3.

  Exemplo de entrada:
  ```
  {
    "phrase": "Olá, converta esse texto para audio."
  }
  ```

  Exemplo de retorno:
  ```
  {
    "received_phrase": "converta esse texto para áudio",
    "url_to_audio": "https://meu-buckect/audio-xyz.mp3",
    "created_audio": "02-02-2023 17:00:00"
  }
  ```
- ## Rota 5 → /v2/tts:
   A função Lambda recebe uma frase do Usuário, convorte para um áudio e armazena as informações em um Bucket S3. Ainda, é criado um identificador único para a frase recebida. Os dados são persistidos em uma tabela do DynamoDB.

  Exemplo de entrada:
  ```
  {
    "phrase": "Olá, converta esse texto para audio."
  }
  ```

  Exemplo de retorno:
  ```
  {
    "received_phrase": "converta esse texto para áudio",
    "url_to_audio": "https://meu-buckect/audio-xyz.mp3",
    "created_audio": "02-02-2023 17:00:00",
    "unique_id": "123456"
  }
  ```

- ## Rota 6 → /v3/tts:
  Verifica se já existe, no banco de dados, uma hash associada aquela frase. Caso exista, retorna os dados referentes. Caso contrário, tem funcionamentosemelhante a rota `v2/tts`.

  Exemplo de entrada:
  ```
  {
    "phrase": "Olá, converta esse texto para audio."
  }
  ```

  Exemplo de retorno:
  ```
  {
    "received_phrase": "converta esse texto para áudio",
    "url_to_audio": "https://meu-buckect/audio-xyz.mp3",
    "created_audio": "02-02-2023 17:00:00",
    "unique_id": "123456"
  }
  ```



## 🔧 Instalação local

1. Clone o repositório.

```bash
    git clone -b equipe-5 --single-branch https://github.com/Compass-pb-aws-2023-FURG-IFRS-UFFS/sprint-6-pb-aws-furg-ifrs-uffs && cd sprint-6-pb-aws-furg-ifrs-uffs
```

2. Instale o framework serverless em seu computador. Mais informações [aqui](https://www.serverless.com/framework/docs/getting-started)

```bash
npm install -g serverless
```

3. Gere suas credenciais (AWS Acess Key e AWS Secret) na console AWS pelo IAM. Mais informações [aqui](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/)

4. Insira as credenciais e execute o comando conforme exemplo:

```bash
serverless config credentials \
  --provider aws \
  --key AKIAIOSFODNN7EXAMPLE \
  --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

Também é possivel configurar via [aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) executando o comando:

```bash
$ aws configure
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-east-1
Default output format [None]: ENTER
```

5. Informe as variáveis de ambiente:
  - Crie um arquivo ```env.yml``` na pasta ```api-tts```, conforme o exemplo:
  ```yml
  bucketName: #nome do bucket que será criado para armazenar os arquivos
  tableName: #nome da tabela dyanmodb
  principalArn: #arn do usuario que pode fazer PUT no bucketS
  AWS_REGION_NAME: #região da AWS para criação dos recursos (ex.: us-east-1)
  ```


É possível emular API Gateway e Lambda localmente usando serverless-offlineplugin. Para fazer isso, execute o seguinte comando:

```bash
serverless plugin install -n serverless-offline
```

Após a instalação, você pode iniciar a emulação local com:

```bash
serverless offline
```

## Deploy na AWS

1. Para efetuar o deploy na AWS, execute o comando:

```bash
serverless deploy
```



## 🛠️ Estrutura do projeto
```
├── api-tts
│   ├── controllers
│   │   └── tts_handler.py
│   ├── core
│   │   ├── config.py
│   ├── services
│   │   ├── BucketService.py
│   │   ├── DataBaseService.py
│   │   └── TextToSpeechService.py
│   ├── routes
│   │   ├── health.py
│   │   ├── v1.py
│   │   ├── v2.py
│   │   └── v3.py
│   ├── env.yml
│   ├── serverless.yml
│   ├── utils.py
├── frontend
│   ├── index.html
│   ├── index.js
│   └── styles.css
```


## Tecnologias Utilizadas

- ![AWS Lambda](https://img.shields.io/badge/-AWS%20Lambda-000?&logo=awslambda)  Plataforma de computação serverless da Amazon que permite executar código sem a necessidade de provisionar ou gerenciar servidores.

- ![Serverless Framework](https://img.shields.io/badge/-Serverless-000?&logo=serverless) Framework que simplifica o desenvolvimento e implantação de aplicações serverless na AWS e outras nuvens.

- ![Amazon DynamoDB](https://img.shields.io/badge/-AWS%20DynamoDB-000?&logo=amazondynamodb&logoColor=4053D6) Um banco de dados NoSQL totalmente gerenciado e escalável da AWS.

- ![Amazon S3](https://img.shields.io/badge/-AWS%20S3-000?&logo=amazons3) Armazenamento de objetos da Amazon que permite armazenar e recuperar dados em qualquer lugar da web.

- ![Amazon API Gateway](https://img.shields.io/badge/-AWS%20API%20Gateway-000?&logo=amazonapigateway) Um serviço da AWS que facilita a criação, publicação, manutenção, monitoramento e proteção de APIs.

- ![Python](https://img.shields.io/badge/-Python-000?&logo=python) Linguagem de programação amplamente utilizada para desenvolvimento de aplicações.

- ![AWS Polly](https://img.shields.io/badge/-AWS%20Polly-000?&logo=amazon-aws) Serviço de texto para fala da AWS que converte texto em discurso realista.
(Estrutura AWS)

## 💪​ Dificuldades encontradas
  - Problema com o CORS.
  - Testes locais com o plugin serverless offline.
  - Deploy do fronend com serverless.


## ✒️ Equipe

[João Victor Winderfeld](https://github.com/joaowinderfeldbussolotto) - [Luiz Scarsi](https://github.com/LuizScarsi) - [Josue de Mendonça Fernandes](https://github.com/JosueFernandes7) 



