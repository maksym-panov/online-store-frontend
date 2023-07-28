# Online store (frontend)
ReactJS + Redux Toolkit frontend part for maksym-panov/online-store-backend

## Start with Docker

Use following commands in this exact order to start database, backend and frontend of the application.

1. Pull database image from registry.
```
docker pull maksympanov/store-persistence:alpine
```
2. Run database container.
```
docker run -d -p 5332:5432 --name Persistence maksympanov/store-persistence:alpine
```

3. Pull backend image from registry.
```
docker pull maksympanov/store-backend:latest
```

4. Run backend container.
```
docker run -d -p 8080:8080 --name Backend maksympanov/store-backend:latest
```

5. Pull frontend image from registry.
```
docker pull maksympanov/store-frontend:alpine
```

6. Run frontend container.
```
docker run -d -p 3000:3000 --name Frontend maksympanov/store-frontend:alpine
```

## Start on your local machine

You should already have NodeJS installed on your machine ([Download from official site](https://nodejs.org/en)).
Also should already have installed, built and deployed backend side of the application ([Backend](https://github.com/maksym-panov/online-store-backend))

### 1. Clone the repository
```
git clone https://github.com/maksym-panov/online-store-frontend
```

### 2. Change the IP-address of the server in `online-store-frontend/src/utils/constants.js`

Example (if you use 8080 as a port for running a backend)

```
export const API_BASE_URL = "http://192.168.0.XXX:8080/api/v2";
```

### 3. Start the application
```
  cd online-store-frontend
  npm i
  npm start
```

### 4. Open website

Open your browser and go to `http://localhost:3000` or `http://localhost:3000/manager` (only for authorized users with Manager or Administrator role) to start interacting with the application.

### Initial users

If you seeded the database with initial data then you have access to 5 accounts:
| User ID | Name            | Role          | Phone number | Password |
|---------|-----------------|---------------|--------------|----------|
| 1       | Marcus Aurelius | USER          | 0964261301   | 11111111 |
| 2       | Vesta           | USER          | 0673291411   | 22222222 |
| 3       | Arno            | USER          | 0505005713   | 33333333 |
| 4       | Valeriia        | MANAGER       | 0994824581   | 44444444 |
| 5       | Admin           | ADMINISTRATOR | 0505050055   | 55555555 |
