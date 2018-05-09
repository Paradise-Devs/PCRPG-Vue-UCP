<p align="center">
    <img src="https://forum.pc-rpg.com.br/assets/favicon-pblwsrgt.png"/>
</p>
<p align="center">
    <img src="https://img.shields.io/badge/VueJS-2.5.9-brightgreen.svg"/>
</p>

![Build Status](http://206.189.200.66:8080/buildStatus/icon?job=pcrpg-site-dev) DEV

![Build Status](http://206.189.200.66:8080/buildStatus/icon?job=pcrpg-site-prod) PROD

# Paradise City RPG - Web

Esse projeto trata-se do site do PC:RPG, desenvolvido com VueCLI.

## O projeto

Outros repositórios referente a este projeto:

- [pc-rpg/rage](https://gitlab.com/pc-rpg/rage): Server - RageMP
- [pc-rpg/rage-ws](https://gitlab.com/pc-rpg/rage-ws): Webservice

## Tecnologias/Técnicas

Esse projeto utiliza as seguintes tecnologias para dev:

- SASS (Block Element Modifier arch)
- Compass
- VueJS
- Javascript Vanilla

## Ambiente de desenvolvimento

Para iniciar esse projeto em development enviroment, é necessário fazer o download do repositório, abri-lo através do terminal e executar a seguinte sequência de comandos:

Instalar dependências do node com
```
npm install
```

Iniciar o npm scripts
```
npm run dev
```

## Ambiente de produção

Para compilarmos o projeto e enviarmos para produção, execute ```npm run build```.

Será criado um diretório chamado ```dist/```, jogue-o no server http.