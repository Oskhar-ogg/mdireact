# **MDIREACT/MDIAPP - PROYECTO DE TÍTULO UNIVERSIDAD DEL BIO-BÍO**

Aplicación para dispositivos móviles Android desarrollada para la pyme MDI Biobío de la comuna de Talcahuano
![](https://raw.githubusercontent.com/expo/expo/main/.github/resources/banner.png)
Los archivos se encuentran en el branch "APK"
## **Software stack**
El proyecto "MDIREACT" es una aplicación móvil que corre sobre el siguiente software:

- Ubuntu 22.04
- NodeJS 18.19.0
- ExpressJS 4.18.2
- React Native 0.72.6
- Expo SDK 49
- MySQL
- Android Studio Giraffe  2022.3.1 / Solo para equipo virtual android
- Visual Studio Code 1.85.1

## **Configuraciones de Ejecución para Entorno de Desarrollo/Produccción**

Para conectar el servicio BackEnd de la aplicación, debes contar con una máquina virtual o servidor con sistema operativo Ubuntu 22.04 y una base de datos MySQL para que el cliente funcione correctamente. 

### Clonación del repositorio
- Para poder clonar el repositorio, se debe ejecutar uno de los siguientes comandos en el terminal de preferencia.

**En caso de clonación vía https:**
```bash
git clone https://github.com/Oskhar-ogg/mdireact.git
```
**En caso de clonación vía ssh:**
```bash
git clone git@github.com:Oskhar-ogg/mdireact.git
```
**Acceso al BackEnd:**

- Primero se debe acceder a la carpeta recién clonada del repositorio

```bash
cd mdireact/
```
- Acceder a la carpeta del BackEnd

```bash
cd mdireact-backend/
```


### Variables de entorno
- Se debe generar un archivo .env en la carpeta backend, el cual debe contener las siguientes variables de entorno:

**Backend:**
```.env
PORT=3001
DB_USER = 'usuario base de datos'
DB_PASSWORD = 'contraseña base de datos'
DB_HOST = 'URL de la base de datos'
DB_NAME= 'nombre de la base de datos'
DB_PORT = 'en caso de no utilizar puerto por defecto 3306'
``` 
### Iniciar el servicio.

Para que el BackEnd se inicialice correctamente se deben seguir los siguientes pasos.

```bash
npm install
```
```bash
npm run dev
```
Si desde la consola se recibe el siguiente mensaje:
```bash
[nodemon] starting `node src/app.js`
Puerto levantado y trabajando =>> 3001
```
el servicio ha sido levantado con éxito.


### FRONTEND / CLIENTE MÓVIL
Para acceder a la carpeta del FrontEnd, una vez clonado el repositorio se debe acceder con 
```bash
cd mdireact/
```
El equipo de desarrollo local debe tener los siguientes programas instalados

- [NodeJS](https://nodejs.org/en)
- [Visual Studio Code](https://code.visualstudio.com) / Editor de código de preferencia
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Android Studio](https://developer.android.com/studio?hl=es-419)



Para un correcto funcionamiento del cliente durante el desarrollo se debe crear un archivo .env

```.env
//CONEXION SERVIDOR API
EXPO_PUBLIC_API_URL = URL SERVICIO WEB 
EXPO_PUBLIC_API_DEV_URL = URL DEL SERVICIO EXPO EN COMUTADORA LOCAL

//CREDENCIALES DE FIREBASE PARA CONTROL DE USUARIO 
EXPO_PUBLIC_FIREBASE_API_KEY = "CLAVE ENTREGADA POR FIREBASE CONFIG"
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN = "CLAVE ENTREGADA POR FIREBASE CONFIG"
EXPO_PUBLIC_FIREBASE_PROJECT_ID = "CLAVE ENTREGADA POR FIREBASE CONFIG"
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET = "CLAVE ENTREGADA POR FIREBASE CONFIG"
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "CLAVE ENTREGADA POR FIREBASE CONFIG"
EXPO_PUBLIC_FIREBASE_APP_ID = "CLAVE ENTREGADA POR FIREBASE CONFIG"

//CREDENCIAL GOOGLEMAPS PARA FUNCIONAMIENTO DE GEODECODING
EXPO_PUBLIC_MAPS_KEY_API = "CLAVE ENTREGADA POR MAPS GOOGLE"
```
- Para la variable `EXPO_PUBLIC_API_URL`, se debe ingresar la URL del servidor de BackEnd.
- Para la variable  `EXPO_PUBLIC_API_DEV_URL`, se debe ingresar la URL generado por Expo hacia el ambiente local del BackEnd

Estas misma credenciales deben ser replicadas en `EAS.JSON` de la siguiente forma

```bash
},
      "env": {
        "EXPO_PUBLIC_API_URL" : "URL SERVICIO WEB",
        "EXPO_PUBLIC_API_DEV_URL" : "URL SERVICIO LOCAL",
        "EXPO_PUBLIC_FIREBASE_API_KEY" : "CLAVE ENTREGADA POR FIREBASE CONFIG",
        "EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN" : "CLAVE ENTREGADA POR FIREBASE CONFIG",
        "EXPO_PUBLIC_FIREBASE_PROJECT_ID" : "CLAVE ENTREGADA POR FIREBASE CONFIG",
        "EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET" : "CLAVE ENTREGADA POR FIREBASE CONFIG",
        "EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID" : "CLAVE ENTREGADA POR FIREBASE CONFIG",
        "EXPO_PUBLIC_FIREBASE_APP_ID" : "CLAVE ENTREGADA POR FIREBASE CONFIG",
        "EXPO_PUBLIC_MAPS_KEY_API" : "CLAVE ENTREGADA POR MAPS GOOGLE"

      }
    },
    "production": {
      "env": {
        "EXPO_PUBLIC_API_URL" : "URL SERVICO WEB",
        "EXPO_PUBLIC_API_DEV_URL" : "URL SERVICIO LOCAL",
        "EXPO_PUBLIC_FIREBASE_API_KEY" : "CLAVE ENTREGADA POR FIREBASE CONFIG",
        "EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN" : "CLAVE ENTREGADA POR FIREBASE CONFIG",
        "EXPO_PUBLIC_FIREBASE_PROJECT_ID" : "CLAVE ENTREGADA POR FIREBASE CONFIG",
        "EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET" : "CLAVE ENTREGADA POR FIREBASE CONFIG",
        "EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID" : "CLAVE ENTREGADA POR FIREBASE CONFIG",
        "EXPO_PUBLIC_FIREBASE_APP_ID" : "CLAVE ENTREGADA POR FIREBASE CONFIG",
        "EXPO_PUBLIC_MAPS_KEY_API" : "CLAVE ENTREGADA POR MAPS GOOGLE"
      }
    },
```
Una vez configurado este archivo se debe utilizar el gestor de paquetería yarn.

```bash
yarn install
```
Terminada la instalación de `package.json` con yarn, ya puedes utilizar los comandos propios de Expo para el levantamiento del servidor local y desarrollar el programa, por ejemplo con 

```bash
npx expo run:android
```
Te genera un apk que se instalará en el terminal virtual o físico.
Si el terminal de destino resulta ser físico, antes de poder hacer el proceso, debes tener activado las opciones de desarrollador y activar las opciones de depuración USB e Instalar vía USB.

Si no sabes como realizar estos pasos, puedes revisar [aquí](https://www.xatakandroid.com/tutoriales/como-activar-opciones-desarrollador-android-sirve)  

Para ejecutar el proyecto, debemos lograr descargar la aplicación de expo, para esto es necesario tener una cuenta en `Expo Go`, la cual se puede crear con cualquier correo, y realizar los siguientes comandos:
```bash
npx expo build:android
```
Esto para comenzar con la construcción de la aplicación, sin embargo debemos seleccionar un par de cosas

- La consola mostrará un mensaje tipo `Choose your build type`
- Con las flechas del teclado debemos seleccionar `> apk`
- Luego la aplicación pedirá una cuenta expo, la cual puede ser obtenida a través del siguiente link: https://expo.dev
- Finalmente nos pedira seleccionar entre `Generate new keystore` y `I want to upload own file`, por lo que se debe seleccionar la primera opción: `Generate new keystore`.

Luego de seguir los pasos anteriores, se comenzará a construir la APK, cosa que puede tardar de 10 a 20 minutos, para luego generarse un link que se debe abrir en un navegador para descargar el archivo `.apk` a instalar en un teléfono celular o en un emulador de teléfono móvil.

### Solución de posibles errores y añadir funciones

Si la aplicación tiene problemas con la conexión de datos por trabajar en un entorno http y no https, se deberá modificar el `AndoridManifest.xml` que se encuentra en la siguiente carpeta.
`android\app\src\main\AndroidManifest.xml` y modificar los permisos de la aplicación generada.

```bash
<uses-permission android:name="android.permission.INTERNET"/>
<application android:usesCleartextTraffic="true">
```
Si necesitas agregar mas funciones de Expo para la aplicación, y necesita confirmar permisos del usuario en el teléfono, se debe modificar el archivo `app.json`, de la siguiente forma

```bash
"plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you share them with your friends.",
          "cameraPermission": "The app accesses your camera so you can take awesome pictures."
        }
      ],
      [
        "expo-av",
        {
          "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone."
        }
      ]
    ],
```

## **Construido con**

- [ReactNative](https://reactnative.dev) - Framework Javascript para manejo de logica funcional de Frontend
- [Express](https://expressjs.com/es/) - Framework utilizado para creación de backend con API RESTFUL
- [Multer](https://www.npmjs.com/package/multer) - Libreria para gestionar subida de archivos en backend

- [NPM](https://docs.npmjs.com) - Administrador de dependencias
- [YARN](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) - Administrador de dependencias
- [dotenv](https://www.npmjs.com/package/dotenv) - Libreria de lectura de archivos .env
- [cors](https://www.npmjs.com/package/cors) - Libreria de control de acceso
- [Axios](https://axios-http.com/docs/intro) - Libreria de consultas con protocolo http y https
- [fs](https://nodejs.org/api/fs.html) - Administrador de archivos en sistema para NodeJS
- [React-Native-vector-icons](https://oblador.github.io/react-native-vector-icons/) - Libreria de iconos como componentes de React Native

- [Nodemon](https://nodemon.io/) - Monitoreador de cambios
- [Github](https://github.com) - Almacenador de control de versiones
- [Git](https://github.com) - Sistema de control de versiones

## **Desarrollador del proyecto**
- Oscar Caro Carrasco (oscar.caro1601@alumnos.ubiobio.cl)
