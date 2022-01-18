<!-- no toc -->
# GBFS Visualizer
[![Generic badge](https://img.shields.io/badge/Python-3.8.12-blue.svg)](https://www.python.org/downloads/release/python-3812/)
[![Generic badge](https://img.shields.io/badge/NodeJS-16.13.0-green.svg)](https://nodejs.org/ko/blog/release/v16.13.0/)
[![Generic badge](https://img.shields.io/badge/NPM-8.1.3-darkred.svg)](https://libraries.io/npm/npm)
[![Generic badge](https://img.shields.io/badge/MongoDB_Server-4.4-darkgreen.svg)](https://www.mongodb.com/try/download/community)
[![Generic badge](https://img.shields.io/badge/OpenAPI-3.0.1-lightgreen.svg)](https://www.mongodb.com/try/download/community)


- [GBFS Visualizer](#gbfs-visualizer)
  - [1. Introducción](#1-introducción)
  - [2. Software necesario](#2-software-necesario)
  - [3. Servicios a ejecutar](#3-servicios-a-ejecutar)
  - [4. Dependencias a instalar](#4-dependencias-a-instalar)
  - [5. Como arrancar la parte servidora](#5-como-arrancar-la-parte-servidora)
    - [5.1 Primer arranque](#51-primer-arranque)
  - [6. Como acceder a la parte cliente](#6-como-acceder-a-la-parte-cliente)
    - [6.1 Swagger UI](#61-swagger-ui)
    - [6.2 Aplicación](#62-aplicación)

## 1. Introducción
El objetivo principal de este proyecto es centralizar y ofrecer de manera visual la información compartida por los diferentes sistemas GBFS (General Bikeshare Feed Specification), añadiendo la posibilidad de filtrar dicha información proporcionada en base a unas características. Estos sistemas que siguen el estándar GBFS, proporcionan información sobre la empresa, las estaciones de alquiler/aparcado que puede poseer y el estado en tiempo real de dichas estaciones y bicicletas (en caso de ser un sistema que no posee estaciones, es decir, puedes alquilar o devolver una bicicleta en cualquier localización).

Para hacer uso de esta herramienta es necesario iniciar sesión con una cuenta de Google, para eso el servidor OAuth se encargará de hacer las llamadas necesarias a la API OAuth de Google y redirigir al GBFS Visualizer server las peticiones de logeo que sean exitosas.

## 2. Software necesario
- Python >=3.6 &emsp;&emsp;&emsp;&emsp;✅ 3.8.12
- NodeJS >= 10.6 &emsp;&emsp;&emsp;✅ 16.13.0
- NPM >= 6.10.0 &emsp;&emsp;&emsp;&nbsp;✅ 8.1.3
- MongoDB Server 4.4&emsp;&nbsp;✅ 4.4.10
  
✅ Version utilizada por mi.
  
## 3. Servicios a ejecutar
- Inicializar el servidor de MongoDB en el puerto 27017 (default).
- Desde la sección 'API y servicios > [Credentials](https://console.developers.google.com/apis/credentials)' de Google Cloud Platform tenemos que generar 2 nuevas credenciales:
  * Clave de API: Utilizada por el GBFS Visualizer server para hacer uso de la API de Maps [MAPS API KEY].
  * ID de cliente OAuth 2.0: Utilizado por el OAuth server para permitir el OAuth login de Google, en este caso se generarán el ID de cliente [GOOGLE_CLIENT_ID] y el Secreto del cliente [GOOGLE_CLIENT_SECRET]. Al generar esta credencial establecemos las siguientes opciones:
    - Tipo de aplicación: Aplicación web.
    - URI de redireccionamiento autorizado: 'http://127.0.0.1:8080' y 'http://127.0.0.1:9090/auth/google/callback'.
  - Rellenamos el fichero keys.json del directorio raíz con las claves API y Secret generados.
- Finalmente, desde la sección 'Google Maps Platform > [Administrador de mapas](https://console.developers.google.com/google/maps-apis/studio/maps)' tenemos que crear un nuevo ID de mapa para un tipo de mapa JavaScript.


## 4. Dependencias a instalar
Para hacer uso de este proyecto, es necesario instalar varias depencías de las que hacen uso cada uno de los microservicios. Lo recomendable para evitar incidencias con otras dependencias instaladas previamente será crear un nuevo entorno virtual de python. En mi caso, haciendo uso de Anaconda Prompt:
```
$ conda create --name GBFS python=3.8.12
```
Por un lado, para instalar las dependencias del proyecto GBFS Visualizer server implementado en python será necesario activar el entorno creado previamente, ubicarse en el directorio /gbfs_visualizer_server y ejecutar el siguiente comando en un Terminal:

```
conda activate GBFS
cd gbfs_visualizer_server
pip install -r requirements.txt
```
Por otro lado, tras instalar NodedJS y NPM nos ubicaremos en el directorio /OAuth_server y ejecutamos el siguiente comando:
```
npm install
```

## 5. Como arrancar la parte servidora
Para inicializar al completo la parte servidora, tendremos que inicializar cada uno de los microservicios, por un lado nos ubicamos en el directorio /gbfs_visualizer_server y ejecutamos el siguiente comando:
```
python -m openapi_server
```
Por otro lado, ejecutamos el servidor que se encarga del OAuth y hace de Gateway al microservicio GBFS Visualizer server. Nos ubicamos en el directorio /OAuth_server y ejecutamos el comando:
```
node index.js 
```
### 5.1 Primer arranque
En el caso de ser la primera vez que se ejecuta el proyecto, será necesario almacenar en la BD relacionada con los GBFS la información estática de los mismos, como son, los datos del sistema o la información de las estaciones. La información dinámica sobre el estado de las estaciones y las bicicletas sueltas se recupera al instante de la API de cada sistema específico. Primero, será necesario descargar el fichero [gbfs_systems.csv](https://drive.google.com/file/d/1L421afj31Iz9VNmO2DNTBbdwmekCkqMC/view?usp=sharing) y ubicarlo en el directorio **/gbfs_visualizer_server/openapi_server/db/** .Luego, tendremos que ejecutar el script *db_initializer.py* ubicado en **/gbfs_visualizer_server/openapi_server/db/db_initializer.py** con el GBFS Visualizer server en marcha, ya que se hace uso de su API REST para almacenar dichos datos mediante múltiples POST request. Este proceso tarda alrededor de 10 minutos en ejecutarse completamente y almacenar los datos de más de 450 sistemas GBFS (5MB aprox).

Debido a los cambios que pueden surgir dentro de las API de los sistemas GBFS, el db_initializer.py implementado al comienzo del proyecto me ha causado algún problema para cargar los datos de nuevo en la BD, por lo que se adjunta un [backup de la base de datos 'GBFS'](https://drive.google.com/drive/folders/1BDye3Kbf40fhYp5UIcnrJVOCRB9iz4TC?usp=sharing) utilizada por mí y que contiene la informacion de los más de 450 sistemas.

Para realizar un restore de la base de datos solo es necesario ejecutar un comando, por lo que puede ser una opción mucho mejor en comparación con el db_initializer.py, para recuperar el backup de la base de datos, abrimos un Terminal en la carpeta bin del directorio de instalación de MongoDB (C:\Program Files\MongoDB\Server\4.4\bin) y ejecutamos el siguiente comando especificando la carpeta donde hemos descargado el backup:
```
mongorestore --<database name > <folder location>
mongorestore --db GBFS C:\User\Downloads\GBFS
```

## 6. Como acceder a la parte cliente

### 6.1 Swagger UI
Interfaz que proporciona información y el uso de la API REST generada para cada proyecto.
 - GBFS Visualizer server &#8594; [http://127.0.0.1:8080/ui](http://127.0.0.1:8080/ui)
 - OAuth Server &#8594; [http://127.0.0.1:9090/api-docs](http://127.0.0.1:9090/api-docs)

### 6.2 Aplicación
Para proceder a la página principal del proyecto, accedemos a la siguiente ruta una vez inicializados ambos microservicios:
 - Página principal &#8594; [http://127.0.0.1:9090/](http://127.0.0.1:9090/)
  