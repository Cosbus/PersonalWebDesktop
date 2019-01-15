/**
 * Module for SubWindow.
 *
 * @module src/js/pwindow/sub-window.js
 * @author Claes Weyde
 * @version 1.0.0
 */
import Pwindow from './p-window.js'

/**
 * A class which handles a HTML-window containing content.
 *
 * @class InfoView
 * @extends Pwindow
 */
class SubWindow extends Pwindow {
  /**
   * Creates an instance of SubWindow.
   *
   * @param {HTMLElement} windowContent, the content of the window.
   * @param {boolean} header, whether the window have a header or not.
   * @param {String} icon, an URL to an image of the icon.
   *
   * @memberof SubWindow
   * @constructor
   */
  constructor (windowContent, header = true, icon = 'none') {
    super()

    // Remove unused elements
    this.shadowRoot.querySelector('#expandBubble').remove()

    this._container.classList.add('subWindow')

    this._content = windowContent
    // this._headerTemplate = headerTemplate
    this._workSpace = this._container.querySelector('#workSpace')

    this._workSpace.classList.add('workSpaceSubWindow')
    this._workSpace.appendChild(this._content)
    // this._containerHeader.appendChild(this._headerTemplate)
    if (header) {
      this._content.setContainerHeader(this._containerHeader)
      if (icon !== 'none') { this._content.setIcon(icon) }
    }
    this._closeWindowEvent = null
  }

  /**
   * A function which is called when the object is added to the global window.
   *
   * @memberof SubWindow
   */
  connectedCallback () {
    this._closeWindowEvent = new window.CustomEvent('closeWindow', { detail: this._container })
    this._container.addEventListener('click', this._containerClicked.bind(this))
    this._content.addEventListener('closeView', e => {
      this.dispatchEvent(this._closeWindowEvent)
    })
  }

  /**
   * A function which is called when the object is removed from the global window.
   *
   * @memberof SubWindow
   */
  disconnectedCallback () {
    this._container.removeEventListener('click', this._containerClicked)
  }

  /**
   * A function which handles the event of the container being clicked, if the close-window
   * button is clicked a closed window event is dispatched.
   *
   * @param {event} event, the event.
   *
   * @memberof SubWindow
   */
  _containerClicked (event) {
  // Closebutton clicked
    if (event.target === this.shadowRoot.querySelector('#closeWindowButton')) {
      this.dispatchEvent(this._closeWindowEvent)
    }
  }

  /**
   * A function which sets the focus value of the infoview to true.
   *
   * @memberof SubWindow
   */
  isFocused () {
    this._content.setFocusedTrue()
  }

  /**
   * A function which sets the focus value of the infoview to false.
   *
   * @memberof SubWindow
   */
  isNotFocused () {
    this._content.setFocusedFalse()
  }
}

export default SubWindow
