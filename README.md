<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Project 
Table booking system

## Description

Application as the online table booking system for this restaurant


## Installation

```bash
$ npm install
```

## First step

```bash
# First build the image using the command
$ docker build -t tablebooking .  

# Show images
$ docker images

# Start the container and run the image with this command
$ docker run -d -p 80:3000 --name tablebook tablebooking

# Show container
$ docker ps

# Show Logs container
$ docker logs -f --tail 400 tablebook

# Stop container
$ docker stop tablebook

# Restart container
$ docker restart tablebook

# stops and removes all running containers
$ docker rm -f $(docker ps -aq)

# Test API will display Hello World!
$ http://localhost/api

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## API Working

1. Display a number of tables in the restaurant \
GET localhost:3000/api/table?pagesize=10&page=1 \
Testing npm run test table.controller.spec.ts 

```json
{
    "tables": [
        {
            "name": "Table 0",
            "capacity": 4,
            "isAvailable": true,
            "location": "หลังคาบ้าน",
            "id": "694f4f37-a1e0-4961-847f-320f3bd0916d",
            "active": true,
            "createdAt": "2022-10-21T09:49:21.856Z",
            "updatedAt": "2022-10-21T09:49:21.856Z"
        },
    ],
    "count": 1
}
```

2. Reserve tables in the restaurant \
Body { dateTime: '2022-10-21T09:00:00.000Z', numberCustomers: 4, name: 'somchai', phone: '0883224534' } \
POST localhost:3000/api/reserve \
Testing npm run test reserve.controller.spec.ts 

```json
{
    "message": "Reserve was created",
    "data": [
        {
            "name": "Golang",
            "phone": "0812345678",
            "date": "2022-10-21T10:00:00.000Z",
            "numberCustomers": 4,
            "tableID": "694f4f37-a1e0-4961-847f-320f3bd0916d",
            "id": "0a59c09e-6268-4f98-b288-de835b374083",
            "active": true,
            "createdAt": "2022-10-21T13:13:03.510Z",
            "updatedAt": "2022-10-21T13:13:03.510Z"
        }
    ]
}
```

3. Cancel the reservation \
Param id = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' \
DELETE localhost:3000/api/reserve/cancel/:id \
Testing npm run test reserve.controller.spec.ts 

```json
{
    "message": "Reserve was canceled"
}
```

## API

Restaurant \
  GET localhost:3000/api/restaurant?pagesize=10&page=1 \
  GET localhost:3000/api/restaurant/:id \
  POST localhost:3000/api/restaurant \
  PUT localhost:3000/api/restaurant/:id  \
  DELETE localhost:3000/api/restaurant/:id  

Table \
  GET localhost:3000/api/table?pagesize=10&page=1 \
  GET localhost:3000/api/table/:id \
  POST localhost:3000/api/table \
  PUT localhost:3000/api/table/:id \
  DELETE localhost:3000/api/table/:id 

Reserve \
  GET localhost:3000/api/reserve?pagesize=10&page=1 \
  GET localhost:3000/api/reserve/:id \
  POST localhost:3000/api/reserve \
  PUT localhost:3000/api/reserve/:id \
  DELETE localhost:3000/api/reserve/cancel/:id \
  DELETE localhost:3000/api/reserve/:id 


## Image

 Display online table booking mockup
![image](https://i.ibb.co/j8LXgGD/Screen-Shot-2565-10-20-at-23-35-00.png)




## Support

https://github.com/yutthapichai/Table-booking


## License

App Testing by Yutdev.
