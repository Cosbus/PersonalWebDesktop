import cssTemplate from './css.js'
import htmlTemplate from './html.js'

class UserNameView extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

    this._containerHeader = null
    this._container = this.shadowRoot.querySelector('#container')
    this._headerTemplate = this.shadowRoot.querySelector('#headerTemplate')
      .content.cloneNode(true)
    this._usernameInput = this.shadowRoot.querySelector('#usernameInput')
    this._inputButton = this.shadowRoot.querySelector('#inputButton')

    this._isFocused = true

    this._userName = ''

    this._width = 200
    this._height = 200
  }

  connectedCallback () {
    this._container.addEventListener('click', e => {
      console.log('you clicked')
    })
    this._usernameInput.addEventListener('keydown', e => {
      if (this._usernameInput.value !== '') {
        if (this._inputButton.disabled) {
          this._inputButton.classList.remove('disabled')
          this._inputButton.classList.add('enabled')
          this._inputButton.disabled = false
        }
      } else {
        if (!this._inputButton.disabled) {
          this._inputButton.classList.remove('enabled')
          this._inputButton.classList.add('disabled')
          this._inputButton.disabled = true
        }
      }
    })
  }

  getUserName () {
    return this._userName
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

export default UserNameView
