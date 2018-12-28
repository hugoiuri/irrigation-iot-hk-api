# irrigation measurements api

Esta é uma simples implementação em Node.js de uma API para receber medições de equipamentos IOT. Neste projeto foi utilizado [restify](http://restify.com/) e [mongodb](http://mongodb.github.io/node-mongodb-native/3.1/) com o objetivo de simplificar ao máximo a integração com a interface mobile;

## API

### POST /measurements

Salva uma medição.

Exemplo do body:
```json
{ 
    "type": "humidity",
    "value": 556
}
```

### GET /measurements/:top

Retorna a quantidade especificada das ultimas medições

Exemplo de retorno: 
```json
[
    {
        "_id": "5c2566d79b15e20004a96a31",
        "type": "humidity",
        "value": 550,
        "datetime": "2018-12-27T23:57:11.216Z"
    },
    {
        "_id": "5c25669b9b15e20004a96a30",
        "type": "humidity",
        "value": 551,
        "datetime": "2018-12-27T23:56:11.123Z"
    }
]
```

### GET /measurements/greater

Retorna a maior e mais recente medição

Exemplo de retorno:
```json
{
    "_id": "5c256f2993f7f5336a87ad73",
    "type": "humidity",
    "value": 900,
    "datetime": "2018-12-28T00:32:41.178Z"
}
```

## Instalação e execução da aplicação

Este projeto foi desenvolvido utilizando as seguintes tecnologias:
- **Node.js** - **10.14.2**
- **npm** - **6.4.1**
- **Docker** - **18.09**
- **Mongo DB** - **4.0.4**

### Preparando banco de dados

Execute o comando:
``` sh
docker run --name mongo4 -d -p 27017:27017 mongo:4.0.4

```

### Preparando a aplicação

Execute o comando:
``` sh
npm install
```

### Execução

Execute o comando:
``` sh
npm start
```

## Configurações

- **PORT**: Porta na qual o servidor web ficará disponível (valor default: 8080);
- **DATABASE_URL**: Url de conexão com o MongoDB;
- **DATABASE_NAME**: Nome do banco de dados;

## Stack

Para a criação deste projeto foram utilizdas as seguintes tecnologias e frameworks:

- [Node.js] - Plataforma de desenvolvimento
- [restify] - Web framework minimalista desenvolvido em node.js
- [Docker] - Plataforma de deploy
- [MongoDb] - Banco de dados Relacional

## Licença
[MIT](LICENSE)

## Autor
[Hugo Iuri](https://github.com/hugoiuri)
[Karine Cordeiro](https://github.com/kpazfagundes)


[Node.js]: <https://nodejs.org>
[restify]: <http://restify.com/>
[Docker]: <https://www.docker.com/>
[MongoDB]: <http://mongodb.github.io/node-mongodb-native/3.1/>