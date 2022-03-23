### Description

this is a blog graphql api that allow me to test my knowledge about
graphql and prisma.

# Run the project

Setup your env variable

```env

db_connector = postgres
db_host =
db_port=
db_name=
db_user=
db_password=

```

Install dokcer-compose via this link [Install docker-compose](https://docs.docker.com/compose/install/)

after install prisma version 1.12.3

```sh
npm install -g prisma@1.12.3
```

after run those command

```sh
 cd prisma-graphql
 npm install
 cd prisma
 docker-compose --env-file ../.env  up -d
 prisma deploy
 cd..
 npm run dev
```
