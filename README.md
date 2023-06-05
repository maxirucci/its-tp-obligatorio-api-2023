# SISTEMA DE GESTIÓN ESCOLAR
API que permite interactuar con estudiantes, profesores y curso.

<br>

## Requerimientos
Son requeridas las siguientes instalaciones:
- Docker
- Node JS

<br>

## Ejecución en un entorno de desarrollo

- Instalación de dependencias:
  ```bash
  npm install
  ```
  
- Ejecución del contenedor para la base de datos MySQL:
  ```bash
  docker-compose up -d
  ```

- Correr el archivo semilla `seed.sql` ubicado en /src para crear el baseline de la base de datos.

- Crear y configurar el archivo `.env`
  ```bash
  nano .env
  ```
 
  ```txt
  PORT=3000
  MYSQL_DB=tp-obligatorio
  MYSQL_USERNAME=root
  MYSQL_PASS=123456
  MYSQL_HOST=127.0.0.1
  ```
 
 - Ejecutar el servidor
   ```bash
   npm run dev
   ```
<br>

## Ruta de pruebas
La API cuenta con una ruta de prueba `{{url}}/api/1.0/ping` para verificar el correcto funcionamiento del servidor.

<br>

## Documentación
En la [documentación](https://documenter.getpostman.com/view/13033821/2s93m8zfoU) se pueden encontrar los endpoints disponibles y el uso de cada uno de ellos.
