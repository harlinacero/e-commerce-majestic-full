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
![image](https://github.com/user-attachments/assets/39445178-4e7f-4ceb-b912-538a0aeba915)

 
## Registro de nuevo usuario
Si el usuario no está registrado en la plataforma, puede registrarse desde el login, por defecto, se le asigna el rol de comprador.
 ![image](https://github.com/user-attachments/assets/3304a9a2-fb67-4315-abc6-0bacce5e8a35)
![image](https://github.com/user-attachments/assets/cddc0b89-32b2-42da-a703-d4a455800328)

 
## Login correcto
![image](https://github.com/user-attachments/assets/b3be35f8-410e-4daf-aed1-315650654340)

# Seguridad mediante JWT
Al iniciar sesión se asigna un token único que se vincula a todas las peticiones mediante http_interceptors para permitir el consumo de los servicios del backend.
![image](https://github.com/user-attachments/assets/6f528538-1f43-45b8-b2d0-9df52cdd6bad)
A excepción del servicio de sesión y el servicio de crear usuario, todos los demás se encuentran protegidos mediante middleware para evitar el consumo de usuarios o aplicaciones no autenticadas.

En caso de que el token no exista o se encuentre vencido o incorrecto, la solicitud del servicio retornará un error y la aplicación se redireccionará a la ventana de login.
### Token vencido o inválido:
![image](https://github.com/user-attachments/assets/f8d0c1a7-239f-4853-b621-68a2804741c3)
### Sin token:
![image](https://github.com/user-attachments/assets/43d45f83-825d-4052-a72d-069701f28af7)


# Módulo de Usuarios
Contiene la lista de usuarios registrados, permite agregar, editar o eliminar usuarios.
## Usuarios Registrados
![image](https://github.com/user-attachments/assets/dc6834c9-16d7-4416-8915-9b21cc73db29)

## Agregar / Editar usuario
Se pueden crear nuevos usuarios desde este módulo y se permite la edición de usuarios para modificar el nombre de usuario, avatar, correo electrónico, perfil, etc.
![image](https://github.com/user-attachments/assets/8ab083d0-2ff3-4e2e-8e6d-8d5f3923fde7)

# Inventario de Productos
Se listan los productos registrados, además se permite agregar, editar y modificar productos.
![image](https://github.com/user-attachments/assets/67e12193-75aa-4a48-b082-ebed14ba46fd)

## Agregar / Editar Productos
Se pueden crear nuevos productos o modificar un producto existente mediante el formulario correspondiente.
![image](https://github.com/user-attachments/assets/f60a7a57-4224-430e-b4da-d79e8bea7806)
## Notas

- Asegúrate de que los puertos necesarios (por defecto, el puerto 3306 para MySQL) estén disponibles y no en uso por otros servicios.
- Si tienes problemas de conexión, verifica que las variables de entorno estén configuradas correctamente y que el servicio de MySQL esté en ejecución.
