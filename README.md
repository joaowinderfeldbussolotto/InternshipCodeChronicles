<div align="center">
  <h1>Sistema de Extração de Tags de Imagens com Lambda e Rekognition</h1>
</div>

<div align="center">
  <p>Equipe 1</p>

  | Nome                                 | Linkedin                                                                                 |
  | ---------------                      | -------------------------------------------------------------------                      |
  | Cristofer Gaier Sais                 | [Link](https://www.linkedin.com/in/cristofer-sais-a293591a0)                             |
  | João Victor Winderfeld Bussolotto    | [Link](https://www.linkedin.com/in/jo%C3%A3o-victor-winderfeld-bussolotto-aaa914145/)    |
  | Josué Mendonça                       | [Link](https://www.linkedin.com/in/josu%C3%A9-mendon%C3%A7a-dev77/)                      |    
  | Luiz Paulo Grafetti Terres           | [Link](https://www.linkedin.com/in/luiz-paulo-grafetti-terres-aa577a274/)                |      


</div>

***

<a name="ancora"></a>
## 📖 Sumário
- [1 - Objetivo](#ancora1)
  - [1.1 - Tecnologias Utilizadas](#ancora1-1)
- [2 - Desenvolvimento do Projeto](#ancora2)
  - [2.1 - Rota 1 - Get /](#ancora2-1)
  - [2.2 - Rota 2 - Get /v1](#ancora2-2)
  - [2.3 - Rota 3 - Get /v2](#ancora2-3)
  - [2.4 - Rota 4 - Post /v1/vision](#ancora2-4)
  - [2.5 - Rota 5 - Post /v2/vision](#ancora2-4)
- [3 - Acesso à Aplicação e Como Utilizá-la](#ancora3)
- [4 - Estrutura de Pastas do Projeto](#ancora4)
- [5 - Arquitetura AWS](#ancora5)
- [6 - Dificuldades conhecidas](#ancora6)
- [7 - Licença](#ancora7)

***
<a id="ancora1"></a>
# 1 - Objetivo

O objetivo do projeto é desenvolver uma aplicação para automatizar a análise de imagens armazenadas no `S3` utilizando `AWS Lambda`, `Amazon Rekognition` e `API Gateway`. A primeira função, acessada através da rota `"/v1/vision"`, utiliza o `Amazon Rekognition` para identificar e retornar etiquetas associadas à imagem, enquanto a segunda função, acessada através da rota `"/v2/vision"`, identifica a principal emoção em cada rosto presente na imagem.

***

<a id="ancora1-1"></a>
- ## 1.1 - Tecnologias Utilizadas

  <div style="display: inline-block" align="center">
    <img align="center" alt="Python" height="30" src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" />
    <img align="center" alt="Git" height="28" width="42" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg">
    <img align="center" alt="AWS" height="28" width="42" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1024px-Amazon_Web_Services_Logo.svg.png" />
    <img align="center" alt="Serverless" height="28" width="42" src="https://assets-global.website-files.com/60acbb950c4d6606963e1fed/611631cd314b2abec6c29ec0_bolt.svg" />
    <img align="center" alt="Amazon API Gateway" height="28" width="42" src="https://d2q66yyjeovezo.cloudfront.net/icon/fb0cde6228b21d89ec222b45efec54e7-0856e92285f4e7ed254b2588d1fe1829.svg" />
    <img align="center" alt="Amazon Lambda" height="28" width="42" src="https://d2q66yyjeovezo.cloudfront.net/icon/945f3fc449518a73b9f5f32868db466c-926961f91b072604c42b7f39ce2eaf1c.svg" />
    <img align="center" alt="Amazon Rekognition" height="28" width="42" src="https://d2q66yyjeovezo.cloudfront.net/icon/b7cb336b98f3c4db02fb13d4d671df5e-37a81abbdae00bac12e1ffcd0776093b.svg" />
    <img align="center" alt="Amazon IAM" height="28" width="42" src="https://d2q66yyjeovezo.cloudfront.net/icon/0ebc580ae6450fce8762fad1bff32e7b-0841c1f0e7c5788b88d07a7dbcaceb6e.svg" />

  </div>

***
<a id="ancora2"></a>

# 2 - Desenvolvimento do Projeto

O desenvolvimento do projeto envolveu a criação e configuração de funções lambdas no `AWS Lambda`, habilitando o processamento de imagens armazenadas no `Amazon S3`, construídas usando o framework `Serverless`. Utilizando o `AWS Rekognition`, as funções foram desenvolvidas com o objetivo de identificar informações relevantes nas imagens, como etiquetas descritivas e emoções predominantes nos rostos detectados. A exposição das funções por meio do `API Gateway`, com endpoints "/v1/vision" e "/v2/vision", permitiu o acesso simplificado a esses serviços via API. Além disso, o framework `Serverless` também foi utilizado para o provisionamento bucket S3 e gerenciamento das políticas de acesso do `IAM` referente às funções Lambdas.

<!-- <a id="ancora2-1"></a>

- ## 2.1 - Desenvolvimento da Base de Dados
  A construção do banco de dados MySQL utilizando o `Amazon RDS` foi essencial para o nosso projeto. A tabela "filmes" está relacionada com a tabela "sessoes", permitindo que cada sessão seja associada a um filme específico. A tabela "sessoes" também está relacionada com a tabela "salas", o que permite identificar a sala onde uma sessão ocorrerá. Além disso, as tabelas "reservas" e "sessoes" estão relacionadas garantindo que cada reserva armazene o número de poltronas reservadas para cada sessão. 

  <div align="center">
    <img src = "./assets/EER.png">
  </div>

<a id="ancora2-2"></a>

- ## 2.2 - Desenvolvimento das APIs
  Desenvolvemos APIs utilizando o framework `Serverless`, que foram implantadas como funções Lambdas na AWS e integradas ao `Amazon API Gateway`. Essas APIs desempenham um papel fundamental na relação entre o Banco de Dados MySQL disponibilizado pelo `Amazon RDS` e o `CineBot`. Elas permitem consultas sobre filmes em cartaz, disponibilidade de sessões, reserva de ingressos e cancelamento de reservas, possibilitando uma grande experiência aos usuários ao interagirem com o `CineBot`.

<a id="ancora2-3"></a>

- ## 2.3 - Desenvolvimento do Chatbot com Amazon Lex V2
  Desenvolvemos o CineBot usando Amazon Lex V2 para criar uma experiência conversacional intuitiva. Criamos menus interativos com "response cards" para o usuário navegar para cada intenção do chatbot, permitindo que os usuários escolham ações, como pesquisar filmes ou fazer reservas. Cada intenção está vinculada a uma função Lambda que processa as solicitações dos usuários e fornece respostas relevantes.




<a id="ancora2-4"></a>

- ## 2.4 - Desenvolvimento das Funções Lambda para Integração com o Chatbot
  Nossas funções Lambda foram escritas em `Python` implantadas usando o framework `Serverless`. Elas lidam com solicitações específicas do chatbot, como reservas de ingressos e consultas sobre filmes, garantindo eficiência e escalabilidade. Isso permite ao CineBot oferecer uma experiência de usuário contínua e confiável.
 
***

<a id="ancora3"></a>

# 3 - Acesso à Aplicação e Como Utilizá-la 

### **[Link](https://join.slack.com/t/cinebot/shared_invite/zt-230mdlfty-ZnXD1152TADTj6EGxtvNQg)**

Para utilizar o `CineBot` no `Slack`, basta iniciar uma conversa com ele e selecionar uma das intents disponíveis: "Consultar Filmes" para obter informações sobre filmes em exibição, "Reservar Ingressos" para fazer uma reserva, "Sessões Disponíveis" para consultar as sessões disponíveis ou "Cancelar Reserva" para cancelar uma reserva existente. O `CineBot` guiará você através de diálogos e menu interativo, fornecendo respostas rápidas e informações relevantes para facilitar a sua experiência. -->

<a id="ancora4"></a>

# 4 - Estrutura de Pastas do Projeto

```
.
├── README.md
└── visao-computacional
    ├── controllers
    │   ├── v1Controller.py
    │   └── v2Controller.py
    ├── services
    │   ├── RekognitionService.py
    │   └── S3Service.py
    ├── core
    │   └── config.py
    ├── routes
    │   ├── v1
    |   |    ├── v1_description.py
    │   |    └── v1_vision.py
    |   ├── v2
    |   |    ├── v2_description.py
    │   |    └── v2_vision.py
    │   └── health.py
    ├── requirements.txt
    ├── serverless.yaml
    └── utils.py 

```

***

<a id="ancora5"></a>

# 5 - Arquitetura AWS

  <div align="center">
    <img src = "./assets/ArquiteturaAWS.png">
  </div>



***

<a id="ancora6"></a>
# 6 - Dificuldades conhecidas


<a id="ancora7"></a>
# 7 - Licença

Este projeto está licenciado sob a Licença MIT - consulte o [Link](https://mit-license.org/) para obter mais detalhes.