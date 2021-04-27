import catalogsearch from 'templates/catalogsearch';
import catalogsearchresults from 'templates/catalogsearchresults';
import catalogsearchlayers from 'templates/catalogsearchlayers';
import CatalogSearchImplControl from 'impl/catalogsearchcontrol';
import * as xml2js from 'xml2js';
import ReadMore from './readMore';
import { METADATA_TEMPLATE } from './metadataTemplate';

export default class CatalogSearchControl extends M.Control {
  /**
   * Name of this control
   * @const
   * @type {string}
   * @public
   * @api stable
   */
  static get NAME() {
    return 'catalogsearch';
  }

  /**
   * Template for this controls
   * @const
   * @type {string}
   * @public
   * @api stable
   */
  static get TEMPLATE() {
    return 'catalogsearch.html';
  }
  /**
   * Template for this controls
   * @const
   * @type {string}
   * @public
   * @api stable
   */
  static get RESULTS_TEMPLATE() {
    return 'catalogsearchresults.html';
  }

  /**
   * Template for this controls
   * @const
   * @type {string}
   * @public
   * @api stable
   */
  static get LAYERS_TEMPLATE() {
    return 'catalogsearchlayers.html';
  }

  /**
   * Template for this controls
   * @const
   * @type {string}
   * @public
   * @api stable
   */
  static get SEARCHING_CLASS() {
    return 'm-searching';
  }

  /**
   * Template for this controls
   * @const
   * @type {string}
   * @public
   * @api stable
   */
  static get HIDDEN_RESULTS_CLASS() {
    return 'hidden';
  }

  /**
   * @classdesc
   * Main constructor of the class. Creates a PluginControl
   * control
   *
   * @constructor
   * @extends {M.Control}
   * @api stable
   */
  constructor(geoNetworkUrl) {
    // 1. checks if the implementation can create PluginControl
    if (M.utils.isUndefined(CatalogSearchImplControl)) {
      M.exception('La implementación usada no puede crear controles CatalogSearchControl');
    }
    // 2. implementation of this control
    const impl = new CatalogSearchImplControl();
    super(impl, 'CatalogSearch');

    /**
     * Facade of the map
     * @private
     * @type {HTMLElement}
     */
    this.input_ = null;

    /**
     * Container of the control
     * @private
     * @type {HTMLElement}
     */
    this.element_ = null;

    /**
     * Container of the results
     * @private
     * @type {HTMLElement}
     */
    this.resultsContainer_ = null;

    /**
     * Container of the results to scroll
     * @private
     * @type {HTMLElement}
     */
    this.resultsScrollContainer_ = null;

    /**
     * Searching result
     * @private
     * @type {HTMLElement}
     */
    this.searchingResult_ = null;

    /**
     * Timestamp of the search to abort
     * old requests
     * @private
     * @type {Nunber}
     */
    this.searchTime_ = 0;

    /**
     * Facade of the map
     * @private
     * @type {M.Map}
     */
    this.geoNetworkUrl_ = geoNetworkUrl;

    /**
     * Results of the search
     * @private
     * @type {Array<Object>}
     */
    this.results_ = { services: [] };

    /**
     * Flag that indicates the scroll is up
     * shown
     * @private
     * @type {Boolean}
     */
    this.scrollIsUp_ = true;

    /**
     * Facade of the map
     * @private
     * @type {M.Map}
     */
    this.facadeMap_ = null;

    // FUNCIONES a eventos para poder eliminarlos después
    this.boundResultsScroll_ = evt => this.resultsScroll_(evt);
    this.boundShowLayersButton_ = evt => this.searchLayers(evt);
    this.boundAddLayersButton_ = evt => this.addLayersControl(evt);
    this.boundShowMetadataButton_ = evt => this.showFullMetadata(evt);
  }

  /**
   * This function creates the view to the specified map
   *
   * @public
   * @function
   * @param {M.Map} map to add the control
   * @api stabletrue
   */
  createView(map) {
    this.facadeMap_ = map;
    const promise = new Promise((success, fail) => {
      const html = M.template.compileSync(catalogsearch, { jsonp: true });
      this.addEvents(html);
      success(html);
    });
    return promise;
  }

