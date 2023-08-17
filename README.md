## Run Locally

Go to the project directory

```bash
  cd `./project_name`
```


Install dependencies

```bash
  npm install
```

Run docker

```bash
  docker compose up -d
```

Copy environment variables file using example file and fill required values

```bash
CP `.env.example .env`
```

Run Migrations

```bash
 npm run migration
```

Project start

```bash
  start: npm start
  dev: npm run dev
```


Create migration


```bash
 npm run migration:generate ./src/migrations/{migrationName}
```

Revert last migration

```bash
 npm run migration:revert
```
