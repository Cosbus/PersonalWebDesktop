import cssTemplate from './css.js'
import htmlTemplate from './html.js'

class InputView extends window.HTMLElement {
  constructor (inputTypeString) {
    super()
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

    this._containerHeader = null
    this._input = ''
    this._container = this.shadowRoot.querySelector('#container')
    this.shadowRoot.querySelector('#inputText').textContent = `Input ${inputTypeString}:`
    this._inputField = this.shadowRoot.querySelector('#inputField')
    this._inputButton = this.shadowRoot.querySelector('#inputButton')
    this._inputButton.disabled = true

    this._isFocused = true

    this._width = 150
    this._height = 150
  }

  connectedCallback () {
    this._inputField.focus()

    this._closeViewEvent = new window.CustomEvent('closeView')
    this._changeInputEvent = new window.CustomEvent('changeInput', { detail: this })
    this._inputButton.addEventListener('click', e => {
      this._input = this._inputField.value
      this.dispatchEvent(this._changeInputEvent)
      this.dispatchEvent(this._closeViewEvent)
    })
    this._inputField.addEventListener('input', e => {
      if (this._inputField.value.length > 0) {
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
    this._inputField.addEventListener('keydown', e => {
      if ((!this._inputButton.disabled) && e.keyCode === 13) {
        this._input = this._inputField.value
        this.dispatchEvent(this._changeInputEvent)
        this.dispatchEvent(this._closeViewEvent)
      }
    })
  }

  getInput () {
    return this._input
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

export default InputView
