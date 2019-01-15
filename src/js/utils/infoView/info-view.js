/**
 * Module for InfoView.
 *
 * @module src/js/utils/infoView/info-view.js
 * @author Claes Weyde
 * @version 1.0.0
 */
import cssTemplate from './css.js'
import htmlTemplate from './html.js'

/**
 * A class which handles a view for giving simple information in a separate window.
 *
 * @class InfoView
 * @extends window.HTMLElement
 */
class InfoView extends window.HTMLElement {
  /**
   * Creates an instance of InfoView.
   *
   * @param {string} titleString, a string containing the title of the InfoView.
   * @param {string} infoString, a string containing the information of the InfoView.
   *
   * @memberof InfoView
   * @constructor
   */
  constructor (titleString, infoString) {
    super()
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

    this._containerHeader = null
    this._container = this.shadowRoot.querySelector('#container')
    this.shadowRoot.querySelector('#titleText').textContent = titleString
    this.shadowRoot.querySelector('#mainText').textContent = infoString

    this._isFocused = true

    this._width = 400
    this._height = 400
  }

  /**
   * A function which is called when the object is added to the global window.
   *
   * @memberof InfoView
   */
  connectedCallback () {
    this._closeViewEvent = new window.CustomEvent('closeView')
  }

  /**
   * A function which is called when the object is removed from the global window.
   *
   * @memberof InfoView
   */
  disconnectedCallback () {
    window.dispatchEvent(this._closeViewEvent)
  }

  /**
   * A function which sets the header of the container.
   *
   * @param {HTMLElement} header, a header to be used by the view.
   *
   * @memberof InfoView
   */
  setContainerHeader (header) {
    this._containerHeader = header
    this._containerHeader.appendChild(this._headerTemplate)
  }

  /**
   * A function which returns the width of the infoview.
   *
   * @return {number} the width in px of the infoview.
   *
   * @memberof InfoView
   */
  getWidthRequired () {
    return this._width
  }

  /**
   * A function which returns the height of the infoview.
   *
   * @return {number} the height in px of the infoview.
   *
   * @memberof InfoView
   */
  getHeightRequired () {
    return this._height
  }

  /**
   * A function which sets the focus value of the infoview to true.
   *
   * @memberof InfoView
   */
  setFocusedTrue () {
    this._isFocused = true
  }

  /**
   * A function which sets the focus value of the infoview to false.
   *
   * @memberof InfoView
   */
  setFocusedFalse () {
    this._isFocused = false
  }
}

export default InfoView
