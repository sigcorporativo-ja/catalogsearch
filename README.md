# M.plugin.CatalogSearch

Plugin de Mapea desarrollado por el Instituto de Estadística y Cartografía dedicado a realizar búsquedas sobre un catálogo de metados implementado con Geonetwork.

Al realizar la búsqueda, si alguno de los resultados es un servicio OGC, permitirá consultar las capas del mismo y añadirlas al mapa de forma interactiva

![Imagen1](./img/catalogsearch_1.png)

## Dependencias

- catalogsearch.ol.min.js
- catalogsearch.ol.min.css

## Parámetros

- El constructor se inicializa con un JSON de _options_ con los siguientes atributos:

- **geoNetworkUrl**. URL de geoNetwork.

## Ejemplos de uso

### Ejemplo 1
```javascript
   const map = M.map({
     container: 'map'
   });

   const mp = new M.plugin.CatalogSearch({});

   map.addPlugin(mp);
```
### Ejemplo 2
```javascript
const mp = new M.plugin.CatalogSearch({
  geoNetworkUrl: 'http://www.ideandalucia.es/catalogo/inspire/srv/spa'
  classname: 'm-class-name',
  collapsible: false
});

map.addPlugin(mp);
```
### Ejemplo 3
```javascript
const mp = new M.plugin.CatalogSearch({});

map.addPlugin(mp);
```