  /**
   * This function creates the view to the specified map
   *
   * @public
   * @function
   * @param {M.Map} map to add the control
   * @api stable
   */
  addEvents(html) {
    this.element_ = html;

    this.on(M.evt.COMPLETED, () => {
      this.element_.classList.add('shown');
    });

    // input search
    this.input_ = this.element_.getElementsByTagName('input')['m-catalogsearch-search-input'];
    this.input_.addEventListener('keyup', evt => this.searchClick_(evt));

    // search buntton
    const btnSearch = this.element_.getElementsByTagName('button')['m-catalogsearch-search-btn'];
    btnSearch.addEventListener('click', evt => this.searchClick_(evt));

    // clear buntton
    const btnClean = this.element_.getElementsByTagName('button')['m-catalogsearch-clear-btn'];
    btnClean.addEventListener('click', evt => this.clearClick_(evt));

    // results container
    this.resultsContainer_ = this.element_.querySelector('div#m-catalogsearch-results');
    M.utils.enableTouchScroll(this.resultsContainer_);
    this.searchingResult_ = this.element_.querySelector('div#m-catalogsearch-results > div#m-searching-result');
  }

  /**
   * This function checks if an object is equals
   * to this control
   *
   * @private
   * @function
   */
  searchClick_(evt) {
    evt.preventDefault();

    if ((evt.type !== 'keyup') || (evt.keyCode === 13)) {
      // resets the results
      this.results_.services.length = 0;

      // gets the query
      const query = this.input_.value;
      if (M.utils.isNullOrEmpty(query)) {
        M.dialog.info('Debe introducir una búsqueda.');
      } else {
        this.search_(query);
      }
    }
  }

  /**
   * This function checks if an object is equals
   * to this control
   *
   * @private
   * @function
   */
  search_(query, append = false) {
    this.resultsContainer_.appendChild(this.searchingResult_);

    this.searchTime_ = Date.now();

    // adds the class
    this.element_.classList.add(CatalogSearchControl.SEARCHING_CLASS);

    this.searchAny(query, this.searchTime_, append);
  }


  searchAny(query, searchTime, append) {
    const searchUrl = M.utils.addParameters(`${this.geoNetworkUrl_}/xml.search`, {
      any: query,
      from: this.results_.services.length + 1,
      to: this.results_.services.length + 20,
    });

    /* Stores the current search time into a
    closure function. When the promise returns a
    value we compare the current search time
    (this.searchTime) and the saved search time of
    the request (searchTime parameter).
    If they are different then aborts the response */
    M.remote.get(searchUrl).then((response) => {
      // if it is the current search then show the results
      if (searchTime === this.searchTime_) {
        // Inicializamos el array de promises para lanzar el sucess desde un promise.all
        const promises = [];
        // Inicializamos la busqueda
        const results = { query, services: [], total: 0 };
        xml2js.parseString(response.text, { explicitArray: false }, (err, parse) => {
          results.total = parse.response.summary.$.count;
          if (results.total > 0) {
            const metadatos = [].concat(parse.response.metadata);
            metadatos.forEach((metadata) => {
              const uuid = metadata['geonet:info'].uuid;
              const service = { uuid };
              promises.push(this.searchUuid(uuid, searchTime).then((varMetadata) => {
                service.metadata = varMetadata;
                results.services.push(service);
              }));
            });
          }

          // Una vez que estén resueltas todas las promesas, devuelvo el resultado
          Promise.all(promises).then(() => {
            if (append) {
              this.results_.services = this.results_.services.concat((results.services));
              this.appendResults_(results);
            } else {
              this.results_ = results;
              this.showResults_();
            }
            this.element_.classList.remove(CatalogSearchControl.SEARCHING_CLASS);
          });
        });
      }
    });
  }

