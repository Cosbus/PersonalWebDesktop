import cssTemplate from './css.js'
import htmlTemplate from './html.js'

class AppContainer extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

    this._appButton = this.shadowRoot.querySelector('button')
  }

  connectedCallback () {
    this.style.visibility = 'hidden'
  }

  getTopPosition () {
    return this._appButton.style.top
  }

  setTopPosition (pos) {
    this._appButton.style.top = pos + 'px'
  }

  getBottomPosition () {
    return this._appButton.style.bottom
  }

  setBottomPosition (pos) {
    this._appButton.style.bottom = pos + 'px'
  }

  getLeftPosition () {
    return this._appButton.style.left
  }

  setLeftPosition (pos) {
    this._appButton.style.left = pos + 'px'
  }
}

export default AppContainer
