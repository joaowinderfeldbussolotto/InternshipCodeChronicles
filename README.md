# Avaliação da Sprint 2 - Equipe 1 - XKCD GIFter

## Integrantes da Equipe
- Luiz Paulo Grafetti Terres
- João Victor Winderfeld Bussolotto
- Luiz Augusto Scarsi
- Angemydelson Saint-Bert

## Descrição
Esta é uma aplicação web simples que permite o usuário visualizar uma tirinha do XKCD e também exibe três gifs relacionados ao título da tirinha.

## APIs Utilizadas [any-api.com]
- API [xkcd](https://any-api.com/xkcd_com/xkcd_com/docs/API_Description): Webcomic of romance, sarcasm, math, and language.
- API [giphy](https://any-api.com/giphy_com/giphy_com/docs/API_Description): GIPHY, the first and largest GIF search engine

## Tecnologias
- HTML5
- CSS3
- Bootstrap
- Handlebars
- JavaScript
- Node.js
- Express
- Axios

## Instruções para clonar:
Clone esta branch do repositório:
```bash
git clone -b equipe-1 --single-branch https://github.com/Compass-pb-aws-2023-FURG-IFRS-UFFS/sprint-2-pb-aws-furg-ifrs-uffs && cd sprint-2-pb-aws-furg-ifrs-uffs
```

## Como utilizar a aplicação
- Realizar o clone
- Instalar dependências da aplicação: ```npm install```
- Dentro da pasta ```src```, executar ```npm run dev```
- Acessar ```localhost:3000``` no navegador

## Pré-requisitos
- Navegador web atualizado
- Conexão com a internet

## Arquitetura
* ```src```
    * ```models```
        * ```Comic.js```
        * ```Gif.js```
        * ```MediaItem.js```
    * ```views```
        * ```layouts```
            * ```main.handlebars```
        * ```index.handlebars```
    * ```index.js```

## Dificuldades encontradas
- Distribuição das atividades de forma equivalente e dinâmica
- Manter o código limpo e organizado durante o trabalho em equipe
- Organizar e utilizar branches eficientemente
