<h1 align="center"> Avaliação Sprint 4 - Equipe 1 </h1>

A aplicação terá basicamente duas rotas que irão retornar informações vindas de APIs externas  [piadas](https://api.chucknorris.io/jokes/random) e [atividade](https://www.boredapi.com/api/activity).

***

<h2 align="center"> Tecnologias </h2>

***
<p align="center">
<img height="45" src="src/docs/img/nodejs.png">
<img height="45" src="src/docs/img/swagger.png">
<img height="45" src="src/docs/img/axios.png">
<img height="45" src="src/docs/img/aws.png">
<img height="45" src="src/docs/img/github.png">
</p>

* NodeJs - Para consumir as duas API's
* Swagger - Para documentação da API
* Axios - Para auxiliar no consumo da API
* AWS - Para o armazenamento em nuvem
* github - Para auxiliar no controle de versão e envio do projeto

***

<h2 align="center"> Execução (Código Fonte) </h2>

***

### Rota → Get /

1. Nesta rota será efetuado um get na raiz do projeto.

2. O retorno desta API deverá ter um texto simples.

3. Status code para sucesso da requisição será `200`

<p><img width= 100% height=auto src="src/docs/img/home.png"></p>

***
### Rota → Get /api/piadas

1. Nesta rota será efetuado um get em: [https://api.chucknorris.io/jokes/random](https://api.chucknorris.io/jokes/random)

2. O retorno da API a ser desenvolvida deverá estar na seguinte formatação:

```json
{
  "data_atualizacao": "05-01-2020",
  "data_criacao": "05-01-2020",
  "icone": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
  "id": "b7585687-b14b-406d-a557-9cfeea4a8c16",
  "piada": "CHUCK NORRIS can slit your throat with his pinkie toenail.",
  "referencia": "https://api.chucknorris.io/jokes/2itjvbXZTcScUiuAMoOPLA"
}
```
3. Status code para sucesso da requisição será `200`

<p><img width= 100% height=auto src="src/docs/img/jokes.png"></p>

### Endpoint

<p><img width= 100% height=auto  src="src/docs/img/jokes-response.png"></p>

***

### Rota → Get /api/atividades

1. Nesta rota será efetuado um get em: [https://www.boredapi.com/api/activity](https://www.boredapi.com/api/activity)

2. O retorno da API a ser desenvolvida deverá estar na seguinte formatação:

```json
{
  "id": "b7585687-b14b-406d-a557-9cfeea4a8c16",
  "atividade": "Wash your car",
  "tipo": "busywork",
  "participantes": 1,
  "acessibilidade": "15%"
}
```
3. Status code para sucesso da requisição será `200`

<p><img width= 100% height=auto  src="src/docs/img/activity.png"></p>

### Endpoint

<p><img width= 100% height=auto  src="src/docs/img/activity-response.png"></p>

### Rota → Get /api-docs


1. Essa rota é para montar a documentação da API usando Swagger

<p><img width= 100% height=auto  src="src/docs/img/swagger-docs.png"></p>

***
<h2 align="center"> Arquitetura </h2>

***
* ```src```    
    * ``` controllers```
        * ```activityController.js```
        * ```jokesController.js``` 
    * ```docs```  
        * ```img``` 
        * ```swagger.yaml``` 
    * ```models```
        * ```Activity.js```
        * ```Joke.js```       
    * ```routes```
        * ```activityRoutes.js```
        * ```jokesRoutes.js```
    * ```services```
        * ```activityService.js```
        * ```jokesService.js```
    * ```utils```
        * ```helper.js```
    * ```config.js```
    * ```index.js```

***
<h2 align="center"> AWS </h2>

***

### Arquitetura na AWS

<p><img src="src\docs\img\diagramEBaws.png"></p>

***

***
<h2 align="center"> Acessando à aplicação </h2>

***

Utilizando o navegador que você mais gosta, visite o endereço: [http://sprint4-equipe1.us-east-1.elasticbeanstalk.com](http://sprint4-equipe1.us-east-1.elasticbeanstalk.com/)

***

***
<h2 align="center"> Utilização </h2>

***

A aplicação fornecerá dados no formato JSON para as rotas de piadas e atividades. Além disso, você poderá verificar a identificação do grupo por meio da rota inicial. A documentação completa está disponível, permitindo que você consulte a formatação dos dados retornados em cada rota.

1. Consulte o endereço abaixo para obter o nome do grupo:
```bash
    http://sprint4-equipe1.us-east-1.elasticbeanstalk.com/
```
2. Consulte o endereço abaixo para obter o retorno json da rota piadas:
```bash
    http://sprint4-equipe1.us-east-1.elasticbeanstalk.com/api/piadas
```
3. Consulte o endereço abaixo para obter o retorno json da rota atividades:
```bash
    http://sprint4-equipe1.us-east-1.elasticbeanstalk.com/api/atividades
```
4. Consulte o endereço abaixo para obter a documentação:
```bash
    http://sprint4-equipe1.us-east-1.elasticbeanstalk.com/api-docs
```

***

***

<h2 align="center"> Testando localmente a aplicação </h2>

***

### Pré-requisitos

* Ter o [Postman](https://www.postman.com/) instalado
* Conexão com a internet
* Ter o [Git](https://git-scm.com/downloads) instalado
* Possuir o [Npm](https://www.npmjs.com/)

1. Clone este repositório para o seu ambiente local:
```bash
    git clone -b equipe-1 --single-branch https://github.com/Compass-pb-aws-2023-FURG-IFRS-UFFS/sprint-4-pb-aws-furg-ifrs-uffs && cd sprint-4-pb-aws-furg-ifrs-uffs
```

2. Crie o arquivo .env na pasta raiz com o link da api [joke](https://api.chucknorris.io/jokes/random) e da api [activity](https://www.boredapi.com/api/activity)
```json
    PORT=8080
    CHUCKNORRIS_API_URL=link_da_api
    BORED_API_URL=link_da_api
```

3. Instale as dependências da aplicação:
```bash
    npm install
```

4. Execute o seguinte comando no terminal para rodar a aplicação:
```bash
    npm run dev
```

6. Com o Postman aberto, e com o GET seleciona, acesse um dos seguintes links
```bash
    http://localhost:8080/api/atividades
```

```bash
    http://localhost:8080/api/piadas
```

7. E assim o Postman retornará as informações:

<p><img src="src/docs/img/Postman.png"></p>

***

***
<h2 align="center">Como alterar e atualizar o projeto na AWS</h2>

Este repositório contém o código-fonte de uma aplicação que roda na AWS usando o serviço EC2 e Docker. Para fazer alterações na aplicação e atualizá-la na nuvem, siga os passos abaixo:

1. **Faça as alterações no código**<br>
   Primeiro, faça as alterações necessárias no código da aplicação no seu ambiente local.

2. **Comprimir a pasta do projeto**<br>
   Após as alterações, você deve comprimir a pasta do projeto. Lembre-se: a pasta node_modules não deve ser inclusa.

3. **Acesse a aplicação no Elastic BeanStalk**<br>
   Depois de compactar, envie-a para o Amazon Elastic BeanStalk. 
   Basta clicar em "Upload and deploy" e selecionar o arquivo .zip com o projeto atualizado.

    Lembre-se de manter uma coêrencia nas versões por exemplo: projeto-node-v1, projeto-node-v2, etc.

    ![Step 3 screenshot](https://images.tango.us/workflows/6d444cf6-7a3c-4959-b26c-55383834d79f/steps/ac98c95f-721b-409b-8ef3-5cbc8d90b4a6/7e18be39-5928-436a-bcf9-aa2f1ddb5060.png?crop=focalpoint&fit=crop&fp-x=0.5373&fp-y=0.4019&fp-z=1.5703&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=1920%3A902)
4. **Verifique a aplicação**<br>
   Após reiniciar a aplicação, verifique se as alterações foram aplicadas corretamente.

Agora sua aplicação foi atualizada na AWS com as alterações mais recentes!



***
<h2 align="center"> Dificuldades Encontradas </h2>

***
Ficamos muito tempo procurando uma solução para o problema de permissões que surgiu ao subir o Elastic Beanstalk, por padrão o Elastic Beanstalk precisa criar um autoscaling group porém nossas contas de PB não tem essa permissão. 
<p><img src="src/docs/img/errorEB.png"></p>

***
<h2 align="center"> Equipe </h2>

***
 <center> 

 [João Victor Winderfeld](https://github.com/joaowinderfeldbussolotto) - [John Marcel Silveira](https://github.com/JohnMarcelSilveira) -  [Paulo Sergio Nunes](https://github.com/Paulocc) 
 
 </center>