  searchUuid(uuid, searchTime) {
    return new Promise((success, fail) => {
      const searchUrl = M.utils.addParameters(`${this.geoNetworkUrl_}/xml.metadata.get`, {
        uuid,
      });

      M.remote.get(searchUrl).then((response) => {
        // if it is the current search then show the results
        if (searchTime === this.searchTime_) {
          xml2js.parseString(response.text, { explicitArray: false }, (err, result) => {
            // Se recogen los metadatos de titulo, descripcion
            // y la url del getcapabilities para posteriormente cargar las capas a través de él.
            const metadata = {};
            metadata.url = searchUrl;
            metadata.title = this.checkNestedJSON_(result, 'gmd:MD_Metadata', 'gmd:identificationInfo', 'gmd:MD_DataIdentification', 'gmd:citation', 'gmd:CI_Citation', 'gmd:title', 'gco:CharacterString') ||
              this.checkNestedJSON_(result, 'gmd:MD_Metadata', 'gmd:identificationInfo', 'srv:SV_ServiceIdentification', 'gmd:citation', 'gmd:CI_Citation', 'gmd:title', 'gco:CharacterString');
            metadata.abstract = this.checkNestedJSON_(result, 'gmd:MD_Metadata', 'gmd:identificationInfo', 'gmd:MD_DataIdentification', 'gmd:abstract', 'gco:CharacterString') ||
              this.checkNestedJSON_(result, 'gmd:MD_Metadata', 'gmd:identificationInfo', 'srv:SV_ServiceIdentification', 'gmd:abstract', 'gco:CharacterString');
            metadata.type = this.checkNestedJSON_(result, 'gmd:MD_Metadata', 'gmd:hierarchyLevel', 'gmd:MD_ScopeCode', '$', 'codeListValue');
            if (metadata.type === 'dataset' || metadata.type === 'series') {
              const metadataWMSUrl = this.checkNestedJSON_(
                result, 'gmd:MD_Metadata', 'gmd:distributionInfo', 'gmd:MD_Distribution', 'gmd:distributor',
                'gmd:MD_Distributor', 'gmd:distributorTransferOptions', 'gmd:MD_DigitalTransferOptions', 'gmd:onLine',
              );
              if (Array.isArray(metadataWMSUrl)) {
                for (let j = 0; j < (metadataWMSUrl.length - 1); j += 1) {
                  const data = this.checkNestedJSON_(metadataWMSUrl[j], 'gmd:CI_OnlineResource', 'gmd:protocol', 'gco:CharacterString');
                  if (!M.utils.isNullOrEmpty(data) && data.trim() === 'OGC:WMS-1.3.0-http-get-capabilities') {
                    metadata.layersWMSUrl = this.checkNestedJSON_(metadataWMSUrl[j], 'gmd:CI_OnlineResource', 'gmd:linkage', 'gmd:URL');
                    break;
                  }
                }
              } else {
                const data = this.checkNestedJSON_(metadataWMSUrl, 'gmd:CI_OnlineResource', 'gmd:protocol', 'gco:CharacterString');
                if (!M.utils.isNullOrEmpty(data) && data.trim() === 'OGC:WMS-1.3.0-http-get-capabilities') {
                  metadata.layersWMSUrl = this.checkNestedJSON_(metadataWMSUrl, 'gmd:CI_OnlineResource', 'gmd:linkage', 'gmd:URL');
                }
              }
            } else if (metadata.type === 'service') {
              const metadataWMSUrl = this.checkNestedJSON_(
                result, 'gmd:MD_Metadata', 'gmd:identificationInfo', 'srv:SV_ServiceIdentification',
                'srv:containsOperations',
              );
              if (Array.isArray(metadataWMSUrl)) {
                for (let j = 0; j < (metadataWMSUrl.length - 1); j += 1) {
                  const service = this.checkNestedJSON_(metadataWMSUrl[j], 'srv:SV_OperationMetadata', 'srv:operationName', 'gco:CharacterString');
                  if (!M.utils.isNullOrEmpty(service) && service.trim() === 'GetCapabilities') {
                    metadata.layersWMSUrl = this.checkNestedJSON_(metadataWMSUrl[j], 'srv:SV_OperationMetadata', 'srv:connectPoint', 'gmd:CI_OnlineResource', 'gmd:linkage', 'gmd:URL');
                    break;
                  }
                }
              } else {
                const service = this.checkNestedJSON_(metadataWMSUrl, 'srv:SV_OperationMetadata', 'srv:operationName', 'gco:CharacterString');
                if (!M.utils.isNullOrEmpty(service) && service.trim() === 'GetCapabilities') {
                  metadata.layersWMSUrl = this.checkNestedJSON_(metadataWMSUrl, 'srv:SV_OperationMetadata', 'srv:connectPoint', 'gmd:CI_OnlineResource', 'gmd:linkage', 'gmd:URL');
                }
              }
            }
            success(metadata);
          });
        }
      });
    });
  }

