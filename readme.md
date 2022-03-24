### Description 🧩

This is an **GraphQl API** that allow me to test my knowledge about
**GraphQl** and **PRISMA**.
I also implement all the authentication process and plan to implement caching process.

![Made By JoeDaltonGeekVersion](/assets/graphql.jpg)
![docker](/assets/docker.png) ![nodejs](/assets/nodejs.png) ![prisma](/assets/Prisma.png)
![postgre](/assets//postgre.png)

# Run the project ✅

-You need to install docker-compose, you can do it via this link [Install docker-compose](https://docs.docker.com/compose/install/)

-after install prisma version 1.12.3 [Prisma 1 Docs](https://v1.prisma.io/docs/1.34)

```sh
npm install -g prisma@1.12.3
```

- after that type `cd prisma-graphql` and create in the main folder a `.env` file and fill in these fields

```env

db_connector = postgres
db_host =
db_port=
db_name=
db_user=
db_password=

```

after run those command

```sh
 npm install
 cd prisma
 docker-compose --env-file ../.env  up -d
 prisma deploy
 cd..
 npm run dev
```
