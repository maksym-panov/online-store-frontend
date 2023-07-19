# Online store (frontend)
ReactJS + Redux Toolkit frontend part for maksym-panov/online-store-backend

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

### 4. Open your browser and go to `localhost:3000`
