import cssTemplate from './css.js'
import htmlTemplate from './html.js'

class AppContainer extends window.HTMLElement {
  constructor (Application, appiconURL, name, ...args) {
    super()
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

    this._appButton = this.shadowRoot.querySelector('button')
    this._btnImage = this.shadowRoot.querySelector('#icon')

    this._Application = Application
    this._applicationInstances = []
    this._args = args
    this._name = name
    this._iconURL = appiconURL
    this._appButton.style.backgroundImage = `url(${appiconURL})`
    // this._btnImage.style.backgroundImage = `url(${appiconURL})`
  }

  connectedCallback () {
    this.style.visibility = 'hidden'
  }

  getIconURL () {
    return this._iconURL
  }

  getApplication (index) {
    if (index < this._applicationInstances.length) {
      return this._applicationInstances[index]
    } else {
      return 'No application for that index'
    }
  }

  getAllApplications () {
    return this._applicationInstances
  }

  getNewApplication () {
    let application = new this._Application(...this._args)
    this._applicationInstances.push(application)
    return application
  }

  getNoOfApplicationInstances () {
    return this._applicationInstances.length
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

  getName () {
    return this._name
  }
}

export default AppContainer
