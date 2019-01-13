import cssTemplate from './css.js'
import htmlTemplate from './html.js'

class InfoView extends window.HTMLElement {
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

  connectedCallback () {
    this._closeViewEvent = new window.CustomEvent('closeView')
  }

  disconnectedCallback () {
    window.dispatchEvent(this._closeViewEvent)
  }

  setContainerHeader (header) {
    this._containerHeader = header
    this._containerHeader.appendChild(this._headerTemplate)
  }

  getWidthRequired () {
    return this._width
  }

  getHeightRequired () {
    return this._height
  }

  setFocusedTrue () {
    this._isFocused = true
  }

  setFocusedFalse () {
    this._isFocused = false
  }
}

export default InfoView
