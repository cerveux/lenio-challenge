## Web app de personade utilizando la API de 
# Marvel 🙌

[Lenio Challenge](https://lenio-challenge.vercel.app)

Esta aplicacion consta de tres componentes principales: la caja de busqueda, la visualizacion de resultados y el modal con los primeros 20 comics donde aparece el personaje.

## Correr la aplicacion en local 

Ejecuta npm install para instalar las dependencias

```bash
npm install
```
Ejectutar el cliente

```bash
npm run dev
```

Configura el documento .ENV agregándoles la "Public Key" y la "Private Key" correspondiente a tu cuenta de Marvel


# Descripcion de lo realizado ✌

## Problema

Se solicito:
* Las peticiones se tienen que realizar a la siguiente URL: http://gateway.marvel.com/v1/
* El buscador tiene que tener la posibilidad de buscar los nombres de los Personajes de Marvel en el input pero también por URL.
* Cuando se entra la primera vez en la app web sin ningún personaje en la URL tiene que mostrar un personaje aleatorio y así por cada vez que vuelva a recargar la página.
* La búsqueda tiene que contemplar buscar por similitudes de texto y parecidos de nombre, es decir, con solo buscar “spider” debería de renderizar todas las posibilidades y matches que abarcan.
* La búsqueda tiene que tener la posibilidad de buscar por comic directamente también y si es un link que viene directamente de la página de marvel(The Amazing Spider-Man #22) tiene que visualizar un preview del cómic.

La manera que se mostrarán las búsquedas serán en forma de cards y modales para el detalle del personaje con sus comics.

* Al clickear un card debería ir al detalle del personaje y mostrar un listado de sus cómics ordenados por fecha.
* La búsqueda tiene que poder guardarse en un listado de favoritos y que persista en el browser para que pueda ser usada en un futuro solo dandole click a la lista de búsquedas favoritas el cual tiene la estrella en la esquina superior derecha del input de búsqueda.

## Solucion

Para el **cliente** de la aplicacion se utilizo React con vite, ademas de React-Router-Dom para las rutas dinamicas, el estado se manejo casi en su totalidad con el Context de React para disponibilizarlo en toda el app y por ultimo Tailwind para manejar los estilos.

* Cliente
  * React
  * Vite
  * React-Context
  * Tailwind
  



## Deploy 🚀

Puedes ver la aplicacion funcionando en produccion mediante este link: [Lenio Challenge](https://lenio-challenge.vercel.app) .


Si llegaste aqui gracias 🙏🏼 me gusta ser leido, Buen Dia!