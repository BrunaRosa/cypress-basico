# Cypress Básico

Esse projeto são aprendizados adquiridos do curso de Cypress Básico 

## Pré requisitos

* Ter uns instalado o Node.js 
* Rodar o `npm install` no terminal, é necessário rodar na pasta raiz do projeto.

> As versões instaladas (Node) no projeto é `v16.13.2` and `8.1.2` of Node.js and npm.Sugiro usar as mesmas versões ou versões anteriores.

## Instalação

1. Rode `npm install` (ou `npm i`) para instalar as dependências do projeto em sua máquina.

## Testes

Você pode simular os testes simulando como desktop ou mobile:

### Desktop

Execute `npm test` (ou `npm t` para a versão curta) para executar o teste no modo headless.

Ou execute `npm run cy:open` para abrir o Cypress via browser.

### Mobile

Execute `npm run test:mobile` para rodar em modo headless

Ou, execute `npm run cy:open:mobile` para rodar via browser.