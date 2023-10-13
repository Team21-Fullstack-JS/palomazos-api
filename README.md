# Acerca del proyecto 📝

Palomazos es un sitio donde los usuarios podrán compartir sus reseñas, 
comentar opiniones y compartir su gusto por las películas tanto clásicas 
como actuales. Permitiendo generar una comunidad cinéfila que permita a 
todos descubrir nuevas obras del septimo arte. En este proyecto desarrollamos
la API Rest de la aplicación.

<b>Caracteristicas principales: </b>📌

<ul>
    <li>Elegir una pelicula para realizar un review.</li>
    <li>Agregar comentarios a las peliculas.</li>
    <li>Puntuar peliculas.</li>
</ul>

## Desarrollado con 🔐

El stack utilizado para desarrollar esta API Rest es el siguiente:

* NodeJS v18.17.1
* express": 4.18.2
* MySQL 5+
* Sequelize 6

## Arrancando 🚀

* Clonar el repo:
  ```bash
  git clone https://github.com/Team21-Fullstack-JS/palomazos-api.git
  ```

### Pre-requisitos 📋

* Asegurate de estar en la carpeta `/palomazos-api`
  ```bash
    cd palomazos-api
    ```
* Ejecutar el siguiente comando para instalar todas las dependencias del proyecto.
  ```bash
    npm install
  ```
* Si deseas probar en modo de desarrollo ejecuta:
  ```bash
    npm run dev
  ```
  No olvides configurar las variables de entorno en tu archivo `.env`, guiate con el archivo `.env.example`

* O puedes ir a la siguiente sección `Demo del backend` para ejecutarlo en modo de producción.

## Demo del Backend 👨‍💻
- [palomazos-api](https://palomazos-api-a0bcbaa57f47.herokuapp.com/api/v1/documentation/) &nbsp; Visita la documentación de la API Rest.

## Proceso: ⏯
1. [x] Debes darte de alta en `POST /users/signup`.
2. [x] Inicia sesión en `POST /users/login` y copiar el token de autenticacion que se te devolvera en la respuesta.
3. [x] A partir de aqui es necesario agregar el token de autenticacion en el header de la peticion.
4. [x] Realizar una review: calificar una pelicula y comentarla `POST /movies/{id}/review`.
5. [x] Obtener tus datos, y opcionalmente, todas las reviews que has hecho `GET /users?reviews=true`.
6. [x] Obtener todas las peliculas con su informacion, y opcionalmente con sus Reviews `GET /movies?reviews=true`.

## Diagrama de clases 📑
![ClassDiagram](\assets\diagrams\UML-diagram-class.png)

## Frontend 🖥️
- **Application Demo**: &nbsp; _Pronto con React..._
- 
## Autores ✒️

* **Hiram Chávez** - [JustLearningMX](https://github.com/JustLearningMX)
* **Marco Ibarra** - [mibarra24](https://github.com/mibarra24)
* **Carlos Chirinos** - [carchirinos](https://github.com/carchirinos)
* **Dario Carbajal** - [Madhra](https://github.com/Madhra)