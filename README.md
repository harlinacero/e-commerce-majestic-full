# E-Commerce Majestic

Este proyecto es una aplicación de backend para un sistema de comercio electrónico, construida con Go y MySQL. La aplicación está configurada para ejecutarse en contenedores Docker.

## Estructura del Proyecto

- `docker-compose.yml`: Archivo de configuración de Docker Compose para definir y ejecutar los servicios de la aplicación.
- `e-commerce-majestic-db/mysqldata/`: Directorio para almacenar los datos de MySQL.
- `e-commerce-majestic-mongodb/data/`: Directorio para almacenar los datos de MongoDB.
- `e-commerce-majestic-backend/`: Directorio que contiene el código fuente de la aplicación Go.
- `e-commerce-majestic-front/`: Directorio que contiene el código fuente de la aplicación Angular

## Requisitos

- Docker y Docker Compose instalados en tu máquina.
- MySQL instalado si se desea ejecutar la base de datos sin Docker.
- MongoDB instalado si se desea ejecutar la base de datos sin Docker.
- Go instalado si se desea ejecutar la aplicación sin Docker.
- Angular 16 instalado si se desea ejecutar la aplicación sin docker
- API KEY de OpenAI para utilizar el chatbot

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

3. Configura la base de datos MongoDb

    - Instala MongoDB si no está instalado
    - Configura la url de la conexión con MongoDB en las variables de entorno.

4. Configura las variables de entorno para la aplicación Go:

    ```sh
    export DB_HOST=localhost
    export DB_PORT=3306
    export DB_USER=harlin
    export DB_PASSWORD=1234
    export DB_NAME=majesticdb
    export MONGODB_URI=mongodb://mongodb:27017
    ```

5. Ejecuta la aplicación Go:

    ```sh
    cd e-commerce-majestic-backend
    go run main.go
    ```
