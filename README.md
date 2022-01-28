# teste_pratico_back_end
Queremos poder através da aplicação consultar linhas digitáveis de boleto de título bancário e pagamento de concessionárias, verificando se a mesma é válida ou não. Sendo válida e possuindo valor e/ou data de vencimento ter o retorno desses dados.
 
Para rodar o projeto, é necessário rodar o comando

npm install

, instalar o banco de dados Postgres 12.9 e instalar as dependências com os seguintes comandos:

npm i -D eslint
npm i -D -E jest@23.6.0
npm i -D supertest

npm i -S body-parser
npm i -S consign
npm i -S express
npm i -S knex
npm i -S knex-logger
npm i -S moment-timezone
npm i -S pg

Após, configurar Postgres com (user: 'postgres'), (password: 'senha'), (porta: '5432') criar database 'teste_pratico_backend' no pgadmin3.

Com a database criada, é necessário gerar uma migração com o knex com o comando:

node_modules/.bin/knex migrate:make create_table_boletos --env test

Com a migração criada, copiar o código de exports.up e exports.down da migração já existente e rodar o seguinte comando:

node_modules/.bin/knex migrate:latest --env test

Para subir o servidor rode:

npm start

Logo após, é necessário rodar os testes com o jest, para subir um boleto de exemplo para o banco de dados, nesse caso se usa o comando:

npm test

Para conferir a linha digitável convertida em informações do boleto, acesse:

localhost:8080/boleto

A lógica de manipulação do boleto e validação do boleto se encontra em src/routes/boletos.js



As dependências supertest e jest são utilizadas para os testes, alguns ainda devem ser implementados, os que já estão implementados são os testes de inserir e listar os boletos do banco, e se o servidor está funcionando.

O Knex e Knex-logger são utlizados para comunicação com o banco de dados.

O express e o consign para manipulação de rotas.

O pg é o plugin do Postgres.

O body-parser é necessário para trabalhar com as requisições.

O moment-timezone para manipulação de datas.


 
 
