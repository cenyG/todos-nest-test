## Description
CRUD - todos

## Docker for mysql
```bash
docker run --name mysql \
            -e MYSQL_ROOT_PASSWORD=root \
            -e MYSQL_DATABASE=dev \
            -p 3306:3306 \
            -d mysql:latest \
            --character-set-server=utf8mb4 \
            --collation-server=utf8mb4_unicode_ci
```

## Installation

```bash
$ npm install
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

## Test

```bash
# unit tests
$ npm run test
```

