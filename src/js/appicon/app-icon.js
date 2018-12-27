import cssTemplate from './css.js'
import htmlTemplate from './html.js'

class AppIcon extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

    this._container = this.shadowRoot.querySelector('#selectAppDiv')
  }

  connectedCallback () {
    this._container.addEventListener('onmouseover', e => {
      console.log('musen är över')
    })
  }
}

export default AppIcon
