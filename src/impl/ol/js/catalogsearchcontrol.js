export default class CatalogSearchControl extends M.impl.Control {
  /**
   * @classdesc
   * Main constructor of the CatalogSearchControl.
   *
   * @constructor
   * @extends {M.impl.Control}
   * @api stable
   */
  constructor() {
    super()

    /**
     * Facade of the map
     * @private
     * @type {M.Map}
     */
    this.facadeMap_ = null;
  }
  /**
   * This function adds the control to the specified map
   *
   * @public
   * @function
   * @param {M.Map} map to add the plugin
   * @param {HTMLElement} html of the plugin
   * @api stable
   */
  addTo(map, element) {
    // specific code
    this.facadeMap_ = map

    ol.control.Control.call(this, {
      element,
      target: null,
    });
    map.getMapImpl().addControl(this);
  }

  /**
   *
   * @public
   * @function
   * @api stable
   */
  activate() {
    M.dialog.info('Hello World!')
  }

  /**
   *
   * @public
   * @function
   * @api stable
   */
  deactivate() {
    M.dialog.info('Bye World!')
  }

  /**
   * Método para recuperar las capabilities de la url pasada por parámetro
   *
   * @param {any} url
   * @returns
   * @memberof CatalogSearchControl
   */
  getLayersFromWMSCapabilities(url) {
    return new Promise((success, fail) => {
      // Version 1.3.0
      const wmsGetCapabilitiesUrl = M.utils.getWMSGetCapabilitiesUrl(url, '1.3.0');
      // eslint-disable-next-line no-console
      M.remote.get(wmsGetCapabilitiesUrl).then((response) => {
        try {
          const getCapabilitiesDocument = response.xml;
          const getCapabilitiesParser = new M.impl.format.WMSCapabilities();
          const getCapabilities = getCapabilitiesParser.read(getCapabilitiesDocument);
          success(getCapabilities);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
          fail(error);
        }
      }).catch(err => fail(err));
    });
  }
}
