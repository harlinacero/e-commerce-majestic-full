# E-Commerce Majestic

Este proyecto es una aplicación de backend para un sistema de comercio electrónico, construida con Go y MySQL. La aplicación está configurada para ejecutarse en contenedores Docker.

## Estructura del Proyecto

- `docker-compose.yml`: Archivo de configuración de Docker Compose para definir y ejecutar los servicios de la aplicación.
- `e-commerce-majestic-db/mysqldata/`: Directorio para almacenar los datos de MySQL.
- `e-commerce-majestic-backend/`: Directorio que contiene el código fuente de la aplicación Go.
- `e-commerce-majestic-front/`: Directorio que contiene el código fuente de la aplicación Angular

## Requisitos

- Docker y Docker Compose instalados en tu máquina.
- MySQL instalado si se desea ejecutar la base de datos sin Docker.
- Go instalado si se desea ejecutar la aplicación sin Docker.
- Angular 16 instalado si se desea ejecutar la aplicación sin docker

## Ejecución con Docker

1. Clona el repositorio:

    ```sh
    git clone https://github.com/tu-usuario/e-commerce-majestic.git
    cd e-commerce-majestic
    ```

2. Construye y levanta los contenedores:

    ```sh
    docker compose up --build
    ```

3. La aplicación Go estará disponible en el contenedor `e-commerce-majestic-backend`, la aplicación Angular estará disponible en el contenedor `e-commerce-majestic-front` y la base de datos MySQL en el contenedor `e-commerce-majestic-db`.

## Ejecución sin Docker

1. Clona el repositorio:

    ```sh
    git clone https://github.com/tu-usuario/e-commerce-majestic.git
    cd e-commerce-majestic
    ```

2. Configura la base de datos MySQL:

    - Instala MySQL si no lo tienes instalado.
    - Crea una base de datos llamada `majesticdb`.
    - Crea un usuario `harlin` con contraseña `1234` y dale permisos a la base de datos `majesticdb`.

3. Configura las variables de entorno para la aplicación Go:

    ```sh
    export DB_HOST=localhost
    export DB_PORT=3306
    export DB_USER=harlin
    export DB_PASSWORD=1234
    export DB_NAME=majesticdb
    ```

4. Ejecuta la aplicación Go:

    ```sh
    cd e-commerce-majestic-backend
    go run main.go
    ```

# Login
Para ingresar a la aplicación es necesario ingresar usuario y contraseña

## Error: Usuario no encontrado
 
## Registro de nuevo usuario
Si el usuario no está registrado en la plataforma, puede registrarse desde el login, por defecto, se le asigna el rol de comprador.
 
 
## Login correcto
 ![alt text](image.png)
# Módulo de Usuarios
Contiene la lista de usuarios registrados, permite agregar, editar o eliminar usuarios.
## Usuarios Registrados
 
## Agregar / Editar usuario
Se pueden crear nuevos usuarios desde este módulo y se permite la edición de usuarios para modificar el nombre de usuario, avatar, correo electrónico, perfil, etc.
 
# Inventario de Productos
Se listan los productos registrados, además se permite agregar, editar y modificar productos.
 
## Agregar / Editar Productos
Se pueden crear nuevos productos o modificar un producto existente mediante el formulario correspondiente.
 
 

## Notas

- Asegúrate de que los puertos necesarios (por defecto, el puerto 3306 para MySQL) estén disponibles y no en uso por otros servicios.
- Si tienes problemas de conexión, verifica que las variables de entorno estén configuradas correctamente y que el servicio de MySQL esté en ejecución.