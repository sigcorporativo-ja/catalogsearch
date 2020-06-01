import Catalogsearch from 'facade/catalogsearch'

const map = M.map({
  container: 'mapjs',
})

const mp = new Catalogsearch({
  geoNetworkUrl: 'http://www.ideandalucia.es/catalogo/inspire/srv/spa',
})

map.addPlugin(mp)
