import CatalogSearch from 'facade/catalogsearch';

const map = M.map({
  container: 'mapjs',
});

const mp = new CatalogSearch({
  geoNetworkUrl: 'http://www.ideandalucia.es/catalogo/inspire/srv/spa',
});

map.addPlugin(mp);

window.map = map;