6. Ingresa la API KEY de OpenAI para hacer uso del Chatbot
En la ruta e-commerce-majestic-front/src/environments/environment.development.ts la línea 4, reemplaza 'OPENAI_API_KEY' por la API KEY de OpenAI correspondiente.
![image](https://github.com/user-attachments/assets/07ac6ad3-0f00-4cd9-a752-d50beb8eb98b)

7. Ejecuta la aplicación angular
    ```sh
    cd e-commerce-majestic-front
    ng serve
    ```
7. Abrir el navegador web en http://localhost:4200, la aplicación redireccionará hacia el login. 

## Ejecucuón en AWS

### Requisitos:
Tener una cuenta de AWS con los permisos para crear TargetGroups y Load Balancer, Servicios y Clusters.

1. Descripción del proceso de despliegue en AWS EC2.
    
Para desplegar la aplicación en AWS EC2 se requiere:
   - Crear la base de datos de MySQL desde RDS, utiliza MySQL y configura usuario y contraseña, realizar las demás configuraciones que se crean convenientes, como habilitar los accesos etc.
![image](https://github.com/user-attachments/assets/553747ef-d7bf-49a5-a13d-87cf9edbc9b7)

- Crear una base de datos de MongoDB administrada por AWS, habilitar el acceso a cualquer IP.
- Crear dos Target Group desde EC2, uno para el Backend, otro para el frontend.
![image](https://github.com/user-attachments/assets/6d54fc3f-521f-414d-9642-dd28e75be55b)

    -- Cada Target Group se debe configurar como IP Addresses y habilitar el puerto declarado en el contenedor docker.
    -- Adiconalmente, configurar la VPC y el protocolo HTTP por el cual escuchará el servicio.
- Crear dos balanceadores de Carga, uno para el Backend, otro para el FrontEnd
![image](https://github.com/user-attachments/assets/ca1d3ca0-de86-4842-a5cc-afb503ea6925)

    -- Cada balanceador de Carga debe configurarse como Balanceador de Aplicaciones y exponerse a internet para poder acceder desde cualquier lugar.
    -- Se debe asignar grupos de seguridad y VPC correspondiente.
    -- Asociar el Target Group creado para cada uno, el Target Group del backend para el load balacer del backend y así respectivamente.
- Desde ECR (Elastic Container Registry) , se deben cargar y registrar las imágenes de docker tanto del frontend como del backend.
![image](https://github.com/user-attachments/assets/4cf6c7e4-f761-4f46-8061-bc992e13759c)

    -- Para cargar las imágenes, AWS provee los comandos correspondientes que deben ejecutarse desde la pc local, donde se encuentren las imágenes.
    -- Obtener la URI de cada Repositorio para configurarla en la última Etapa.
- Desde ECS (Elastic Container Service), crear Task Definition, donde se relacionará la Imagen Docker cargada en el ECR, además de las variables de entorno y otras configuraciones correspondientes al deploy.
![image](https://github.com/user-attachments/assets/8fb3d022-3dca-4b80-a648-e4d82e1989ab)

- Desde ECS (Elastic Container Service), crear un Cluster que contendrá los dos servicios.
![image](https://github.com/user-attachments/assets/3b848bab-1b2c-4436-89c5-b6065d6d7c22)

    -- Dentro del mismo clúser, se pueden crear los dos servicios asociados, uno al backend y otro al frontEnd. 
    -- En cada servicio se relacionan los Task Definition y Load Balancer creados anteriormente.
    -- Una vez creado el servicio y dado de alta, el balanceador de carga mostrará el DNS (Domain Name Service) público, al cual se puede acceder desde la web.
![image](https://github.com/user-attachments/assets/e4f71df2-e5e4-4375-a0cb-9df8c73c2f84)

![image](https://github.com/user-attachments/assets/21695ff1-7811-4880-a5ed-8aa811dcf0a3)


2. Desafíos encontrados y cómo se resolvieron.

Los mayores desafíos encontrados fueron respecto a la configuración correcta de AWS para desplegar la aplicación.
Para resolver estos problemas, fue necesario recurrir a la documentación y la ayuda de otros compañeros.
Finalmente, el objetivo se logró y la aplicación pudo ser cargada correctamente en AWS.


## Funcionamiento
# Login
Para ingresar a la aplicación es necesario ingresar usuario y contraseña, el usuario por defecto, creado con el rol de admin, tiene las credenciales:
    -user: admin
    -password: admin1234

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

## Seguridad y protección de servicios basada en roles
En esta aplicación, los roles y permisos se utilizan para controlar el acceso a diferentes partes del sistema. A continuación se describe cada rol y los permisos asociados.

| Roles Permitidos           | Endpoint                                      | Método       | Descripción                             |
|-----------------------------|-----------------------------------------------|--------------|-----------------------------------------|
| admin                       | `/api/role/`                                  | GET          | Obtener todos los roles                 |
| admin                       | `/api/role/{id:[0-9]+}`                       | GET          | Obtener un rol específico               |
| admin                       | `/api/role/userByRole/{id:[0-9]+}`            | GET          | Obtener usuarios por rol                |
| admin                       | `/api/role/`                                  | POST         | Crear un nuevo rol                      |
| admin                       | `/api/role/{id:[0-9]+}`                       | PUT          | Actualizar un rol                       |
| admin                       | `/api/role/{id:[0-9]+}`                       | DELETE       | Eliminar un rol                         |
| Público (sin autenticación) | `/api/user/`                                  | POST         | Crear un nuevo usuario                  |
| admin, seller, shooper      | `/api/user/{id:[0-9]+}`                       | GET          | Obtener un usuario específico           |
| admin                       | `/api/user/`                                  | GET          | Obtener todos los usuarios              |
| admin                       | `/api/user/userByRole/{id:[0-9]+}`            | GET          | Obtener usuarios por rol                |
| admin                       | `/api/user/{id:[0-9]+}`                       | PUT          | Actualizar un usuario                   |
| admin                       | `/api/user/{id:[0-9]+}`                       | DELETE       | Eliminar un usuario                     |
| admin, seller               | `/api/category/`                              | GET          | Obtener todas las categorías            |
| admin, seller, shooper      | `/api/category/{id:[0-9]+}`                   | GET          | Obtener una categoría específica        |
| admin, seller, shooper      | `/api/category/productsByCategory/{id:[0-9]+}`| GET          | Obtener productos por categoría         |
| admin, seller               | `/api/category/`                              | POST         | Crear una nueva categoría               |
| admin, seller               | `/api/category/{id:[0-9]+}`                   | PUT          | Actualizar una categoría                |
| admin                       | `/api/category/{id:[0-9]+}`                   | DELETE       | Eliminar una categoría                  |
| admin, seller, shooper      | `/api/product/`                               | GET          | Obtener todos los productos             |
| admin, seller, shooper      | `/api/product/productByCategory/{id:[0-9]+}`  | GET          | Obtener productos por categoría         |
| admin, seller, shooper      | `/api/product/{id:[0-9]+}`                    | GET          | Obtener un producto específico          |
| admin, seller               | `/api/product/`                               | POST         | Crear un nuevo producto                 |
| admin, seller               | `/api/product/{id:[0-9]+}`                    | PUT          | Actualizar un producto                  |
| admin, seller               | `/api/product/{id:[0-9]+}`                    | DELETE       | Eliminar un producto                    |
| Público (sin autenticación) | `/api/session/`                               | POST         | Obtener la sesión del usuario logueado  |

### Detalles de Permisos

#### Admin
- **Acceso Completo**: Los administradores tienen acceso a todas las funcionalidades del sistema, incluyendo la gestión de roles, usuarios, categorías y productos.

#### Seller
- **Gestión de Categorías y Productos**: Los vendedores pueden ver, crear y actualizar categorías y productos.

#### Shooper
- **Visualización de Información**: Los compradores pueden ver usuarios, categorías y productos.

#### Público
- **Registro y Sesión**: Los usuarios no autenticados pueden crear una cuenta y obtener la sesión del usuario logueado.

Con esta configuración, se controla el acceso a los diferentes servicios, pero también, se realiza protección de los módulos a partir de las rutas:
|    Roles permitidos   |Ruta	                         |Títiulo                     |
|-----------------|-------------------------------|-----------------------------|
|admin, seller, shopper		     |/home					         |Inicio            |
|admin            |/dashboard            |Dashboard            |
|seller, shopper  |/components/presentation|Videos|
|admin, seller	  |/products	| Productos |
|admin		      |/people 		| Usuarios 	|	

### Ejemplo de UI del usuario con rol admin con todos los permisos
![image](https://github.com/user-attachments/assets/20c6e4f6-a4fa-418a-8f3f-ab1bd18fb319)
### Ejemplo de UI del usuario con rol seller, o vendedor, con permisos solo sobre home, productos y el módulo de videos
![image](https://github.com/user-attachments/assets/1681ce4e-4ab2-4e4d-a8ce-56f5521d2c4c)
Pero, si intenta ingresar al módulo de usuarios (/people):
![image](https://github.com/user-attachments/assets/e0cb9935-02be-4c56-b6e7-bf1a5fc81670)
O, si intenta ejecutar el servicio directamente 
![image](https://github.com/user-attachments/assets/dd44c608-e967-41c4-b90e-e06618fb79b7)
### Ejemplo de UI del usuario con rol shopper
![image](https://github.com/user-attachments/assets/4ec2c979-5f78-4f90-8bd3-3e9978d33aa6)
Pero, si intenta ingresar al módulo de usuarios o productos
![image](https://github.com/user-attachments/assets/807bccfd-94ec-4939-a4bf-f3215d99942e)
Y, si intenta ejecutar el servicio de usuarios
![image](https://github.com/user-attachments/assets/fcbcdce8-f1b9-4611-b831-2beb8ae7d114)

De esta forma, tanto los servicios, como los módulos de la aplicación, están restingidos de acuerdo con el rol del usuario logueado.

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

#Chatbot con OpenAI
La aplicación también integra un chatbot con la API de OpenAI. Para utilziarlo basta con abrirlo en el ícono que aparece en la parte inferior derecha de la aplicación.
![image](https://github.com/user-attachments/assets/0c654410-2778-408d-9da1-03c0ff9e9868)

Este chat contiene el historial de la conversación del usuario logueado y también está disponible en la ventana de login, aunque en esta ventana no persiste el historial de la conversación.
Si no hay interactividad durante 20 segundos, la ventana del chatbot se cierra.
![image](https://github.com/user-attachments/assets/cd9452e9-e5fa-42cb-8b77-92d9ec5b7127)

Por porblemas de seguridad en GIT, no se subió la API KEY de Open AI, esta debe ingresarse en el código después de clonar la aplicación.


## Notas

- Asegúrate de que los puertos necesarios (por defecto, el puerto 3306 para MySQL) estén disponibles y no en uso por otros servicios.
- Si tienes problemas de conexión, verifica que las variables de entorno estén configuradas correctamente y que el servicio de MySQL esté en ejecución.
