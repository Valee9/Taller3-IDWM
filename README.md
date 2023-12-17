# Taller3-IDWM

El taller 3 fue desarrollada en:
- Frontend: React native
- Backend: Express - Node JS
- Base de datos: MongoDB

## Requisitos Previos

Asegúrate de tener instalado Node.js en tu máquina

## Clonar o descargar el ZIP del repositorio

## Base de datos

1. **Regístrate en MongoDB Atlas:**

   - Dirígete a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Inicia sesión o sigue el proceso de registro para crear una cuenta.

2. **Crea un Proyecto:**

   - Después de iniciar sesión, crea un nuevo proyecto en la opción "project" que se encunetra en la esquina superior izquierda y luego "new project".
   - Dale un nombre a tu nuevo proyecto y dale siguiente hasta terminar la configuración

3. **Crea una implemetación:**

   - En el dashboard del proyecto, haz clic en "Create".
   - Crea un nombre de ususario y una contraseña que más adelante usarás para la conexión.
   - Selecciona el entorno local.
   - Agrega tu dirección IP actual.
   - Termina de configurar la implementación y presiona "Finish and close".

4. **Conexión:**

   - En el dashboard del proyecto, haz clic en "Connect" para conectar con el proyecto en Visual Studio Code.
   - Selecciona MongoDB for VS Code y sigue los pasos indicados.
   - En el paso 3, copia la cadena de conexión y tendrás algo parecido a esta cadena:
   ```bash
   mongodb+srv://<usuario>:<password>@cluster0.svh2032.mongodb.net/
   ```
   'usuario' Debes reemplazarlo por el nombre de usuario que creaste.
   'password' Debes reemplazarlo por la contraseña de tu usuario
   
   - Asegurate de eliminar los simbolos "<" y ">" al reemplazar los datos.

   - Crea un archivo .env en la carpeta Backend y agrega la cadena de conexión con los datos ya modificados como una variable de nombre: 'MONGO_URL', quedando algo así:
   ```bash
   MONGO_URL= "mongodb+srv://<usuario>:<password>@cluster0.svh2032.mongodb.net/"
   ```

    * En el archivo .env.example del backend está un ejemplo de lo que debe contener el archivo .env

   - Guarda los cambios.

## Backend

1. **Ingresa al directorio 'Backend'**

```bash
   cd Backend
```

2. **Instala las dependencias**

```bash
   npm install
```

3. **En el mismo archvo .env creado anteriormente para la base de datos, proporciona los nuevos valores necesarios que serian PORT y JWT_SECRET (guíate con el archivo .env.example), MONGO_URL ya fue agregada:**
 ```bash
   PORT = 3001
   MONGO_URL = "mongodb+srv://<usuario>:<password>@cluster0.svh2032.mongodb.net/"
   JWT_SECRET= "207845337"
```

   * En el archivo .env.example del backend está un ejemplo de lo que debe contener el archivo .env

   - Guarda los cambios.

4. **Inicia la aplicación**

```bash
   npx nodemon
```

## Frontend

1. **Ingresa al directorio 'Frontend'**

```bash
   cd Frontend
```

2. **Instala las dependencias**

```bash
   npm install
```
   
3. **Inicia la aplicación**

```bash
   npx expo start
```

4. **Para verla en la web**
```bash
   w
```