  /**
   *
   *
   * @returns
   * @memberof CatalogSearchControl
   */
  searchLayers(evt) {
    this.element_.classList.add(CatalogSearchControl.SEARCHING_CLASS);
    const event = (evt || window.event);
    const button = event.target;
    const url = event.target.dataset.url;
    button.dataset.show = !(button.dataset.show === 'true');
    const layersContainer = event.target.parentNode.parentNode.querySelector('div.layers-list');
    const active = button.dataset.show;
    button.innerText = (active === 'true') ? 'Ocultar capas' : 'Ver capas';
    layersContainer.classList.toggle('dNone');
    // Si ya tiene contenido el contenedor de capas
    // no se realiza una nueva busqueda y solo se oculta/muestra
    if (M.utils.isNullOrEmpty(layersContainer.innerHTML)) {
      this.getImpl().getLayersFromWMSCapabilities(url).then((capabilities) => {
        this.element_.classList.remove(CatalogSearchControl.SEARCHING_CLASS);
        if (!M.utils.isNullOrEmpty(capabilities) &&
          !M.utils.isNullOrEmpty(capabilities.Capability.Layer)) {
          this.showLayers_(url, capabilities.Capability.Layer, layersContainer);
        } else {
          M.dialog.error('No se han podido cargar las capas');
        }
      }).catch((error) => {
        M.dialog.error('No se han podido cargar las capas');
        this.element_.classList.remove(CatalogSearchControl.SEARCHING_CLASS);
      });
    } else {
      this.element_.classList.remove(CatalogSearchControl.SEARCHING_CLASS);
    }
  }

  showLayers_(url, layers, varLayersContainer) {
    const layersContainer = varLayersContainer;
    const varlayers = (!M.utils.isNullOrEmpty(layers.Layer)) ? layers.Layer : layers;
    const html = M.template.compileSync(catalogsearchlayers, {
      jsonp: true,
      vars: { layers: varlayers, url },
    });
    // Annado la plantilla generada al contenedor de capas
    layersContainer.innerHTML = html.innerHTML;
    // register add layers button
    const addLayersButton = layersContainer.querySelector('.add-layers');
    addLayersButton.addEventListener('click', this.boundAddLayersButton_);
  }

  addLayersControl(evt) {
    const event = (evt || window.event);
    const url = event.target.dataset.url;
    const listLayersElement = event.target.parentNode.querySelectorAll('input[type=checkbox]');
    // loop over them all
    for (let i = 0; i < listLayersElement.length; i += 1) {
      // And stick the checked ones onto an array...
      if (listLayersElement[i].checked) {
        this.facadeMap_.addWMS(new M.layer.WMS({
          url,
          name: listLayersElement[i].value,
          legend: listLayersElement[i].dataset.title,
          transparent: true,
          tiled: true,
        }));
      }
    }
  }

  showFullMetadata(evt) {
    this.element_.classList.add(CatalogSearchControl.SEARCHING_CLASS);
    const event = (evt || window.event);
    const url = event.target.dataset.url;
    const button = event.target;
    const active = button.dataset.show;
    button.dataset.show = !(active === 'true');
    const metadataContainer = event.target.parentNode.parentNode.querySelector('div.metadata-template');
    button.innerText = (active === 'false') ? 'Ocultar metadato completo' : 'Ver metadato completo';
    metadataContainer.classList.toggle('dNone');
    // Si ya tiene contenido el contenedor de capas no se realiza una
    // nueva busqueda y solo se oculta/muestra
    if (M.utils.isNullOrEmpty(metadataContainer.innerHTML)) {
      M.remote.get(url).then((response) => {
        this.element_.classList.remove(CatalogSearchControl.SEARCHING_CLASS);
        const templateXML = new DOMParser().parseFromString(METADATA_TEMPLATE, 'application/xml');
        // code for IE
        if (window.ActiveXObject) {
          const ex = response.xml.transformNode(templateXML);
          metadataContainer.innerHTML = '';
          metadataContainer.appendChild(ex);
          // code for Chrome, Firefox, Opera, etc.
        } else if (document.implementation && document.implementation.createDocument) {
          // eslint-disable-next-line no-undef
          const xsltProcessor = new XSLTProcessor();
          xsltProcessor.importStylesheet(templateXML);
          const resultDocument = xsltProcessor.transformToFragment(response.xml, document);
          metadataContainer.innerHTML = '';
          metadataContainer.appendChild(resultDocument);
        }
      }).catch((error) => {
        this.element_.classList.remove(CatalogSearchControl.SEARCHING_CLASS);
        M.dialog.error('No se ha podido parsear el metadato completo');
      });
    } else {
      this.element_.classList.remove(CatalogSearchControl.SEARCHING_CLASS);
    }
  }

