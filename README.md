# ENTREGA DEL PROYECTO FINAL

## Variables de entorno
Antes de instalar y correr el programa se debe configurar las variables de entorno.
Realizar una copia del archivo `.env template`, cambiandole el nombre a `.env`
- `PORT`= El puerto que usará el frontend. Recomendado: `8080`
- `API_PREFIX` = El prefijo para las rutas de la API. Recomendado: `api`
- `DB_NAME` = El nombre de la base de datos. Recomendado: `ecommerce`
- `DB_HOST` = El host donde se encuentra la base de datos. Recomendado: `localhost`
- `DB_PORT` = El puerto donde se encuentra la base de datos. Recomendado: `27017`
- `MONGO_URI` = La URI completa de conexión a MongoDB. Ejemplo: `mongodb+srv://user:password@codercluster.2ms9a6h.mongodb.net/`
- `SECRET_SESSION` = La clave secreta para las sesiones de usuario. Ejemplo: `your_secret_session_key`
- `GITHUB_CLIENT_ID` = El ID del cliente de GitHub para autenticación OAuth. Ejemplo: `your_github_client_id`
- `GITHUB_CLIENT_SECRET` = El secreto del cliente de GitHub para autenticación OAuth. Ejemplo: `your_github_client_secret`
- `SECRET_JWT` = La clave secreta para la generación de tokens JWT. Ejemplo: `your_jwt_secret_key`
- `GOOGLE_EMAIL` = El email con el que se registran las credenciales de Google. Ejemplo: `your_google_email`
- `GOOGLE_PSW` = La contraseña con la que se registran las credenciales de Google. Ejemplo: `your_google_credential_psw`
- `TIME_EXPIRE_JWT_SESSION` = Tiempo de expiración del token JWT para la sesión. Ejemplo: `30m`
- `TIME_EXPIRE_JWT_CHANGE_PSW` = Tiempo de expiración del token JWT para el cambio de contraseña. Ejemplo: `60m`


## Comandos
#### Para correr docker:
```
docker-compose up
```
#### Para instalar las dependencias:
```
npm install
```

#### Para correr el proyecto:
```
npm run start:dev
```
```
npm run start:prod
```

#### Para correr las pruebas:
```
npm run test
```

## Link Deploy Railway
[Supermarket](https://backend-nodejs-entrega-final-production.up.railway.app/)

#### Administrador Ecommerce
Correo: adminCoder@coder.com
Contraseña: admin

## Rutas

| METHOD                | ROUTE                                            |
|-----------------------|--------------------------------------------------|
| GET                   | /api                                             |
| GET                   | /api/products/insertion                          |
| GET                   | /api/products/mockingproducts                    |
| GET POST              | /api/products                                    |
| GET DELETE PUT        | /api/products/:pid                               |
| POST                  | /api/carts                                       |
| GET DELETE PUT        | /api/carts/:cid                                  |
| POST DELETE PUT       | /api/carts/:cid/product/:pid                     |
| POST                  | /api/carts/:cid/purchase                         |
| GET                   | /                                                |
| GET                   | /realTimeProducts                                |
| GET                   | /chat                                            |
| GET                   | /products                                        |
| GET                   | /carts/:cid                                      |
| GET POST              | /register                                        |
| GET                   | /failregister                                    |
| GET POST              | /login                                           |
| GET                   | /faillogin                                       |
| GET                   | /profile                                         |
| GET                   | /changePsw                                       |
| GET                   | /changePswMail                                   |
| GET                   | /justAdmin                                       |
| GET                   | /api/session/logout                              |
| POST                  | /api/session/login                               |
| POST                  | /api/session/register                            |
| POST                  | /api/session/changePsw                           |
| POST                  | /api/session/changePswMail                       |
| GET                   | /api/session/github                              |
| GET                   | /api/session/github/callback                     |
| GET                   | /api/session/current                             |
| GET                   | /api/session                                     |
| DELETE POST           | /api/session/:email                              |
| DELETE                | /api/session/users/:time                         |
| GET                   | /api/loggerTest/error                            |
| GET                   | /api/loggerTest/warning                          |
| GET                   | /api/loggerTest/info                             |
| GET                   | /api/loggerTest/http                             |
| GET                   | /api/loggerTest/debug                            |