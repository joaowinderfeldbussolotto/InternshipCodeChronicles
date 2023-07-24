# Avaliação da Sprint 2 - Equipe 1 - Stoic Quote

## Integrantes da Equipe
- Luiz Paulo Grafetti Terres
- João Victor Winderfeld Bussolotto
- Luiz Augusto Scarsi
- Angemydelson Saint-Bert

## Descrição
Esta é uma aplicação web simples que permite o usuário visualizar uma frase estóica, além de uma imagem e breve descrição do filósofo autor da frase. Pesquise mais sobre o [Estoicismo na Wikipedia](https://pt.wikipedia.org/wiki/Estoicismo)

## APIs Utilizadas
- API [Stoic](https://stoic-api.vercel.app/): Retorna uma frase da corrente de pensamento estóica, e seu autor e fonte.
- API [Wikimedia](https://www.mediawiki.org/wiki/API:Main_page): Permite acessar contrúedos de páginas da Wikipedia.

## Tecnologias
```
├── HTML 5
├── Bootstrap
├── Javascript
├── Node.js
│   ├── Axios
│   ├── Express
│   │   └── + Handlebars
│   └── Path
└── Docker
```

## Organização de Pastas e Arquivos do Projeto
```
.
├── models
│   ├── Quote.js
│   └── WikiInfo.js
├── views
│   ├── layouts
│   │   └── main.handlebars
│   └── index.handlebars
├── controllers
│   ├── quoteController.js
│   └── wikiInfoController.js
├── routes
│   └── quotePlusWiki.js
├── index.js
├── Dockerfile
├── package-lock.json
├── package.json
└── README.md
```

## Deploy do projeto em Cloud na AWS
### Arquitetura na AWS
  !! imagem aqui

## Como utilizar essa aplicação:
O site pode ser acessado com seu navegagor padrão usando [este link](http://54.147.19.114:3000/quote)
  
  !! imagem aqui

## Como testar localmente essa aplicação: [devs] 
### Pré-requisitos
- Navegador web.
- Conexão com a internet.
- [Git](https://git-scm.com/downloads): ferramenta para gerenciamento de configuração.
- [Npm](https://www.npmjs.com/): gerenciador de pacotes.


Clone esta branch do repositório:
```bash
git clone -b equipe-1 --single-branch https://github.com/Compass-pb-aws-2023-FURG-IFRS-UFFS/sprint-2-pb-aws-furg-ifrs-uffs && cd sprint-2-pb-aws-furg-ifrs-uffs
```
Instale as dependências da aplicação: 
```
npm install
```
Execute o script para rodar a aplicação com [Nodemon](https://www.npmjs.com/package/nodemon)
```
npm run dev
```
Agora basta acessar a porta ```3000``` do seu localhost no navegador:
```
localhost:3000
```

## Dificuldades encontradas