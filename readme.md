##### Dependencias necesarias
Los siguientes requisitos son necesarios para poder hacer las pruebas:
* [Composer](https://getcomposer.org/download/)
* Tener php descargado
##### Corriendo el proyecto
Una vez clonado el repositorio hay que llamar el siguiente comando dentro del directorio del proyecto
```
php composer update
```
Esto descargara las dependencias necesarias para poder correr la aplicación
##### Definiendo la base de datos
Dentro del archivo .env vienen las siguientes variables que permiten conectarse a la base de datos
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ecpc 	//El nombre de tu base de datos local
DB_USERNAME=root 	//Nombre de usuario
DB_PASSWORD=admin	//Contraseña
```
Una vez configuradas estas variables la apliación debería de poder conectarse a tu base de datos

### Flujo de trabajo para el back-end
Sería bueno llevar el flujo de trabajo lo más estandarizado posible, para facilitar la navegación del código de cada quien. Seguir los siguientes pasos nos podrían ayudar a conseguirlo:
* Para cada tabla de la base de datos sería bueno tener un modelo
* Para cada modelo tal vez sea necesario crear un respectivo control, esto con la finalidad de tener un web.php más limpio y conciso
* Organizar las rutas del web.php en grupos por cada tabla de la base de datos que lo necesite
##### Reglas para cada tabla de la base de datos
Las siguientes reglas se deben de aplicar en cada tabla de la base de datos:
* Debe de tener timestamps, esto evita algunos errores en los queries de laravel
* Debe de tener un campo booleano que se llame "activo"
##### Reglas que deben de llevar a cabo los controles
* Cuando se cree una nueva entidad de algún modelo (recordemos que esto se hace en los controles) hay que regresar la entidad recién creada
* Lo mismo aplica para la mayoría, sino es que todas las funciones de los controles que trabajen con entidades, si el control módifica una entidad hay que retornar dicha entidad módificada