  /**
   * This function checks if an object is equals
   * to this control
   *
   * @private
   * @function
   */
  showResults_() {
    const html = M.template.compileSync(catalogsearchresults, {
      jsonp: true,
      vars: this.results_,
    });
    this.resultsContainer_.classList.remove(CatalogSearchControl.HIDDEN_RESULTS_CLASS);
    /* unregisters previous events */
    // scroll
    if (!M.utils.isNullOrEmpty(this.resultsScrollContainer_)) {
      this.resultsScrollContainer_.removeEventListener('scroll', this.boundResultsScroll_);
    }
    // showfullmetadatabutton
    let showMetadataButtons = this.resultsContainer_.querySelectorAll('.show-full-metadata');
    for (let i = 0, ilen = showMetadataButtons.length; i < ilen; i += 1) {
      const buttonHtml = showMetadataButtons.item(i);
      buttonHtml.removeEventListener('click', this.boundShowMetadataButton_);
    }
    // showlayersbuttons
    let showLayersButtons = this.resultsContainer_.querySelectorAll('.show-layers');
    for (let i = 0, ilen = showLayersButtons.length; i < ilen; i += 1) {
      const buttonHtml = showLayersButtons.item(i);
      buttonHtml.removeEventListener('click', this.boundShowLayersButton_);
    }
    // results button
    let btnResults = this.resultsContainer_.querySelector('div.page > div.g-cartografia-flecha-arriba');
    if (!M.utils.isNullOrEmpty(btnResults)) {
      btnResults.removeEventListener('click', evt => this.resultsClick_(evt));
    }
    // gets the new results scroll
    this.resultsContainer_.innerHTML = html.innerHTML;
    this.resultsScrollContainer_ = this.resultsContainer_.querySelector('div#m-catalogsearch-results-scroll');
    // registers the new event
    M.utils.enableTouchScroll(this.resultsScrollContainer_);
    this.resultsScrollContainer_.addEventListener('scroll', this.boundResultsScroll_);

    // results read more
    ReadMore.init({
      doc: this.resultsScrollContainer_,
      target: '.metadata-abstract',
      numOfWords: 30,
      toggle: true,
      moreLink: 'Leer más',
      lessLink: 'Leer menos',
    });

    // register event show full metadata
    showMetadataButtons = this.resultsContainer_.querySelectorAll('.show-full-metadata');
    for (let i = 0, ilen = showMetadataButtons.length; i < ilen; i += 1) {
      const buttonHtml = showMetadataButtons.item(i);
      buttonHtml.addEventListener('click', this.boundShowMetadataButton_);
    }

    // register event show layer
    showLayersButtons = this.resultsContainer_.querySelectorAll('.show-layers');
    for (let i = 0, ilen = showLayersButtons.length; i < ilen; i += 1) {
      const buttonHtml = showLayersButtons.item(i);
      buttonHtml.addEventListener('click', this.boundShowLayersButton_);
    }

    // results button
    btnResults = this.resultsContainer_.querySelector('div.page > div.g-cartografia-flecha-arriba');
    btnResults.addEventListener('click', evt => this.resultsClick_(evt));

    this.checkScrollSearch_();

    this.fire(M.evt.COMPLETED);
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
    return this.input_;
  }

