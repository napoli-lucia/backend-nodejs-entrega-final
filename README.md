# ENTREGA DEL PROYECTO FINAL

Desde el router de /api/users, crear rutas:

✓ GET / deberá obtener todos los usuarios, éste sólo debe devolver los datos principales como
nombre, correo, tipo de cuenta (rol)

✓ DELETE / deberá limpiar a todos los usuarios que no hayan tenido conexión en los últimos 2
días. (puedes hacer pruebas con los últimos 30 minutos, por ejemplo). Deberá enviarse un
correo indicando al usuario que su cuenta ha sido eliminada por inactividad

Crear una vista para poder visualizar, modificar el rol y eliminar un usuario. Esta vista únicamente será
accesible para el administrador del ecommerce

Modificar el endpoint que elimina productos, para que, en caso de que el producto pertenezca a un usuario
premium, le envíe un correo indicándole que el producto fue eliminado.

Finalizar las vistas pendientes para la realización de flujo completo de compra. NO ES NECESARIO tener una
estructura específica de vistas, sólo las que tú consideres necesarias para poder llevar a cabo el proceso de compra.

No es necesario desarrollar vistas para módulos que no influyan en el proceso de compra (Como vistas de usuarios
premium para crear productos, o vistas de panel de admin para updates de productos, etc)

Realizar el despliegue de tu aplicativo en la plataforma de tu elección (Preferentemente Railway.app, pues es la
abarcada en el curso) y corroborar que se puede llevar a cabo un proceso de compra completo.

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
