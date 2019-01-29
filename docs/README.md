# Catalog search

[![Build Tool](https://img.shields.io/badge/build-Webpack-green.svg)](https://github.com/sigcorporativo-ja/Mapea4-dev-webpack)  

## Descripción

 Plugin de [Mapea](https://github.com/sigcorporativo-ja/Mapea4) desarrollado por el [Instituto de Estadística y Cartografía](https://www.juntadeandalucia.es/institutodeestadisticaycartografia) dedicado a realizar búsquedas sobre un catálogo de metados implementado con Geonetwork.
 
 Al realizar la búsqueda, si alguno de los resultados es un servicio OGC, permitirá consultar las capas del mismo y añadirlas al mapa de forma interactiva

 ![Imagen](./images/catalogsearch1.PNG)

 
## Recursos y uso

- js: catalogsearch.ol.min.js
- css: catalogsearch.min.css

```javascript
// crear el plugin
var mp = new M.plugin.CatalogSearch({
    //url del catálogo de metadatos
    geoNetworkUrl: 'http://www.ideandalucia.es/catalogo/inspire/srv/spa'
}); 

// añadirlo al mapa
myMap.addPlugin(mp);
});
```  