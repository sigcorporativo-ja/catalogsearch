/**
 * @module M/plugin/CatalogSearch
 */

import CatalogSearchControl from './catalogsearchControl.js'
import css from 'assets/css/catalogsearch.css'

export default class CatalogSearch extends M.Plugin {
  /**
   * Name to identify this plugin
   * @const
   * @type {string}
   * @public
   * @api stable
   */
  static get NAME() {
    return 'catalogsearch'
  }

  /**
   * @classdesc
   * Main facade plugin object. This class creates a plugin
   * object which has an implementation Object
   *
   * @constructor
   * @extends {M.Plugin}
   * @param {Object} impl implementation object
   * @api stable
   */
  constructor(parameters) {
    super()

    parameters = parameters || {}

    /**
     * Facade of the map
     * @private
     * @type {M.Map}
     */
    this.map_ = null

    /**
     * Control that executes the searches
     * @private
     * @type {Object}
     */
    this.control_ = null

    /**
     * TODO
     * @private
     * @type {M.ui.Panel}
     */
    this.panel_ = null

    /**
     * Name of this control
     * @public
     * @type {string}
     * @api stable
     */
    this.name = CatalogSearch.NAME

    /**
     * Facade of the map
     * @private
     * @type {String}
     */
    this.geoNetworkUrl_ = 'http://www.ideandalucia.es/catalogo/inspire/srv/spa'
    if (!M.utils.isNullOrEmpty(parameters.geoNetworkUrl)) {
      this.geoNetworkUrl_ = parameters.geoNetworkUrl
    }
  }

  /**
   * This function adds this plugin into the map
   *
   * @public
   * @function
   * @param {M.Map} map the map to add the plugin
   * @api stable
   */
  addTo(map) {
    this.map_ = map

    map._areasContainer
      .getElementsByClassName('m-top m-right')[0]
      .classList.add('top-extra')

    this.control_ = new CatalogSearchControl(this.geoNetworkUrl_)
    this.panel_ = new M.ui.Panel('catalogsearch', {
      collapsible: true,
      className: 'm-catalogsearch',
      collapsedButtonClass: 'g-cartografia-zoom',
      position: M.ui.position.TL,
      tooltip: 'Búsqueda en catálogo',
    })
    this.panel_.addControls(this.control_)
    this.map_.addPanels(this.panel_)
    this.control_.on(M.evt.ADDED_TO_MAP, () => {
      this.fire(M.evt.ADDED_TO_MAP)
    })
  }

  /**
   * This function provides the input search
   *
   * @public
   * @function
   * @returns {HTMLElement} the input that executes the search
   * @api stable
   */
  getInput() {
    var inputSearch = null
    if (!M.utils.isNullOrEmpty(this.control_)) {
      inputSearch = this.control_.getInput()
    }
    return inputSearch
  }

  /**
   * This function destroys this plugin
   *
   * @public
   * @function
   * @api stable
   */
  destroy() {
    this.map_.removeControls([this.control_])
    this.map_ = null
    this.control_ = null
    this.panel_ = null
    this.geoNetworkUrl_ = null
    this.searchParameters_ = null
  }

  /**
   * This function compare if pluging recieved by param is instance of  M.plugin.catalogsearch
   *
   * @public
   * @function
   * @param {M.plugin} plugin to comapre
   * @api stable
   */
  equals(plugin) {
    if (plugin instanceof CatalogSearch) {
      return true
    } else {
      return false
    }
  }
}