  /**
   * This function checks if an object is equals
   * to this control
   *
   * @private
   * @function
   */
  appendResults_(services) {
    // let resultsTemplatelets = this.parseResultsForTemplate_(results, true);
    const html = M.template.compileSync(catalogsearchresults, {
      jsonp: true,
      vars: services,
    });
    // results read more
    ReadMore.init({
      doc: html,
      target: '.metadata-abstract',
      numOfWords: 30,
      toggle: true,
      moreLink: 'Leer más',
      lessLink: 'Leer menos',
    });
    // register show button layer event
    const showLayersButtons = html.querySelectorAll('.show-layers');
    for (let i = 0, ilen = showLayersButtons.length; i < ilen; i += 1) {
      const buttonHtml = showLayersButtons.item(i);
      buttonHtml.addEventListener('click', this.boundShowLayersButton_);
    }

    // register event show full metadata
    const showMetadataButtons = html.querySelectorAll('.show-full-metadata');
    for (let i = 0, ilen = showMetadataButtons.length; i < ilen; i += 1) {
      const buttonHtml = showMetadataButtons.item(i);
      buttonHtml.addEventListener('click', this.boundShowMetadataButton_);
    }

    // appends the new results
    const newResults = html.querySelector('div#m-catalogsearch-results-scroll');
    while (newResults.firstChild) {
      this.resultsScrollContainer_.appendChild(newResults.firstChild);
    }

    // updates the found num elements
    const spanNumFound = this.resultsContainer_.querySelector('span#m-catalogsearch-page-found');
    spanNumFound.innerHTML = this.results_.services.length;

    // disables scroll if gets all results
    this.checkScrollSearch_();
  }

  /**
   * This function checks if an object is equals
   * to this control
   *
   * @private
   * @function
   */
  resultsScroll_(evt) {
    const target = evt.target;
    const height = target.offsetHeight;
    const scrollHeight = target.scrollHeight;
    const scrollTop = target.scrollTop;

    const scrollPosition = scrollHeight - scrollTop;
    const scrollIsDown = ((scrollPosition - height) <= 15);
    if (scrollIsDown && this.scrollIsUp_) {
      this.scrollIsUp_ = false;
      this.scrollSearch_();
    } else if (!scrollIsDown) {
      // updates the scroll state
      this.scrollIsUp_ = true;
    }
  }

  /**
   * This function checks if an object is equals
   * to this control
   *
   * @private
   * @function
   */
  scrollSearch_() {
    this.search_(this.results_.query, true);
  }

  /**
   * This function checks if an object is equals
   * to this control
   *
   * @private
   * @function
   */
  clearClick_(evt) {
    this.element_.classList.remove('shown');
    if (!M.utils.isNullOrEmpty(this.input_)) {
      this.input_.value = '';
    }
    if (!M.utils.isNullOrEmpty(this.resultsContainer_)) {
      this.resultsContainer_.innerHTML = '';
    }
    if (!M.utils.isNullOrEmpty(this.resultsScrollContainer_)) {
      this.resultsScrollContainer_.innerHTML = '';
      this.resultsScrollContainer_ = null;
    }
    this.results_.services.length = 0;
    this.resultsContainer_.classList.remove(CatalogSearchControl.HIDDEN_RESULTS_CLASS);
  }

  /**
   * This function checks if an object is equals
   * to this control
   *
   * @private
   * @function
   */
  resultsClick_(evt) {
    // eslint-disable-next-line no-underscore-dangle
    this.facadeMap_._areasContainer.getElementsByClassName('m-top m-right')[0].classList.add('top-extra-search');
    evt.target.classList.toggle('g-cartografia-flecha-arriba');
    evt.target.classList.toggle('g-cartografia-flecha-abajo');
    this.resultsContainer_.classList.toggle(CatalogSearchControl.HIDDEN_RESULTS_CLASS);
  }

  /**
   * This function checks if an object is equals
   * to this control
   *
   * @function
   * @api stable
   */
  equals(obj) {
    let equals = false;
    if (obj instanceof CatalogSearchControl) {
      equals = this.name === obj.name;
    }
    return equals;
  }

  /**
   * Disables scroll if gets all results
   *
   * @private
   * @function
   */
  checkScrollSearch_() {
    if ((this.results_.services.length === Number(this.results_.total)) &&
      (!M.utils.isNullOrEmpty(this.resultsScrollContainer_))) {
      this.resultsScrollContainer_.removeEventListener('scroll', this.boundResultsScroll_);
    }
  }

  /**
   * obj, level1, level2, ... levelN
   *
   * @returns
   * @memberof CatalogSearchControl
   */
  checkNestedJSON_() {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    let obj = args[0];
    for (let i = 1; i < args.length; i += 1) {
      // eslint-disable-next-line no-prototype-builtins
      if (!obj || !obj.hasOwnProperty(args[i])) {
        return null;
      }
      obj = obj[args[i]];
    }
    return obj;
  }
}
